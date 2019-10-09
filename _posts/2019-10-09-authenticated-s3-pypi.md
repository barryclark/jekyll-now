---
layout: post
title: An Authenticated S3 Python Package Repository 
subtitle: Serverless hosting of private Python packages in AWS S3 buckets
category: dev
tags: [aws, development, serverless]
author: Christoph Ludwig
author_email: christoph.ludwig@haufe-lexeware.com
header-img: "images/new/Exportiert_47.jpg"
---

## Table of Contents
{:.no_toc}

* Table of Contents
{:toc}

## Introduction

If you ever tried working on a machine learning project, then you have most likely spent a significant amount of time on experiments: First you need to establish a baseline that you can improve on. Then -- based on experience, intuition, and stubbornness -- you test many approaches, implementation variants, and hyperparameters until you hopefully reach a satisfactory result.

That's what we were facing in a project that looks into the application of machine learning and other natural language processing techniques to more conveniently serve our customers' information needs in Haufe's content products. (Once we've left the prototyping phase, it will certainly be worthwhile to report on both this project's specific challenges and our findings!)

Like everybody else, we started with a bunch of Jupyter notebooks in which we explored the available data and played with the algorithms implemented in popular NLP libraries. However, once we began customizing and combining algorithms and services, reproducibility of experiments turned out to be an issue. Since the individual experiments were based on different versions of our components, simply keeping the source code in a git repository was not sufficient; it soon became evident that we needed to reference the pipeline's components as composable and versioned Python packages.

The only catch: Where to store the Python packages?

* A public Python package repository like [pypi.org](https://pypi.org/) would clearly be an inappropriate place for our proprietary and experimental code.
* Haufe already has some private Python repository servers in use, but these are not exposed to the internet. However, our project is developed on AWS and we did not want to set up a VPN connection into Haufe's intranet merely for access to a package repository.
* AWS offers a lot of developer tools as a service, but no package repository -- you have to turn to third-party SaaS offerings or operate one yourself.

At this point, our project has no need for the scalability and extra features of the commercial package repositories, therefore we looked into the latter option.

## Python Package Repository on AWS

A Python package repository is basically a [static HTTP server](https://packaging.python.org/guides/hosting-your-own-index/) that hosts the packages and serves index pages. Of course, we could have deployed [devpi](https://www.devpi.net/), [pypiserver](https://github.com/pypiserver/pypiserver), [pypicloud](https://pypicloud.readthedocs.io/en/latest/), or something similar into a low-cost EC2 instance; but such an instance still comes with maintenance responsibilities: Security patches need to be applied in a timely manner, the instance needs to be monitored for (security) incidents, shell access needs to be managed when the set of team members change, and so forth. Given that S3 buckets can act as static HTTP servers out-of-the-box, operating a dedicated EC2 instance seems like overkill.

Nevertheless, setting up an S3 bucket as a _private_ package repository is less straight-forward than it seems on first glance:

* An S3 bucket configured as a static HTTP server makes its objects publicly available. You can hide data only by storing the objects under hard-to-guess keys.
* The Python package installer [pip](https://pip.pypa.io/en/stable/),[^pipAlternatives] on the other hand, comes with rather crude support for client authentication only: To the best of my knowledge, TLS client certificates and [HTTP Basic Authentication](https://tools.ietf.org/html/rfc7617) are the only options.[^pipAuth] S3 buckets have no readily available support for either client authentication method, though.
* Assuming we somehow covered the static HTTP server part for downloading packages, this still leaves us with the uploading of packages into the S3 bucket. It is unreasonable to expect developers to know the details of the paths and naming conventions for Python package repositories by heart.
* The repository needs to serve an index page for each package -- we have to provide these index pages ourselves if we cannot configure the S3 bucket as a static HTTP server.

### s3pypi by November Five

Of course, we were not the first to look into the use of S3 buckets as serverless Python package repositories. Eventually, a web search brought up a [post on November Five's blog](https://novemberfive.co/blog/opensource-pypi-package-repository-tutorial/) that describes their tool [s3pypi](https://github.com/novemberfiveco/s3pypi) -- open-sourced under an MIT license -- for setting up the infrastructure on AWS as well as a CLI for uploading packages into the bucket including the generation of static index pages.

From the outset, I liked s3pypi's use of [CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html) templates for declarative, easily reproducible infrastructure setups as well as the use of a [CloudFront distribution](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html) for TLS termination. There is no EC2 instance we need to take care of.

Unfortunately, s3pypi supports only two options to keep your packages private:

1. Put an [AWS Web Application Firewall](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html) in front of the CloudFront distribution and whitelist a static set of IP addresses. This cannot work in our scenario because developers and services access packages -- besides from the company network -- from unknown AWS addresses or, e.g., from their home office.

2. Store the packages under a secret key prefix in the otherwise publicly accessible bucket. Rotation of this secret is a pain, though: You need to move all objects inside the bucket and _every_ client's configuration needs to be changed.

Given pip's limited capabilities, I wanted to require at least basic authentication. After reading up on CloudFront, I decided my best option was to authenticate clients in a [Lambda@Edge](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html) function.

## Basic Authentication by Lambda@Edge

One way to think of CloudFront is as a caching reverse HTTP proxy. (It does not do CloudFront justice to reduce it to this feature; but it's the aspect we are here interested in.) Upon every client request, CloudFront looks up the respective resource in its cache; only in case of a cache miss (or a stale resource) CloudFront asks the authoritative source (the _origin_ in CloudFront parlance) for the resource. Lambda@Edge (introduced in December of 2016) lets you intercept and modify the requests and responses received from and sent to clients (_viewer-request_ and _viewer-response_, respectively) as well as requests and responses submitted to and received from the origin (_origin-request_ and _origin-response_, respectively). If configured, any of these events will be forwarded to instances of custom lambda functions.[^regionalLambdaDeployments]

In our case, we want to block all client requests that don't include an authorization HTTP header with valid basic authentication credentials. We therefore need to handle the viewer-request events and make CloudFront respond with a 401 (unauthorized) status and a www-authenticate header unless the required credentials are present. For reasons that will become evident in a moment, we also prepend a static prefix to the path of all requests we let pass through to the cache lookup (which, in turn, might make CloudFront load the resource from the origin).

This application of intercepting viewer-request events is so obvious that many blog posts used it to showcase Lambda@Edge after its introduction. However, all the posts I came across skipped an important detail: They simply hard-coded a single username / password pair into the lambda function. The point these posts wanted to make was not about tedious code for reading files or databases; therefore this might seem like a justifiable omission -- if it were not for a significant limitation of Lambda@Edge functions: You must not pass environment variables to lambda functions associated with a CloudFront distribution. Without configuration at deployment time, how is the viewer-request lambda function supposed to validate the credentials presented by clients?

The solution we came up with is to store the user data (usernames and salted password hashes) under a fixed key in the same S3 bucket as the Python packages. On every invocation of the Lambda@Edge function, the event metadata includes the id of the CloudFront distribution. This can be used to look up the distribution's origin and thus the name of the S3 bucket that holds the Python packages and user data.[^bucketNameCaching]

![High-level Authenticated S3 PyPi Architecture Overview]({{ site.baseurl }}/images/authenticated-s3-pypi/Authenticated-S3-PyPi-Architecture-Overview.svg){:width="100%"}

If you are security-conscious, this will ring some alarm bells: You certainly don't want a "creative" repository client to find a URL that resolves to your user store![^userStoreLeakageRisk]

We mitigate unauthorized access to the user store via the CloudFront distribution by assigning different key prefixes (read: folders) to the Python packages and the repository configuration data like the user store. The viewer-request lambda function unconditionally normalizes all authenticated client request paths (to counter directory traversal) and then prepends the path segment `packages/`. November Five's s3pypi CLI for uploading packages was modified to check for the presence of the user store in the S3 bucket and to prepend `packages/` to all package object keys as well.

From time to time the user data will change; no instance of the viewer-request lambda function will rely on its cached copy of the user data unless it verified the cache's consistency with the user store object in the S3 bucket no more than a minute ago. This check can be performed efficiently using an ETag-based conditional HTTP GET of the user store object.

## CloudFormation Templates

As mentioned before, s3pypi provides CloudFormation templates that facilitate easily reproducible deployments. Unfortunately, my changes required me to basically rewrite the templates from scratch. Since I am an AWS noob (I gathered my cloud experience so far on Azure), this took quite some time -- in particular because of the long turn-around times caused by the CloudFront distribution deployments.

![Authenticated S3 PyPi Stacks]({{ site.baseurl }}/images/authenticated-s3-pypi/Authenticated-S3-PyPi-Stacks.svg){:width="100%"}

The most significant change is due to CloudFront and CloudFormation limitations: Our company policy requires that we deploy the S3 bucket for the Python packages within the EU. However, Lambda functions associated with CloudFront distributions _must_ be deployed in the N.&nbsp;Virginia region, even though the functions will de facto be invoked in European edge locations only. We therefore need to deploy resources in two different regions.

### Multi-Region Stack Deployments

However, a CloudFormation stack deploys all resources in a single region; even nested stacks do not support multi-region deployments.[^stackSets] I therefore had to split the infrastructure declaration into multiple, separately deployed stacks:

* The first stack, deployed in our local region, creates the S3 bucket together with the bucket policy and managed policies assigned to our developers for package publication and user administration privileges. The bucket policy references the CloudFront origin access id used by the CloudFront distribution when reading objects from the bucket whence it is created here as well.
* The second stack, deployed in N.&nbsp;Virginia, uploads the vierwer-request lambda function, defines an lambda execution IAM role, and creates a lambda function version for reference by the CloudFront distribution. (In fact, this stack is implemented as a [Serverless Application Model](https://aws.amazon.com/serverless/sam/) template that builds the code in a containerized environment and adds some extra transformations to the template passed to CloudFormation.)
* The third stack is deployed in our local region again and defines the actual CloudFront distribution. As a result of this deployment, we get the CNAME or alias record that we configure in Route 53 as the target of our package repository's domain name.

### CloudFront Origin Access Id

November Five configured the S3 bucket as a static HTTP server with a bucket policy that allowed requests from CloudFront's published IP address ranges only. This means everybody who happens to guess the bucket name (by default identical to the repository's domain name) can configure his own CloudFront distribution and read bucket objects with known keys. This is sufficient, of course, if you rely on a secret key prefix to keep your packages private; but it defeats the purpose of our authenticating lambda function.

I therefore turned off _any_ public bucket access (i.e., the bucket is no longer configured as a static HTTP server) and changed the bucket policy to grant object read access only to the principal associated with the CloudFront origin access id I created as part of the stack.

### Deployment Script

As indicated in above diagram, the individual stack deployments produce outputs that need to be passed into the subsequent stack deployments as parameters. I can tell from experience that copy-and-pasting these values on the command line or in the CloudFormation Web console is error-prone; furthermore, the error messages are often less than clear.

For convenience's sake, I added a Python script named `s3pypi-infrastructure`[^CDK] that takes care of the CloudFormation and SAM deployment calls, the former using `boto3`, the latter by direct invocations of the SAM CLI. The script needs access to the template files and the lambda function code, of course; it therefore needs to be invoked from a working tree of your local Git repository clone.

## User Store

So far we simply assumed the user store (i.e., the object with the usernames and salted password hashes) is available in a well-known location inside the repository S3 bucket. We didn't address yet how to manage the user store's entries.

This the purpose of yet another script named `s3pypi-admin` (bundled as part of the s3pypi package). It implements commands for listing, adding (or updating), and deleting entries in the user store. The script looks the current user's boto3 credentials up in the usual manner (respecting an optionally provided profile name) and expects the managed user admin IAM policy created as part of the first CloudFormation stack was assigned to the corresponding AWS identity.

`s3pypi-admin` builds on [passlib](https://pypi.org/project/passlib/) for the generation of the salted password hashes. The same library is used, of course, for the credential verification in the viewer-request lambda function. 

Unfortunately, this severely limits the password hash algorithms that can be used: The compressed size of viewer-request lambda functions (including _all_ libraries) [must not exceed](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-limits.html#limits-lambda-at-edge) 1&nbsp;MByte. This precludes use of the [Argon2](https://github.com/P-H-C/phc-winner-argon2) and [Bcrypt](https://www.usenix.org/legacy/events/usenix99/provos/provos_html/) password hashing schemes since their implementations depend on native libraries that, even compressed, do not fit into 1&nbsp;MByte. This left the [pbkdf2_sha256](https://passlib.readthedocs.io/en/stable/lib/passlib.hash.pbkdf2_digest.html#passlib.hash.pbkdf2_sha256) hashing scheme as the best remaining option.

## Odds and Ends

I am [in contact](https://github.com/novemberfiveco/s3pypi/pull/68) with the maintainer of November Five's s3pypi whether my additions and changes can be merged back into the upstream project. Even though I am in favor of keeping the code in one place, I am aware that the pull request will likely need some refactoring and further work on my part before it will be accepted. Until then, you can review my code in [my repository fork](https://github.com/chludwig-haufe/s3pypi/tree/feature/authenticated-pypi).

The restrictions on viewer-request functions put significant limits on what can be achieved with the means of Lambda@Edge. Even the switch to a more recent password hashing scheme is currently not possible.

It might be possible to overcome this limitation by calling yet another (regular) lambda function that is subject to much more relaced limits and doing all the work there (following the pattern set by [Amazon API Gateway Lambda Authorizers](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html)). Of course, we'd still be bound by the tight time budget for viewer-request functions, but we had much more freedom in the choice of our dependencies and we could also configure the downstream lambda function at deployment time. On the other hand, we'd probably need an API Gateway in front of this lambda function so it can be called from all CloudFront edge locations.

Whether the extra flexibility is worth the additional complexity of the resulting stacks is certainly debatable... For our machine learning project that triggered this digression into serverless Python package repositories the status quo will be sufficient for sure.

## Footnotes

[^pipAlternatives]: pip is certainly not the only Python dependency management tool; developers might also use, say, [poetry](https://poetry.eustace.io/docs/), [pipenv](https://pipenv.readthedocs.io/en/latest/), or [dephell](https://dephell.org/docs/index.html). But pip defines a common denominator because it is essentially the default tool.

[^pipAuth]: pip offers a CLI option `--client-cert` for specifying a private key and an X.509 certificate as client credentials. There is no such CLI option for basic authentication credentials; the pip user needs to either encode the credentials into the configured repository URL or store them in the user's [netrc(5)](http://manpages.ubuntu.com/manpages/bionic/en/man5/netrc.5.html) file.

[^regionalLambdaDeployments]: CloudFront is a global AWS service and, for the sake of small response latencies, it will automatically deploy and instantiate the Lambda@Edge functions in whatever CloudFront edge location the respective client request is handled. In our original use case it is unlikely there will be requests in more than one edge location; and if there are, we won't worry about a bit of extra latency. Nevertheless, this explains some of the restrictions CloudFront puts on Lambda@Edge functions.

[^bucketNameCaching]: Looking up the S3 bucket name from the CloudFront distribution configuration eats into the very tight time budget CloudFront allots to Lambda@Edge function invocations. But this needs to be done only once for every instance of this function; the bucket name won't change and can be cached by the lambda function instance.

[^userStoreLeakageRisk]: Actually, in this special case I would not worry too much about the risk associated with a leakage of the user store to a client: Since access to the repository is all-or-nothing anyway, the malicious client won't get access to additional packages even if he manages to crack another user's repository password. But protecting your user store is a matter of principle; otherwise, why bother with enforcing authenticated access at all?

[^stackSets]: Admittedly, it _is_ possible to do multi-region infrastructure deployments using CloudFormation [StackSets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html). However, the primary purpose of StackSets is cross-account deployments. Even if your StackSet addresses a single account only, you need to [create specific IAM roles](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-prereqs.html) before you can deploy the StackSet. I decided against using a StackSet because I expect that many developers would feel uncomfortable creating these roles in their accounts "only" for the deployment of an S3 bucket and a CloudFront distribution -- to me it certainly seems like taking a sledgehammer to break a nut.

[^CDK]: After `s3pypi-infrastructure` was complete I became aware of the [AWS Cloud Development Kit](https://aws.amazon.com/cdk). I am not convinced yet that it would have simplified the multi-region stack deployment. However, it's very well possible I missed the relevant usage pattern -- so far, I only played with CDK a little bit.

{::comment}
This text is completely ignored by kramdown - a comment in the text.
{:/comment}

---
layout: post
title: Opening up security
author: flock3
---

I believe that there has been a cultural shift in recent years around who is responsible for implementing security within a business, and that development teams are becomming more involved in the implementation of security practice, and thereby becoming leaders in it.

----
***

## Overview

I believe that there has been a cultural shift in recent years around who is responsible for implementing security within a business, and that development teams are becomming more involved in the implementation of security practice, and thereby becoming leaders in it.

A really good example of this is that more and more development teams are starting to implement secret management into their workflows, but not as a result of the info sec teams pushing forward, instead as a result of the tooling being available to help them do this programatically.  The result now being that info sec teams are moving to a role of supporting the overall defence in depth, rather than having to lead the charge in adoption of secret management best practice.

Perhaps the most concrete example of this, is the ever increasing number of development teams implementing 
their own secret management systems using new tools like Vault (from Hashicorp) to store their business secrets. This has lead to a bit of a shift in the role of their info-sec teams, who have begun to move more towards of a role of supporting the implementation of secured-by-design principles; rather than being the driving force behind it.

Previously, if you wanted to store your secrets, you would have had to go and ask the IT procurement department for budget to buy a HSM(1), and spend three months integrating that into your workflow to see the benefits. Now, with the rise of containerisation, and with the widespread adoption of
cloud services, people have been writing software to bring more low-cost automation to these workflows. 

The problems haven't changed, we have just started to see them faster, and realise the impact of them sooner as a result.

## Software with secrets in mind

To give a concrete example of this kind of realisation in mind, one of the teams I most recently worked with had re-platformed their stack
from tin in their data centers; to using cloud providers (Amazon in their case), and at the time of re-platforming, they moved to containers in
their application. 

One of the concerns they had, was that they were using a public cloud provider to store their docker images. So if they
did what they always had, and stored their secrets in the source code, and had that source code and config switched it into place, then their 
production database credentials would have been available in their image, if the cloud provider was then ever compromised, then they could 
have a much more serious breach on their hands, than that which access to the source would normally give an attacker.

The team chose to use Vault by Hashicorp initially just to store the key/value pair secrets that they needed. Vault solved the problem of 
how to store the secrets securely, and even partly solved the problem of how to get them onto the containers; but there was still some not small
work to truly integrate Vault into their workflow.

Now when the team is developing the software and they have a new secret to store, there is very little temptation just to store it in the source
or any other easy solution, because storing it in the Vault that lives in the environment, is not that much more complicated.

## How they authenticate and authorize

One of the big problems with any system that manages any aspect of security, is authentication and authorization. Vault has a number of paradigms 
that they have implemented, that help you to solve these problems.

### EC2 Based authentication with Vault

Vault has a lovely authentication (and authorization) system called EC2-Auth. The system can be simply described as one that uses Amazon
as a source of truth for deciding if something can authenticate, and then what roles it has.  The workflow for an EC2 based authentication is fairly simple:

* EC2 instance calls the Amazon Metadata API 
* EC2 instance retrieves the PKCS signed metadata from the Amazon Metadata API
* * (That metadata takes the form of the servers instance id, any tags it has assigned to it, and various other pieces of information)
* EC2 instance sends that signed metadata to Vault server along with a NONCE (2)
* Vault validates the signing of that data against Amazon's public key 
* Vault calls Amazon's API to confirm the identity of the instance, and to find out what roles it can have
* Vault generates a cubbyhole token (3) and returns it to the EC2 instance

For an authentication and authorization system, the above is actually quite simple and (dare I say it) fairly elegant, but it wasn't a good solution for the 
team, because as you might have guessed (when it passed a nonce); it's only good for one authentication attempt.

Vault have (fairly) made the decision that an EC2 instance can only authenticate once, and on any subsequent authentication attempts it must _reuse the nonce_.
That re-use of the nonce makes it unsuitable for a container enviroment just on it's own, but it also makes it more difficult to use container level networking
only, as in that case (where a container can be on any host) it is difficult for all containers not to have the same level of authorization.

The solution for that team was to find another source of truth, and in that case they chose Rancher (their container management system) to be their source of truth.

### Rancher as a source of truth

Using Rancher as a source of truth required the team to write a custom intermediary API that handled the interaction between Rancher and Vault, this effectively meant
that they wrote software that lived within the security scope; so their solution was to make it as thin a layer as possible, to give it the minimum possible
attack surface.

The basic workflow of using Rancher as a source of truth can be broken down like this:

* Container starts up, fetches it's container ID from Rancher's Metadata service (or it's hostname - as it's faster)
* Container sends that container ID to their intermediary API
* Intermediary API queries Rancher's API with the container ID, and confirms that the container is running
* Intermediary API queries Rancher's API with the container ID, and retrieves a list of labels from Rancher
* Intermediary API calls Vault and requests a token with the roles specified by the container's labels

## Problems they came across

* The first and most obvious problem is that they had to write their own software; their software lives in scope, and has to be in an exceptionally privileged position to be able to make Vault authentication tokens that have many policies applied. This means that a compromise of this intermediary layer, is a compromise of all environment secrets.
* You must figure out how to store your root vault keys. When a vault server comes online, it has to be un-sealed so it can access secrets, which means you must find a way to store something more secret than your secrets: the root secret.
* Vault makes the assumption that the Vault server lives in a safe place, so it does not do huge amounts to protect the master key in memory, or do much else to stop itself being subjected to an attack. Therefore you need to plan in your infra where your Vault server will live.



## Why I believe you should ignore all of the above problems

Implementing Vault into your team, into their mindsets and then into your stack is really not a simple task. It is not a "one click" solution to all of your security concerns, and it is by no means a silver bullet of increased security.  What using a secret storage solution like Vault really does well, is help to change the mindset of how some developers in your team might think about security, and responsibility for security. 

I recognise that this article has been very much based around "perfect" environments, cloud hosted, immutable infrastructure, every neck-bearded hipster term going, and I am certain that most people reading this, don't run in that kind of environment.  That doesn't mean that you should be put off using Vault.

Vault (and other tools like it) can solve real business problems effectively, and very inexpensively, but they require some up-front inevestment of time to understand how they work, and from that, how you should integrate them into your workflows.

## Conclusion

Take half a day of your time, do a POC of Vault or another secret manager in your environment, and really see how it could help you better manage your secrets.  Vault is a big (and fairly scary) jump, but it is not insurmountable, it's got good community support, and the documentation is very much up to scratch.  So fly! And may your secrets forever be secure.


## Reference

* (1) HSM - A "Hardware Security Module" a physical device designed to locally and securely encrypt data
* (2) [NONCE](https://en.wikipedia.org/wiki/Cryptographic_nonce) - A single use token that is automatically generated.  Vault breaks this paradigm however by re-using the NONCE on subsequent requests, which makes it less of a NONCE and more of a general token
* (3) [Cubbyhole Tokens](https://www.vaultproject.io/docs/concepts/response-wrapping.html) - Vault has an excellent mechanism for secure token delivery.  It will give you a token that you can use exactly once, you use that token to get your much longer lived token out of the Vault.  This means that the mechanism that you use to deliver the token to the client does not have to be perfectly secret, because if the client tries to use that single use token after an attacker has already gone in and retrieved the longer lived token, you can flash warning lights all day to say that your environment might have been compromised.

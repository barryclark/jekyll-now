---
layout: post
title: Introducing wicked.haufe.io
subtitle: Why we wrote our own Open Source API Management Stack based on Mashape Kong and node.js.
category: dev
tags: [open-source, api, devops, development]
author: Martin Danielsson
author_email: martin.danielsson@haufe-lexware.com 
header-img: "images/new/Exportiert_2.jpg"
---

As you will have noticed over the last year or so, we are currently working on making our company composable and flexible, and a main building block of that strategy are APIs as enablers. Tightly connected to APIs are the questions on how to document, promote and publish the APIs using suitable means, such as API Portals.

There are quite some solutions for API Portals (most including the API Gateway and Analytics parts as one do-it-all API Management solution), such as (non-comprehensive list!) [Azure API Management](https://azure.microsoft.com/de-de/services/api-management/), [Apigee](https://apigee.com) (recently acquired by Google), [3scale](https://3scale.net) (recently acquired by Red Hat), [Mashape](https://mashape.com) or [CA API Management](http://www.ca.com/de/products/api-management.html).

So, why did we (in parts) roll our own? This blog post will try to shed some additional light on what led to this, in addition to what Holger already wrote about in his blog post on the current [state of our API strategy](/state-of-our-api-strategy).

### What is wicked.haufe.io and what features does it offer?

[Wicked is an API Portal/API Management](http://wicked.haufe.io) package built around the [API Gateway Kong](https://getkong.org) by Mashape. Kong itself is a "headless" component sporting only a REST style interface for configuration. Our API Portal makes using Kong a lot easier (we think), plus that it gives the following features in addition to the API Gateway Kong offers. Our claim is: **Wicked Good API Management** ;-)

{:.center}
![Wicked Logo](/images/introducing-wicked/wicked-256.png){:style="margin:auto"}

* **API Gateway**: Leveraging Mashape Kong, Wicked delivers a powerful API Gateway you can use to secure your APIs behind
* **API Self Service**: Using the Portal, Developers can sign up for using your APIs themselves; they will be provisioned API Keys/OAuth Credentials they can use to access the APIs via the API Gateway (i.e., Kong)
* **API Documentation**: Inside the API Portal, you may document your APIs using OpenAPI Spec (aka "Swagger"), and this documentation is automatically served using a hosted Swagger UI distribution inside the API Portal
* **Additional Documentation**: In addition to OpenAPI Specs, you may add additional markdown or HTML content to the portal which is automatically served and secured (if desired)

A more extensive list of features can be found here: [wicked.haufe.io/features](http://wicked.haufe.io/features.html).

To illustrate what Wicked does more in detail, please regard the following picture:

{:.center}
![Wicked Usage](/images/introducing-wicked/application-usage.png){:style="margin:auto"}

The main use case of the API Portal goes as follows:

1. The developer is currently developing an application, for which he needs access to a specific API
2. The dev goes to the API Portal (Wicked) and browses the API documentation until he finds the API he needs
3. To use the API, the developer registers his application with the API Portal and signs up for the application to use the API
4. The API Portal will provide the developer with API credentials (OAuth Client ID/Secret or a plain API Key, depending on the API)
5. The developer incorporates the credentials into his application and subsequently uses the API

The operator of the API and API Gateway can thus be sure that nobody unknown to the API Gateway is able to use the API.

### What kinds of problems does Wicked solve?

The most compelling "feature" of wicked though is not what the software can do, but rather how it can be deployed. With most other API Management Solutions we struggled to get them fit inside our Tech Strategy, mostly regarding the following topics we regard very important:

* **DevOps Support**: Can we deploy API Management like any other application, i.e. using CI/CD pipelines (Jenkins, Travis, GoCD,...)? Preferably - if needed - including infrastructure as code (Phoenix Deployments), and/or using [Blue/Green Deployment techniques](https://github.com/Haufe-Lexware/wicked.haufe.io/blob/master/doc/continuous-deployment.md).
* **Configuration as Code**: Can we store the entire configuration of the API Management solution inside source control? This was in many cases a main stopper for adopting other solutions; either extracting/deploying configuration was not simple, or only partially possible.
* **Docker Support**: As a rule, we want to be able to run everything in containers, i.e. using Docker. This we accepted as the only restriction on the runtime environment; supporting Docker means we are free to deploy to any infrastructure supporting Docker hosts, including *our own premises*.

The rest of the things Wicked "solves" are the normal use cases solved by most any API Gateway, and, as already pointed out, this is done by leveraging the already existing Kong API Gateway (we mentioned we really like Kong, right?).

By really enforcing everything to be in "code", e.g. in a git repository, it is possible to completely adapt the deployment model of your API Management system to the way you work, and not the other way around. You deploy from configuration-as-code (from your code repository), and this means you are free to version your code as you like it, or, as it suits your needs best.

The documentation of Wicked contains a more thorough discussion of possible [configuration versioning strategies](https://github.com/Haufe-Lexware/wicked.haufe.io/blob/master/doc/versioning-strategies.md).

Another thing which was a main reason driving the development of our own API Portal in combination with Kong was that we want to enable individual teams to deploy and run their own instances of API Management Systems. We explicitly **did not want to centralize** API Management, and this also turned out to be a real cost driver for commercial solutions (see also below). In our opinion and according to our tech strategy, your API and thus also API Management belongs to the teams implementing and running services (in the DevOps sense). Cutting off the operation at a centralized API Management hub leads in the wrong direction. Instead we want a decentralized approach which even more pressed the need to be able to deploy API Management more or less infrastructure-agnostic (hence Docker). 

### What alternatives are available we considered using instead?

As APIs are gaining traction, there are also many contendors on the market. We looked at quite some of those, and with some solutions we are still working for specific use cases (i.e. Azure API Management for APIs deployed to Azure). The following list (not including all alternatives, obviously) gives one or two short reasons why they weren't considered fit to implement our Tech Strategy:

* **3scale API Management**: 3scale has a magnificent cloud solution for API Management, but it is a SaaS solution, which means you're always running one or more parts of the API Management on 3scales premises. This is by no means bad, but in some cases our data is such that we aren't allowed to do that for regulatory reasons. Additionally, as a default, 3scale sees itself as a centralized API Hub, which is not what we wanted. If you want to get the "good features" and flexible deployments, things will quickly get costly.
* **Azure API Management**: Azure APIm is also a SaaS only solution, and a quite potent one as well. Considering the Azure DE offerings, Azure APIm is still a valid approach for our company, but there are still some drawbacks which we do not like particularly: DevOps features are present, but not complete (additional documentation cannot be added/delete using REST interfaces for example), and also setting the API Gateway itself is not completely automatable: It's intended to be long running, not to deployed anew at changes. 
* **CA API Management**: For the CA API Management solution, we quickly ran into cost bounds and problems regarding how we want to be able to deploy things (for each team individually). Short: It was far too expensive. Running on your own premises is though not a problem, deploying into Docker was (to that time at least). The cost aspects and the more traditional licensing offers we had made us not even look very much further into the product (which itself looks very good though).
* **AWS API Gateway**: Another SaaS only offering; if you are on AWS, this may be very interesting, as it's by all means automatable and configurable from the outside, but it has a quite strong locking to AWS (not surprisingly). For authentication, it resorts either to very basic API Keys or to AWS IAM, which may be fine if you are already on AWS. Otherwise it's rather complicated. And: It does not (yet) have a Developer Portal, at least not of the kind we wanted to have.

We also evaluated a couple of other open source solutions, such as API Umbrella and Tyk.io.

* **API Umbrella**: API Umbrella looked really promising at first, but when working more with it, we did not quite like how it was built up; it is also intended to be long running, and the deployment strategies did not match our tech strategy. We managed to run it in Docker, but we weren't able to split up the installation into the different components as we wanted. In addition to this, API Umbrella (half a year ago) was in the middle of a major rewrite from node.js to Lua.
* **Tyk.io**: Also tyk.io is a very promising product, and in the (commercial) version 2.0 even more so. The version we evaluated before we decided to go for our own portal was the 1.x version, and there we also encountered the "usual" problems we had regarding how to configure and deploy the instances. The operation model of Tyk needs Tyk to be long-running, which was one main no-go here.

**Conclusion**: Main show stoppers were deployment/operation topics, cost aspects and the lack of on premise support.

### What kinds of technologies and products does it build upon?

When we built Wicked, we deliberately picked one of the "newer" languages/frameworks to get some hands-on experience with that as well; in this case the API Portal is built entirely using node.js, which turned out to be extremely productive for this kind of application. We'll look in some more detail on the deployment architecture:

{:.center}
![Deployment Architecture](/images/introducing-wicked/architecture-components.png){:style="margin:auto"}

Each box in this diagram depicts (at least) one Docker container, so this is the first bullet point on the list:

* **Docker**: All Wicked components run (or can run) in a Docker container. This ensures you are able to deploy onto almost any kind of infrastructure (Azure, AWS or your own premises), as long as you can provide a Docker host (or Swarm) to run on.

The other components are built as follows:

* **HAProxy**: In front of both the Portal and the Gateway sits a Docker HAProxy container which distributes and load balances the incoming requests; this component is using the official `docker-haproxy` implementation which also Docker Swarm is using.
* **Portal Components**: All Portal components (the UI/the actual portal parts) are implemented using node.js, more specifically using (among others) the following standard frameworks:
    * Express
    * Jade/Pug for HTML templating
* **Kong**: The API Gateway is a plain vanilla Mashape Kong docker image. We did not have to make any changes at all to the Kong source code; we are really using Kong "as-is", which was what we had hoped for, to make upgrading scenarios as simple as possible
* **PostgreSQL**: Likewise, we're using a standard PostgreSQL docker image without any kinds of changes (currently version 9.4). The PostgreSQL instance is needed by Kong to store runtime data (e.g. for rate limiting) and configuration data; please note that we *never* talk directly to the database, but only to the Kong REST interface.

We are deliberately **not using** any database for storing the configuration or runtime data. This is saved in plain JSON files (encrypted where applicable) as data-only docker containers for the API Portal API Container. This makes deploying, extracting and restoring configuration extremely simple, once more taking our deployment tech strategy into account.

### Why did we decide to offer wicked.haufe.io as open source?

We decided early on that our API Portal was going to be open source. This has various reasons, of which I will state a few:

* We are standing on the shoulders of many other open source projects, such as node.js, Express and first and foremost on Mashape Kong (which in turns stands on NGINX and Lua); we feel obliged to give back something for the effort everybody else has put in to the ground work
* API Management software is quite obviously not the core business of Haufe-Lexware (we're a media and publishing company), and thus an API Management Solution will be quite difficult to sell and/or put into any kind of portfolio
* We hope to gain a little attention in the API community by also pitching in our work into what we think is a promising thing
* Hopefully, we will be able to attract other developers also interested in "APIOps", so that we can really make Wicked into a great go-to solution in terms of Open Source API Management.

### What is on the roadmap for future releases?

Whereas Wicked already (at version 0.9.1) is at a very usable state, there are still things on our plate which we will try to address over the next couple of weeks and months, among which are the following topics:

* Currently, Wicked only supports machine-to-machine authentication (using API Keys or the OAuth 2.0 Client Credentials flow); one main research topic will be how to integrate Kong/Wicked with our existing SAML user authentication, based on OpenAM. Additionally, leveraging Kong's support for the other OAuth 2.0 Flows (such as the Authorization Flow) will be looked at.
* Further integration testing suites, especially for checking Kong upgrade compatibilities need to be implemented to further gain trust in the build and deployment automation.
* Tagging, Search support for APIs and Documentation
* Some Social Component for the Portal, such as Feedback forms and optionally Github Issue integration
* Better support and documentation of the logging features (both of Kong and the Portal)

There are many other major and minor ideas flying around, and in the course of the next couple of days we will add Github issues for the things we already know of, so that we can start a discussion and find good solutions to any problems coming up.

### How can you get involved?

As already stated: Wicked is totally open source, and you are perfectly free to participate in developing it, or even just in giving feedback on what you would like to see in it. We have published the source code under the very permissive Apache 2.0 license.

We are currently building/finishing the first version of the documentation, which includes instructions on how to build the API Portal on your local machine, so that you can get started quickly. A good starting point for reading up on technical details is the main Github page: [github.com/Haufe-Lexware/wicked.haufe.io](https://github.com/Haufe-Lexware/wicked.haufe.io) or the [documentation index page](https://github.com/Haufe-Lexware/wicked.haufe.io/blob/master/doc/index.md). There you will also find further information on how to get involved.

We do hope you like what we have to offer and consider having a peek and test drive of [wicked.haufe.io](http://wicked.haufe.io).

Cheers, Martin 

### Links

* [wicked.haufe.io](http://wicked.haufe.io) - The wicked.haufe.io micro site
* [github/wicked.haufe.io](https://github.com/Haufe-Lexware/wicked.haufe.io) - The main GitHub repository for Wicked, containing all the documentation and further links to the other components
* [github/wicked.haufe.io/doc](https://github.com/Haufe-Lexware/wicked.haufe.io/blob/master/doc/index.md) - The documentation index for Wicked.

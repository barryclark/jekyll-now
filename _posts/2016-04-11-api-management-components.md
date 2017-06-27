---
layout: post
title: API Management Components
subtitle: What's inside that API Management box?
category: dev
tags: [general, cloud, api]
author: Martin Danielsson
author_email: martin.danielsson@haufe-lexware.com
header-img: "images/new/Exportiert_50.jpg"
---

### Introduction

API Management is one of the more hyped up buzzwords you can hear all over the place, in conferences, in various blog posts, in the space of internet of things, containers and microservices. It looks at first sight as a brilliant idea, simple and easy, and alas, it is! But unfortunately not as simple as it might look like when you draw up your first architectural diagrams.

### Where do we start?

We're accustomed to architect large scale systems, and we are trying to move into the microservice direction. It's tempting to put in API Management as one of the components used for encapsulating and insulating the microservices, in a fashion like this:

![API Management in front of "something"]( /images/apim-components/apim-as-a-simple-layer.png)

This definitely helps in laying out the deployment architecture of your system(s), but in many cases, it falls too short. When you are accustomed to introducing API Management components into your microservice architecture, and you already have your blueprints in place, this may be enough, but to reach that point, you will need to do some more research on what you actually want to achieve with an API Management Solution (in short: "APIm").

### Common Requirements for an APIm

Another "problem" is that it's easy to just look at the immediate requirements for API Management solutions and compare to various solutions on the market. Obviously, you need to specify your functional requirements first and check whether they match to the solution you have selected; common APIm requirements are for example the following:

* Proxying and securing backend services
* Rate limiting/throttling of API calls
* Consumer identification
* API Analytics
* Self-service API subscriptions
* API Documentation Portals
* Simple mediations (transformations)
* Configurability over API (APIm APIs, so to say)
* Caching

The nature of these requirements are very diverse, and not all of the requirements are usually equally important. Neither is it always the case that all features are equally featured inside all APIm solutions, even if most solutions obviously try to cover them all to some extent. Some do this via an "all inclusive" type of offering, some have a more fine granular approach.

In the next section, I will try to show which types of components usually can be found inside an API Management Solution, and where the interfaces between the different components are to be found.

### A closer look inside the box

If we open up that blue box simply called "API Management", we can find a plethora of sub-components, which may or may not be present and/or more or less feature-packed depending on the actual APIm solution you choose. The following diagram shows the most usual components inside APIm solutions on the market today:

![API Management Components]( /images/apim-components/apim-in-reality.png)

When looking at an API Management Solution, you will find that in most cases, one or more components are missing in one way or the other, or some component is less elaborate than with other solutions. When assessing APIms, checking the different components can help to find whether the APIm actually matches your requirements.

We will look at the following components:

* [API Gateway](#apigateway)
* [API Identity Provider (IdP)](#apiidp)
* [Configuration Database](#configdb)
* [Cache](#cache)
* [Administration UI](#adminui)
* [Developer Portal](#devportal)
* [Portal Identity Provider (IdP)](#portalidp)
* [Logging](#logging)
* [Analytics](#analytics)
* [Audit Log](#audit)

<a name="apigateway"></a>

#### API Gateway

The core of an APIm is quite obviously the API Gateway. It's the component of the APIm solution through which the API traffic is routed, and which is usually ensuring that the backend services are secured. Depending on the architecture of the APIm solution, the API Gateway can be more or less integrated with the Gateway Identity Provider ("API IdP" in the picture), which provides an identity for the consuming client.

APIm solution requirements usually focus on this component, as it's the core functionality. This component is always part of the APIm solution.

<a name="apiidp"></a>

#### API Identity Provider

A less obvious part of the APIm conglomerate is the API Identity Provider. Depending on your use case, you will only want to know which API Consumers are using your APIs via the API Gateway, or you will want to have full feature OAuth support. Most vendors have direct support for API Key authentication (on a machine/application to API gateway basis), but not all have built-in support for OAuth mechanisms, and/or support pluggable OAuth support.

In short: Make sure you know which your requirements are regarding the API Identity Providers *on the API plane*; this is to be treated separately from the *API Portal users*, which may have [their own IdP](#portalidp). 


<a name="configdb"></a>

#### Configuration Database

In most cases, the API Gateway draws its configuration from a configuration database. In some cases, the configuration is completely separated from the API Gateway, in some cases its integrated into the API Gateway (this is especially true for SaaS offerings).

The configuration database may contain the following things:

* API definitions
* Policy rules, e.g. throttling settings, Access Control lists and similar
* API Consumers, if note stored separately in the [API IdP](#apiidp)
* API Portal Users, if not separately stored in an [API Portal IdP](#portalidp)
* API Documentation, if not stored in separate [portal](#devportal) database

The main point to understand regarding the configuration database is that in most cases, the API Gateway and/or its corresponding datastore is a stateful service which carries information which is not only coming from source code (policy definitions, API definitions and such things), but also potentially from users. Updating and deploying API management solutions must take this into account and provide for migration/upgrade processes.

<a name="cache"></a>

#### Cache

When dealing with REST APIs, it is often useful to have a dedicated caching layer. Some (actually most) APIm provide such a component out of the box, while others do not. How caches are incorporated varies between the different solutions, but it ranges from pure `varnish` installations to key-value stores such as redis or similar. Different systems have different approaches to how and what is cached during API calls, and which kinds of calls are cacheable.

It is worth paying attention to which degree of automation is offered, and to which extent you can customize the behaviour of the cache, e.g. depending on the value of headers or `GET` parameters. What you need is obviously highly depending on your requirements. In some situations you will not care about the caching layer being inside the APIm, but for high throughput, this is definitely worth considering, to be able to answer requests as high up in the chain as possible.

<a name="adminui"></a>

#### Administration UI

In order to configure an APIm, many solutions provide an administration UI to configure the API Gateway. In some cases (like with [Mashape Kong](http://www.getkong.org)), there isn't any administration UI, but only an API to configure the API Gateway itself. But usually there is some kind of UI which helps you configuring your Gateway.

The Admin UI can incoroporate many things from other components, such as administering the [API IdP](#apiidp) and [Portal IdP](#portalidp), or viewing [analytics information](#analytics), among other things. 

<a name="devportal">

#### Developer Portal

The Developer Portal is, in addition to the API Gateway, what you usually think about when talking about API Management: The API Developer Portal is the place you as a developer goes to when looking for information on an API. Depending on how elaborate the Portal is, it will let you do things like:

* View API Documentation
* Read up on How-tos or best practices documents
* Self-sign up for use of an API
* Interactively trying out of an API using your own credentials ([Swagger UI](http://swagger.io/swagger-ui/) like)

Not all APIm systems actually provide an API Portal, and for quite some use cases (e.g. Mobile API gateways, pure website APIs), it's not even needed. Some systems, especially SaaS offerings, provide a fully featured Developer Portal out of the box, while some others only have very simple portals, or even none at all.

Depending on your own use case, you may need one or multiple instances of a Developer Portal. It's normal practice that a API Portal is tied to a single API Gateway, even if there are some solutions which allow more flexible deployment layouts. Checking your requirements on this point is important to make sure you get what you expect, as Portal feature sets vary wildly.

<a name="portalidp"></a>

#### Portal Identity Provider

Using an API Developer Portal (see above) usually requires the developer to sign in to the portal using some king of authentication. This is what's behind the term "Portal Identity Provider", as opposed to the IdP which is used for the actual access to the API (the [API IdP](#apiidp)). Depending on your requirements, you will want to enable logging in using

* Your own LDAP/ADFS instance
* Social logins, such as Google, Facebook or Twitter
* Developer logins, such as BitBucket or GitHub.

Most solutions will use those identities to federate to an automatically created identity inside the API Portal; i.e. the API Developer Portal will link their Portal IdP users with a federated identity and let developers use those to log in to the API Portal. Usually, enabling social or developer logins will require you to register your API Portal with the corresponding federated identity provider (such as Google or Github). Adding Client Secrets and Credentials for your API Portal is something you will want to be able to do, depending on your requirements.

<a name="logging"></a>

#### Logging

Another puzzle piece in APIm is the question on how to handle logging, as logs can be emitted by most APIm components separately. Most solutions do not offer an out-of-the-box solution for this (haven't found any APIm with logging functionality at all actually), but most allow for plugging in any kind log aggregation mechanisms, such as [log aggregation with fluentd, elastic search and kibana](/log-aggregation).

Depending on your requirements, you will want to look at how to aggregate logs from the at least following components:

* API Gateway (API Access logs)
* API Portal
* Administration UI (overlaps with [audit logs](#audit))

You will also want to verify that you don't introduce unnecessary latencies when logging, e.g. by using queueing mechanisms close to the log emitting party.

<a name="analytics"></a>

#### The Analytics Tier

The area "Analytics" is also something where the different APIm solutions vary significantly in functionality, when it's present at all. Depending on your requirements, the analytics can be handled when looking at logging, e.g. by leveraging elastic search and kibana, or similar approaches. Most SaaS offerings have pre-built analytics solutions which offer a rich variety of statistics and drill-down possibilites without having to put in any extra effort. Frequent analytics are the following:

* API Usage by API
    * API Calls
    * Bandwith
* API Consumers by Application
* Geo-location of API users (mobile applications)
* Error frequency and error types (4xx, 5xx,...)

<a name="audit"></a>

#### The Audit Log

The Audit Log is a special case of logging, which may or may not be separate from the general logging components. The Audit log stores changes done to the configuration of the APIm solution, e.g.

* API Configuration changes
* Additions and deletions of APIm Consumers (clients)
* Updates of API definitions
* Manually triggered restarts of components
* ...

Some solutions have built-in auditing functionality, e.g. the AWS API Gateway has this type of functionality. The special nature of audit logs is that such logs must be tamper-proof and must never be changeable after the fact. In case of normal logs, they may be subject to cleaning up, which should not (so easily) be the case with audit logs.

### API Management Vendors

{:.center}
![API Management Providers]( /images/apim-components/apim-providers.png){:style="margin:auto"}

Incomplete list of API Management Solution vendors:

* [3scale](https://www.3scale.net)
* [Akana API Management](https://www.akana.com/solution/api-management)
* [Amazon AWS API Gateway](https://aws.amazon.com/api-gateway)
* [API Umbrella](https://apiumbrella.io)
* [Axway API Management](https://www.axway.com/en/enterprise-solutions/api-management)
* [Azure API Management](https://azure.microsoft.com/en-us/services/api-management/)
* [CA API Gateway](http://www.ca.com/us/products/api-management.html)
* [Dreamfactory](https://www.dreamfactory.com)
* [IBM API Connect](http://www-03.ibm.com/software/products/en/api-connect)
* [Mashape Kong](https://getkong.org)
* [TIBCO Mashery](http://www.mashery.com)
* [Tyk.io](https://tyk.io)
* [WSO2 API Management](http://wso2.com/api-management/)

---

<small>
The [background image](/images/bg-post-api.jpg) was taken from [flickr](https://www.flickr.com/photos/rituashrafi/6501999863) and adapted using GIMP. You are free to use the adapted image according the linked [CC BY license](https://creativecommons.org/licenses/by/2.0/).
</small>
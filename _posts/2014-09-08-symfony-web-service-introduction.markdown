---
layout: post
title: "Symfony Web Service: Introduction"
date: September 08, 2014
tagline: "How to build a web service for an iOS app - Part 1"
tags : [symfony, api]
---

![Symfony Love Vagrant](http://miriamtocino.github.io/images/web-service-introduction.svg)

_This article is the first one in a series related to one of the last projects that I have been working on: a **web wervice for an iOS eLearning iPad app**._

The eLearning App is structured in several modules, each of them containing specific content to be studied by the user. At the end of each module there is a test to be completed. The eLearning App must communicate with the Web Service and be able to:

* **SUBMIT** user results after each test is completed and save the data.
* **RETRIEVE** user latest results.

We will go through the different HTTP Methods and Status Codes, which together provide a general framework for operating on resources over the network. In general terms **HTTP methods** are in charge of the communication between systems, while **Status Codes** are the ones coordinating the interactions instigated by the use of those methods.

In this articles series, I will show you how I learnt that building an easy-to-use and consistent Web Service involves something more than building up a few endpoints.

- - -

#### Safety & Idempotency

Before getting into it, it is important to have clear some definitions related to Safety & Idempotency, which will help us to choose from the different HTTP Methods available.

First, each of the HTTP Methods is said to be _safe_ or _unsafe_.

* A methods is considered to be **safe** if it doesn't modify data in the server-side.
* A methods is considered to be **unsafe** if it might modify data in the server-side (it may have consequences).

Second, a method is considered to be **idempotent** if it returns the same result with repeated invocations and has no side effects for which the client is responsible.

_For more information about Safety & Idempotency, you can check out the [Useful Resources](http://miriamtocino.com/articles/symfony-web-service-introduction/#useful-resources) mentioned at the end of this page._

- - -

#### Cross-Origin Resource Sharing

It is also important to mention that there was an extra difficulty added to this project: the Web Service needs to support [Cross-Origin Resource Sharing](http://www.w3.org/TR/cors/) (CORS) requests, which are sent from the different iPads.

CORS support could be a little bit tricky because it requires some additional coordination between both the server and client. We will explain how to build up CORS Requests and Responses once we start building them in the [upcoming articles of this series](http://miriamtocino.com/articles/symfony-web-service-introduction/#upcoming-articles-in-the-symfony-web-service-series), but if you are new to this topic and feel like reading more about it, the tutorial [Using CORS](http://www.html5rocks.com/en/tutorials/cors/) by [Monsur Hossain](https://twitter.com/monsur) was the best I found online. If you want to have a global overview of CORS workflow, you can check out this [image](http://www.html5rocks.com/static/images/cors_server_flowchart.png).

I will be using the [Nelmio CORS Bundle](https://github.com/nelmio/NelmioCorsBundle) for Symfony, which allows you to send Cross-Origin Resource Sharing headers with ACL-style per-url configuration.

_You can check [here](http://caniuse.com/#search=cors) a complete list of the browsers that support CORS._

- - -

#### HTTP Methods

HTTP Methods describe what _action_ you want to take against the resource. Depending who you ask, there are around 10 different HTTP methods, from which 4 of the main ones are:

| Method  | Meaning                                                             | Behavior		           |
|---------|---------------------------------------------------------------------|------------------------|
| **POST**    | Used for **CREATING** resources                                   | Unsafe, non-idempotent |
| **PUT**			| Used for **UPDATING** resources _(or **CREATING** at a given URI)_ | Unsafe, idempotent     |
| **GET**     | Used for **RETRIEVING** a representation of a resource/resources   | Safe, idempotent       |
| **DELETE**  | Used for **DELETING** a resource     															| Unsafe, idempotent     |

We will get more into detail about each of them in the [upcoming articles of this series](http://miriamtocino.com/articles/symfony-web-service-introduction/#upcoming-articles-in-the-symfony-web-service-series).

- - -

#### Status Codes

Status Codes are an important part of every response coming from the server. The whole list of [HTTP Response Status Codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes) is a little bit longer than this one, which summarizes the ones that are more important when talking about Web Services. It also include information about the headers that will be required depending on the status code.

| Code | Method   | Meaning   |
|------|----------|-----------|
| **201** | **POST**       | Resource is **CREATED**   |
| **200** | **PUT**       | Resource is **UPDATED** _(or **CREATED** at a given URI)_|
| **204** | **DELETE**     | Resource is **DELETED**                                       |
| **405** | Method Not Allowed  | API doesn't support an HTTP method for a resource     |

We will get more into detail about each of them in the [upcoming articles of this series](http://miriamtocino.com/articles/symfony-web-service-introduction/#upcoming-articles-in-the-symfony-web-service-series).

- - -

#### Upcoming Articles in the Symfony Web Service Series

I am now working on these two articles coming soon, so stay tuned!

* **Symfony Web Service: Retrieving Data with GET** - Part 2
* **Symfony Web Service: Submitting Data with POST** - Part 3
* **Symfony Web Service: Editing Data with POST** - Part 4

- - -

#### Useful Resources

* [Using CORS - HTML5 ROCKS](http://www.html5rocks.com/en/tutorials/cors/)
* [CORS Server Flow Chart - HTML5 ROCKS](http://www.html5rocks.com/static/images/cors_server_flowchart.png)
* [RESTful APIs in the Real World Episode 1 - Knp University](http://knpuniversity.com/screencast/rest)
* [PHP Web Services: APIs for the Modern Web - Lorna Jane Mitchell](http://www.amazon.com/PHP-Web-Services-APIs-Modern-ebook/dp/B00CH9J8NM/ref=sr_1_1_bnp_1_kin?ie=UTF8&qid=1411020934&sr=8-1&keywords=PHP+Web+Services%3A+APIs+for+the+Modern+Web)



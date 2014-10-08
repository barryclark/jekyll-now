---
layout: post
title: "Symfony Web Service: Editing Data with PUT"
date: September 29, 2014
tagline: "How to build a web service for an iOS app - Part 4"
tags : [symfony, webservice]
---

![Symfony Love Vagrant](http://miriamtocino.github.io/images/web-service-put.svg)

_This article is the first one in a series related to one of the last projects that I have been working on: a **web wervice for an iOS eLearning iPad app**. So far there have been articles on: [Symfony Web Service: Introduction](http://www.miriamtocino.com/articles/symfony-web-service-introduction/), [Symfony Web Service: Retrieving Data with GET]() and [Symfony Web Service: Creating Data with POST]()._

Every time a user completes a test and submits his results, a **log** is sent to the web wervice, including information about the user and the _status_ of the corresponding module coming from the eLearning app. This _status_ could have different values:

* **Value 0**. The user didn't start yet this module.
* **Value 1**. The user started this module but haven't finished it yet (in progress).
* **Value 2**. The user completed this module.

> In this article I will show you how we did it to submit the user's logs using POST.

- - -

_NOTE: The project database stores data coming from different iOS apps. That's why the URIs in this article need to include information about the application we are refering to. If your web service is used just for one application, it won't be necessary that you specify this field in your URIs._

- - -

_NOTE: The following recommendations come from the [Internet Engineering Task Force (IETF) and the Internet Society](http://en.wikipedia.org/wiki/Internet_Engineering_Task_Force), the principal technical development and standards-setting bodies for the Internet._

- - -

#### Building-up the Request

- - -

#### Building-up: Response sent from the server to the client

1. Response Fields

* First, let's talk about the **status code**. As we will be updating a new resource, we should return a 200 status code, as we already explained in [a previous article](http://www.miriamtocino.com/articles/symfony-web-service-introduction/).

* The **Location** header is not necessary anymore. We only need this header with the 201 status code when a resource is created. And it makes sense: when we create a new resource, we don't know what its new URI is. But when we're editing an existing resource, we clearly already have that URI, because we're using it to make the edit.

A great thing to do after creating a new resource is to send back the new resource in the response body. This time we chose JSON to do that.

| Response Fields | Value                                 |
|-----------------|---------------------------------------|
| Status Code     | 200 UPDATED                           |
| Content-Type    | application/json                      |
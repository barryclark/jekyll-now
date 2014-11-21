---
layout: post
title: "Symfony Web Service Introduction"
date: September 15, 2014
tagline: "Symfony Web Service Part 1"
tags : [symfony, webservice]
---

![Symfony Love Vagrant](http://miriamtocino.github.io/images/web-service-introduction.svg)

This article is the first one in a series related to one of the last projects that I have been working on: a small **web service for an iOS eLearning app**. The corresponding eLearning app is structured in several modules, each of them containing specific content to be studied by the users. At the end of each module there is a test to be completed.

#### Writing the web service contract

First of all, let's look into the web service contract, which specifies what operations the service supports. The contract of a CRUD service like this one is straightforward and very compact. This table provide a quick overview of the HTTP verbs used, the different URIs, what they are used for and the action's consequences:

| Verb | URI or template       | Use                       | Behavior                |
|-----------|-----------------------|---------------------------|----------------------------------|
| **POST**  | /webservice/{app_id}/{username}/logs      | Create a new log, and upon success, receive a **Location** header specifying the new log's URI. | Unsafe, non-idempotent |
| **GET**   | /webservice/{app_id}/{username}/logs      | Request the current state of logs for a user specified by the URI. | Safe, idempotent       |
| **PUT**   | /webservice/{app_id}/{username}/logs/{log_id} | Update a log at the given URI with new information, providing the full representation. | Unsafe, idempotent     |
| **DELETE** | /webservice/{app_id}/{username}/logs | Remove the list of logs of a given user identified by the given URI. | Unsafe, idempotent     |

Using this contract, we can provide a protocol to allow consumers (in this case the different iOS apps) to create, read, update and delete logs.

It is also important to mention, that in this project I chose **JSON** as the format for my resource representations, though you could have used any reasonable format, such as XML or YAML.

#### About safety and idempotency

Before getting deeper into the project, it is important to have clear some definitions related to safety and idempotency, which help us by choosing from the different HTTP verbs available.

First, each of the HTTP verbs is said to be _safe_ or _unsafe_.

* A methods is considered to be **safe** if it doesn't modify data in the server-side.
* A methods is considered to be **unsafe** if it might modify data in the server-side (it may have consequences).

Second, a method is considered to be **idempotent** if it returns the same result with repeated invocations and has no side effects for which the client is responsible.

Check the table above to find out the behavior of the different HTTP verbs.



#### Other articles in this series

You can continue reading about this topic in the following articles of this series and check out how I did it to build a web service with Symfony:

* **Symfony Web Service 2: Retrieving Data with GET**
* **Symfony Web Service 3: Creating Data with POST**



#### Useful Resources

* [RESTful APIs in the Real World Episode 1 - Knp University](http://knpuniversity.com/screencast/rest)
* [PHP Web Services: APIs for the Modern Web - Lorna Jane Mitchell](http://www.amazon.com/PHP-Web-Services-APIs-Modern-ebook/dp/B00CH9J8NM/ref=sr_1_1_bnp_1_kin?ie=UTF8&qid=1411020934&sr=8-1&keywords=PHP+Web+Services%3A+APIs+for+the+Modern+Web)
* [REST in Practice: Hypermedia and Systems Architecture - Jim Webber, Savas Parastatidis, Ian Robinson](http://www.amazon.com/REST-Practice-Hypermedia-Systems-Architecture-ebook/dp/B0046RERXY/ref=sr_1_1_bnp_1_kin?ie=UTF8&qid=1410429279&sr=8-1&keywords=rest+in+practice)



---
layout: post
title: "Symfony Web Service: Retrieving Results with GET"
date: September 15, 2014
tagline: "How to write a web service for an iOS app - Part 2"
tags : [symfony, api]
---

![Symfony Love Vagrant](http://miriamtocino.github.io/images/web-service-get.svg)

One of the last projects that I have been working on, is a small web service for an **iOS eLearning App**. The app contains several chapters with some content. At the end of each chapter there is a test to be completed by the user.

The app must communicate with a **Remote Web Service**, dealing with the following scenarios:

1. **SUBMIT** user results after each test and **SAVE** the data.
2. **RETRIEVE** user latest results, just in case a user lose his iPad.

> In this article we will use **HTTP Methods** and **Status Codes**, which together provide a general framework for operating on resources over the network. HTTP methods are used for communication between systems, while the status codes coordinate the interactions instigated by the use of those methods.

- - -

#### Safety and Idempotency

Before getting into HTTP Methods and Status Codes, we need to talk a bit about Safety and Idempotency. Regarding **Safety**, it is important to be aware of the following difference:

* A methods is considered to be **safe** if it doesn't modify data.
* A methods is considered to be **unsafe** if it might modify data.

A method is considered to be **idempotent** if it returns the same result with repeated invocations and has no side effects for which the consumer is responsible.

- - -

#### Using CORS

There is an extra difficulty added to this project: the Web Service needs to support [Cross-Origin Resource Sharing](http://www.w3.org/TR/cors/) (CORS) requests coming from the different iPads. In the first place some requests might need to modify existent data and other requests might want just to retrieve some data.

CORS support requires coordination between both the server and client. How can the client make cross-origin requests? How can the server (web service) configure itself to support CORS?

_You can see a complete list of the browsers that support CORS [here](http://caniuse.com/#search=cors)._

- - -

#### Building-up Requests: HTTP Methods

Depending who you ask, there are around 10 different HTTP methods, from which 4 of the main ones are:

| Method  | Meaning                                                             | Behavior		           |
|---------|---------------------------------------------------------------------|------------------------|
| POST    | Used for **CREATING** resources.                                    | Unsafe, non-idempotent |
| PUT			| Used for **UPDATING** resources _[or **CREATING** at a given URI.]_ | Unsafe, idempotent     |
| GET     | Used for **RETRIEVING** a representation of a resource/resources.   | Safe, idempotent       |
| DELETE  | Used for **DELETING** a resource.     															| Unsafe, idempotent     |

Based on this information I will be using **PUT** for submitting tests results to the web service and **GET** for retrieving them.

- - -

#### Web Service Strategy: Submitting Tests Results

OK. That was a little bit of theory, so after that... which type of method should I be using for the scenario of submitting test results? In this case we will be building an endpoint that will modify data, which means it should be using a POST or PUT method. Deciding between POST and PUT is not such a difficult thing: just use PUT if and only if the endpoint will follow these two rules:

1. The endpoint must be **idempotent**, so it is safe to re-do the request over and over again.
2. The URI must be the **address to the resource** being updated.

Our present scenario satisfies both of the conditions, so we should be using PUT.

This HTTP request would actually look something like this:

{% highlight bash %}
PUT /put/{app_id}/{username} HTTP/1.1
Host: xkcd.com
Accept: text/html
User-Agent: Mozilla/5.0 (Macintosh)
HTTP Method: PUT
ContentType: JSON
{% endhighlight %}



- - -

#### Web Service Strategy: Retrieving Tests Results



{% highlight bash %}
HTTP Method: GET
ContentType: JSON
URI: /get/{app_id}/{username}
{% endhighlight %}

When used properly, a GET Request is both:

* **SAFE**, generating no server-side effects for which the client can be held responsible.
* **IDEMPOTENT**, meaning that it generates absolute side effects.

- - -

#### Building-up Responses: Status Codes

| **Code** | **Related Method**      | **Meaning**                                                 |
|-----------------|---------------------|-----------------------------------------------------------|
| 201             | POST, Created       | Resource is created                                       |
| 200             | PUT, Updated        | Resource is updated _[or created at a given specific URI]_|
| 204             | DELETE, Deleted     | Resource is deleted                                       |
| 405             | Method Not Allowed  | The API doesn't support an HTTP method for a resource     |

- - -

#### Useful Resources

* [CORS Server Flow Chart - HTML5 ROCKS](http://www.html5rocks.com/static/images/cors_server_flowchart.png)
* [RESTful APIs in the Real World Episode 1 - Knp University](http://knpuniversity.com/screencast/rest)
* [Using CORS - HTML5 ROCKS](http://www.html5rocks.com/en/tutorials/cors/)


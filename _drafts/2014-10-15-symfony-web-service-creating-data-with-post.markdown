---
layout: post
title: "Symfony Web Service: Creating Data with POST"
date: October 15, 2014
tagline: "How to build a web service for an iOS app - Part 3"
tags : [symfony, webservice]
---

![Symfony Love Vagrant](http://miriamtocino.github.io/images/web-service-post.svg)

_This article is part of a series related to one of the last projects that I have been working on: a **web wervice for an iOS eLearning iPad app**. So far there have been articles on: [Symfony Web Service: Introduction](http://www.miriamtocino.com/articles/symfony-web-service-introduction/) and [Symfony Web Service: Retrieving Data with GET](http://www.miriamtocino.com/articles/symfony-web-service-retrieving-data-with-get/)._

As I already explained in the previous article, every time a user completes a test and submits his results, a **log** is sent to the web service, including information about the user and the _status_ of the corresponding module coming from the eLearning app.

This article shows how I did it to **submit and create the user's logs** using POST.

- - -

_NOTE: The project database stores data coming from different iOS apps. That's why the URIs in this article need to include information about the application we are refering to. If your web service is used just for one application, it won't be necessary that you specify this field in your URIs._

- - -

_NOTE: The following recommendations come from the [Internet Engineering Task Force (IETF) and the Internet Society](http://en.wikipedia.org/wiki/Internet_Engineering_Task_Force), the principal technical development and standards-setting bodies for the Internet._

- - -

#### Building-up the Request

We will start by building-up the request, which is sent from the client to the server. As we are creating a new resource (in this case a new **log**), we will choose **POST** as the HTTP method. The POST request looks similar to the GET request shown in the [previous article](http://www.miriamtocino.com/articles/symfony-web-service-retrieving-data-with-get/), but with some additional fields.

We will be sending the user data in the request body. We should always specify the format in which this data is sent (Content-Type). In this case we will be choosing **JSON-formatted** data.

Find below a complete list of the fields that need to be included in the request:

| Request Fields     | Value                                                   |
|--------------------|---------------------------------------------------------|
| **HTTP Method**    | POST                                                    |
| **URI**            | /webservice/{app_id}/logs                               |
| **Content-Type**   | application/json                                        |
| **Request Body**   | _Representation_ of a user resource including his logs  |

The POST request for this case will end up looking something like this:

{% highlight bash %}
POST /webservice/{application}/logs HTTP/1.1
Host: elearning-dashboard.dev
Content-Type: application/json

{
	"username": "wonderful-test-user",
  "logs": [
      { "logged_at": "2014-01-01 00:00:00",
        "status": "1",
        "module_name": "wonderful-module",
        "module_id": 1
      }
  ]
}
{% endhighlight %}

- - -

#### Building-up the response

Once the request is ready, we will focus on building up the response, which is sent from the server to the client. Evertime we are creating a new resource, the correct status code is **201**. I talked about the different status codes and when to use them in [a previous article](http://www.miriamtocino.com/articles/symfony-web-service-introduction/).

It is also recommended that everytime we use the 201 status code, a **Location** header pointing to the new resource should be added to the response. This can be quite useful if the client needs that information. We will be saving him one request to the webservice. We will be sending the data in the response body as JSON-formatted data.

Find below a list of the fields that need to be included in the response:

| Response Fields | Value                                 |
|-----------------|---------------------------------------|
| Status Code     | 201 CREATED                           |
| Location        | /webservice/{app_id}/logs/{username}  |
| Content-Type    | application/json                      |


{% highlight bash %}
HTTP/1.1 201 Created
Content-Type: application/json; charset=UTF-8
Location: /webservice/wonderful-application/logs/wonderful-user
{% endhighlight %}

2. Creating the routings (URIs)

#### Building-up: Server Endpoint

So let's build the endpoint with the URL **/webservice/{app_id}/users**. First, we will be adding the new route to our routing file:

{% highlight bash linenos %}
# src/eLearningDashboard/WebserviceBundle/Resources/config/routing/webservice.yml
webservice_post:
    pattern: /webservice/{app_id}/users
    defaults: { _controller: WebserviceBundle:Webservice:new }
    methods: [POST]
{% endhighlight %}

> We are making a POST request to create a new **log**. **/webservice/{app_id}/logs** is a collection
resource and according to [these HTTP rules](), when you want to create a resource, you should send a POST request to its collection.

_I discovered how to work with [Guzzle](http://guzzle3.readthedocs.org/) in [this tutorial](http://knpuniversity.com/screencast/rest) and fell in love with it. A simple library for making HTTP requests and receiving responses, really cool for testing purposes._

To include Guzzle in your Symfony project go to the terminal and run:

{% highlight bash %}
$ composer require guzzle/guzzle ~3.7
{% endhighlight %}

It is time to start working on the controller and start working on the **newAction**!

- - -

#####Handling Errors

{% highlight php startinline linenos %}
// src/eLearningDashboard/WebserviceBundle/Controller/WebserviceController.php
// ...

public function newAction(Request $request, $app_id)
{
  // Store Request Data
  $data = json_decode($request->getContent(), true);
  $username = $data['username'];
  $logs = $data['logs'];

  // Find Application & User
  $em = $this->getDoctrine()->getManager();
  $application = $em->getRepository('ApplicationBundle:Application')->findOneBy(array('id' => $app_id));
  $user = $em->getRepository('UserBundle:User')->findOneBy(array('username' => $username));

  // Creating Logs
  foreach($logs as $log) {
      // Find Module
      $module = $em->getRepository('ApplicationBundle:Module')->findOneBy(array('id' => $log['module_id']));

      if ($module->getApplication() == $application) {
          $new_log = new Log();
          $new_log->setUser($user);
          $new_log->setLoggedAt(new \DateTime($log['logged_at']));
          $new_log->setTstmp(new \DateTime());
          $new_log->setModule($module);
          $new_log->setStatus($log['status']);
          $em->persist($new_log);
          $em->flush();
      }
  }

  // Building-up Response
  $response = new Response('It worked. Believe me - I\'m an webservice', 201);
  $response->headers->set('Location', '/some/user/url');
  return $response;
}
{% endhighlight %}



- - -

#### Useful Resources

* [RFC 2616 - Status Code Definitions](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)








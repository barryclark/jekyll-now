---
layout: post
title: "Symfony Web Service: Creating Data with POST"
date: October 23, 2014
tagline: "How to build a web service for an iOS app - Part 3"
tags : [symfony, webservice]
---

![Symfony Love Vagrant](http://miriamtocino.github.io/images/web-service-post.svg)

This article is part of a series related to one of the last projects that I have been working on: a **web wervice for an iOS eLearning iPad app**. So far there have been articles on: [Symfony Web Service: Introduction](http://www.miriamtocino.com/articles/symfony-web-service-introduction/) and [Symfony Web Service: Retrieving Data with GET](http://www.miriamtocino.com/articles/symfony-web-service-retrieving-data-with-get/).

As I already explained in the previous article, every time a user completes a test and submits his results, a **log** is sent to the web service, including information about the user and the _status_ of the corresponding module coming from the eLearning app.

This article shows how I did it to **submit and create the user's logs** using POST.

- - -

NOTE: The project database stores data coming from different iOS apps. That's why the URIs in this article need to include information about the application we are refering to. If your web service is used just for one application, it won't be necessary that you specify this field in your URIs.

- - -

NOTE: The following recommendations come from the [Internet Engineering Task Force (IETF) and the Internet Society](http://en.wikipedia.org/wiki/Internet_Engineering_Task_Force), the principal technical development and standards-setting bodies for the Internet.

- - -

#### Building-up the Request

We will start by building-up the request, which is sent from the client to the server. As we are creating a new resource (in this case a new **log**), we will choose **POST** as the HTTP method. The POST request looks similar to the GET request shown in the [previous article](http://www.miriamtocino.com/articles/symfony-web-service-retrieving-data-with-get/), but with some additional fields.

According to some HTTP rules, when you want to create a resource (in this case we will create a new **log**), you should send a POST request to its collection, which in this case turns out to be located under the URL **/webservice/{app_id}/logs**.

Additionally we will need to send the user data in the request body. We should always specify the format in which this data is sent (Content-Type). In this case we will be choosing **JSON-formatted** data.

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

Once the request is ready, we will focus on building up the response, which is sent from the server to the client. Everytime we are creating a new resource, the correct status code is **201**. I talked about the different status codes and when to use them in [a previous article](http://www.miriamtocino.com/articles/symfony-web-service-introduction/).

It is recommended that everytime we use the 201 status code, we should add a **Location** header pointing to the new resource in the response. This can be quite useful if the client needs that information, because we will be saving him one request to the webservice. We will be sending the data in the response body as JSON-formatted data.

Find below a list of the fields that need to be included in the response:

| Response Fields    | Value                                 |
|--------------------|---------------------------------------|
| Status Code        | 201 CREATED                           |
| Location           | /webservice/{app_id}/logs/{username}  |
| Content-Type       | application/json                      |
| **Response Body**  | _Representation_ of a user resource including his logs  |

{% highlight bash %}
HTTP/1.1 201 Created
Content-Type: application/json; charset=UTF-8
Location: /webservice/1/logs

{
  username: "wonderful-user",
  logs: [
    { logged_at: "2014-01-01 00:00:00",
      status: "1",
      module_name: "wonderful-module",
      module_id: 1
    },
    ...
  ]
}
{% endhighlight %}

- - -

#### Building-up: Server Endpoint

Finally it is time to start working on the controller and focus on the **newAction**!

So let's build the endpoint with the URL **/webservice/{app_id}/logs**. First, we will be adding the new route to our routing file and redirect the URL to the newAction located in our controller:

{% highlight bash linenos %}
# src/eLearningDashboard/WebserviceBundle/Resources/config/routing/webservice.yml
webservice_post:
    pattern: /webservice/{app_id}/logs
    defaults: { _controller: WebserviceBundle:Webservice:new }
    methods: [POST]
{% endhighlight %}

The server endpoint to create a new log for a specific user will end up looking like this:

{% highlight php startinline linenos %}
// src/eLearningDashboard/WebserviceBundle/Controller/WebserviceController.php
// ...

public function newAction(Request $request, $app_id)
{
    $em = $this->getDoctrine()->getManager();
    $log = new Log();

    $this->handleRequest($request, $log);
    $em->persist($log);
    $em->flush();

    $data = $this->serializeLog($log);
    $response = new JsonResponse($data, 201);

    $url = $this->generateUrl('webservice_get', array('app_id' => $app_id, 'username' => $log->getUser()->getUsername()));
    $response->headers->set('Location', $url);

    return $response;
}

private function serializeLog(Log $log)
{
    return array(
        'logged_at' => $log->getLoggedAt()->format('Y-m-d H:i:s'),
        'tstmp' => $log->getTstmp()->format('Y-m-d H:i:s'),
        'status' => $log->getStatus(),
        'module_name' => $log->module->getName(),
        'module_id' => $log->module->getId()
    );
}

private function handleRequest(Request $request, $log)
{
    $data = json_decode($request->getContent(), true);

    if ($data === null) {
        $error_message = 'Invalid request body format';
        return $this->handleResponseErrors('bad_request_error', '400 Bad Request', $error_message, '400');
    }

    $em = $this->getDoctrine()->getManager();
    $user = $em->getRepository('UserBundle:User')->findOneBy(array('username' => $data['username']));
    $module = $em->getRepository('ApplicationBundle:Module')->findOneBy(array('id' => $data['logs'][0]['module_id']));

    $log->setUser($user);
    $log->setLoggedAt(new \DateTime($data['logs'][0]['logged_at']));
    $log->setTstmp(new \DateTime());
    $log->setModule($module);
    $log->setStatus($data['logs'][0]['status']);
}

private function handleResponseErrors($error_type, $error_title, $error_message, $error_code)
{
    $data = array(
        'type' => $error_type,
        'title' => $error_title,
        'errors' => $error_message
    );
    $response = new JsonResponse($data, $error_code);
    $response->headers->set('Content-Type', 'application/problem+json');
    return $response;
}
{% endhighlight %}

- - -

I discovered how to work with [Guzzle](http://guzzle3.readthedocs.org/) in [this tutorial](http://knpuniversity.com/screencast/rest) and fell in love with it. A simple library for making HTTP requests and receiving responses, very useful for quick testing purposes.

To include Guzzle in your Symfony project go to the terminal and run:

{% highlight bash %}
$ composer require guzzle/guzzle ~3.7
{% endhighlight %}

- - -

#### Useful Resources

* [RFC 2616 - Status Code Definitions](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
* [API Problem](https://tools.ietf.org/html/draft-nottingham-http-problem-07)
* [RESTful APIs in the Real World Episode 1 - Knp University](http://knpuniversity.com/screencast/rest)








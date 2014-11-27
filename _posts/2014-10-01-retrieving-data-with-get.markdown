---
layout: post
title: "Retrieving Data with GET"
date: October 1, 2014
tagline: "Symfony Web Service Part 2"
tags : [symfony, webservice]
---

![Retrieving Data with GET](http://miriamtocino.github.io/images/posts/web-service-get.svg)

_This article is part of a series about how to build a **web wervice for an iOS eLearning iPad app**. So far there have been articles on [Introduction Symfony Web Service](http://www.miriamtocino.com/articles/symfony-web-service-introduction/) and [Creating Data with POST](http://www.miriamtocino.com/articles/creating-data-with-post/)._

- - -

_**NOTE**: The project database stores data coming from different iOS apps. That's why the URIs in this article need to include information about the application we are refering to. If your web service is used just for one application, it won't be necessary that you specify this field in your URIs._

- - -

_**NOTE**: The following recommendations come from the [Internet Engineering Task Force (IETF) and the Internet Society](http://en.wikipedia.org/wiki/Internet_Engineering_Task_Force), the principal technical development and standards-setting bodies for the Internet._



#### Introduction

Every time a user completes a test and submits his results, a **log** is sent to the web service, including information about the user and the **status** of the corresponding module coming from the eLearning app.

This article shows how I did it to **retrieve the list of an user's logs** for a specific application.



#### Building up the request

I will start by building-up the request, which is sent from the client to the server. As I am retrieving a resource collection (user's logs), I will choose **GET** as the HTTP method. I will also need to specify the address or URI to that collection.

Let's summarize all the fields to be included in the GET request:

| Request Fields     | Value                                     |
|--------------------|-------------------------------------------|
| HTTP Method    | GET                                       |
| URI            | /webservice/{app_id}/logs/{username}      |

The GET request for this case will end up looking something like this:

{% highlight bash %}
GET /webservice/{app_id}/logs/test-user HTTP/1.1
Host: elearning-dashboard.dev
Accept: application/json, text/html
{% endhighlight %}



#### Building up the response

Once the request is ready, I will focus on building up the response, which is sent from the server to the client. Generally the correct status code for all GET requests is 200.

Let's summarize all the fields to be included in the response:

| Request Fields     | Values                                                  |
|--------------------|---------------------------------------------------------|
| Status Code    | 200 OK                                                  |
| Content-Type   | application/json, application/problem+json              |
| Response Body  | _Representation_ of a user resource including his logs  |

The response will end up looking something like this:

{% highlight bash %}
HTTP/1.1 200 OK
Content-Type: application/json; charset=UTF-8

{
  username: "test-user",
  logs: [
    { logged_at: "2014-01-01 00:00:00",
      status: "1",
      module_name: "test-module",
      module_id: 1
    },
    ...
  ]
}
{% endhighlight %}

Please note that the body content is the same as in the response using POST in the [next article](http://www.miriamtocino.com/articles/creating-data-with-post/). However the status code will be different in each case.



#### Building up the server endpoint

The last thing I will be doing is to build up the server endpoint. For that, I will be adding first the new route to the routing file and redirect the URL to the **listAction** located in the controller:

{% highlight bash %}
# src/eLearningDashboard/WebserviceBundle/Resources/config/routing/webservice.yml
webservice_get:
    pattern:  /webservice/{app_id}/logs/{username}
    defaults: { _controller: WebserviceBundle:Webservice:list }
    methods: [GET]
{% endhighlight %}

The server endpoint to get the list of the user's logs will end up looking like this:

{% highlight php startinline %}
// src/eLearningDashboard/WebserviceBundle/Controller/WebserviceController.php
// ...

public function listAction($app_id, $username)
{
    $em = $this->getDoctrine()->getManager();

    // Handling possible errors

    $application = $em->getRepository('ApplicationBundle:Application')
        ->findOneBy(array('id' => $app_id));

    if (!$application) {
        $error_message = 'Application not found';
        return $this->handleResponseErrors(
            'not_found_error',
            '404 Not Found',
            $error_message,
            '404'
        );
    }

    $modules = $em->getRepository('ApplicationBundle:Module')
        ->findBy(array('application' => $application->getId()));

    if (!$modules) {
        $error_message = 'No modules found for this application';
        return $this->handleResponseErrors(
            'not_found_error',
            '404 Not Found',
            $error_message,
            '404'
        );
    }

    $user = $em->getRepository('UserBundle:User')
        ->findOneBy(array('username' => $username));

    if (!$user) {
        $error_message = 'Username not found';
        return $this->handleResponseErrors(
            'not_found_error',
            '404 Not Found',
            $error_message,
            '404'
        );
    }

    // Retrieving logs from DB

    $logs = array();
    foreach ($modules as $module) {
        $log = $em->getRepository('UserBundle:Log')
            ->findOneBy(array(
                    'user' => $user->getId(),
                    'module' => $module->getId()),
                array(
                    'tstmp' => 'DESC'
                )
            );
        if ($log) {
            $logs[] = $log;
        }
    }

    // Building-up the response

    $data = array(
        'username' => $username,
        'logs' => array()
    );

    foreach ($logs as $log) {
        $data['logs'][] = $this->serializeLog($log);
    }

    $response = new JsonResponse($data, 200);
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
{% endhighlight %}



#### Handling errors

If something went wrong in the server side, the response will look a little bit different. It can be that the application, the module or the user sent in the request is not found in our database (404 Not Found). I will still be sending some JSON-formatted data in the response body, but its Content-Type will be partialy different.

By sending back a Content-Type header of **application/problem+json** we will be telling the client that something went wrong in the server side. This is called the **media type** of the document and you can find all the official recognized types in the [Internet Assigned Numbers Authority](http://www.iana.org/assignments/media-types/media-types.xhtml) (IANA). Actually the **application/problem+json** isn't in this list because it's just a draft at the moment of writing this article.

Let's summarize all the fields to be included in the response paying attention to the information included in the body:

| Request Fields     | Values                                                  |
|--------------------|---------------------------------------------------------|
| Status Code    | 404 Not Found                                           |
| Content-Type   | application/problem+json                                |
| Response Body  | Error information: type, title and error message.       |

I built a specific function in the controller to handle errors, which builds up the response with its corresponding headers:

{% highlight php startinline %}
// src/eLearningDashboard/WebserviceBundle/Controller/WebserviceController.php
// ...

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

_**NOTE**: At the moment of writing this article, there's no standard for how error responses should look like. In this case I included these fields: **type, title, and errors**. This is part of a potential standard called **API Problem**, or **Problem Details**. You can check the corresponding RFC document [here](https://tools.ietf.org/html/draft-nottingham-http-problem-07). It is important to know that this document may change in the future or be discarded entirely for something different._


#### Useful resources

* [API Problem](https://tools.ietf.org/html/draft-nottingham-http-problem-07)
* [RFC 2616 - Status Code Definitions](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
* [RESTful APIs in the Real World Episode 1 - Knp University](http://knpuniversity.com/screencast/rest)
---
layout: post
title: "Creating Data with POST"
date: October 15, 2014
tagline: "Symfony Web Service Part 3"
tags : [symfony, webservice]
---

![Creating Data with POST](http://miriamtocino.github.io/images/posts/web-service-post.svg)

_This article is part of a series about how to build a **web wervice for an iOS eLearning iPad app**. So far there have been articles on [Symfony Web Service: Introduction](http://www.miriamtocino.com/articles/symfony-web-service-introduction/) and [Retrieving Data with GET](http://www.miriamtocino.com/articles/retrieving-data-with-get/)._

- - -

_**NOTE**: The project database stores data coming from different iOS apps. That's why the URIs in this article need to include information about the application we are refering to. If your web service is used just for one application, it won't be necessary that you specify this field in your URIs._

- - -

_**NOTE**: The following recommendations come from the [Internet Engineering Task Force (IETF) and the Internet Society](http://en.wikipedia.org/wiki/Internet_Engineering_Task_Force), the principal technical development and standards-setting bodies for the Internet._



#### Introduction

As I already explained in my [previous article](http://www.miriamtocino.com/articles/retrieving-data-with-get/), every time a user completes a test and submits his results, a **log** is sent to the web service, including information about the user and the **status** of the corresponding module coming from the eLearning app.

This article shows how I did it to **submit and create the user's logs**.



#### Building-up the request

I will start by building-up the request, which is sent from the client to the server. As I am creating a new resource (in this case a new **log**), I will choose **POST** as the HTTP method. The POST request looks similar to the GET request shown in my [previous article](http://www.miriamtocino.com/articles/symfony-web-service-retrieving-data-with-get/), but with some additional fields.

According to some HTTP rules, when you want to create a resource (in this special case a new **log**), you should send a POST request to its collection, which in this case turns out to be located under the URI **/webservice/{app_id}/logs**.

Additionally the user data needs to be sent in the request body. We should always specify the format in which this data is sent (in this case I will be choosing **JSON-formatted** data).

Let's summarize all the fields to be included in the POST request:

| Request Fields     | Value                                                   |
|--------------------|---------------------------------------------------------|
| HTTP Method    | POST                                                    |
| URI            | /webservice/{app_id}/logs                               |
| Content-Type   | application/json                                        |
| Request Body   | _Representation_ of a user resource including his logs  |

The POST request for this case will end up looking something like this:

{% highlight bash %}
POST /webservice/{app_id}/logs HTTP/1.1
Host: elearning-dashboard.dev
Content-Type: application/json

{
  "username": "test-user",
  "logs": [
      {
        "logged_at": "2014-01-01 00:00:00",
        "status": "1",
        "module_name": "test-module",
        "module_id": 1
      }
  ]
}
{% endhighlight %}



#### Building-up the response

Once the request is ready, I will focus on building up the response, which is sent from the server to the client. Everytime that a new resource is created, the correct status code is 201. It is recommended that everytime the 201 status code is used, a **Location** header pointing to the new resource should be included in the response. This can be quite useful if the client needs that information. We will be saving him one request to the webservice by sending the data in the response body (this time as **JSON-formatted data**).

Let's summarize all the fields to be included in the response:

| Response Fields    | Value                                 |
|--------------------|---------------------------------------|
| Status Code        | 201 CREATED                           |
| Location           | /webservice/{app_id}/logs/{username}  |
| Content-Type       | application/json                      |
| Response Body      | _Representation_ of a user resource including his logs  |

The response will end up looking something like this:

{% highlight bash %}
HTTP/1.1 201 Created
Content-Type: application/json; charset=UTF-8
Location: /webservice/{app_id}/logs

{
  username: "test-user",
  logs: [
    {
      logged_at: "2014-01-01 00:00:00",
      status: "1",
      module_name: "test-module",
      module_id: 1
    },
    ...
  ]
}
{% endhighlight %}

Please note that the body content is the same as in the response using POST in the [previous article](http://www.miriamtocino.com/articles/retrieving-data-with-get/). However the status code will be different in each case.



#### Building-up the server endpoint

Finally it is time to start working on the controller and focus on the **newAction**!

So let's build the endpoint with the URL **/webservice/{app_id}/logs**. First, I will be adding the new route to the routing file and redirect the URL to the **newAction** located in the controller:

{% highlight bash %}
# src/eLearningDashboard/WebserviceBundle/Resources/config/routing/webservice.yml
webservice_post:
    pattern: /webservice/{app_id}/logs
    defaults: { _controller: WebserviceBundle:Webservice:new }
    methods: [POST]
{% endhighlight %}

When building the server endpoint first I started by handling possible errors, secondly handling the request and saving the log in the database and lastly building-up the corresponding response. It ended up looking like this:

{% highlight php startinline %}
// src/eLearningDashboard/WebserviceBundle/Controller/WebserviceController.php
// ...

public function newAction(Request $request, $app_id)
{
    $em = $this->getDoctrine()->getManager();
    $data = json_decode($request->getContent(), true);

    // Handling possible errors

    if ($data === null) {
        $error_message = 'Invalid request body format';
        return $this->handleResponseErrors(
            'bad_request_error',
            '400 Bad Request',
            $error_message,
            '400'
        );
    }

    $app = $em->getRepository('ApplicationBundle:Application')
        ->findOneBy(array('id' => $app_id));
    if (!$app) {
        $error_message = 'Application not found';
        return $this->handleResponseErrors(
            'not_found_error',
            '404 Not Found',
            $error_message,
            '404'
        );
    }

    $user = $em->getRepository('UserBundle:User')
        ->findOneBy(array('username' => $data['username']));
    if (!$user) {
        $error_message = 'User not found';
        return $this->handleResponseErrors(
            'not_found_error',
            '404 Not Found',
            $error_message,
            '404'
        );
    }

    $module = $em->getRepository('ApplicationBundle:Module')
        ->findOneBy(array('id' => $data['logs'][0]['module_id']));
    if (!$module) {
        $error_message = 'Module not found';
        return $this->handleResponseErrors(
            'not_found_error',
            '404 Not Found',
            $error_message,
            '404'
        );
    }

    // Saving log in DB

    $log = new Log();
    $log->setUser($user);
    $log->setLoggedAt(new \DateTime($data['logs'][0]['logged_at']));
    $log->setTstmp(new \DateTime());
    $log->setModule($module);
    $log->setStatus($data['logs'][0]['status']);

    $em->persist($log);
    $em->flush();

    // Building-up Response

    $data = $this->serializeLog($log);

    $response = new JsonResponse($data, 201);
    $url_show = $this->generateUrl(
        'webservice_get',
        array(
            'app_id' => $app_id,
            'username' => $log->getUser()->getUsername()),
        UrlGeneratorInterface::ABSOLUTE_URL
    );
    $response->headers->set('Location', $url_show);
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

If something went wrong in the server side, the response will look a little bit different. It can be that the data was not sent in proper JSON (400 Bad Request) or even that the application, the module or the user sent in the request is not found in our database (404 Not Found). In this case I will still be sending some JSON-formatted data in the response body, but its Content-Type will be partialy different.

By sending back a Content-Type header of **application/problem+json** we will be telling the client that something went wrong in the server side. This is called the **media type** of the document and you can find all the official recognized types in the [Internet Assigned Numbers Authority](http://www.iana.org/assignments/media-types/media-types.xhtml) (IANA). Actually the **application/problem+json** isn't in this list because it's just a draft at the moment of writing this article.

Let's summarize all the fields to be included in the response paying attention to the information included in the body:

| Request Fields     | Values                                                  |
|--------------------|---------------------------------------------------------|
| Status Code    | 400 Bad Request, 404 Not Found                          |
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








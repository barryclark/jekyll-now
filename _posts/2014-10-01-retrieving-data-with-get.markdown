---
layout: post
title: "Retrieving Data with GET"
date: October 1, 2014
tagline: "Symfony Web Service Part 2"
tags : [symfony, webservice]
---

![Symfony Love Vagrant](http://miriamtocino.github.io/images/posts/web-service-get.svg)

_This article is part of a series about how to build a **web wervice for an iOS eLearning iPad app**. So far there have been articles on [Introduction Symfony Web Service](http://www.miriamtocino.com/articles/symfony-web-service-introduction/)._

- - -

_**NOTE**: The project database stores data coming from different iOS apps. That's why the URIs in this article need to include information about the application we are refering to. If your web service is used just for one application, it won't be necessary that you specify this field in your URIs._

- - -

_**NOTE**: The following recommendations come from the [Internet Engineering Task Force (IETF) and the Internet Society](http://en.wikipedia.org/wiki/Internet_Engineering_Task_Force), the principal technical development and standards-setting bodies for the Internet._



#### Introduction

Every time a user completes a test and submits his results, a **log** is sent to the web service, including information about the user and the _status_ of the corresponding module coming from the eLearning app.

This article shows how I did it to **retrieve a list of user's logs** for a specific application using GET.



#### Building up the request

We will start by building-up the request, which is sent from the client to the server. As we are retrieving a resource collection (user's logs), we will choose **GET** as the HTTP method. We will also need to specify the address or URI to that collection.

Find below a list of the fields that need to be included in the request:

| Request Fields     | Value                                     |
|--------------------|-------------------------------------------|
| **HTTP Method**    | GET                                       |
| **URI**            | /webservice/{app_id}/logs/{username}      |

The GET request for this case will end up looking something like this:

{% highlight bash %}
GET /webservice/1/logs/wonderful-user HTTP/1.1
Host: elearning-dashboard.dev
Accept: application/json, text/html
{% endhighlight %}



#### Building up the response

Once the request is ready, we will focus on building up the response, which is sent from the server to the client. Generally the correct status code for all GET requests is 200.

Find below a list of the fields that need to be included in the response:

| Request Fields     | Values                                                  |
|--------------------|---------------------------------------------------------|
| **Status Code**    | 200 OK                                                  |
| **Content-Type**   | application/json, application/problem+json              |
| **Response Body**  | _Representation_ of a user resource including his logs  |

If everything went OK, the response will end up looking something like this:

{% highlight bash %}
# Response sent from the server to the client
HTTP/1.1 200 OK
Content-Type: application/json

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



#### Building up the server endpoint

The last thing we will be doing is to build up the server endpoint. For that, we will be adding first the new route to our routing file:

{% highlight bash %}
# src/Main/WebserviceBundle/Resources/config/routing/webservice.yml
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

    $application = $em->getRepository('ApplicationBundle:Application')
        ->findOneBy(array('app_id' => $app_id));

    if (!$application) {
        $error_message = 'Application not found';
        return $this->handleResponseErrors('not_found_error', '404 Not Found', $error_message, '404');
    } else {
        $modules = $em->getRepository('ApplicationBundle:Module')
            ->findBy(array('application' => $application->getId()));

        if (!$modules) {
            $error_message = 'No modules found for this application';
            return $this->handleResponseErrors('not_found_error', '404 Not Found', $error_message, '404');

        } else {
            $user = $em->getRepository('UserBundle:User')
                ->findOneBy(array('username' => $username));

            if (!$user) {
                $error_message = 'Username not found';
                return $this->handleResponseErrors('not_found_error', '404 Not Found', $error_message, '404');
            } else {
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

                $data = array('username' => $username, 'logs' => array());
                foreach ($logs as $log) {
                    $data['logs'][] = $this->serializeLog($log);
                }

                $response = new JsonResponse($data, 200);
                return $response;
            }
        }
    }
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



#### Handling Errors with application/problem+json

If something went wrong in the server side, the response will look a little bit different. It can be that the application, the module or the user sent in the request is not found in our database. In that case the status code that we send back should be **404** (Not Found). We will still be sending some JSON-formatted data in the response body, but its Content-Type will be partialy different.

By sending back a Content-Type header of **application/problem+json** we will be telling the client that something went wrong in the server side. This is called the **media type** of the document and you can find all the official recognized types in the [Internet Assigned Numbers Authority](http://www.iana.org/assignments/media-types/media-types.xhtml) (IANA). Actually the **application/problem+json** isn't in this list because it's just a draft at the moment of writing this article.

Find below a list of the fields that need to be included in the 404 Not Found response:

| Request Fields     | Values                                                  |
|--------------------|---------------------------------------------------------|
| **Status Code**    | 404 Not Found                                           |
| **Content-Type**   | application/problem+json                                |
| **Response Body**  | Error information: type, title and error message.       |

I built a specific function in the controller to handle errors, which build up the response with its corresponding headers:

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


#### Useful Resources

* [RFC 2616 - Status Code Definitions](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
* [API Problem](https://tools.ietf.org/html/draft-nottingham-http-problem-07)
* [RESTful APIs in the Real World Episode 1 - Knp University](http://knpuniversity.com/screencast/rest)
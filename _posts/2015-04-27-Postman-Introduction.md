---
layout: post
categories: [postman, api, web]
title: Postman API Client Introduction
author: emir_osmanoski
comments: true
---

So, It's been a while since I've written anything here. There are many reasons
as to why, including a new job and some other personal engagements. But either
way I want to start writing stuff again! It's fun in its own way currently as
a thing to do in my free time.

So this first restarting post is going to be about a little tool I've used a
lot recently for some personal projects, which people might be familiar with,
but I found it useful enough to share it and maybe someone will also fall in
love with it as well.

POSTMAN

Recently I've had the chance to work on very small projects that were build
around  REST-ful services in the .NET stack. This means a WEB API managing the
data and a "rich"-er client  for the UI and the consummation of said data.

I've also read today about some of the changes coming in ASP.NET MVC 6 and the
first impression I got was that it's going to be built around a similar
approach. The webroot folder to host static files (html,css,js) I feel pushes
the development model to hosting endpoints for the data and a front end built
with an MV* framework on the client (ex. Angular). This combined with the out
of the  box support for client side dependency management and build tooling,
makes the case for WEB API driven development even stronger.

This in turns makes the little tool I'm going to present that much cooler.

## POSTMAN ##

Postman is a Chrome extension that is just perfect for testing any endpoints
that return data in either JSON/XML/Other format. Its a REST client and its
amazing for testing, in my case in particular, endpoints built with ASP.NET
Web API.

Here I'm going to cover just some of the basic features of POSTMAN. It offers
some extensive  functionality in a paid version (for which there is a trial)
which I haven't tested yet.

As an example I'm going to take the recently released NASA APIs to show some
of POSTMANS functionality.

## Overview of the UI ##

The Postman UI is relatively simple. Its split into two main sections. The
side panel where we can see  the History and Collections Tabs which we will
cover a bit later on and the more central Request panel where the actual HTTP
requests are configured and sent to the endpoints that return the data. The
central panel like it was mentioned allows us to configure the request headers
and  inspect the response.

[Image] Postman UI Image ( no  request - history tab active)

The central panel contains several tabs for different predefined
authentication methods, which I will try and cover in a subsequent post and
focus here only on making Normal Request types.

So lets get to it.

## Making a simple request ##

As a starting point we are going to make a GET request to the "Astronomy Picture
of the Day (APOD)" API for retrieving the current information about the image
displayed on the APOD website. For anyone interested in APOD can take a look
here!

The main URL for a given request is entered in the request URL field [1]. If
the URL, then contains or should contain any URL parameters they are parsed
and displayed and easily configured via the URL parameter configuration
utility [1] which is toggled via the URL params button.

As it can be seen the request we are making contains a single URL parameter,
the api_key. This is actually configured via the environment option [3] in
POSTMAN (covered a bit later on).

POSTMAN, of course, allows different types of requests and we will look into
the options for those (POST) requests in one of the following blog posts or
sections.

[Image] Request panel with the basic configuration and highlighted sections
[1],2],3]

Once the URL is entered and the request parameters configured we can Send the
request. The results are shown once the request completes in the lower section
of the request panel. As seen we can inspect the response body returned and
the response headers and cookies set if any. Postman also provide an overview
of the HTTP Status code and the time it took to finish the request.  Note that
the tests feature is in the paid/trial version and I'm yet to test it out so I
won't be touching upon that at the moment.

[Image] Request/Response section with returned data Response Body.

[Image] Request/Response section with returned data Headers.

As it can be seen there are different ways to look at the response body. In
the above example image we can see that the pretty JSON formating has been
enabled. You can of course play around with the options on your own and there
are probably usage scenarios where you would want to see the raw response
(copy/paste to different processors).

Each different request made is recorded in the history panel to the left, and
can be accessed and resent from there. Requests are differentiated by the
parameters. So sending the same request multiple times won't create multiple
rows in the history tab

## Sending additonal URL params ##

For example if we send some additional parameters to the same URL we would see
another  row in the history panel. The parameters can be added via the URL
params configuration panel

[Image] concept_tags date params and another row in history.

#Collections#

Now, where POSTMAN really shines is the Collections functionality accessed via
the Collections Tab. Using the collections approach you can predefine
requests, save them, and then reload them and initiate them. This is very
useful when testing a specific API. It allows you to quickly switch between
API methods.

# Enviorments #

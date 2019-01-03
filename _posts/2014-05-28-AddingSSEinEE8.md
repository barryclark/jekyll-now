---
layout: post
title: Adding SSE support in Java EE 8
excerpt: We are thinking about adding SSE support in Java EE 8 but the question is...
---

<p align="center">
<img alt="JHTML 5 logo" src="https://delabassee.com/images/blog/html5_logo_128.png"/>
</p>

SSE ([Server-Sent Event](http://chimera.labs.oreilly.com/books/1230000000545/ch16.html)) is a standard mechanism used to push, over HTTP, server notifications to clients.  SSE is often compared to WebSocket as they are both supported in HTML 5 and they both provide the server a way to push information to their clients but they are different too! See [here](http://stackoverflow.com/questions/5195452/websockets-vs-server-sent-events-eventsource/5326159#5326159) for some of the pros and cons of using one or the other.

For REST application, SSE can be quite complementary as it offers an effective solution for a one-way publish-subscribe model, i.e. a REST client can 'subscribe' and get SSE based notifications from a REST endpoint. As a matter of fact, Jersey (JAX-RS Reference Implementation) already support SSE since quite some time (see the [Jersey documentation](https://jersey.java.net/documentation/latest/sse.html) for more details).

There might also be some cases where one might want to use SSE directly from the Servlet API as sending SSE notifications using the Servlet API is relatively straight forward.

We are thinking about adding SSE support in Java EE 8 but the question is where as there are several options, in the platform, where SSE could potentially be supported:

* the Servlet API

* the WebSocket API

* JAX-RS

* or even having a dedicated SSE API, and thus a dedicated JSR too!

Santiago Pericas-Geertsen (JAX-RS Co-Spec Lead) conducted an initial investigation around that question. So at this stage JAX-RS seems to be a good choice to support SSE in Java EE. This will obviously be discussed in the respective JCP Expert Groups but what is your opinion on this question?

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/adding-sse-support-in-java-ee-8) blog.*

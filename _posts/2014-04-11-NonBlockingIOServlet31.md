---
layout: post
title: Non-blocking I/Os in Servlet 3.1
excerpt: With the rise of the Event-driven programming paradigm, asynchronous non-blocking I/Os are becoming more and more important...
---


With the advent of platforms and frameworks such as Node.js, Vert.x, ... and more generally the rise of the Event-driven programming paradigm, asynchronous non-blocking I/Os are becoming more and more important in today's web applications.

Prior to Servlet 3.0, Servlet were synchronous. Servlet 3.0 (part of Java EE 6) added support for asynchronous request processing but only with ‘traditional’ I/Os (i.e. blocking I/Os) but this approach can sometime limit the scalability of an application.

The support for non-blocking I/Os has been added for Asynchronous Servlet in Servlet 3.1 ([JSR 340](https://jcp.org/en/jsr/detail?id=340) - part of Java EE 7). The net result is that the number of connections that can simultaneously be handled by the Servlet Container is greatly increased. This
improves the resources utilization and the overall Web Container scalability.

It should be mentioned that other features haven added to the Servlet 3.1 such as support for the [HTTP 1.1 Upgrade Mechanism](http://en.wikipedia.org/wiki/HTTP/1.1_Upgrade_header). This new capability is used, for example, by the WebSocket API ([JSR 356](https://jcp.org/en/jsr/detail?id=356)) to upgrade an existing HTTP connection to a TCP based WebSocket connection. In Servlet 3.1, the HTTP Upgrade Mechanism can also use non-blocking I/Os.


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/non-blocking-ios-in-servlet-31) blog.*

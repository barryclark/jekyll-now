---
layout: post
title: JSR 359 - SIP Servlet 2.0
excerpt: The reach of the Java EE is not necessarily limited to 'traditional' Enterprise apps...
---

The reach of the Java EE Platform is not necessarily limited to '_traditional_' Enterprise applications. A good illustration of that is the SIP Servlet technology, which brings together the SIP programming model and the Java EE platform. [SIP (Session Initiation Protocol)](http://en.wikipedia.org/wiki/Session_Initiation_Protocol) is a network signaling protocol, used in the Telecommunication space, for creating and terminating sessions (e.g. VOIP sessions) with different participant(s). 

A SIP Servlet is to SIP what a (traditional) Servlet is to HTTP, a server-side component managed by a container. A component developed using a Java API that interacts with clients by responding to incoming requests and returning corresponding responses. The SIP Servlet API (_javax.servlet.sip_) builds on the generic servlet API (_javax.servlet_) in much the same way as the HTTP Servlet API (_javax.servlet.http_) does. Given that, it is relatively easy to learn how to write SIP-based applications. A Converged Application is a (Telco oriented) application that spans multiple protocols (e.g. SIP, HTTP) and interfaces, such as Web, telephony, and other Java EE interfaces. A SIP container enables the development of applications that use SIP, HTTP Servlet API, and other Java EE APIs and components like JPA, JAX-RS, and messaging.  To learn more about this, you might want to read the [SIP Servlet Tutorial](http://docs.oracle.com/cd/E19355-01/820-3007/index.html).

And like any major Java APIs, the SIP Servlet API is defined through the JCP. The SIP Servlet specification has recently been updated, see [JSR 359](https://jcp.org/en/jsr/detail?id=359).

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/jsr-359%3A-sip-servlet-20) blog.*

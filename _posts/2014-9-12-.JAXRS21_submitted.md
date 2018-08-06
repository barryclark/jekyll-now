---
layout: post
title: Java API for RESTful Web Services 2.1
excerpt: A proposal for JAX-RS 2.1 has been recently submitted...
---

A proposal for JAX-RS 2.1 has been recently submitted to the JCP, this news was a bit overshadowed by the Java EE 8 Platform submission announcement but it is also important. It is important as JAX-RS is a significant technology of the the Java EE Platform but JAX-RS is also very relevant outside of the platform. It is not uncommon to see more specific RESTful based applications built upon a standalone JAX-RS implementation. And with the Client API introduced in JAX-RS 2.0, JAX-RS is also getting more and more relevant in the client space.

[JAX-RS 2.1 (JSR 370)](https://jcp.org/en/jsr/detail?id=370) has now entered the JSR Review Ballot for a 2 weeks period (ends on September 22). The proposed scope of JAX-RS 2.1 currently includes :

* Adding support for Server-Sent Events

* Improving integration with CDI

* Exploring support for non-blocking I/O in providers (filters, interceptors, etc.)

* Evaluating ways in which declarative security can be supported

* Providing integration with JSON-B

* Making JAXB conditional on runtimes where it is available

* Building upon the hypermedia API introduced in version 2.0

* Investigating the reactive programming paradigm as a way to improve the JAX-RS asynchronous client API

* Evaluating any requirements necessary to support the use of JAX-RS resource classes as controllers in the MVC 1.0 JSR

Even tough JAX-RS 2.1 will be a 'minor' release; its current scope is quite large in terms of added features!


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/jsr-370%3A-java-api-for-restful-web-services-21) blog.*

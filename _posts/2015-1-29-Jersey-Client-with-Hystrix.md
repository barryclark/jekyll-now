---
layout: post
title: Using Jersey Client with Netflix Hystrix
excerpt: Your infrastructure has to be designed with service failure (and degradation) in mind because...
---

There are lot of discussions about Microservice architecture. Lot of them are focused mostly on the benefits of Microservices; sometime some of the drawbacks are overlooked. I am not going to start another discussion on this but one thing is clear: as soon as you have multiple services, you should expect that some of them will fail at some point. Failure is almost inevitable!

Your infrastructure has to be designed with service failure (and degradation) in mind because you don't want all your services to be unavailable just because one of the underlying service is down (or just very slow). Your application needs to be able to isolate any potential failure and offers, at any time, some sort of graceful degradation. The overall idea is to introduce intelligence at the end point level to cope with such issue. You need a circuit breaker to avoid cascading failure. 

Netflix [Hystrix](https://github.com/Netflix/Hystrix) is one of the popular solutions for introducing those circuit breaking capabilities. Hystrix is a latency and fault tolerance library designed to isolate points of access to remote services. In case of failure, Hystrix can stop cascading failure and enable resilience in distributed systems. Libor Kramolis from the Jersey Team has just published an [article](http://yatel.kramolis.cz/2015/01/reactive-jersey-client-rxjava-hystrix.html) explaining how to use the new Jersey Client Reactive API with Netflix Hystrix (and RxJava Observable).

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/using-jersey-client-with-netflix-hystrix) blog.*

---
layout: post
title: Software Architecture Day Timisoara on May 18th, 2016
subtitle: Architecture Strategies for Modern Web Applications
category: dev
tags: [conference, api, microservice]
author: Doru Mihai
author_email: doru.mihai@haufe-lexware.com
header-img: "images/new/Exportiert_18.jpg"
---

This year, me and a couple of my colleagues from Timisoara attended again the Software Architecture Day conference, a yearly event that in the last years has brought big names as speakers.

Last year, [Neal Ford](http://nealford.com/abstracts.html) was the speaker and he introduced us to concepts relating to continuous delivery and microservices, some of which we have already applied within our company.

This year, it was [Stefan Tilkov's](https://www.innoq.com/blog/st/) turn to grace us with his presence.

{:.center}
![Software Architecture Day 2016]({{ site.url }}/images/software-arch-day/doru_badge.jpg){:style="margin:auto"}

The title of this year's talk was pretty ambiguous, *Architecture strategies for modern web applications*. Still, the organizers sent us a list of topics that would be discussed within this whole-day event and they are as follows: modularization, REST & Web APIs, single page apps vs. ROCA, pros and cons of different persistence options, scaling in various dimensions.

## Start

{:.center}
![Software Architecture Day 2016]({{ site.url }}/images/software-arch-day/stefan_tilkov.jpg){:style="margin:auto"}

The presentation kicked off with a rant about how different enterprises have struggled over the years to provide frameworks and tools that would abstract away the complexities of the web.

He illustrated as an example, the Java EE stack, enumerating the different layers one would have in an enterprise built application, with the example use case of receiving a JSON payload and sending another one out. Or course the point of all of this was to show what a ridiculous amount of effort has been put into abstracting away the web.

It is at this point that he expressed his hatred for Java and .Net because of all the problems that were created by trying to simplify things.

## Backend

After the initial rant, the purpose of which was to convince us that it is better to work with a technology that sticks closer to what is really there all along (a request, a header, cookie, session etc.), he continued with a talk about the different choices one may have when dealing with the backend. Below are my notes:

- Process vs Thread model for scaling
  - .Net I/O Completion Ports
- Request/Response vs Component based frameworks
- Async I/O
  - Twisted (Python)
  - Event Machine (Ruby)
  - Netty
  - NodeJS
- [Consistent hashing](http://michaelnielsen.org/blog/consistent-hashing/) - for cache server scaling
- Eventual consistency
  - The CAP theorem
  - Known issues with prolific tools. Referenced [Aphyr](https://aphyr.com/posts/317-jepsen-elasticsearch) as a source of examples of failures of such systems.
- NoSQL scaling
  - N/R/W mechanisms
  - BASE vs ACID dbs

## REST
This was the same presentation that I had seen on [infoq](https://www.infoq.com/presentations/rest-misconceptions) some time ago.

He basically rants about how many people think or say they are doing Rest when actually they are not. Or how many people spend a lot of time discussing how the URL should be formed when that actually has nothing to do with Rest.

One thing in particular was interesting for me, when he was asked about rest api documentation tools he didn't have a preference for one in particular but he did mention explicitly that he is against Swagger, for the sole reason that Swagger doesn't allow hypermedia in your api definition.

After the talk I asked him about validation, since he mentioned Postel's Law. In the days of WS-* we would use XML as the format and we would do XSD validation, (he commented that xsd validation is costly and in the large scale projects, he would skip it) but now that we mainly use JSON as the format, and [JSON Schema](http://json-schema.org/documentation.html) is still in a Draft stage. Sadly he didn't have a solution for me :)

## Frontend

Towards the end of the day he talked to us about what topics you should be concerned with when thinking about the frontend.

Amongst them, noteworthy were the talks about CSS Architecture, and how it is beginning to be more and more important. To the extent that within his company he has a CSS Architect, and he raised the awareness that when adopting a framework for the frontend, you must be aware that there were decisions taken within that framework, that you are basically inheriting. And that framework's architecture becomes your architecture.

For CSS he mentioned the following CSS methodologies:
 - BEM
 - OOCSS
 - SMACSS
 - Atomic-CSS
 - Solid CSS

After presenting solutions for different aspects that one may need to consider for the frontend he proceeded to discuss about Single Page Applications and what are the drawbacks of that approach and presented [Resource Oriented Client Architecture](http://roca-style.org/).

## Modularization

The last part of the day was dedicated to modularization, and here he proposed a methodology that is close to Microservices, can be used in tandem with microservices, but is slightly different.

He called them [Self Contained Systems](http://scs-architecture.org/vs-ms.html) and you can read all about them following the link (it will explain things better than I can :) ).

## Conclusion

It was a lot of content to take in, and due to the fact that he presented content from several whole-day workshops he has in his portfolio, none of the topics were presented into too much depth. If you want to get an idea of what was presented feel free to watch the presentations below.

- [Web development Techniques](https://www.infoq.com/presentations/web-development-techniques)
- [Rest Misconceptions](https://www.infoq.com/presentations/rest-misconceptions)
- [Breaking the Monolith](https://www.infoq.com/presentations/Breaking-the-Monolith)
- [NodeJS Async I/O](https://www.infoq.com/presentations/Nodejs-Asynchronous-IO-for-Fun-and-Profit)

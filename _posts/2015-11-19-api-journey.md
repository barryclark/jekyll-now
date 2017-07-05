---
layout: post
title: The beginnings of our API Journey
subtitle: Intro to our API Style Guide
category: dev
tags: [api, development]
author: Holger Reinhardt
author_email: holger.reinhardt@haufe-lexware.com 
header-img: "images/new/Exportiert_43.jpg"
---

Before joining [HaufeDev](http://twitter.com/HaufeDev) I was fortunate to work in the [API Academy](http://apiacademy.co) consultancy with some of the smartest guys in the API field. So it was quite predictable that I would advocate for APIs as one of the cornerstones in our technology strategy.
 
Fast forward a few months and we open sourced the initial release of our [API style guide](http://haufe-lexware.github.io/resources/). It is a comprehensive collection across a wide range of API design resources and best practices. Credit for compiling this incredible resource has to go to our very own [Rainer Zehnle](https://github.com/Kodrafo) who probably cursed me a hundred times over for having to use Markdown to write it.

But this was just the starting point. In parallel we started with formalized API Design Reviews to create the necessary awareness in the development teams. After a couple of those reviews we are now revising and extending our guide to reflect the lessons we have learnt.

The design reviews in turn triggered discussions on the various tradeoffs when designing APIs. One of the most compelling discussion was about [the right use of schema to enable evolvable interfaces](https://github.com/Haufe-Lexware/api-style-guide/blob/master/message-schema.md). In that section we discuss how [Postels Law](https://en.wikipedia.org/wiki/Robustness_principle) (or Robustness Principle) can guide us towards robust and evolvable interfaces, but how our default approach to message schemas can result instead in tightly coupled and brittle interfaces. 

Another new section was triggered by our Service Platform teams asking for [feedback on the error response of our Login API](https://github.com/Haufe-Lexware/api-style-guide/blob/master/error-handling.md#error-response-format). 

While we are not claiming that our API design guidance and best practices are fool proof, having this document gives us an incredible leg up on having the right kind of conversations with engineering. And step by step we will be improving it. 

This is also one of the reasons why we open sourced our API guide from the start - we have gained so much knowledge from the community that we hope we can give something back. We would love to hear your feedback or get pull requests if you are willing to contribute. This is the genius of Github - making it a journey and a conversation with the larger engineering community out there, and not just a point release. :)


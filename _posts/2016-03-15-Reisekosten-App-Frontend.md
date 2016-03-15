---
layout: post
title: Extending On-Premise Products With Mobile Apps - Follow-up
subtitle: Creating a Single Page App using Apache Cordova and AngularJS
category: general
tags: [mobile, cloud]
author: Biro Carol
author_email: carol.biro@haufe-lexware.com
header-img: "images/bg-post.jpg"
---

### What is this about?

This is a follow-up blog-post about a proof-of-concept project I have worked on together with my colleague Robert Fitch to find out what it takes to access on-premise data from an internet client. Robert have created the server side API and my role was to create a mobile app which consumes the methods exposed by this API. The technologies used in order to create the app was HTML5, AngularJS, Bootstrap css and Apache Cordova.

### Why Apache Cordova?

Apache Cordova targets multiple platforms with one code base, it is open source and for the apps you can use html, css and javascript. There are many pros and cons using this stack of technology but in this case we needed to address the app to a wide range of users with as little effort as possible. That is why we didn't use a pure native approach and we have targeted Android and iOS devices as potential consumers.

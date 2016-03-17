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

This is a follow-up blog-post about a proof-of-concept project I have worked on together with my colleague Robert Fitch to find out what it takes to access on-premise data from an internet client. Robert have created the server side API and my role was to create a mobile app which consumes the methods exposed by this API. The technologies used in order to create the app were HTML5, AngularJS, Bootstrap css and Apache Cordova.

### Why Apache Cordova?

Apache Cordova targets multiple platforms with one code base, it is open source and for the apps you can use html, css and javascript. There are many pros and cons using this stack of technology but in this case we needed to address the app to a wide range of users with as little effort as possible. That is why we didn't use a pure native approach and for the proof of concept app we have targeted Android and iOS devices as potential consumers.

### What else do we need?
Apache Cordova is offering a good way to organize your project. It assured OS specific customizations and the OS specific mobile app builds. These being set up once are for good or very little modified during the lifetime of the project. For the effective development we have used AngularJS and Bootstrap.css.

Maybe it is interesting to know that when I have started to work on this project I had no experience with the above mentioned technologies: neither Apache Cordova , nor AngularJS or Bootstrap.css. I am a pretty experienced web developer who have worked before mainly on jquery based projects. Starting to learn about AngularJS I have discovered a new way of thinking about web development, that is how to develop a web application avoiding to use jquery , use two way bindings etc.

Beside frontend development I mainly do my daily job using Microsoft technologies like C#. I do this using Visual Studio as IDE. That is why a good choice to set up this project was to use Visual Studio Tools for Apache Cordova. By the time I have started to work on the project the Update 2 of these tools were available, now after a couple of months Update 7 can be downloaded with a lot of improvements.

{:.center}
![Reisekosten App Fronten - Visual Studio Tools for Apache Cordova]( /images/reisekosten-app/visualstudioupdate7.jpg){:style="margin:auto"}

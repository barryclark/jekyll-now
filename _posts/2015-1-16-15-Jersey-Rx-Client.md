---
layout: post
title: Reactive Jersey Client
excerpt: One of the common problems of synchronous applications is...
---

One of the common problems of synchronous applications is that they are not using resources in an efficient manner. In a synchronous application, it often happens, for example, that threads are blocked waiting for something to happen.  That is clearly not efficient!  On the other hand, asynchronous applications allows to better utilize those threads but this often comes at a price as it is not that easy to write (complex) asynchronous applications.  Writing asynchronous applications involve having to deal with nested callbacks, the famous "callback hell".  And if the level of nested callbacks is too deep, it can also be very tricky to properly handle errors within the application, etc.

Reactive programming is a popular paradigm used to develop more easily asynchronous applications; it is based around data flows and changes propagations.  This Reactive approach also leads to be more maintainable too as the code is easier to write and understand.

Michal Gajdos of the Jersey Team has just written a series of posts introducing the 'Reactive Jersey Client API', a new generic API allowing end users to utilize the popular reactive programming model when using Jersey Client. 

* [Part 1 – Motivation](http://blog.dejavu.sk/2015/01/07/reactive-jersey-client-part-1-motivation/)
* [Part 2 – Usage and Supported Libraries](http://blog.dejavu.sk/2015/01/07/reactive-jersey-client-part-2-usage-and-supported-reactive-libraries/)
* [Part 3 – Customization](http://blog.dejavu.sk/2015/01/07/reactive-jersey-client-part-3-customization/)


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/reactive-jersey-client) blog.*

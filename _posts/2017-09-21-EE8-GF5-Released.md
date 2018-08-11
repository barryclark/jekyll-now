---
layout: post
title: Java EE 8 and GlassFish 5.0 Released!
excerpt: We are pleased to announce the general availability of GF 5.0, the Java EE 8 RI...
---

We are pleased to announce the general availability of GlassFish 5.0, the Java EE 8 Open Source Reference Implementation and that the Java EE 8 umbrella specification and all the underlying specifications (JAX-RS 2.1, Servlet 4.0, CDI 2.0, JSON-B 1.0, Bean Validation 2.0, etc.) are finalized and approved!

<p align="center">
<img alt="Java EE 8" src="https://delabassee.com/images/blog/EE8-gfx-420.jpg">
</p>

Java EE 8 adds some nice capabilities to the platform:
* Servlet 4.0 API with HTTP/2 support
* Enhanced JSON support including a new JSON binding API
* A new REST Reactive Client API
* Asynchronous CDI Events
* A new portable Security API
* Server-Sent Events support (Client & Server-side)
* Support for Java SE 8 capabilities (e.g. Date & Time API, Streams API, annotations enhancements), etc.

Today, you can use these new features using GlassFish 5.0 and hopefully with additional Java EE 8 application servers in the near future. Below you will find some resources that might help you to get started with Java EE 8. 

One of the challenges we faced in this release is that we moved from the old Java.net infrastructure to GitHub in the middle of the development cycle.  It wasn’t necessarily simple but we now clearly see the benefits of such a modern collaborative software development platform! Exploring the code is now just [one link away](http://github.com/javaee/)! We hope the GitHub adoption will make the platform more accessible to developers.

Java EE 8 is really the result of a teamwork involving many people: 

All the JCP Specification Leads and all the Expert Groups members
All the people involved in developing the different Reference Implementations that comprise Java EE
The different Java EE implementers
The Java EE community at large
And many others who most of the time works behind the scene like the team at Oracle who develops GlassFish itself and the team managing the build infrastructure!
Kudos to all of you! Java EE 8 wouldn’t have been possible without your work and dedication!

As you probably know, this is just the beginning as we are working, together with the community including the Eclipse Foundation, Red Hat and IBM to open Java EE even more by transferring its development under the auspices of the Eclipse Foundation (see [here](http://delabassee.com/Opening-up-Java-EE/) and [here](http://delabassee.com/Opening-up-Java-EE-update/)). There are many discussions going on and we hope to be able to [share additional details at JavaOne](https://events.rainfocus.com/catalog/oracle/oow17/catalogjavaone17?search=CON8030&showEnrolled=false).

Today also marks the general availability of Java SE 9. As mentioned above GlassFish 5.0 leverages new features in Java SE 8, and is certified today on Java SE 8. Even though we have a lot of work in front of us with the transition to the Eclipse Foundation, our current intent is to certify Java SE 9 in an upcoming GlassFish 5 release.  We will keep you posted on future developments in this area.

*David on behalf of all the Oracle Java EE Team.*

Resources:
* [Press Release](https://www.oracle.com/corporate/pressrelease/java-se-9-and-ee-8-092117.html)
* [GlassFish 5.0 downloads](https://javaee.github.io/glassfish/download)
* [GlassFish 5.0 documentation](https://javaee.github.io/glassfish/documentation)
* [Java EE 8 SDK downloads](http://www.oracle.com/technetwork/java/javaee/downloads/index.html)
* [Java EE 8 tutorial](https://javaee.github.io/tutorial/)
* [Java EE at a Glance](http://www.oracle.com/technetwork/java/javaee/overview/index.html)

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/java-ee-8-is-final-and-glassfish-50-is-released) blog.*

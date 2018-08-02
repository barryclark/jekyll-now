---
layout: post
title: GlassFish 4.1.1 is now available!
---

GlassFish 4.1.1 has just been released and despite the minor version increase, 4.1.1 is certainly not an insignificant update!

<p align="center">
<img alt="GlassFish logo" src="http://delabassee.com/images/blog/gf_logo.png">
</p>

During the course of last year; we have seen specifications updates for JAX-RS ([JSR 339](https://jcp.org/aboutJava/communityprocess/mrel/jsr339/index.html)), JMS ([JSR 343](https://jcp.org/aboutJava/communityprocess/mrel/jsr343/index.html)), CDI ([JSR 346](https://jcp.org/aboutJava/communityprocess/mrel/jsr346/index.html)) and WebSocket ([JSR 356](https://jcp.org/aboutJava/communityprocess/mrel/jsr356/index.html)). Those different Maintenance Releases are now integrated in GlassFish 4.1.1. During that period, the umbrella Java EE 7 specification ([JSR 342](https://jcp.org/aboutJava/communityprocess/mrel/jsr342/index.htm)) also went through the Maintenance Release process but that revision was just about specification clarifications; so the Java EE 7 MR had technically no impact on the Reference Implementation, on GlassFish.

In this 4.1.1 release, most the underlying GlassFish components have been updated. The list below contains some of the updated components.

* Jersey 2.21 (JAX-RS 2.0.1 aka JAX-RS 2.0 rev A) 
* Weld 2.2.13.Final (CDI 1.2)
* MQ 5.1.1-b02 (JMS 2.0.1)  
* Tyrus 1.11 (WebSocket 1.1 )
* Mojarra 2.2.12
* EclipseLink 2.6.1-RC1
* Grizzly 2.3.23
* HK2 2.4.0-b31
* JBatch Runtime 1.0.1-b09
* JSON-P RI 1.0.4, etc.


Finally, it should also be mentioned that and in addition to various bug fixes, GlassFish 4.1.1 also includes several security related fixes.

You can download GlassFish 4.1.1 [here](https://glassfish.java.net/download.html) and grab the source code [here](https://java.net/projects/glassfish/sources/svn/show/trunk/main).

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/glassfish-411-is-now-available)* blog.

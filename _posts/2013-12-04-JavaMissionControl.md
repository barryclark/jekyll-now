---
layout: post
title: Java Mission Control with Marcus and Markus
excerpt: Java Mission Control is a JVM production time profiling and diagnostics suite of tools...
---

> You can observe a lot by just watching.
>
> -- <cite>[Yogi Berra](http://en.wikipedia.org/wiki/Yogi_Berra)</cite>


[Java Mission Control](http://www.oracle.com/technetwork/java/javaseproducts/mission-control/index.html) (JMC) is a JVM production time profiling and diagnostics suite of tools. The suite includes tools to observe, manage, profile, and eliminate memory leaks in Java applications and due to its very low overhead, JMC is particularly fitted to detect performance issues in applications running in production. 	
JMC is based on runtime performance analyzing capabilities that were originally only available in JRockit. It is the fruit of the work Oracle has done over the last years to convergence its 2 JVMs (HotSpot and JRockit) into a single one. Starting with the 7u40 release, JMC is available in the regular HotSpot distribution. It is a commercial feature that can be used freely in development as per the standard Oracle Binary Code License (BCL).

[Marcus Hirt](https://twitter.com/@hirt) of the Java Mission Control team wrote an [introduction on Java Mission Control](https://blogs.oracle.com/java/entry/java_mission_control_production_time). [Markus Eisele](https://twitter.com/@hirt) wrote another post showing how to quickly [configure JMC and JFR with GlassFish 4](http://blog.eisele.net/2013/09/java-mission-control-52-is-finally-here.html).


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/java-mission-control-with-marcus-and-markus) blog.*

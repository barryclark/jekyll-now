---
layout: post
title:  "Be Aware of Your (Container) Surroundings"
excerpt: "I was invited to write a piece for the '97 Things Every Java Programmer Should Know' O'Reilly book. So here's my small contribution…"
---

<i>I was invited to write a piece for the '97 Things Every Java Programmer Should Know' O'Reilly book. So here's my small contribution…<i/>

<br/>
<p align="center">
	<a href="https://learning.oreilly.com/library/view/97-things-every/9781491952689/">
		<img alt="book cover" src="/images/97things-cover.jpg" style="box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5);"/>
	</a>
</p>
<br/>

There is a danger to containerizing legacy Java applications as-is, with their legacy JVM, as the ergonomics of those older JVMs will be fooled when running inside Docker containers.

Containers have become the de facto runtime packaging mechanism. They provide many benefits: a certain level of isolation, improved resource utilization, the ability to deploy applications across different environments, and more. Containers also help reduce the coupling between an application and the underlying platform as that application can be packaged into a portable container. This technique is sometimes used to modernize legacy applications. In the case of Java, a container embeds a legacy Java application along with its dependencies, including an older version of the JVM used by that application.

The practice of containerizing legacy Java applications with their environments can certainly help keep older applications running on modern supported infrastructure by decoupling them from older unsupported infrastructure. But the potential benefits of such a practice come with their own set of risks due to the JVM ergonomics.

[JVM ergonomics](https://docs.oracle.com/en/java/javase/11/gctuning/ergonomics.html#GUID-DB4CAE94-2041-4A16-90EC-6AE3D91EC1F1) enables the JVM to tune itself by looking at two key environmental metrics: the number of CPUs and the available memory. With these metrics, the JVM determines important parameters such as which garbage collector to use, how to configure it, the heap size, the size of the `ForkJoinPool`, and so on.

Linux Docker container support, added in [JDK 8 update 191](https://www.oracle.com/technetwork/java/javase/8u191-relnotes-5032181.html#JDK-8146115), allows the JVM to rely on Linux [cgroups](https://en.wikipedia.org/wiki/Cgroups) to get the metrics of resources allocated to the container it runs in. Any JVM older than that is not aware that it is running within a container and will access metrics from the Host OS and not from the container itself. And, given that in most cases a container is configured to only use a subset of the Host resources, the JVM will rely on incorrect metrics to tune itself. This quickly leads to an unstable situation in which the container will likely get killed by the Host as it tries to consume more resources than are available.

The following command shows which JVM parameters are configured by the JVM ergonomics: `java -XX:+PrintFlagsFinal -version | grep ergonomic`. JVM container support is enabled by default but can be disabled by using the `-XX:-UseContainerSupport` JVM flag. Using this JVM flag in a container with restricted resources (CPU and memory) allows you to observe and explore the impact of JVM ergonomics with and without container support.

Running legacy JVMs in Docker containers is clearly not recommended. But if that is the only option, the legacy JVM should at least be configured to not exceed the resources allocated to the container it runs in. The ideal, obvious solution is to use a modern supported JVM (for example, JDK 11 or later) that will not only be container aware by default, but will also provide an up-to-date and secure runtime.


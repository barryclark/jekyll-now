---
layout: page
title: JVMs in Containers, towards a perfect symbiosis!
permalink: /proposal/JVMContainers
---

### Abstract

JVMs and containers are like fries and mayonnaise – better together!

The Java Virtual Machine is a robust and mature platform that not only hosts Java, the 2nd most used language on GitHub, but also a myriad of other languages such as Kotlin, Scala, and more. OpenJDK and its vibrant open-source ecosystem are a testament to the overall popularity, richness, and reach of the Java platform.

Container technologies such as Docker are rapidly becoming the de-facto way to deploy applications. In addition, emerging platforms, projects and tools (ex. Knative, OpenFaas, Fn Project, JIB, ...) either simplify or fully abstract away building container images, which in turn makes leveraging containers with Java natural.

During the technical session, we will discuss best practices of using the JVM with containers:

* Techniques and tools to optimize containers size (ex. jlink, Project Portola)

* Approaches to improve applications startup time (ex. CDS)

* Benefits of using Graal SubstrateVM for AOT (Ahead-Of-Time) compilation

* The recent OpenJDK enhancements that improve the interactions between the JVM and Docker, ...

Attend this session to understand how you can better leverage one of today's most used programming platform, i.e. the JVM, with the most common tool to deploy code, i.e. containers.

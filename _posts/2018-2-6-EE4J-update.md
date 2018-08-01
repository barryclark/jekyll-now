---
layout: post
title: EE4J - An Update
---

Mike Milinkovich of the Eclipse Foundation has recently posted a [blog](https://mmilinkov.wordpress.com/2018/01/23/ee4j-current-status-and-whats-next/) providing an overall update on the status of the project. To summarize:

* We are working on defining a new brand name using the community process described [here](https://github.com/eclipse-ee4j/ee4j/issues/1).

* We have begun the process of moving Oracle GlassFish sources to the EE4J project. So far, Oracle has contributed sources for the following projects:   EE4J GitHub repos
** Eclipse Grizzly
** Eclipse OpenMQ
** Eclipse Project for JAX-RS
** Eclipse Project for JMS
** Eclipse Tyrus
** Eclipse Project for WebSocket
** Eclipse Project for JSON Processing

* In addition to the above:
** The Eclipse Yasson and EclipseLink projects have been transferred to EE4J, and are now part of the overall EE4J project.
** We have created Eclipse Jersey and Eclipse Mojarra projects and are working on contributing sources for these.

* You can watch (and star!) EE4J project repositories as they are being created in the [EE4J GitHub organization](https://github.com/eclipse-ee4j).

* Oracle is working on Eclipse project proposals for all of the technologies Mike mentions in his blog: JSON-B API, Concurrency, Security, JTA, JavaMail, JAX-B, JAX-WS, JSTL, UEL, JAF, Enterprise Management, and Common Annotations. We intend to formally propose these projects to the [EE4J Project Management Committee (PMC)](https://projects.eclipse.org/projects/ee4j/pmc) very soon. One of our major near-term goals is to transfer all of the Oracle-owned GlassFish technologies to EE4J such that we can build "Eclipse GlassFish" from EE4J sources and demonstrate Java EE 8 compliance.

* We are working on establishing an Eclipse Foundation working group to provide a member-driven governance model for EE4J.


In short, there is a lot of positive progress being driven in the EE4J project. For further updates refer to this blog and the links provided above, or subscribe to the [ee4j-community mailing list](https://dev.eclipse.org/mhonarc/lists/ee4j-community/).

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/ee4j%3a-an-update)*.

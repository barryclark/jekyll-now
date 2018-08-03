---
layout: post
title: JPA and Java SE 8 Streams
---

Retrieving a large, i.e. a very large, dataset using JPA might be tricky <!--more-->as the whole result set has to fit within a _java.util.List_ instance. So a very large data set might potentially hit the memory limits of the sever the application is running on.

For those scenarios with (very) large result set, pagination can be used to work-around that limitation.  See for example this [How To Stream/Serialize JPA Result As JAX-RS Response For Large Data](http://www.javacodegeeks.com/2015/07/how-to-streamserialize-jpa-result-as-jax-rs-response-for-large-data.html) article.  But for those scenarios, the Java 8 Streams API would also be a good fit! Unfortunately, Streams are not supported in the current release of JPA ([JPA 2.1 - JSR 338](https://jcp.org/en/jsr/detail?id=338)) as it predates Java SE 8. But this is clearly a potential RFE for the next update of JPA (see this specification RFE [here](https://java.net/jira/browse/JPA_SPEC-99?jql=project%20%3D%20JPA_SPEC)).In addition, some of the JPA implementations have already started to add support for Java 8 Streams, e.g. [Hibernate](https://hibernate.atlassian.net/browse/HHH-9340) and [EclipseLink](https://bugs.eclipse.org/bugs/show_bug.cgi?id=433075).


We will have to wait a bit more to see what the scope of 'JPA.next' will be. What do you think? Would you like to see Java SE 8 Streams supported in 'JPA.Next'?


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/jpa-and-java-se-8-streams) blog.*


---
layout: post
title: Asynchronous session beans and 'Concurrency Utilities for Java EE API'
excerpt: There are different approaches to obtain an asynchronous behaviour within a Java EE application...
---

> t's true hard work never killed anybody, but I figure, why take the chance?
>
> -- <cite>[Ronald Reagan](http://en.wikipedia.org/wiki/Ronald_Reagan)</cite>


There are different approaches to obtain an asynchronous behaviour within a Java EE application, this post cover 2 of them.

Asynchronous Session Beans, added in EJB 3.1 (Java EE 6), is one possible solution. The *@Asynchronous* annotation is used to decorate session bean methods that should be invoked asynchronously. When such a bean method is invoked, the control returns to the invoking client before the container dispatches the invocation to an instance of the bean. This allows the client to continue processing in parallel while that particular session bean method performs its operations. In EJB 3.2 (Java EE 7), Asynchronous Session Beans are now part of EJB Lite and as such are even more widely available.

Another approach is the use the new [Concurrency Utilities for Java EE API](http://jcp.org/en/jsr/detail?id=236) (JSR 236) which was added to Java EE 7. The goal of this JSR is simple, i.e. it allows to safely use some of Java SE's java.util.concurrent.* features within a Java EE context. So if you are familiar with some the JSR166 features (e.g. ExecutorServices), you can now re-use the same features in a managed Java EE environment.

Mohamed Sanaulla recently wrote different posts explaining how to use the different JSR 236 Managed Objects : [ManagedExecutorService](http://www.javabeat.net/2013/10/managedexecutorservice-concurrency-utilities-java-ee-7-part1/), [ManagedScheduledExecutorService](http://www.javabeat.net/2013/11/managedscheduledexecutorservice-implementing-concurrency-utilities-java-ee-7-part-2/) and [ManagedThreadFactory](http://www.javabeat.net/2013/11/creating-managed-threads-using-managedthreadfactory-java-ee-7-part-3/).


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/asynchronous-session-beans-and-concurrency-utilities-for-java-ee-api) blog.*

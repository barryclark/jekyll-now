---
layout: post
title: Java EE Container Lifecycle
excerpt: Java EE defines different component/container models with their own well-defined lifecycle...
---

Java EE defines different component/container models with their own well-defined lifecycle. Understanding the lifecycle of those different component/container might sometime be useful. Having some visibility on component lifecycle is also useful with applications that use different types of components (e.g. Servlet and EJB) and needless to stay that this is the most common uses case. Finally, it is not just about visibility. Having the ability to also trigger certain actions based on the state of a particular component/container is also sometime required (e.g. perform some specific initialisation).

So when it comes to monitoring and managing Java EE applications, Application Servers tends to provide some custom hooks to achieve that, i.e. observe internal state (e.g. state of a particular container) and trigger management actions based on events such as a state change. Obviously, this is Application Server dependent. For example, GlassFish has [Lifecycle Modules/Listeners](https://docs.oracle.com/cd/E18930_01/html/821-2416/giuxo.html) while WebLogic has, amongst different options, [WLDF Watches](http://docs.oracle.com/middleware/1213/wls/WLDFC/config_watches.htm#WLDFC194). So overall, this type of capability (and theirs implantations) varies greatly and is Application Server dependent.

But some of the Java EE Java APIs also provide hooks that can be used to determine in which state an actual component/container is. In terms of granularity, this approach might be a bit more limited but it has the advantage of being Application Server agnostic since it is based on standardised APIs. I recently came across 2 articles that are discussing that particular topic:

* [Getting notified when Java EE Application is ready](http://javaeesquad.blogspot.be/2015/03/getting-notified-when-java-ee.html) (by Rudy De Busscher)
* [CDI and @Startup: SOLVED!](https://rmannibucau.wordpress.com/2015/03/10/cdi-and-startup/) (by Romain Manni-Bucau) 

On a related matter, the discussions over the upcoming 'Java EE Management API 2.0' (JSR 373) will also be interesting to track.

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/java-ee-container-lifecycle) blog.*

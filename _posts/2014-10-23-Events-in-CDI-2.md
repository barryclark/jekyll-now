---
layout: post
title: Events in CDI 2.0
excerpt: CDI Events is one of the focus area of CDI 2.0...
---

CDI 2.0 ([JSR 365](https://jcp.org/en/jsr/detail?id=365)) was the first Java EE 8 approved JSR. The CDI Experts Group has already been formed several weeks ago and the first CDI 2.0 EG face to face meeting took place last week in Brno (see [feedback](http://cdi-spec.org/news/2014/10/20/CDI-2_0-first-face-to-face-meeting-feedback/) here). The EG has ambitious plans for CDI 2.0 (see [here](http://www.cdi-spec.org/news/2014/07/28/what-s-in-CDI-20-jsr-proposal/)) and is working hard to fulfils them, you can track the evolution of their work [here](http://cdi-spec.org/#_work_status).

CDI Events is one of the focus area of CDI 2.0. CDI Events is a simple mechanism that provides an implantation of the Observer pattern where the Event Producer is cleanly decoupled from the Event Consumer(s). This mechanism is available in CDI since the beginning, i.e. CDI 1.0. But for CDI 2.0, the EG plans to improve the overall CDI Event mechanism by adding:

* Asynchronous events

* Conversation begins/end events

* Priorities (ordering of events)

* Observer Deactivation

* The ability to observe a group of qualified events ("Qualifier Inheritance")

* ...

Obviously at this stage, those are just plans, just ideas and clearly introducing some of those features leads to quite a few questions and in some case might also induces potential issues if this is not well thought. Another constraint faced by CDI is that it is a transversal technology that is used across the platform so extra care should be taken. All those new features needs to be discussed in details and challenged, and sometime prototyped, before they are standardised into the CDI specification. The CDI 2.0 EG has recently put together an [(evolving) document](https://docs.google.com/document/d/1lFtgLm6hY-uECdA1r0Sfimq6vkVYThoUZsevPUaSP0E/edit?pli=1) that describes the thoughts but also the challenges behind some of the CDI Events potential enhancements. This is definitely something to read.

CDI Event is today a useful mechanism. If you have ideas on how events can be improved in CDI 2.0, you should really **@Observe** what is [being discussed in the EG](http://lists.jboss.org/pipermail/cdi-dev/) and **fire** comments (I know, in code, it's the opposite, i.e. **fire** triggers the **@Observe** ;-) ).

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/events-in-cdi-20) blog.*

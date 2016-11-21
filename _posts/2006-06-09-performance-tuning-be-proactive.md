---
title: 'Performance Tuning: Be Proactive'
author: kgorman
comments: true
layout: post
permalink: performance-tuning-be-proactive
fave-post_views:
  - 52
categories:
  - Oracle
tags:
  - database
---
I see many articles out there talking about performance tuning using the Oracle waits interface. While I am not contending that technique; I believe it to be sound, and use this technique every day. What I am saying, is performance tuning in this manner, or the &#8216;traditional&#8217; manner, is inherently reactive. Reactive performance tuning has it&#8217;s place, but many time some proactive performance tuning can help reduce the amount of reactive performance tuning a DBA needs to do. By it&#8217;s very definition, if one is reacting to some performance problem, it&#8217;s most likely it&#8217;s impacting someone, and perhaps your company is losing money.

Don&#8217;t wait for a performance problem, solve them before they occur.In order to be proactive with performance tuning, one needs a system, a plan, a technique. Proactive performance tuning is all about the trends a given database, or a suite of databases exhibit. One must develop a system in order to observe performance telemetry over time, and notice larger trends that don&#8217;t show up in the detailed wait interfaces when queried at performance-problem time.Â I gave a very simple example of this technique using the Oracle Statspack package in my previous post. Using that technique one could keep a running report showing the relative amount of work that a database is doing over time. How is this proactive performance tuning?It might seem simple, but if one knows the relative work &#8216;profile&#8217; for a given database, then one can perform proactive tuning measures to AVOID problems. For instance, reschedule batch jobs, move backup windows, or even just communicate with your business about good times for promotions.Â It should also be noted, that such a system will also allow a DBA to observe the improvements that a given change makes on the trend as well. This is both good in terms of knowning when you are done tuning, but also to illustrate those tuning successes to yourself, and your management.

While it&#8217;s good to have good control of your reactive tuning efforts, augmenting those skills with a proactive tuning &#8216;system&#8217; might just help you to use your reactive skills a bit less, and provide more value to your organization.

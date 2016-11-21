---
title: The benefits of testing
author: kgorman
comments: true
layout: post
permalink: the-benefits-of-testing
fave-post_views:
  - 25
categories:
  - Random
tags:
  - database
---
I was recently involved on a problem for a critical production database that had slow response time for inserts. The batch job inserting was running at full tilt, and adding more processes (concurrency) was not helping. <!-- more --> Ah, there must be some contention going on. What was interesting was not the particular technical details of increasing insert performance, but rather, differing perspectives on how to figure out the problem, and how to suggest a fix.Â The insert process was inserting data into a long raw column of images. v$session_wait showed many sessions waiting on buffer busy waits.

One method was to observe the system, trace, block dump, systemstate dump. Then try to decifer the ton of data created from those processes into a hypothesis, and then suggest a fix. This method gets difficult trying to pinpoint the problem because you are left with so much data, its very time consuming and error prone, and it&#8217;s human nature to start GUESSING. More so, once you think you have a root cause, then the fix is even more problematic. You have no way to validate your fix. You again have to GUESS, or try it out. And trying things out on production systems that have millions of dollars running through them is not a good career path.Â Â Â Â 

A different approach was to simply observe the problem in a semi-simplisitc way. &#8220;We are seeing buffer busy waits on insert of a long raw&#8221;. Then take that example and model it in a test environment. So I utilized some existing perl code I wrote that inserts with a configurable concurrency rate. One can easily see the problem. NOW, we can conclusively model a fix. In this case increasing freelist_groups OR decreasing concurrency and running more serialized increases throughput dramatically and exponentially.Â Now, thats not so hard is it?

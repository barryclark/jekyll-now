---
layout: post
title: Slack as a searchable chat-ops sink
excerpt_separator: <!--more-->
tags: [slack, api, chat-ops, data extraction]
---

## Chit-chatting 

![Database](../images/postgres-indexes-queries/database-design.jpg)
> Photo by Campaign Creators on Unsplash

[PostgreSQL][1] is an extremely performant database.   

We are using it heavily and to great effect in my current place of work.

However the internal design choices of Postres mean that you may be faced [with performance degradation 
if not careful][2]. 

From an application developer's point-of-view there is an easily accessible treasure trove 
of optimisation hints: the [pg_stat_user_indexes][3] view. 
<!--more-->


## Parting thought

![Doctor](../images/postgres-indexes-queries/arvin-chingcuangco-1337417-unsplash.jpg)
> Photo by Arvin Chingcuangco on Unsplash





   [1]: https://www.postgresql.org/
   
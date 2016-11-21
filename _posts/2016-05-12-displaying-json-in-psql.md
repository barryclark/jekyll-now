---
title: Displaying JSON in psql
author: kgorman
comments: true
layout: post
categories:
- PostgreSQL
---

Over the last few releases, PostgreSQL has developed awesome JSON functionality inside the database. That said, every once in a while you want to simply display that JSON in psql for easy viewing, working out a query, copying it to your buffer, etc. In 9.5 jsonb_pretty was included to solve this need.

Here is a real quick tip for how use it in psql:

```sql
-- first turn on tuples only
\t

-- then set to unaligned
\a

-- then use jsonb_pretty (for example)

select jsonb_pretty('[{"f1":1,"f2":null},2,null,3]');
[
   {
       "f1": 1,
       "f2": null
   },
   2,
   null,
   3
]
```
This gives nice readable output. Before this one would have had to use say, python to display the output nicely. This function is new in [PostgreSQL 9.5](http://www.postgresql.org/docs/9.5/static/functions-json.html), native, included, and much more simplistic.

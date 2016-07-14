---
layout: post
title: SQL Querying
---
So today I got an email for an open Technical Support Engineer role at a company requiring specifically SQL. Their schtick was: Take take this test involving some programming questions, basic math, and general people questions then we talk to you. That's fine I guess, I wasn't too bad at math and people seem to be moderately simple. But wait, they only mention SQL in the ad. So I'm thinking to myself, how much SQL do I actually know? Turns out, almost none. Although I've quite literally written thousands of ActiveRecord statements for my PostgreSQL and SQLite Rails apps. It doesn't mean diddly squat.

## ActiveRecord is an ORM(Object Relational Mapping)
 Active record is a ORM library. This means that even though you're interacting with a database in your Rails app by writing `User.create` or `User.find_by` you're not really writing SQL but writing with a DSL(Domain Specific Language) called ActiveRecord to compile SQL code to interact with the SQL database. So in console I type ```User.find_by(id:1)```
 which uses the ActiveRecord Library that also is a Domain Specific Language to execute this SQL code:
 ``` SELECT * FROM users WHERE id = 1 LIMIT 1 ```

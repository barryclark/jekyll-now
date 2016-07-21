---
layout: post
title: ActiveRecord ORM and some SQL querying
---
So today I got an email for an open Technical Support Engineer role at a company requiring specifically SQL. Their schtick was: Take take this test involving some programming questions, basic math, and general people questions then we talk to you. That's fine I guess, I wasn't too bad at math and people seem to be moderately simple. But wait, they only mention SQL in the ad. So I'm thinking to myself, how much SQL do I actually know? Turns out, almost none. Although I've quite literally written thousands of ActiveRecord statements for my PostgreSQL and SQLite Rails apps. It doesn't mean diddly squat.

## ActiveRecord is an ORM(Object Relational Mapping)
 Active record is a ORM library. This means that even though you're interacting with a database in your Rails app by writing `User.create` or `User.find_by` you're not really writing SQL but writing with a DSL(Domain Specific Language) called ActiveRecord to compile SQL code to interact with the SQL database. So in console I type ```User.find_by(id:1)```
 which uses the ActiveRecord Library to execute this hidden SQL code into the database:
 ```SELECT * FROM users WHERE id = 1 LIMIT 1```  
This outputs a user found by the query in the database.
```#<User id: 1, nickname: "Pookie", name: "Renan", user_profile: "http://steamcommunity.com/id/the_real_renan/", user_image: "https://steamcdn-a.akamaihd.net/steamcommunity/pub...", user_location: "Miami, FL, US", uid: "76561198287309916", provider: "steam">```

Here we use the development database from SteamFriend.me to fetch a user with an id of 1.

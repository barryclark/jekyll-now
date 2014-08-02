---
title: mongodb 1.3.3 (devel) with mongostat
author: kgorman
layout: post
permalink: mongodb-1-3-3-devel-with-mongostat
fave-post_views:
  - 64
categories:
  - Mongodb
tags:
  - Mongodb
  - mongostat
---
![][1]

[MongoDB 1.3.3][2] (devel) was released today. My tool called [mongostat][3] has been incorporated into mongo1.3.3 and changed from python to C++. So further development will come inside the mongodb distribution itself. Also of note is new slave lag for replication. [Changelog here][4].

 [1]: http://media.mongodb.org/logo-mongoDB.png
 [2]: http://www.mongodb.org/display/DOCS/Downloads
 [3]: http://www.mongodb.org/display/DOCS/mongostat
 [4]: http://jira.mongodb.org/browse/SERVER/fixforversion/10122

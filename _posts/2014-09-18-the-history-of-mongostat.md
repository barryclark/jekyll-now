---
title: The history of mongostat
author: kgorman
comments: true
layout: post
---

Circa spring 2010 Elliot Horowitz checked in [src/tools/stat.cpp](https://github.com/mongodb/mongo/blob/master/src/mongo/tools/stat.cpp). Mongostat was now part of the MongoDB distribution, but how did it get there? Whats the history behind it?

To be fair, the idea for mongostat wasn't really mine. I had been using similar tools at various companies for years, so it was only natural to create a similar tool for MongoDB.

Mongostat is very similar to an Oracle tool called freecon that was invented by [@eBayPoet](https://twitter.com/ebaypoet) at eBaY circa 2000 and was written in perl. Freecon has since gone through a few revisions and updates from various DBA's on the team (lots of smart dudes). The tool did the same stuff as you would expect, but with many more features to take advantage and expose the various nuances of Oracle. It was the go-to tool when I was at PayPal and eBay and I believe is still in use there.

In 2008 I was at [Hi5](http://en.wikipedia.org/wiki/Hi5), and we ran a *lot* of PostgreSQL. We needed a comprehensive tool like freecon. I wrote [pgstat2](http://pgfoundry.org/projects/pgstat2/) and we used it to good effect until the company switched from social networking to gaming. At the time there where lots of other 'stat' utilities for PostgreSQL inlcuding pgstat and pgstats. Neither of them the same type of tools.

In 2009 I was at Shutterfly, this time working for @eBayPoet directly, and as we [implemented](http://www.mongodb.com/presentations/sharing-lifes-joy-using-mongodb-shutterfly-case-study) MongoDB to replace key components of our database infrastructure, we needed a tool to help us understand what MongoDB was doing. At the time, we where otherwise blind. We knew what had to be done, and I wrote the [first version](http://www.kennygorman.com/mongostat-0-2b/) of mongostat in python. Subsequently, Eliot and I spoke and he re-wrote the tool in C++ and included it in MongoDB.

As they say, the rest is history.

---
title: Data storage technology choices, we live in great times
author: kgorman
comments: true
layout: post
---

I was just finishing up posting my slides from a presentation I did at a venture firm here in Austin, Texas. I was presenting to a set of technology geeks and decision makers from various companies. The goal: how to select a datastore for their next project.

Matt Kroll posted this on Twitter right as I finished:

>Matthew Kroll @OSKroll
>"Modern applications cannot continue to be built on #RDBMS technologies:"
>@mongodbinc CEO @dittycheria #MongoDB

The tweet was timely, because before my presentation I was reading ["MongoDB chief: Why the clock's ticking for relational databases"](http://www.zdnet.com/article/mongodb-chief-why-the-clocks-ticking-for-relational-databases/) by Max Schireson. It's about a year old but conveys a similar message;  relational databases are old and dying, and things like MongoDB are here to replace them.

**The two most recent CEO's of MongoDB Inc have got this wrong, dead wrong.**

Rewind a bit here with me. I was a very early adopter of MongoDB in 2009, in fact, I have championed it for years. I think MongoDB is awesome, it makes development fun, and drastically reduces the time to market for many application profiles. I did a massive migration of MongoDB from legacy RDBMS systems at Shutterfly. It saved tons of cash and made things simple to change. Then, I started a company with two other friends that was purchased in 2012 by Rackspace. MongoDB has given me a lot, so I mean no disrespect. I am a fan for sure. I believe in MongoDB and it's future, and continue to help be part of it.

**But...Relational databases aren't over**

It's not the end of the RDBMS or SQL. There is no ticking time bomb for the work of [EF Codd](http://en.wikipedia.org/wiki/Edgar_F._Codd) in [relational algebra](http://en.wikipedia.org/wiki/Relational_algebra). There are many use cases, packaged apps, code bases, and data patterns where RDBMS is king and likely will be for a very long time. Sorry, it's just not true no matter how much one wishes it to be.

The beauty in the times we live is that we have massive choice in the data stores we can use on any project. We no longer have to use Oracle or DB2 because thats who the CIO negotiated license contracts with. We now have choice in our database systems.

I assert that modern applications are built using a good mix of the proper database backends. The clever engineering team will understand how to use each one to best effect. The architects, engineers, and other team members will dig deep into each one of these technologies and decide for each use case how data may be partitioned, how workloads interact, how uptime, stability and scalability will be effected by the technology choice at hand. It's hard work, there are lots of attributes and parameters to each technology, but when done correctly it's amazing.

When I worked at Hi5, counters used to be a troublesome workload. We had counters displayed next to various components of the site to show users how many 'things' of that type there was. Something like:

```sql
-- do this every read
SELECT count(*)
FROM mythings
WHERE user_id = i
AND folder_id = n;
```

This design took a lot of work from the DBA side because these counts where so inefficient and we did them thousands of times a second. We tried doing slave reads (slony-I), and then did something like:

```sql
-- when we inserted new items into the folder
UPDATE folders
SET thecount = thecount + 1
WHERE folder_id = x;
-- then at read time subsequently did
SELECT * FROM folders WHERE folder_id = x;
```

This worked a bit better, but made us deal with lots of updates. We wanted another mechanism. We finally settled on using memcached (perhaps today we would have used Redis). The theory goes we could tolerate eventual consistency for counts, thus we could use a caching technology for them, and if the cache died, we would run a batch to re-fill it in the mean time masking the counts while the job ran.

This looked something like:

```java
MemcachedClient memclient = new MemcachedClient();
memclient.incr(String key, int by, long def, int exp)
```

The take away is we moved a single component for only for a part of the workload. Most of the data still stayed on PostgreSQL and it worked fantastically. RDBMS made sense for the remainder of the workload. Using a (then) fairly new school technology made sense for us, and the ability to make a choice mattered a great deal.

The ability to have a choice in datastore technology is key this case. It was never a consideration to replace everything. Thats just not realistic, or smart.

There still are many applications where transactions, relational models, and strict ACID adherence is important. There is a huge eco-system of packaged apps that use these constructs and rely on them. These packaged apps are indeed modern (think Remedy, ok, thats bad). Companies like [Facebook](https://www.youtube.com/watch?v=S-KLVe4YSLY) and Ebay still rely on relational technology, and here is a little hint; You don't have to model in [fifth normal form](http://en.wikipedia.org/wiki/Fifth_normal_form) in relational databases, you can model in [third normal form](http://en.wikipedia.org/wiki/Third_normal_form) and have a more flexible design paradigm and still get all the maturity, features, stability, compatibility and supportability of 'old' relational databases. After all, storage is cheap ;-).

That brings us to the topic of scaling clusters of databases. It's true that MongoDB includes components to build a clustered system. ObjectRocket, the company that we built, uses this clustering componentry at it's core. But it's not much different than the systems we constructed at Hi5, or that Facebook uses to create large clusters of commodity database servers. The only difference is MongoDB includes these components and more traditional databases don't. It doesn't mean that RDBMS prevents clustering databases in a shared-nothing approach. MongoDB did get the jump on the market in this area, but the RDBMS world is catching up with things like Clustrix, ScaleArc and more. To be frank, MongoDB still has a ton of work to do as well, just because it's included doesn't mean it's perfect. The MongoDB scaling componentry still leaves much to be desired.

To sum up, there are two opinions that I want to share:

>A services oriented architecture is how modern applications are built. Each service should select it's own proper datastore. It may just be relational.

and

>We live in a time of great choice. Engineers, DBA's, and DevOps engineers now can choose from a variety of technologies to create better architectures than previously possible. Think logical AND vs OR. The problem is now understanding the choices properly.

Choose wisely, and don't believe the FUD.

---
title: 'MongoDB: Lagged Replica with Replica Sets'
author: kgorman
layout: post
permalink: mongodb-lagged-replica-with-replica-sets
aktt_notify_twitter:
  - yes
  - yes
aktt_tweeted:
  - 1
dsq_thread_id:
  - 135805855
fave-post_views:
  - 64
categories:
  - Data Architecture
  - Database Engineering
  - Mongodb
tags:
  - Mongodb
  - replica sets
---
In an enterprise database architecture, it&#8217;s very common to create a standby or replica database with a &#8216;lag&#8217; in it&#8217;s state relative to the primary. Operations applied to the primary are not seen on the replica for some amount of pre-determined timeframe. The purpose of such an architecture is to protect yourself against an accidental deletion, code bug, corruption, table drop, etc. If something really bad happens to the primary it may replicate that horrible thing before someone can step in and correct it. A lagged replica solves this problem by giving some amount of time to stop the replica from ingesting the change, and allowing an operator to use the clean data to fix the primary or even roll back to a earlier image.

How long should you lag your replica? Thats up to you, but as a general rule of thumb 8 hours would leave you reasonable time to detect a data problem and take corrective action.

MongoDB now has this capability with the 1.7.x versions of MongoDB. For now, you will have to use the nightly builds in order to have the capabilities. But on release of 1.7 it will be generally available. Here is how it works.

Setup a replica set like normal. But be sure to specify a slave with some amount of lag. It&#8217;s important to make sure you set priority=0 on this slave so it never automatically becomes master. Thus, it makes sense to always have at least 1 primary and 2 replicas in a lagged replica configuration. 1 primary, 1 replica for failover, then a lagged replica to ensure data safety.![][1]

In the above example, here is the config:

~~~ javascript
c={_id:"sfly",
         members:[
             {_id:0,host:"host_a:27017"},
             {_id:1,host:"host_b:27017"},
             {_id:2,host:"host_c:27017",priority:0,slaveDelay:120},
             {_id:3,host:"host_d:27017",arbiterOnly:true}]
}
>
{
	"_id" : "sfly",
	"members" : [
		{
			"_id" : 0,
			"host" : "host_a:27017"
		},
		{
			"_id" : 1,
			"host" : "host_b:27017"
		},
		{
			"_id" : 2,
			"host" : "host_c:27017",
			"priority" : 0,
			"slaveDelay" : 120
		},
		{
			"_id" : 3,
			"host" : "host_d:27017",
			"arbiterOnly" : true
		}
	]
}
> rs.initiate(c);
{
	"info" : "Config now saved locally.  Should come online in about a minute.",
	"ok" : 1
}
> rs.conf()
{
	"_id" : "sfly",
	"version" : 1,
	"members" : [
		{
			"_id" : 0,
			"host" : "host_a:27017"
		},
		{
			"_id" : 1,
			"host" : "host_b:27017"
		},
		{
			"_id" : 2,
			"host" : "host_c:27017",
			"priority" : 0,
                        "slaveDelay" : 120
		},
		{
			"_id" : 3,
			"host" : "host_d:27017",
			"arbiterOnly" : true
		}
	]
}
~~~

 [1]: http://www.gliffy.com/pubdoc/2214542/L.png

---
layout: post
title: MongoDB profiler helpful queries
comments: true
---

I thought I would post up some useful queries to analyze profiler output. I created a [gist](https://gist.github.com/kgorman/134896c7414fde8e090b) on GitHub with some of them, and enumerated a couple of the more interesting ones in this post.

## Overview

I assume you are already familiar with the MongoDB profiler, and how to interpret the output in this post. The basic premise of tuning with the profiler is:

- Capture operations as they happen with metadata about the performance of each one.
- Analyze the output, decide what operations to attempt to tune.
- Tune those operations.

## Capture
To capture data into the profiler, simply turn it on. Check out the [docs here](http://docs.mongodb.org/manual/administration/monitoring/#database-profiling).

## Analysis

The name of the game with workload tuning using the profiler is to widdle down the list of 'bad queries'. Finding what you consider bad is the task at hand. Then, after tuning repeating the process to find the next bad query and so on.

The most useful query is to simply sort on response time:

``` javascript
// top 10 slowest queries
//
db.system.profile.find({}).sort({"$millis":-1}).limit(10);
```

Other times it's good to see the data by the latest queries as they come in:

``` javascript
// top 10 latest queries
//
db.system.profile.find({}).sort({"$natural":-1}).limi(10);
```

But you can really start getting deeper by using the aggregation framework against the profiler collection. This query gets you a breakdown by namespace:

``` javascript
// slowest by namespace
//
db.system.profile.aggregate(
{ $group : {
  _id :"$ns",
  count:{$sum:1},
  "max response time":{$max:"$millis"},
  "avg response time":{$avg:"$millis"}  
}},
{$sort: {
 "max response time":-1}
});
```

Going further, you can figure out the response time of various operations using this.  If you aren't familar with the concept of response time analysis for database performance, you can check out [Craigs paper](http://people.cis.ksu.edu/~hankley/d560/Oracle/Notes/Shallahamer%20RT6b.pdf) that basically defines the practice (albiet for Oracle systems.)

``` javascript
db.system.profile.aggregate([
	{ $project : {
			"op" : "$op",
			"millis" : "$millis",
			"timeAcquiringMicrosrMS" : { $divide :
                [ "$lockStats.timeAcquiringMicros.r", 1000 ] },
			"timeAcquiringMicroswMS" : { $divide :
                [ "$lockStats.timeAcquiringMicros.w", 1000 ] },
			"timeLockedMicrosrMS" : { $divide :
                [ "$lockStats.timeLockedMicros.r", 1000 ] },
			"timeLockedMicroswMS" : { $divide :
                [ "$lockStats.timeLockedMicros.w", 1000 ] } }
	},
	{ $project : {
			"op" : "$op",
			"millis" : "$millis",
			"total_time" : { $add : [ "$millis", "$timeAcquiringMicrosrMS",
                "$timeAcquiringMicroswMS" ] },
			"timeAcquiringMicrosrMS" :
                "$timeAcquiringMicrosrMS",
			"timeAcquiringMicroswMS" :
                "$timeAcquiringMicroswMS",
			"timeLockedMicrosrMS" :
                "$timeLockedMicrosrMS",
			"timeLockedMicroswMS" :
                "$timeLockedMicroswMS" }
	},
	{ $group : {
			_id : "$op",
			"average response time" : { $avg : "$millis" },
			"average response time + acquire time":
                { $avg: "$total_time"},
			"average acquire time reads" :
                { $avg : "$timeAcquiringMicrosrMS" },
			"average acquire time writes" :
                { $avg : "$timeAcquiringMicroswMS" },
			"average lock time reads" :
                { $avg : "$timeLockedMicrosrMS" },
			"average lock time writes" :
                { $avg : "$timeLockedMicroswMS" } }
	}
]);
```

## Tuning

Of course the last step is to explain the list of queries returned and work on a path to improve the performance of them one by one.  I will save that for another post. Stay tuned!

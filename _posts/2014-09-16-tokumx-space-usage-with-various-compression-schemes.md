---
title: TokuMX space usage with various compression schemes
author: kgorman
comments: true
layout: post
---

It's a pretty common question these days for folks to ask the difference in real world storage footprint between various compression schemes in [TokuMX](http://en.wikipedia.org/wiki/TokuMX), as well as compared to [MongoDB](http://en.wikipedia.org/wiki/MongoDB). So thought I would do a quick comparison and post the results.

It should be noted that these tests are just pure storage footprint tests. This is not a comparison of the run time performance of each option. Each compression setting comes with a set of tradeoffs I will try to enumerate in a follow up post.

## Background

If you aren't already familiar with TokuMX, it's a fork of MongoDB with a completely retooled storage subsystem to take advantage of Tokutek's Fractal Tree index technology. In a TokuMX instance, the collection itself is actually a fractal index on _id.

Yes, that means it's similar to a index organized table or [clustered index](http://use-the-index-luke.com/sql/clustering/index-organized-clustered-index). One notable component of the TokuMX storage layer is compression. Each collection may have it's own compression scheme, including the oplog.

## Results

Let's just jump right to the results, they speak for themselves.

![tokuspace]({{ site.baseurl }}images/toku-space-test.png)

- *Total Disk Footprint* is the total file system usage (including oplog, ns, etc) for the instance. This is measured on the OS as:

```javascript
du -k
```

- *Total Data* is the size of the intra-database storage usage. This is measured in the Database as:

```javascript
// TokuMX
db.ocean_data.stats['storageSize']+
db.ocean_data.stats['totalIndexStorageSize']
// MongoDB
db.ocean_data.stats['storageSize']
```

## Testing Environment

- Rackspace [OnMetal](http://www.rackspace.com/cloud/servers/onmetal/) I/O instance.
- TokuMX 1.5
- MongoDB 2.6.4
- Default compression set to 'quicklz' (oplog, etc)
- For each test the database instance was recreated froms scratch, the collection and it's secondary index was pre-created with the compression scheme being measured. Then the data was imported via mongorestore.
- 500,000 documents

The dataset for this test is some of the NOAA sample data I [posted about previously](http://www.kennygorman.com/noaa_ocean_data_a_mongodb_example/). It's about 500,000 documents and just 1 secondary index. Each document has the following structure:

```javascript
db.ocean_data.findOne()
{
	"_id" : ObjectId("53e4fc2a2239c2398fd45521"),
	"station_id" : 9440910,
	"loc" : {
		"type" : "Point",
		"coordinates" : [
			-123.9669,
			46.7075
		]
	},
	"name" : "Toke Point",
	"lon" : "-123.9669",
	"products" : [
		{
			"v" : 61,
			"t" : ISODate("2014-08-08T16:24:00Z"),
			"name" : "air_temperature",
			"f" : "0,0,0"
		},
		{
			"d" : "295.00",
			"g" : "13.80",
			"f" : "0,0",
			"s" : "9.91",
			"t" : ISODate("2014-08-08T16:24:00Z"),
			"dr" : "WNW",
			"name" : "wind"
		},
		{
			"v" : 1020.8,
			"t" : ISODate("2014-08-08T16:24:00Z"),
			"name" : "air_pressure",
			"f" : "0,0,0"
		}
	],
	"lat" : "46.7075",
	"fetch_date" : ISODate("2014-08-08T16:34:47.714Z"),
	"id" : 9440910
}

 db.ocean_data.getIndexes()
[
	{
		"key" : {
			"_id" : 1
		},
		"unique" : true,
		"ns" : "kg_spacetest.ocean_data",
		"name" : "_id_",
		"clustering" : true
	},
	{
		"key" : {
			"station_id" : -1
		},
		"ns" : "kg_spacetest.ocean_data",
		"name" : "station_id_-1"
	}
]
```

Here are the settings and raw output from the test.

[Raw Storage Output](https://gist.github.com/kgorman/f985be1267cbd2cccd1d)

[Instance settings](https://gist.github.com/kgorman/224c118e0aae9de45239)

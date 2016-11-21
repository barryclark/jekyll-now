---
title: NOAA ocean data - A MongoDB example
author: kgorman
comments: true
layout: post
---

![buoy]({{ site.baseurl }}images/NOAA-smartbuoy.jpg)

I am a geek for public data sets. I stumbled across this data set and wanted to use it for a sample for testing, teaching, etc. It's a pretty cool example of a MongoDB use case, so I thought I would share.

NOAA has been [gathering](http://tidesandcurrents.noaa.gov/) tide, current, and sea level data for quite a long time:

>
The Center for Operational Oceanographic Products and Services (CO-OPS) and its predecessors have gathered oceanographic data along our nation's coasts for over 200 years to protect life, property, and the environment. Serving both the public and other government agencies, CO-OPS is the authoritative source for accurate, reliable, and timely water-level and current measurements that support safe and efficient maritime commerce, sound coastal management, and recreation.
>

This is an ideal data set for testing and teaching. It's a great fit for a document database like MongoDB. I have built a [Github repository](https://github.com/kgorman/ocean) to hold the specifics, and wrote a simple program ([fetcher.py](https://github.com/kgorman/ocean/blob/master/fetcher.py)) to pull the API and stash it into a MongoDB database. If you want to duplicate this data to play with you can too. Predictably, I use [ObjectRocket](http://www.objectrocket.com) as my MongoDB provider, but you can use any MongoDB database.

## Schema

There are two main collections:

- stations
- ocean_data

Stations is metadata about each station (buoy). I pulled this list and converted it as a static list. Each document looks like:

``` javascript
> db.stations.findOne()
{
	"_id" : ObjectId("53744abad3a11771ea04bac4"),
	"-name" : "Nawiliwili",
	"-ID" : 1611400,
	"metadata" : {
		"location" : {
			"lat" : 21.9544,
			"long" : -159.3561,
			"state" : "HI"
		},
		"date_established" : ISODate("1954-11-31T09:20:00Z")
	},
	"parameter" : [
		{
			"-name" : "Water Level",
			"-sensorID" : "A1",
			"-DCP" : "1",
			"-status" : "1"
		},
		{
			"-name" : "Water Temp",
			"-sensorID" : "E1",
			"-DCP" : "1",
			"-status" : "1"
		}
	]
}
```


The ocean_data collection is populated with the latest data each time fetcher.py runs. I process down each document to clean up the schema a bit, and end up with a data structure that looks like this:

```javascript
> db.ocean_data.findOne()
{
	"_id" : ObjectId("53e4fcc42239c23dce3cb7bc"),
	"station_id" : 8461490,
	"loc" : {
		"type" : "Point",
		"coordinates" : [
			-72.09,
			41.3614
		]
	},
	"name" : "New London",
	"products" : [
		{
			"v" : 69.4,
			"t" : ISODate("2014-08-08T16:24:00Z"),
			"name" : "water_temperature",
			"f" : "0,0,0"
		},
		{
			"v" : 77,
			"t" : ISODate("2014-08-08T16:24:00Z"),
			"name" : "air_temperature",
			"f" : "0,0,0"
		},
		{
			"d" : "360.00",
			"g" : "8.75",
			"f" : "0,0",
			"s" : "4.08",
			"t" : ISODate("2014-08-08T16:24:00Z"),
			"dr" : "N",
			"name" : "wind"
		},
		{
			"v" : 1015.8,
			"t" : ISODate("2014-08-08T16:24:00Z"),
			"name" : "air_pressure",
			"f" : "0,0,0"
		}
	],
	"fetch_date" : ISODate("2014-08-08T16:37:22.640Z"),
	"id" : 8461490
}
```


I took care to alter the data model with how this data set would be used in mind. The source data presents a nested 'products' array, but for simplification purposes I flatten that structure and just have a simple array with each product represented with it's name, and various parameters. Products simply refers to the various attributes being captured (temps, pressures, etc). I have limited them statically in fetcher.py to keep things simple:

``` python
products = [
    'water_temperature',
    'air_temperature',
    'humidity',
    'wind',
    'visibility',
    'air_pressure',
    'salinity'
    ]
```

Once created we need to create some indexes. In this case we can create a MongoDB geo-index on the lat/long pairs.

``` javascript
> db.ocean_data.ensureIndex({"loc":"2dsphere"},{"background":true});
> db.ocean_data.ensureIndex({"products.name":-1},{"background":true});
> db.ocean_data.ensureIndex({"products.t":-1},{"background":true});
> db.ocean_data.getIndexes()
[
	{
		"v" : 1,
		"key" : {
			"_id" : 1
		},
		"ns" : "ocean.ocean_data",
		"name" : "_id_"
	},
	{
		"v" : 1,
		"key" : {
			"station_id" : "hashed"
		},
		"ns" : "ocean.ocean_data",
		"background" : true,
		"name" : "station_id_hashed"
	},
	{
		"v" : 1,
		"key" : {
			"loc" : "2dsphere"
		},
		"ns" : "ocean.ocean_data",
		"name" : "loc_2dsphere",
		"background" : true
	},
	{
		"v" : 1,
		"key" : {
			"products.t" : -1
		},
		"ns" : "ocean.ocean_data",
		"name" : "products.t_-1",
		"background" : true
	},
	{
		"v" : 1,
		"key" : {
			"products.name" : -1
		},
		"ns" : "ocean.ocean_data",
		"name" : "products.name_-1",
		"background" : true
	}
]
```

And let's be sure to shard it so we can grow over time and continue to be fast

``` javascript
sh.enableSharding("ocean"); // you don't need to do this on ObjectRocket
sh.shardCollection("ocean.ocean_data", { "station_id":"hashed" });
```


A couple interesting things come to mind about the data being organized in this manner:

- Because each product has it's own unique attributes, MongoDB and a flexible schema are a perfect fit.
- Each station may or may not have all the sensors for all the products, again, good fit for MongoDB.
- Queries are optimized by station_id (indexed), and because app products are in one document, I/O's are minimal. Data is clustered by station/date.
- Sharding on station_id(hashed) works nicely, there are about 400 stations, this gives a nice scalable key.
- Lat/Lon present a nice geo-indexing opportunity.
- Aggregation framework queries work nicely for rollups, and aren't too complicated in this format.

## Queries

This data isn't super interesting if you can't ask questions of it. For instance, we can look at average temperatures over time:

``` javascript
// get average values group by year, and by product, where product = water temp
 db.ocean_data.aggregate(
   [
       { $unwind : "$products" },
       { $match: {"products.name":"water_temperature"}},
       {
           $project: {
               "name": 1,
               "products.t" : 1,
               "products.v" : 1,
               "products.name" : 1,
               "theyear" : { "$year": "$products.t" }
           }
       },
       { $group: {
           _id: {
               "year":"$theyear",
               "name":"$products.name"
            },
            theavg: {
                $avg:"$products.v" }
            }
        }
   ]
);

{
	"result" : [
		{
			"_id" : {
				"year" : 2014,
				"name" : "water_temperature"
			},
			"theavg" : 75.02329138298559
		}
	],
	"ok" : 1
}
```

But what if we want to query the average temperatures by year for stations near San Diego CA? (MongoDB 2.4+)

``` javascript
// add geo into the mix, stations near San Diego, group by date
db.ocean_data.aggregate(
    [
        { $geoNear: {
			near: { type: "Point", coordinates: [ -117.1572600, 32.7153300 ] },
			distanceField: "dist.calculated",
			includeLocs: "dist.location",
			num: 5,
			spherical: true
        	}
		},
        { $unwind : "$products" },
        { $match: {"products.name":"water_temperature"}},
        { $project: {
			"name": 1,
			"products.t" : 1,
			"products.v" : 1,
			"products.name" : 1,
			"theyear" : { "$year": "$products.t" }
        	}
        },
        { $group: {
            _id: { "year":"$theyear" },
            station: { $max:"$name"},
            product: { $max:"$products.name" },
            theavg: { $avg:"$products.v" }
        	}
        }
    ]
);

{
	"result" : [
		{
			"_id" : {
				"year" : 2014
			},
			"station" : "San Diego",
			"product" : "water_temperature",
			"theavg" : 74.28
		}
	],
	"ok" : 1
}

```

## Doing it yourself
If you want to play with this data set yourself you have two choices. You can pull the dump file from my repo and get at it right away, or you can setup fetcher to start pulling data into your database on a timed basis.  See my [Github page](https://github.com/kgorman/ocean) for details! Enjoy.

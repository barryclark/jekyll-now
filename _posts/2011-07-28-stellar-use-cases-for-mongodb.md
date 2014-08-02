---
title: Stellar use cases for MongoDB
author: kgorman
layout: post
permalink: stellar-use-cases-for-mongodb
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1
fave-post_views:
  - 68
categories:
  - Data Architecture
  - Database Engineering
  - Mongodb
tags:
  - Mongodb
---
MongoDB has a nice wide sweet spot where it&#8217;s a very useful persistence platform, however, it&#8217;s not for everything. I thought I would quickly enumerate a couple great use cases that have come up in the last year and a half and why they are such a great fit for MongoDB.

1. Documents: Using MongoDB instead of a XML based system.

[MongoDB][1] is a document oriented data store. [XML][2] is a document language. By moving a traditional XML app to MongoDB one can experience a few key advantages. The typical pattern in XML is to fetch an entire document, work with it, and put it back to the server. This approach has many downsides including the amount of data transmitted over the wire, collision detection/resolution, data set size, and server side overhead. In the MongoDB model, documents can be updated [atomically][3], fetched by index, and even partially fetched. Applications are simpler, faster, and more robust.

2. Metadata storage systems.

Any system that stores metadata can be a great use case in MongoDB. Such systems typically have a pattern of adding attributes about some type of entitiy, and then needing to query/sort/filter based on these items. The prototypical use case for such a system is the use of tags. The tag implementation is so superior in MongoDB that almost single handedly compels one to use MongoDB for any system needing tags. Simply put:

<pre lang="javascript">db.mymetadata.save({stuff:"some data here", thing:"/x/foo/bar.mpg", tags:['cats','beach','family']})
db.mymetadata.ensureIndex({"tags":-1})
db.mymetadata.find({tags:'cats'})
...
"indexBounds" : {
		"tags" : [
			[
				"cats",
				"cats"
			]
		]
</pre>

In many metadata systems the schema may vary depending on the metadata itself. This allows for huge degrees of flexibility in the data modeling of applications that store metadata. Imagine a media storage service that can store video and image data in the same collection but with different attributes about each type of metadata. No joins needed on query, and the logical I/O path is minimized! MongoDB now supports [sparse indexes][4], so indexes on attributes that are not in every document are kept at a minimum size.

3. Read intensive systems

Any system where the amount of change is low, and read is high is a nice sweet spot for MongoDB. MongoDB has a nice scaling property with both the [replica sets][5] functionality (setting SLAVE_OK), as well as using [sharding][6]. Combine this with the document model, and metadata storage capabilites one has an excellent system for say a [gawker][7] clone. Reads can come off any one of *N* sharded nodes by say, story_id, and reads can be geographically targeted to a slave for reads. Keep your [data clustered by key][8] for super fast I/O.

 [1]: http://en.wikipedia.org/wiki/Mongodb
 [2]: http://en.wikipedia.org/wiki/XML
 [3]: http://www.mongodb.org/display/DOCS/Atomic+Operations
 [4]: http://www.mongodb.org/display/DOCS/Indexes#Indexes-SparseIndexes
 [5]: http://www.mongodb.org/display/DOCS/Replica+Sets
 [6]: http://www.mongodb.org/display/DOCS/Sharding+Introduction
 [7]: http://gawker.com/
 [8]: http://www.kennygorman.com/wordpress/?p=611

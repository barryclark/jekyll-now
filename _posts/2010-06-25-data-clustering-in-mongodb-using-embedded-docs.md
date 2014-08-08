---
title: Data clustering in MongoDB using embedded docs
author: kgorman
layout: post
permalink: data-clustering-in-mongodb-using-embedded-docs
aktt_notify_twitter:
  - yes
  - yes
aktt_tweeted:
  - 1
fave-post_views:
  - 54
categories:
  - Data Architecture
  - Database Engineering
  - Mongodb
tags:
  - architecture
  - clustering
  - Mongodb
  - performance
---
I wrote a while ago about how to [cluster data to save cash][1]. This post was geared towards relational stores. But in reality, the technique is applicable to any block store on disk. To recap, the premise is simple. When you run a query for some amount of data, you want to minimize I/O as much as possible. Even if the result is in cache, you still want to reduce logical I/O. See [my post][1] for examples.

So how does one manage this technique in [MongoDB][2]? If you&#8217;re not familiar MongoDB is a fairly new database that is non-relational and schema-less. However, data density and clustering is still important. Anytime you can reduce the amount of logical or physical I/O to return a query that is a good thing.

With [SERVER-1054][3], the MongoDB folks implemented one key feature that helps one manage data clustering in MongoDB; the ability to show what file/offset a given document lives in. This allows the inspection of the location, and action to be taken. Think of it as a measure of how fragmented your data is inside blocks.

~~~ javascript
var arr=db.photos.find({}, {'$diskLoc': 1}).showDiskLoc()
> for(var i=0; i&lt;arr.length(); i++) {
    printjson(arr[i].$diskLoc.offset/512)
  }
3241650.34375
3241650.4453125
>
~~~

In the above example, both of these rows live in block # 3241650. Thus the data is dense.

If a given set of documents are typically queried together, then they should be as dense as possible. Additionally if they are in contiguous blocks that is good too.

In a traditional RDBMS data store there are various techniques to re-cluster the data by a given key to re-arrange the data densely. For instance using CREATE TABLE AS SELECT * FROM foo ORDER BY mykey. However, it&#8217;s mostly a one time affair because future inserts may not be dense.

In MongoDB depending on the design, that may or may not be required. A design pattern called [embedding][4] can alleviate many of the typical problems associated with data clustering and AUTOMATICALLY keep your collection dense. Thus further making the MongoDB seem much faster than a traditional RDBMS.

Let me give an example to illustrate. Let&#8217;s give the following relational data model:

~~~ sql
>postgres=# \d photos
         Table "public.photos"
  Column   |     Type      | Modifiers
-----------+---------------+-----------
 id        | integer       |
 user_id   | integer       |
 file_path | character(42) |

~~~

And the typical access path is:

~~~ sql
select * from photos where user_id = 10;
~~~

Then one can expect results (worse case) where all the results are in different blocks. Thus at least 3 I/O operations to return this query. If they were dense, they would be all in one block.

~~~ sql
postgres=# select ctid, * from photos where user_id=10;
 ctid    | id | user_id |               file_path
---------+----+---------+--------------------------------------------
 (0,1)   |  1 |      10 | /home/foo/1.jpg
 (22,2)  | 24 |      10 | /home/foo/2.jpg
 (334,3) | 23 |      10 | /home/foo/3.jpg

~~~

In MongoDB the following model can be used to \*always\* keep the data dense and tightly clustered.

~~~ javascript
photos=
{ "_id" : ObjectId("4c252807164314895e44fb6d"),
  "user_id" : 10,
  "paths" : ['/home/foo/1.jpg','/home/foo/2.jpg','/home/foo/3.jpg']
}
~~~

And a query would be:

~~~ javascript
db.photos.find({"owner":10})
~~~

The data payload is exactly 1 I/O. As the embedded document grows over the block size it would start to span multiple blocks. So this is an additional design consideration. Keep embedded documents less than the block size or you may not be able to see additional benefits.

Embedding may not always be possible. But if one is aware of the potential I/O savings when performing the design then it&#8217;s just another data point to making a more intelligent and fast performing data store.

MongoDB does not yet have the simple capability to rebuild a collection and re-order the data in a simple operation. This is the technique used on the RDBMS side pretty commonly and shown in my previous post examples. So design with that in mind.

 [1]: http://www.kennygorman.com/wordpress/?p=334
 [2]: http://www.mongodb.org/
 [3]: http://jira.mongodb.org/browse/SERVER-1054
 [4]: http://www.mongodb.org/display/DOCS/Updating+Data+in+Mongo#UpdatingDatainMongo-EmbeddingDocumentsDirectlyinDocuments

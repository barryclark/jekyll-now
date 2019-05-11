---
layout: post
title: Postgres Index stats and Query Optimization
excerpt_separator: <!--more-->
tags: [database, postgres, indexes, optimization]
---

## Postgres 

![Database](../images/postgres-indexes-queries/database-design.jpg)
> Photo by Campaign Creators on Unsplash

[PostgreSQL][1] is an extremely performant database.   

We are using it heavily and to great effect in my current place of work.

However the internal design choices of Postres mean that you may be faced [with performance degradation 
if not careful][2]. 

From an application developer's point-of-view there is an easily accessible treasure trove 
of optimisation hints: the [pg_stat_user_indexes][3] view. 
<!--more-->

## Some background info

![Information](../images/postgres-indexes-queries/tourist-information.jpg)
> Photo by Laurentiu Morariu on Unsplash

Postgres stores database rows on disk as a whole "thing", called 'tuple'.  
A tuple (i.e. a row) is read from disk [into memory as a whole unit][4], rather than individual column values. 
Similarly, updating even a single column, results in the insertion of a new tuple; essentially a new version
of the row. 

Because of this fundamental Postgres feature, there are 2 key effects: 
* SQL `UPDATE`s have essentially the same disk overhead as `INSERT`s (see the [great Uber blog post][2])
* indexes, if not carefully chosen, can kill performance in a write-heavy application. 

Luckily, Postgres provides a view of index statistics `pg_stat_user_indexes`, which gives a nice overview of 
how indexes are read/used.  

To get stats from this view you issue a query like this  
`SELECT * FROM pg_stat_user_indexes WHERE relname = 'apples' ORDER BY idx_scan;`  
replacing 'apples' for your table's name.

This returns results looking like this  
```
 relid | indexrelid | schemaname | relname |                   indexrelname           | idx_scan  | idx_tup_read | idx_tup_fetch
-------+------------+------------+---------+------------------------------------------+-----------+--------------+---------------
 29702 |    1199183 | public     | apples  | index_apples_on_created_at               |  12022742 |  40376724985 |   12152032527
 29702 |    3132985 | public     | apples  | index_apples_on_farm_id_and_variety_type |  22060865 |   4310241377 |    2529610394
 29702 |      29787 | public     | apples  | apples_pkey                              | 318104791 |    195366165 |     181310810
```

The columns in the above table are
* `relname`: Name of the DB table

* `indexrelname`: Name of the user index these stats are for

* `relid`: Identifier of the 'apples' table inside Postgres

* `indexrelid`: Identifier of each index for Postgres. This is an [OID][6] and, [if you have not tampered with the defaults][7] 
only used for system objects. What this means in plain English is that it gives you a sense of an index's "age": the 
higher the id, the newer the index. This can help put the rest of the numbers into perspective.  
For example, in the results above we can deduce that 
  * the primary key `apples_pkey` was created almost at the same time as the 'apples' table (as one would expect)
  * next to be created was `index_apples_on_created_at`
  * last one was `index_apples_on_farm_id_and_variety_type` 

* `idx_scan`: How many times the index has been scanned (used).  
This can be either directly by a application query (e.g. `SELECT * FROM apples WHERE id = 1`) or indirectly due to a JOIN. 
For example, the primary key index `apples_pkey` has been scanned over 318 million times.

* `idx_tup_read`: This is the number of index entries returned as a result of an index scan.  
An easy-to-understand example is the primary key (e.g. `SELECT * FROM apples WHERE id = 1`). If there is an apple with 
id = 1, then `idx_tup_read` will increase by 1. Modifying slightly the query `SELECT * FROM apples WHERE id IN (1, 2)` 
`idx_tup_read` will increase by 2 (if both ids exist). In both of these queries, `idx_scan` will increase by 1.

* `idx_tup_fetch`: These are the number of rows fetched from the table as a result of an index scan.  
This is increased as a result of both positive and false positive results.  
For example, if both ids exist, the query `SELECT * FROM apples WHERE id IN (1, 2)` will increase
`idx_tup_fetch` by 2, returning the rows to the client. Even if the query is modified to 
`SELECT * FROM apples WHERE id IN (1, 2) AND color = 'purple'` the counter would still be increased by 2.
The reason is that the tuples will need to be loaded from disk to examine the value of 'color'.  
Even if 'purple' is unknown and the query returns 0 rows, the counter will still be increased. 

## Forensics 

![Investigation](../images/postgres-indexes-queries/helloquence-61189-unsplash.jpg)
> Photo by Helloquence on Unsplash     

The true power of `pg_stat_user_indexes` lies when you examine how it changes over time. If your application has a 
semi-predictable usage pattern (e.g. user behaviour is roughly the same on a daily basis), then taking regular snapshots
can provide some very valuable insights into how your application's queries behave under the hood.

Let's take 2 snapshots from our imaginary tables and examine some possible scenarios.

Initial   
```
 relid | indexrelid | schemaname | relname |           indexrelname                       | idx_scan  | idx_tup_read | idx_tup_fetch
-------+------------+------------+---------+----------------------------------------------+-----------+--------------+---------------
 29667 |    3403877 | public     | apples  | index_apples_farmed_not_yet_in_truck         |        37 |     73003975 |             0
 29667 |    1848177 | public     | apples  | index_apples_on_to_farm                      |       377 |    200021437 |             0
 29667 |   43112037 | public     | apples  | index_apples_on_to_truck                     |      5750 |    100021437 |     100014483
 29667 |      29775 | public     | apples  | apples_pkey                                  |    708143 |       707811 |        707811
 29667 |      29793 | public     | apples  | index_apples_on_farm_id                      | 351574733 |   1141817612 |    1140110029
```

Some time later   
```
 relid | indexrelid | schemaname | relname |           indexrelname                       | idx_scan  | idx_tup_read | idx_tup_fetch
-------+------------+------------+---------+----------------------------------------------+-----------+--------------+---------------
 29667 |    3403877 | public     | apples  | index_apples_farmed_not_yet_in_truck         |        37 |     73003975 |             0
 29667 |    1848177 | public     | apples  | index_apples_on_to_farm                      |       410 |    274158086 |             0
 29667 |   43112037 | public     | apples  | index_apples_on_to_truck                     |      5763 |    174153032 |     174133019
 29667 |      29775 | public     | apples  | apples_pkey                                  |    809930 |       809565 |        809565
 29667 |      29793 | public     | apples  | index_apples_on_farm_id                      | 390472396 |   1263259359 |    1261333830
``` 

### 1. Unused index

![Abandoned](../images/postgres-indexes-queries/v2osk-188240-unsplash.jpg)
> Photo by v2osk on Unsplash

Indexes do not come for free.  
They impose 2 types of "tax" which we need to take into account:
* [performance overhead][5] for write-heavy applications
* [disk size consumption][7] for large tables 

Therefore, the worst kind of index is the unused one.

In the above example, the `index_apples_farmed_not_yet_in_truck` index's counters have not moved between the 2 snapshots.  
Assuming that all of our application's use cases have been executed between the 2 snapshots<sup>crucial assumption!</sup>, it is safe to say that
this index needs to go and soon!

It may be that the index was created at some point in the application's life and then things moved on. 
Either new code was added or the query using the index was deprecated. 

Comparing the 2 snapshots (rather than [looking only for a zero counter][8]) 
will reveal this and allow you to confidently remove the index.

### 2. Too broad index 

![Too big](../images/postgres-indexes-queries/sutirta-budiman-560115-unsplash.jpg)
> Photo by sutirta budiman on Unsplash

Looking to [Wikipedia][9] for the definition of an index
> A database index is a data structure that improves the speed of data retrieval operations on a database table at the 
cost of additional writes and storage space to maintain the index data structure.

An ideal index is an efficient filter which allows us to cherry-pick the few rows which match our query.  
This operation is much faster than scanning the entire table. 
Or so it is meant to be.

Let's take `index_apples_on_to_farm` as an example.  
Between the 2 snapshots the index was used 33 times (410 - 377). 
In those scans it returned a little over 74 million index entries. That is over 2.2 million index entries per scan. 
This number needs to be put into perspective. 

If the apples table has, say, 3 billion rows, then the `index_apples_on_to_farm` is working beautifully. 
Each scan brings back a tiny fraction of the rows. 

But if it has, say, 4 million rows, then it is a completely different story! 
Maintaining an index simply to filter out only, say, half the rows might add of questionable gain, especially in a 
write-heavy table. 

In this fictitious example (the query planner would probably [not let this 
happen in real life][9]), we see that the `index_apples_on_to_farm` index's 
scans result in `idx_tup_fetch` remaining at zero. 
We are looking at millions of entries in the index but do not go to the table 
to fetch the rows, in other words only a single disk read per row. 
This might not be that bad from a performance perspective.

The `index_apples_on_to_truck` index is a different story. 13 index scans,
each resulting in over 5.7 million index entries *and* rows fetched from
the table. This dual disk access (filter by index, then fetch row) may be 
hinting at 
* [incorrect table statistics][10]
* a completely unoptimized query 

Putting these figures into perspective with regards to the overall table 
size will show you if you have a potential problem in your hands. 

### 3. Abused index

![On fire](../images/postgres-indexes-queries/raquel-raclette-264225-unsplash.jpg)
> Photo by raquel raclette on Unsplash

Sometimes you may have an index, optimized and well-functioning per se, 
the statistics of which hint at some unoptimized query. 

Let's take a look at `index_apples_on_farm_id`.  
In this time period it has had close to 39 million scans. Each of these 
scans, on average, resulted in roughly 3 index entries and 3 rows returned. 
I.e. 39 million x 6 disk reads. 

The index per se seems highly selective and optimized; an index scan 
returns 3 entries. However it has been called millions and millions of 
times.  

This may be hinting at a sub-optimal join with a much larger table. 
Either due to an unfiltered join or bad query planner statistics, our 
`index_apples_on_farm_id` ends up hammered inside a [nested loop][11]. 

Again putting the statistics figures into perspective (magnitude of counters
vs size of tables vs user load) will help you focus your efforts. 

### 4. Well-functioning index (probably)

![Fast cheetah](../images/postgres-indexes-queries/deven-wesolowski-1096651-unsplash.jpg)
> Photo by Deven Wesolowski on Unsplash        

To contrast a bit with the above, let's look at the primary key index `apples_pkey`.  
It has been scanned ~100,000 times resulting in roughly the same number 
of index entries and rows returned. In other words, each scan returns a 
single row.  
In addition, the number of scans is not out of proportion as that of 
`index_apples_on_farm_id`. If it is used in JOINS, it is not in an 
uncontrolled way. 

In other words, if we are looking for things to improve, this should *not*
be the first place to look.

## Parting thought

![Doctor](../images/postgres-indexes-queries/arvin-chingcuangco-1337417-unsplash.jpg)
> Photo by Arvin Chingcuangco on Unsplash

You may have noticed that I have not written a single word about the underlying 
DB model of this example.

What does the application do?  
How many users/load does it have?  
How many tables are there?  
How do they relate with each other?  
How many rows does table X contain?

These (and more) are questions to start asking *after* you have established 
that something does not look right. The index statistics allow you to 
take a look at the database tables as an opaque black box, even with 
little initial domain knowledge. 

Same way that a doctor starts asking questions and probing deeper *after* 
something abnormal shows up during the regular check-up. 



   [1]: https://www.postgresql.org/
   [2]: https://eng.uber.com/mysql-migration/
   [3]: https://www.postgresql.org/docs/9.2/monitoring-stats.html
   [4]: http://rachbelaid.com/introduction-to-postgres-physical-storage/
   [5]: https://en.wikipedia.org/wiki/Write_amplification
   [6]: https://www.postgresql.org/docs/10/datatype-oid.html
   [7]: https://wiki.postgresql.org/wiki/Disk_Usage
   [8]: https://www.cybertec-postgresql.com/en/get-rid-of-your-unused-indexes/
   [9]: https://www.postgresql.org/docs/current/row-estimation-examples.html
   [10]: https://www.postgresql.org/docs/current/planner-stats.html
   [11]: https://malisper.me/postgres-nested-loop-joins/
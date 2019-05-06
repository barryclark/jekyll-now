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

True power of `pg_stat_user_indexes` 
lies when you examine how it changes over time

This can be very revealing of how your application's queries behave under the hood



## Parting thought

![Looking at me?](../images/wireshark-mobile/maria-teneva-1343355-unsplash.jpg)
> Photo by Maria Teneva on Unsplash

This does not solve the [write amplification][5] discussed in the article per se. But it will allow you to 
calibrate the use of your indexes and weed out inefficiences.  







   [1]: https://www.postgresql.org/
   [2]: https://eng.uber.com/mysql-migration/
   [3]: https://www.postgresql.org/docs/9.2/monitoring-stats.html
   [4]: http://rachbelaid.com/introduction-to-postgres-physical-storage/
   [5]: https://en.wikipedia.org/wiki/Write_amplification
   [6]: https://www.postgresql.org/docs/10/datatype-oid.html
   [7]: 
   
   
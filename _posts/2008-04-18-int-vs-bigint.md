---
title: int vs bigint
author: kgorman
layout: post
permalink: int-vs-bigint
fave-post_views:
  - 94
categories:
  - PostgreSQL
tags:
  - postgresql
---
So which one is a better use of space given that an application uses 32bit integers? In PostgreSQL, the int column takes only 4 bytes, and the bigint takes 8 bytes. So one would think there is significant space savings to be had by using int. In the real world with disk space costs where they are at, it just does not matter in a practical sense. Furthermore, if you are running on an <a href=http://en.wikipedia.org/wiki/Extent\_(file\_systems)>extent based filesystem</a> like ext3 or vxfs, then you really don&#8217;t see any practical benefits. Why? Well, your extent size is likely to be much larger then (number of tuples * 4 bytes) so the difference in size is masked because the FS sizes up to the next extent size. Consider the below example:

<pre lang="">vendor_id	: GenuineIntel
cpu family	: 6
model		: 23
model name	: Intel(R) Xeon(R) CPU           E5405  @ 2.00GHz
2.6.16.46-0.12-smp #1 SMP Thu May 17 14:00:09 UTC 2007 x86_64 x86_64 x86_64 GNU/Linux
pg_ctl (PostgreSQL) 8.2.4

postgres=# \d testtable2;
           Table "public.testtable2"
  Column  |          Type          | Modifiers
----------+------------------------+-----------
 id       | bigint                 | not null
 text     | character varying(200) |
 thecount | integer                |
Indexes:
    "testtable2_pk" PRIMARY KEY, btree (id)

postgres=# \d testtable3;
           Table "public.testtable3"
  Column  |          Type          | Modifiers
----------+------------------------+-----------
 id       | integer                | not null
 text     | character varying(200) |
 thecount | integer                |
Indexes:

postgres=# select count(*) from testtable2;
  count  
---------
 2253530
(1 row)

postgres=# select count(*) from testtable3;
  count  
---------
 2253530

postgres=# analyze testtable2;
ANALYZE
postgres=# analyze testtable3;
ANALYZE

postgres=# select tablename, attname, avg_width,n_distinct from pg_stats where tablename = 'testtable2';
 tablename  | attname  | avg_width | n_distinct
------------+----------+-----------+------------
 testtable2 | text     |        56 |          1
 testtable2 | thecount |         4 |          0
 testtable2 | id       |         8 |         -1

postgres=# select tablename, attname, avg_width,n_distinct from pg_stats where tablename = 'testtable3';
 tablename  | attname  | avg_width | n_distinct
------------+----------+-----------+------------
 testtable3 | thecount |         4 |          0
 testtable3 | id       |         4 |         -1
 testtable3 | text     |        56 |          1
(3 rows)

postgres=# SELECT * FROM pgstattuple('testtable3');
 table_len | tuple_count | tuple_len | tuple_percent | dead_tuple_count | dead_tuple_len | dead_tuple_percent | free_space | free_percent
-----------+-------------+-----------+---------------+------------------+----------------+--------------------+------------+--------------
 227917824 |     2253530 | 207324760 |         90.96 |                0 |              0 |                  0 |    1897096 |         0.83


</pre>

Two tables with the only difference being the testtable2 is int and testtable3 is bigint. Same number of rows. Different row sizes. Even pgstattuple shows different row lengths.

<pre lang="">postgres=# SELECT schemaname, tablename,
pg_size_pretty(size) AS size_pretty,
pg_size_pretty(total_size) AS total_size_pretty
FROM (SELECT *,
pg_relation_size(schemaname||'.'||tablename) AS size,
pg_total_relation_size(schemaname||'.'||tablename) AS total_size
FROM pg_tables where tablename like '%testtable%') AS TABLES
ORDER BY total_size DESC;
 schemaname | tablename  | size_pretty | total_size_pretty
------------+------------+-------------+-------------------
 public     | testtable2 | 217 MB      | 266 MB
 public     | testtable3 | 217 MB      | 266 MB

select relname, relpages from pg_class where relname in ('testtable2','testtable3');
  relname   | relpages
------------+----------
 testtable2 |    27822
 testtable3 |    27822
(2 rows)

postgres=# select 27822*8192;
 ?column?  
-----------
 227917824
(1 row)

postgres=# select 27822*8192/1024/1024;
 ?column?
----------
      217

</pre>

But since we are on an extent based filesystem, we see the exact same size on disk. So for anything other than the most extravagant setups, it&#8217;s smart to use bigint and not limit yourself to 32bit integers. There is no space penalty for doing so at least. There are <a href=http://archives.postgresql.org/pgsql-general/2007-06/msg00299.php>performance penalties in performing arithmetic on these columns</a>, but no downside in most practical applications. For instance, a row access by index.

<pre lang="">postgres=# select id from testtable2 where id = 2003;
  id  
------
 2003
(1 row)

Time: 0.131 ms

postgres=# select id from testtable3 where id = 2003;
  id  
------
 2003
(1 row)

Time: 0.165 ms

insert 100000 rows into testtable2 and commit:
Elapsed Seconds: 21.438544035
TPS: 4664.49586487

insert 100000 rows into testtable3 and commit:
Elapsed Seconds: 21.7363810539
TPS: 4600.58184258

</pre>

If you perform calculations on these id&#8217;s you do see a performance hit, so be careful:

<pre lang="">postgres=# select id*10000+45/10 from testtable2 where id = 2003;
 ?column?
----------
 20030004
(1 row)

Time: 0.268 ms
postgres=# select id*10000+45/10 from testtable3 where id = 2003;
 ?column?
----------
 20030004
(1 row)

Time: 0.133 ms

</pre>

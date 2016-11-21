---
title: Cluster data, save cash
author: kgorman
layout: post
permalink: cluster-data-save-cash
dsq_thread_id:
  - 134390090
fave-post_views:
  - 125
categories:
  - Database Engineering
  - PostgreSQL
  - Python
---
Since the economy is not exactly rocking these days, I suspect there are a lot of companies out there trying to save a buck or two on infrastructure. Databases are not exactly cheap, so anything that an engineer or DBA can do to save cycles is a win. So how do you stretch your existing hardware and make it perform more transactions for the same amount of cash?

Clustering your data is an approach to reducing load and stretching the capacity of your database servers. Clustering data is a technique where data is reorganized to match the query patterns very specifically and thus reducing the amount of logical (and also physical) I/O a database performs. This technique is not RDBMS product specific, it applies to <a href="http://www.oracle.com/database/index.html" target=1>Oracle</a>, [PostgreSQL][1], or most other block based row-store RDBMS. I am going to reference PostgreSQL and a very specific case where clustering data can produce huge performance gains.

<!--more-->

**What is data clustering?**

The basic principle of data clustering is aligning rows that are commonly queried together into the same, or closely located blocks to reduce the amount of logical I/O required for that query. Sometimes this can be done along join conditions, sometimes it can be done along range scan indexes. In my case I am going to be talking about clustering data when the query is a range scan of a single table.

For instance, here is an example:

```sql
>explain SELECT * FROM unclustered WHERE userid=2658075382 AND STATUS = 3;
                                                  QUERY PLAN
--------------------------------------------------------------------------------------------------------------
 Index Scan using unclustered_userid_status on unclustered  (cost=0.00..1038.04 rows=727 width=121)
   Index Cond: ((userid = 2658075382::bigint) AND (status = 3))
(2 rows)

>explain SELECT * FROM clustered WHERE userid=2658075382 AND STATUS = 3;
                                            QUERY PLAN
----------------------------------------------------------------------------------------------
 Index Scan using clustered_userid_stats on clustered  (cost=0.00..640.05 rows=684 width=121)
   Index Cond: ((userid = 2658075382::bigint) AND (status = 3))
(2 rows)
```

The top example does not have data clustered together. It takes approximately 1308 block fetches to fulfill the query. In the bottom example it takes approximately 684. This is the same query, same table, but in the bottom example the data has been clustered. So what does clustered vs non clustered data look like exactly? A query can be run to show where data lives in a block. The first element in the column ctid is the block number a row lives in. So (0,9) would mean the row lives in block #0 for that relation.

```sql
> select ctid, userid, status from unclustered order by userid, status limit 10;
   ctid    |   userid   | status
-----------+------------+--------
 (0,9)     | 2413610247 |      3
 (320,21)  | 2413610247 |      3
 (718,40)  | 2413610247 |      3
 (1786,28) | 2413610247 |      3
 (1791,54) | 2413610247 |      3
 (1791,60) | 2413610247 |      3
 (1792,5)  | 2413610247 |      3
 (1792,28) | 2413610247 |      3
 (1792,30) | 2413610247 |      3
 (1794,4)  | 2413610247 |      3
(10 rows)

> select ctid, userid, status from clustered order by userid, status limit 10;
  ctid  |   userid   | status
--------+------------+--------
 (0,6)  | 2413610247 |      3
 (0,7)  | 2413610247 |      3
 (0,9)  | 2413610247 |      3
 (0,13) | 2413610247 |      3
 (0,21) | 2413610247 |      3
 (0,37) | 2413610247 |      3
 (0,38) | 2413610247 |      3
 (0,22) | 2413610247 |      3
 (0,39) | 2413610247 |      3
 (0,40) | 2413610247 |      3
```

So if one were to run a query with the predicate based on userid,status = 2413610247,3 then the query would visit just data block #0 in the bottom example. In the top example it would visit many more. Not only is this more logical I/O, but it&#8217;s also more potential physical I/O, more strain on the cache waiting for buffers to be flushed, and less effective use of the cache.

**Choosing a cluster key:**

In order to cluster data there are some considerations. First, what is a suitable cluster key? A cluster key is a common key to arrange the data by. In the above examples it was userid,status. But it could be anything. Finding a suitable cluster key can sometimes be a bit of a challenge. In the above case, the data is queried in the form:

```sql
>SELECT &lt;cols> FROM &lt;tablename> WHERE userid=? AND status=?
```

And the following DML is performed:

```sql
DELETE FROM &lt;tablename> WHERE id = ?
UPDATE &lt;tablename> SET status = ? WHERE id = ?
INSERT INTO &lt;tablename> VALUES (&lt;values>)
```

In this case clustering the data is very obvious. Because the UPDATE and DELETE commands use the PK then they are ignorant to any data clustering because they always update only 1 row. However, the query gathers ranges of rows, so it&#8217;s clear the query can benefit from data clustering, and it&#8217;s clear the key should be userid,status because thats the common predicate of the queries. It&#8217;s true this is a simple example, and not all workloads may have this level of simplicity. This is something that data architects and DBA&#8217;s should remember when designing schema&#8217;s. You can design your database such that it can be data clustered!

A word of caution. Choose your cluster key carefully. If you cluster by one key only to find out that many queries use a different key, then you may hurt your performance and not help it. So know your workload and SQL and choose wisely.

**Finding poorly clustered databases and tables:**

If there are lots of databases under your care, it can be daunting to find the place to start looking for candidate tables to cluster, so we need a solution. Finding databases with poor clustering characteristics is not too difficult albeit not a perfect science. Finding candidate databases in a large group can be done by looking at the following metric on each database:

```
block fetches / query executions
```

If a system is a 1:1 ratio of block fetches per execution then it takes exactly one block (buffer) per executed SQL statement. For a variety of reasons this will never happen in a real database. But the lower the ratio the better then clustering, and likely the faster this database is. Comparing this value in a vacuum is pretty much useless, but it can give a high level gauge into how much logical I/O is happening on a database and might need further analysis. In PostgreSQL, the following query gives you the block fetches per execution (assuming the plans are using indexes to fetch and not sequentially scanning the tables):

```sql
>SELECT SUM(idx_tup_fetch)/(MAX(blks_read)+MAX(blks_hit)) as ratio
FROM pg_stat_database, pg_stat_user_tables;
        ratio
---------------------
 13.0855488510073424
(1 row)
```

In this case, on average it takes 13 buffers per query to give the result. Is this a lot? Well, it depends on the given workload of a database. Using our example above, it would be huge because I would expect each buffer would hold all of the rows per userid.

Once the database has been identified, figuring out what tables have poor data clustering is the next step. This can be done by sampling some number of the total rows and comparing the number of distinct blocks used by those rows. This result is also expressed as a ratio.

```
# of rows / # of distinct blocks those rows reside in
```

I automated this process into a little utility.

```sql
$> ./data_cluster_report.py -d dba -t unclustered -k userid,status -z 1000 -o 0
       Min Blocks per Key       Max Blocks per Key       Avg Blocks per Key                   StdDev   Total Number of Blocks            Avg Row Count            Max Row Count       Avg rows per block    Avg Clustering Factor
                        1                        7                   1.1216                      0.5                       18                      2.0                      330                    28024                   0.0623
$> ./data_cluster_report.py -d dba -t clustered -k userid,status -z 1000 -o 0
       Min Blocks per Key       Max Blocks per Key       Avg Blocks per Key                   StdDev   Total Number of Blocks            Avg Row Count            Max Row Count       Avg rows per block    Avg Clustering Factor
                        1                        3                   1.0428                     0.22                       19                      4.0                       73                     7869                   0.0549
```                      

The above utility shows that the average rows per block for the poorly clustered table is 7, and the good one 3. Then each table can be ranked by clustering factor. The utility can insert the results into a schema if there are a lot of tables to analyze and rank using the -i option.

**Clustering the data:**  
[PostgreSQL has the concept of clustered index][2], but here's the problem, utilizing this feature of PostgreSQL puts an exclusive lock on your table while the procedure completes. In my case most tables are larger than 1GB, and locking them while a cluster takes place is not an option. At it's core, clustering data is really simple;

```sql
CREATE TABLE clustered AS SELECT * FROM unclustered ORDER BY userid,status;
```

Thats it, an ORDER BY clusters a table by the key specified in the ORDER BY clause. In order to perform this action on tables and not have an impact on the users of the database a technique that differs from the cluster command is needed. Enter [pg_reorg][3].

**Using pg_reorg to cluster your data**  
First a little background on [pg_reorg][3]. This little utility was written by the folks at [NTT][4] and maintained on pg_foundry by [Takahiro Itagaki][5]. This utility allows for the online rebuild of any table by using a simple journalling technique (similar to discussed [here][6]). Essentially every change to the table is captured while a new copy of the table is created, then replayed right before the new temporary table is swapped for the old. A lock is only needed for the duration that the transactions started during the rebuild operation are applied. Using this technique whole databases can have the data clustered online and proactively. A big thanks to the folks at NTT for saving me the hassle of implementing this. There is an [email list][7] for pg_reorg.

```sql
$> /usr/local/pgsql/bin/pg_reorg -t unclustered -v -o userid,status -U postgres dba
---- reorg_one_table ----
target_name    : unclustered
target_oid     : 218005
target_toast   : 218007
target_tidx    : 218009
pkid           : 218100
ckid           : 0
create_pktype  : CREATE TYPE reorg.pk_218005 AS (id bigint)
create_log     : CREATE TABLE reorg.log_218005 (id bigserial PRIMARY KEY, pk reorg.pk_218005, row unclustered)
create_trigger : CREATE TRIGGER z_reorg_trigger BEFORE INSERT OR DELETE OR UPDATE ON unclustered FOR EACH ROW EXECUTE PROCEDURE reorg.reorg_trigger('INSERT INTO reorg.log_218005(pk, row) VALUES( CASE WHEN $1 IS NULL THEN NULL ELSE (ROW($1.id)::reorg.pk_218005) END, $2)')
create_table   : CREATE TABLE reorg.table_218005 WITH (oids=false) TABLESPACE pg_default AS SELECT * FROM ONLY unclustered ORDER BY userid,status
delete_log     : DELETE FROM reorg.log_218005
lock_table     : LOCK TABLE unclustered IN ACCESS EXCLUSIVE MODE
sql_peek       : SELECT * FROM reorg.log_218005 ORDER BY id LIMIT $1
sql_insert     : INSERT INTO reorg.table_218005 VALUES ($1.*)
sql_delete     : DELETE FROM reorg.table_218005 WHERE (id) = ($1.id)
sql_update     : UPDATE reorg.table_218005 SET (id, touserid, fromuserid, userid, timeadded, status, body, photoid1, id1) = ($2.id, $2.touserid, $2.fromuserid, $2.userid, $2.timeadded, $2.status, $2.body, $2.photoid1, $2.id1) WHERE (id) = ($1.id)
sql_pop        : DELETE FROM reorg.log_218005 WHERE id &lt;= $1
---- setup ----
---- copy tuples ----
---- create indexes ----
[0]
target_oid   : 218104
create_index : CREATE INDEX index_218104 ON reorg.table_218005 USING btree (touserid, status, timeadded)
[1]
target_oid   : 218103
create_index : CREATE INDEX index_218103 ON reorg.table_218005 USING btree (timeadded)
[2]
target_oid   : 218102
create_index : CREATE INDEX index_218102 ON reorg.table_218005 USING btree (userid,status)
[3]
target_oid   : 218100
create_index : CREATE UNIQUE INDEX index_218100 ON reorg.table_218005 USING btree (id)
---- swap ----
---- drop ----
```

Running pg\_reorg is similar to other utilities like pg\_dump. Just run it from the command line, and it takes care of all the journalling, creating a new ordered table, reproducing all the indexes, and then performing the swap.

```sql
dba=# explain select ctid, userid, status from unclustered where userid=2413610247 and status=3 limit 10;
                                          QUERY PLAN
----------------------------------------------------------------------------------------------
 Limit  (cost=0.00..5.01 rows=2 width=18)
   ->  Index Scan using unclustered_photoid on unclustered  (cost=0.00..5.01 rows=2 width=18)
         Index Cond: (userid = 2413610247::bigint)
         Filter: (status = 3)
```

And now our table is clustered!

**Real world effects of data clustering:**  
I mentioned in the opening of this post that there are real world gains to be had by using this technique. Let me give an example, let's say you have 10 databases all running a similar workload. Let's say those 2 databases each have many tables that are inserted into in random order and each row has a userid 'owner'. These tables get queries at the rate of about 5000 queries per second. Since they are inserted in random order they are almost guaranteed to have poor data clustering. The query selects many rows per fetch by userid. If these tables are clustered then what would could the gain be?

Here is an example of load average before and after clustering. It's just about a 50% drop in load average day to day.

<img src="http://www.kennygorman.com/wordpress/wp-content/uploads/2009/02/metricchart-4.png" alt="metricchart-4" title="metricchart-4" width="500" class="alignnone size-full wp-image-353" />

On the left is the 5 minute load average. The blue line represents a database that had important tables clustered on 2/11. The red line represents a similar database server that did not have it's data clustered. The difference is, almost 50% in this case.

**Maintenance:**  
This technique does require some maintenance however. Once the data in a table is clustered, it immediately may start to have poorly clustered data inserted into it again. So this process may need to be repeated at some interval to maintain the benefits. I view it in a similar way to running vacuums via auto-vacuum. I keep [rrdtool][8] graphs showing block fetches / query executions rates over time to keep a tab on how well databases are clustered, and as a tool to decide on when to run pg_reorg.

Of course the best database design is the one that avoids the need to change the data clustering, but life is full of compromises. This tool can help stretch your hardware or just as a technique to tune up your database.

 [1]: http://www.postgresql.org/
 [2]: http://www.postgresql.org/docs/8.3/interactive/sql-cluster.html
 [3]: http://pgfoundry.org/projects/reorg/
 [4]: http://www.ntt.co.jp/RD/OFIS/active/2006pdfe/rd/index.html
 [5]: http://www.pgcon.org/2008/schedule/speakers/75.en.html
 [6]: http://en.wikipedia.org/wiki/Transaction_processing#Rollforward
 [7]: http://pgfoundry.org/mailman/listinfo/reorg-general
 [8]: http://www.rrdtool.org

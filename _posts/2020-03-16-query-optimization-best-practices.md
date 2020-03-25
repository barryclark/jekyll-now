---
layout: post
title: Hive Query Optimization Best Practices
tags: hive, tez, apache, big data
last_updated: 2020-03-16
---

Use map joins:
using map joins is very efficient because one table (usually a dimension table) is held in memory as a hash map on every node, and the larger fact table is streamed. This minimizes data movement, resulting in very fast joins. However, there must be enough memory for the in-memory tables, so you must set more memory for a Tez container.
(change these to bytes)
Set Tez container size to be larger multiple of the YARN container size.
`SET hive.tez.container.size=4096MB;`
Set how much of this memory can be used for tables stored as the hashmap (on-third of the Tez container size is recommend)
`SET hive.auto.conver.join.noncontditionaltask.size=1370MB`

For example, if you discover you are not getting map joins, check the size of your Tez Containers in relation to YARN Containers. The size of Tez containers must be a multiple of the YARN container size. For example, if your YARN containers are set to 2GB, set Tez container size to 4GB. Then run the EXPLAIN command with your query to view the query execution plan to make sure you are getting map joins instead of shuffle joins. Keep in mind that if your Tez containers are too large, space is wasted. Also, do not configure more than one processor per Tez container to limit the size of your most substantial container. As an example, if you have 16 processors and 64GB of memory, configure one Tez container per processor and set their size to 4GB and no larger.

hive.auato.convert.join .noconditionaltask.size determine whether the tables are broadcasted or shuffled for a join. If the table size is larger than hive.auto.conver.join.noconditionaltask.size a shuffle join is used. For accurate size accounting by the compiler run ANALYZE TABLE <TABLE_NAME> COMPUTE STATISTICS for columns. Then enable hive.stats.fetch.column.stats. This enables the Hive physical optimizer to use more accurate per-column statistics instead of the uncompressed file size in HDFS.

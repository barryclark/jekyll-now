---
title: Mapping Linux memory for PostgreSQL using fincore
author: kgorman
layout: post
permalink: mapping-linux-memory-for-postgresql-using-fincore
fave-post_views:
  - 142
categories:
  - PostgreSQL
tags:
  - postgresql
  - Python
---
PostgreSQL, more-so than other databases generally relies on OS file system cache to keep performance high. It is pretty common not to see gains in performance for buffer cache sizes over about 2GB, why this is true I am unsure, but perhaps the tracking of buffer overhead becomes high? Anyways, since the OS buffer cache keeps file buffers in memory as well, there are lots of database objects in the PostgreSQL cache, OS cache, or both. We can debate <a href=http://en.wikipedia.org/wiki/Double_buffering>double buffering</a> later.

To see what is in the PostgreSQL cache, one can use the contrib module (and now built in in 8.3) <a href=http://www.postgresql.org/docs/current/static/pgbuffercache.html>pg_buffercache</a> to map each object with it's footprint in cache. But, if one wanted to see the entire cache picture, including OS cache, how would that be done?

Enter fincore, pronounced 'eff in core';. This utility was originally presented at <a href=http://www.usenix.org/events/lisa07/tech/plonka.html>LISA2007</a> by David Plonka, Archit Gupta, and Dale Carder of University of Wisconsin at Madison. This utility (and the sister utility <a href=http://net.doit.wisc.edu/~plonka/fadvise/>fadvise</a>) are great utilities to find out what your PostgreSQL database has pulled into OS cache.

In order to see what database objects these files map to, we can just query the database itself and join each database object to it&#8217;s associated OS file using pg_class.relfilenode. Then call fincore for each file name, and output the resulting # of pages per database object. Slow but simple.

I put together some python to glue this all together. The best way would be to use perl, and use fincore as a module. In our environment at least we have standardized on python and psycopg2 for database access. So this script utilizes fincore on the command line and captures the output. Perhaps not as clean as I would have liked, but this tool is not used every day. In our case we left fincore stock as we downloaded it in order to keep these components as separate as possible. This is also a diagnostic tool; it&#8217;s quite slow and resource consumptive. If you have lots of objects things might get slow. YMMV.

Using this code, one can see the set of most used buffers in the OS cache, and compare them to the PG cache. Sizes are in bytes.

```
    $>./pg_osmem.py
	postgres:accounts:268435456
	postgres:tellers:3332096
	postgres:branches:3155968
	postgres:history:615424
	postgres:pg_proc:96256
	postgres:tellers_pkey:91136
	postgres:pg_depend:75776
	postgres:pg_proc_proname_args_nsp_index:74752
	postgres:pg_depend_reference_index:58368
	postgres:pg_statistic:55296
	postgres:pg_attribute:55296
	postgres:pg_depend_depender_index:51200
	postgres:pg_attribute_relid_attnam_index:49152
	postgres:pg_toast_2618:36864
	postgres:pg_description:34816
	postgres:pg_operator:28672
	postgres:pg_description_o_c_o_index:23552
	postgres:pg_operator_oprname_l_r_n_index:22528
	postgres:pg_rewrite:18432
	postgres:pg_proc_oid_index:16384
	postgres:pg_class_relname_nsp_index:16384
	postgres:pg_type_typname_nsp_index:14336
	postgres:pg_attribute_relid_attnum_index:14336
	postgres:branches_pkey:14336
	postgres:sql_features:12288

```

And then you can see that the PG buffer cache has the following:

```sql
    postgres=# SELECT current_database(),c.relname, count(*)*8192 as bytes
	postgres-# FROM pg_buffercache b INNER JOIN pg_class c
	postgres-# ON b.relfilenode = c.relfilenode AND
	postgres-# b.reldatabase IN (0, (SELECT oid FROM pg_database
	postgres(# WHERE datname = current_database()))
	postgres-# GROUP BY c.relname
	postgres-# ORDER BY 3 DESC LIMIT 25;

	 current_database |             relname             |   bytes
	------------------+---------------------------------+-----------
	 postgres         | testtable                       | 376979456
	 postgres         | accounts                        | 309608448
	 postgres         | accounts_pkey                   | 225583104
	 postgres         | testtable_pk                    | 141058048
	 postgres         | branches                        |  10715136
	 postgres         | tellers                         |   5488640
	 postgres         | history                         |   2457600
	 postgres         | tellers_pkey                    |    360448
	 postgres         | pg_proc                         |    131072
	 postgres         | pg_operator                     |    106496
	 postgres         | pg_attribute                    |     65536
	 postgres         | pg_operator_oprname_l_r_n_index |     65536
	 postgres         | pg_proc_oid_index               |     65536
	 postgres         | branches_pkey                   |     57344
	 postgres         | pg_statistic                    |     57344
	 postgres         | pg_attribute_relid_attnum_index |     49152
	 postgres         | pg_class                        |     49152
	 postgres         | pg_class_relname_nsp_index      |     49152
	 postgres         | pg_depend_reference_index       |     49152
	 postgres         | pg_type_typname_nsp_index       |     40960
	 postgres         | pg_proc_proname_args_nsp_index  |     40960
	 postgres         | pg_statistic_relid_att_index    |     40960
	 postgres         | pg_operator_oid_index           |     32768
	 postgres         | pg_opclass_am_name_nsp_index    |     24576
	 postgres         | pg_amop_opr_opc_index           |     24576



```

---
title: Tuning for very large shared_buffers, using Veritas VxFS
author: kgorman
layout: post
permalink: tuning-for-very-large-shared_bufffers-using-veritas-vxfs
dsq_thread_id:
  - 134390082
fave-post_views:
  - 526
categories:
  - Database Engineering
  - PostgreSQL
tags:
  - direct i/o
  - hp
  - postgresql
  - vxfs
---
[<img src="http://www.kennygorman.com/wordpress/wp-content/uploads/2008/12/c012156172.jpg" alt="" title="c012156172" width="300" height="122" class="alignnone size-medium wp-image-296" />][1]

The [debate about][2] the optimum shared_buffers size in PostgreSQL is clearly far from over. However, I have not seen any results where the buffer cache and the FS cache were tuned in unison.

Because PostgreSQL knows what buffers are in use, and knows when to flush the dirty buffers it is ideal to use as much of it as possible. Using an secondary cache (the FS) as in a &#8216;traditional&#8217; PostgreSQL configuration, just introduces more workload in the system. The secondary cache needs a process to wake up and flush the buffers ([pdflush][3]), and also has to manage it&#8217;s own LRU, and likely has many duplicate buffers sitting there wasting your precious RAM.

The point I am trying to stress is that the PostgreSQL cache \*and\* the FS cache must be tuned together. In this case, I remove the FS cache entirely using [direct I/O][4], and then take over that space with the fastest cache in the stack; the [PostgreSQL buffer cache][5].

So here is a bit of testing to show the results.

The testing was performed on a set of nice new [HP DL185][6] G5&#8242;s with 14 72GB 15k SAS Drives and Quad Core Opteron processors and 32GB of main memory. The OS is SUSE Linux EnterpriseServer 10 SP1 (x86_64) 2.6.16.46-0.12-smp. The filesystem is Veritas VxFS file system. The version of PostgreSQL tested is 8.2.5.

The test itself is a set of custom [pgbench][7] scripts. These scripts were developed using actual data from production PostgreSQL log files, and [pgfouine][8]. The access pattern is about 70% read, with 15% update and 15% insert. There is no delete activity. This matches a very specific workload on a subset of our production databases. The workload is random, and the total data size is larger than our cache size by a very large amount, this guarantees a good workout of physical disk and caches in front of them. The WAL logs and data were on the same VxFS volume.

The test runs were gathered with [pgd][9], and [graphed][10]. Between each test the filesystem was unmounted and remounted. I tested each run 3 times and averaged the tests.

Test#1:  
VxFS buffered I/O  
shared_buffers=500MB  
disk controller cache=512MB write, 0MB read  
500GB total data size  
36 concurrent backends

Test#2:  
VxFS buffered I/O  
shared_buffers=2GB  
disk controller cache=512MB write, 0MB read  
500GB total data size  
36 concurrent backends

Test#3:  
VxFS with convosync=direct,mincache=direct  
shared_buffers=20GB  
disk controller cache=512MB write, 0MB read  
500GB total data size  
36 concurrent backends

[<img src="http://www.kennygorman.com/wordpress/wp-content/uploads/2008/12/cache_test2.jpg" alt="" title="cache_test2" width="500" class="alignnone size-medium wp-image-320" />][11]

Conclusion:  
A modest gain can be had when using a very large (comparatively) shared_buffers setting when combining that change with direct I/O. The PostgreSQL cache does scale quite nicely up to at least a 20GB cache size when configured in this manner.

Further gains could likely be achieved by separating the WAL logs with specific VxFS tunables as well as tuning other PostgreSQL parameters due to the larger cache (bgwriter tunables, etc).

 [1]: http://www.kennygorman.com/wordpress/wp-content/uploads/2008/12/c012156172.jpg
 [2]: http://archives.postgresql.org/pgsql-performance/2008-05/msg00359.php
 [3]: http://www.westnet.com/~gsmith/content/linux-pdflush.htm
 [4]: http://www.solarisinternals.com/wiki/index.php/Direct_I/O
 [5]: http://www.westnet.com/~gsmith/content/postgresql/InsideBufferCache.pdf
 [6]: http://h10010.www1.hp.com/wwpc/us/en/sm/WF25a/15351-15351-3328412-241644-3328421-3579900.html
 [7]: http://developer.postgresql.org/pgdocs/postgres/pgbench.html
 [8]: http://pgfouine.projects.postgresql.org/
 [9]: http://www.kennygorman.com/wordpress/?p=260
 [10]: http://www.kennygorman.com/wordpress/?p=261
 [11]: http://www.kennygorman.com/wordpress/wp-content/uploads/2008/12/cache_test2.jpg

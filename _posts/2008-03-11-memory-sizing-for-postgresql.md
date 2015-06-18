---
title: Memory sizing for PostgreSQL
author: kgorman
layout: post
permalink: memory-sizing-for-postgresql
dsq_thread_id:
  - 134389811
fave-post_views:
  - 270
categories:
  - Database Engineering
  - PostgreSQL
tags:
  - database
  - PostgreSQL
---
I needed to make an assessments of a linux server&#8217;s memory footprint consumed by postgresql, however, calculating the exact memory footprint of a postgresql database is not as straightforward as one might think. Since unix utilities like top, and ps tend to show some amount of shared memory usage in their tallies, they are next to useless for this purpose. The other problem is Linux caches filesystem buffers to fill up most free space on the box, so deciphering what is actually used by postgresql and what is really filesystem buffers is confusing as well. The calculation needed to be just a reasonable estimate of the memory usage, so this method is non-perfect, but should be good for most planning purposes.

In order to come up with the memory usage, I decided to subtract the postgresql usage from the total memory footprint shown in [/proc/meminfo][1]. I divided up the postgresql memory usage parameters into two types of consumption:

1.  fixed memory usage &#8211; memory consumption that doesn&#8217;t change rapidly
2.  variable memory usage &#8211; memory consumption that does change rapidly

An example of fixed memory is anything allocated at startup that remains relatively fixed, an example of variable buffers is anything multiplied by the number of connections.

fixed parameters:

1.  shared_buffers
2.  wall_buffers
3.  max_fsm_pages

variable parameters:

1.  work_mem
2.  maintenance_work_mem

Using /proc/meminfo and the postgresql.conf file one can calculate the memory footprint with a reasonably high degree of certainty using:

```
(MemTotal-MemFree-Cached)-((shared_buffers*8)+(wal_buffers*8)+((fsm_pages*6)/1024))=variable size in KB
```

For instance:

```
$>cat /proc/meminfo
MemTotal: 32876680 kB
MemFree: 1762176 kB
Buffers: 256664 kB
Cached: 30040432 kB
$>cat /data/postgresql.conf | grep buffers
shared_buffers = 65535 # min 16 or max_connections*2, 8KB each
wal_buffers = 1024 # min 4, 8KB each

$>cat /data/postgresql.conf | grep fsm
max_fsm_pages = 8000000 # min max_fsm_relations*16, 6 bytes each
max_fsm_relations = 2000 # min 100, ~70 bytes each
$>cat /data/postgresql.conf | grep mem
work_mem = 32768 # size in KB
maintenance_work_mem = 768000 # min 1024, size in KB
```

Thus:

```(32876680-1762176-30040432)-(524280+8192+46875)=494725 KB```

Now that we have the variable memory size, we have defined the major components of the memory footprint. Then we can calculate the average size of each backend process by dividing the total usage by the number of backend processes. Assuming for we expect very few, or perhaps no backends consuming maintenance_work_mem at any time (for instance auto-vacuum's running)

```
$>ps -ef | grep "postgres: postgres" | grep -v grep | wc -l
122
$>echo 494725/122 | bc
4055
```

So each connection consumes avg ~4KB. We can now adjust, tune, and play what-if with those numbers as we desire.

It makes sense to sample the number of backend connections and memory usage during different periods of the day and/or during batch runs, etc to get a good read on the usage throughout the day.

 [1]: http://www.redhat.com/advice/tips/meminfo.html

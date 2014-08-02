---
title: Dropping ACID
author: kgorman
layout: post
permalink: dropping-acid
dsq_thread_id:
  - 134390166
fave-post_views:
  - 4081
categories:
  - Data Architecture
  - Database Engineering
  - Mongodb
  - MySQL
  - Oracle
tags:
  - acid
  - architecture
  - cap theorem
  - durability
  - MySQL
  - Oracle
  - postgresql
  - replication
  - scalability
---
The [de-facto durability story in MongoDB][1] is essentially&#8230; there is none. Or at least single server durability. OMFG! No ACID WTF! &^%#^#?!

For the next generation of internet scale, downtime intolerant systems, ACID may not be a desirable property.

Traditional data stores like Oracle, PostgreSQL and MySQL all have a durability design built in. They are all [ACID][2] compatible databases. The &#8216;D&#8217; stands for durability. Meaning, when someone issues a commit(); then the database ensures the change is [durable][3]. When a write is requested from the caller and the ack comes back as complete, then the change is on &#8216;disk&#8217;.

However, single server durable systems have these drawbacks at internet scale:

1.  Must repair/replay on recovery. The customer/application must wait for this to complete.
2.  Must wait for disk(s) to spin on every commit(). Performance suffers or more complicated hardware must be used.
3.  Trust the hardware to ensure the write actually happened

In MongoDB, the ack comes back to the caller as soon as the change is in RAM, which is volatile. So if the server crashes before that change flushes from memory to disk, poof your data is gone!

Incidentally, many folks run ACID compliant databases and are unknowingly not durable because they fail to setup the hardware correctly. There are many levels of caching on todays modern architectures, and one must be very careful that every level is properly synchronously flushing to disk in order to make sure the entire stack is correctly reporting when a change is considered durable. PostgreSQL has a [manual page][4] dedicated to the subject. It can be turned &#8216;off&#8217; but it may lead to corruption. Oracle has [Asynchronous commit][5] which is a really nice implementation allowing application level control of commit behavior.

When using any persistent data store that is not ACID compliant, something must be in place to make sure the writes are durable at some point OR just not care if you miss some data on crash. If you are building a large cluster of databases then you can [expect][6] [MTBF][7] to increase in proportion to the number of machines being used in the cluster.

Many internet scale systems these days have a very low tolerance for downtime. So if a server crashes the [MTTR][8] must be very low. Take the [death of RAID][9] as example. My trusted source says we can expect ultra high capacity disks sooner than StorageMojo indicates. The take away is that fairly soon, RAID won&#8217;t be a viable option for an uptime sensitive internet scale data store.

Many current large scale systems currently have a concept of a replica database. It be for scaling reads or just for backup purposes or both. However, most existing systems don&#8217;t synchronously guarantee the write has made it to N replicas. Some traditional RDBMS systems <a href="http://www.oracle.com/technology/deploy/availability/pdf/NeuStarProfile.pdf" target="_blank">can function</a> so that a named replica(s) get written to. This is still an ACID model however.

Here is where I think Eliot&#8217;s comments and design become viable: Don&#8217;t try to be durable to any single machine. Hardware fails and disk is slow. Instead, be durable to a set of machines. That is: &#8220;ensure a write makes it to *N *machines in a set&#8221;. Just be durable to the memory on those machines. For instance, if you have a single master and three replicas, then a commit will be considered good when (and block until) it makes it to the master plus two slaves.

Using the [model outlined by Werner Vogels][10], this would be:  
`<br />
N=3, W=2, R*=1   (fault tolerant, read what you wrote)<br />
`

*When R=1, then it should mean the master not any slave.

If an application was such designed and could tolerate eventually consistent data, then one could optionally configure for:  
`<br />
N=3, W=2, R=3 (eventually consistent, fault tolerant, read scalable)<br />
`

From a durability standpoint, this design could be called: Nsync Replication as Durability, or NRaD.

This type of design has one very nice attribute. It does not require expensive servers with fancy disk subsystems to ensure durability, thus absolutely rock bottom inexpensive hardware can be used. We no longer have any requirement on battery backed cache controllers, SATA drive caches, disk architecture or even [RAID][11]. We now have a cluster composed of an *redundant array of inexpensive computers*. Knowledge of [direct I/O][12], async I/O, [SATA Drive Caches][13], Battery Backed Caches, Partial Writes, RAID, and many other complexities just simply don&#8217;t matter much or at all. RAID may still be desirable such that a single drive failure doesn&#8217;t cause the cluster to fail over often. But the complication of the stack has dropped massively. The cost of each machine has dropped massively.

So what is the downside with a NRaD? Of course more than one machine is needed for this type of architecture. It&#8217;s important to make sure that all the machines are located in separate failure domains. A *failure domain* is a group of items all likely to fail at once because of a common dependency. For instance, an entire rack or a whole data center. So keeping the master and replicas in separate failure domains helps to ensure no single event brings them all down. In addition, at least two hosts are required. Latency may be increased. But not guaranteed depending on I/O capabilities of durable systems. Synchronously writing to more than one machine means the calling process must wait for this process to happen. It may introduce latency in your application, but more than spinning disks? Also, this type of architecture requires the application to tolerate an eventually consistent model (depending on config). Data is not guaranteed to be consistent on all machines.

Does this fly in the face of the [CAP Theorem][14]? No, data is not guaranteed to be on all replicas. Just N. N may be a subset. The user could configure the system to fit the specific needs of the application in question and focus on just durability or focus on durability plus read scalability.

Just to be clear, the requirements for an NRaD system might not make sense for everyone. YMMV. But for a vast majority of downtime sensitive, internet scale persistent stores, it seems like a very good fit.

If your a MongoDB user and want Nsync Replication as Durability in the server, [vote/comment for it here][15]. There is some work to do to get the product to the point where it would perform replication as durability.

 [1]: http://blog.mongodb.org/post/381927266/what-about-durability
 [2]: http://en.wikipedia.org/wiki/ACID
 [3]: http://en.wikipedia.org/wiki/Database_transaction
 [4]: http://www.postgresql.org/docs/8.3/static/wal-reliability.html
 [5]: http://articles.techrepublic.com.com/5100-10878_11-6158695.html
 [6]: http://static.googleusercontent.com/external_content/untrusted_dlcp/labs.google.com/en/us/papers/disk_failures.pdf
 [7]: http://en.wikipedia.org/wiki/Mean_time_between_failures
 [8]: http://en.wikipedia.org/wiki/Mean_time_to_recovery
 [9]: http://storagemojo.com/2010/02/27/does-raid-6-stops-working-in-2019/
 [10]: http://www.allthingsdistributed.com/2007/12/eventually_consistent.html
 [11]: http://en.wikipedia.org/wiki/RAID
 [12]: http://blogs.sun.com/bobs/entry/one_i_o_two_i
 [13]: http://wiki.postgresql.org/wiki/SCSI_vs._IDE/SATA_Disks
 [14]: http://en.wikipedia.org/wiki/CAP_theorem
 [15]: http://jira.mongodb.org/browse/SERVER-467

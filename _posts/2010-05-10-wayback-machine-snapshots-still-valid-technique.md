---
title: 'Wayback Machine: snapshots still valid technique'
author: kgorman
layout: post
permalink: wayback-machine-snapshots-still-valid-technique
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1
fave-post_views:
  - 71
categories:
  - Database Engineering
  - Mongodb
  - Oracle
  - PostgreSQL
tags:
  - backups
  - Oracle
  - postgresql
  - snapshots
---
I came across this [old article][1] I wrote for the [NOCOUG][2] newsletter in 2002 about using OS snapshots for backups. This technique is still very much a valid and widely used technique to perform backups. The idea is simple:

- Stop I/O temporarily  
- Snapshot the filesystem (OS snapshot, rsync, whatever)  
- Release I/O  
- Backup any logs needed to recover point in time

This technique works for many different data stores. In the article I only show Oracle. But many other databases have the same capabilities for backups. Here are some examples:

PostgreSQL:

<pre lang="sql">SELECT pg_start_backup('label');
-- snapshot the DB here
SELECT pg_stop_backup();
-- backup wal logs here
</pre>

You can find all the details of this kind of backup in the [PostgreSQL docs][3].

MongoDB:

<pre lang="java">> use admin
switched to db admin
> db.runCommand({fsync:1,lock:1})
{
	"info" : "now locked against writes",
	"ok" : 1
}
// snapshot the DB here
> db.$cmd.sys.unlock.findOne();
{ "ok" : 1, "info" : "unlock requested" }
</pre>

You can find the docs on this procedure on the [MongoDB site][4].

I thought I would include the original article here even though it&#8217;s going on 8 years old!

[OS Snapshots for Backup;  
Utilizing operating system snapshots for quick and painless Oracle database backup and restore.][1] from VOL. 16, No. 2 · MAY, 2002 of the NOCOUG Journal

 [1]: http://www.kennygorman.com/2002_os_snapshots_for_backup.pdf
 [2]: http://www.nocoug.org/
 [3]: http://www.postgresql.org/docs/8.1/interactive/backup-online.html
 [4]: http://www.mongodb.org/display/DOCS/Backups

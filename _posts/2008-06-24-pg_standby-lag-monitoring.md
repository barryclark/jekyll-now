---
title: pg_standby lag monitoring
author: kgorman
layout: post
permalink: pg_standby-lag-monitoring
fave-post_views:
  - 601
tags:
  - postgresql
  - Python
---
I have been using [pg_standby][1] quite a bit lately, and thus we needed some management tools around it. Â One simple thing that was sorely missed was lag monitoring. Â When you have 100&#8242;s of standby&#8217;s, Â and many of them on the bleeding edge of keeping up with the primary, then lag monitoring is very important. Â Heck, it&#8217;s even important if you just have one standby database.Â  If your standby is lagging when you need it, you might effect your ability to have a up to date database when you fail over to it. The problem is that PostgreSQL has no way to actively query the database for it&#8217;s lag amount, because it&#8217;s actively recovering. Â So one must rely on the control file for the last checkpoint time as the most accurate marker of how up to date the standby actually is.Â Here is some code for implementing this:Â 

<pre lang='python'>#!/home/postgres/python/bin/python
#
#
# script returns number of seconds since last checkpoint
# to be used for standby lag detection
#
import os
import commands
import string
import time
import datetime

pg_controldata  ="/usr/local/pgsql/bin/pg_controldata"
cmd             =pg_controldata+" /data/mydb"

out = commands.getoutput(cmd)
line = string.split(out, "\n")
checkpoint_date_dict = string.split(line[16], ": ")
checkpoint_date=checkpoint_date_dict[1].lstrip()
# format: Thu 08 May 2008 01:58:18 PM PDT
checkpoint_epoch = int(time.mktime(time.strptime(checkpoint_date, '%a %d %B %Y %H:%M:%S %p %Z')))

t = datetime.datetime.now()
now = time.mktime(t.timetuple())

print "lag="+str(now-checkpoint_epoch)

</pre>

The output of this script is quite simple, so it can be called from monitoring solutions like <a href=http://www.hyperic.com/>HQ</a> or whatever you use in-house. You will need to alter the line that shows where your base installation is; pg_controldata+&#8221; /data/mydb/&#8221; in my example.

<pre lang='text'>$>./pg_standby_lag.py
$>lag=10
</pre>

This indicates the standby is 10 seconds lagging from the primary. Perhaps you alert when you see lag over 3600 (or 1 hour).

 [1]: http://www.postgresql.org/docs/current/static/pgstandby.html

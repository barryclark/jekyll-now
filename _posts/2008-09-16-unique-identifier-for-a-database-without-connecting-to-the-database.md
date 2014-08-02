---
title: Unique identifier for a database without connecting to the database?
author: kgorman
layout: post
permalink: unique-identifier-for-a-database-without-connecting-to-the-database
fave-post_views:
  - 70
categories:
  - PostgreSQL
tags:
  - postgresql
  - Python
---
In PostgreSQL, the working directory is a unique identifier for a database, and sometimes you want to use that working dir in your script(s). But what if you don&#8217;t want to actually connect and query the database? Is there a way to find out the unique identifier for the db? In a high transaction environment, making the archive process fast and efficient is very important, so keeping an eye on efficiency when coding up these little bits is paramount. The key lies in the /proc/ filesystem in Linux. Here is a little function that returns the unique identifier:

<pre lang="python">import os
def getbase():  
  ppid=os.getppid()  
  cwd=os.readlink("/proc/"+str(ppid)+"/cwd")  
  rwd=cwd.replace("/","_")  
  return cwd,rwd
</pre>

This comes in handy, for instance, in a script that processes archived WAL logs. This way no db queries are required in order to uniquely name logs by prepending the variable &#8216;rwd&#8217; from the above example to it&#8217;s name. One thing to remember is that os.getppid is the parent process, so if you launch this by hand on the OS, you will not get the directory you expect.

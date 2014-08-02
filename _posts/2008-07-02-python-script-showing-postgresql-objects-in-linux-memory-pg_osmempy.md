---
title: 'Python script showing PostgreSQL objects in linux memory: pg_osmem.py'
author: kgorman
layout: post
permalink: python-script-showing-postgresql-objects-in-linux-memory-pg_osmempy
dsq_thread_id:
  - 134389995
fave-post_views:
  - 990
categories:
  - PostgreSQL
tags:
  - postgresql
  - Python
---
I got some email and comments about the code I used for <a href=http://www.kennygorman.com/wordpress/?p=246>my post</a>; *Mapping Linux memory for PostgreSQL using fincore* so I thought I would post the code I am using. Nothing too fancy here, it needs a config file and some more bits. I highly recommend someone do this in perl vs python and incorporate fincore as a module instead. I used <a href=http://www.initd.org/svn/psycopg/>psycopg2</a>, other than that, all the other modules are stock with python <a href=http://www.python.org/>2.5.2</a>. If someone wants to show me how to query the data directory PostgreSQL is currently using and incorporate that into the script vs the static string: mydir = &#8220;/data/mydb/base&#8221;, that would be great. In order to use this script, you must change the variables for fincore, and mydir below.

<pre lang="python">#!/home/postgres/python/bin/python
#
# script to find show memory usage of PG buffers in OS cache
# 2008 kcg
#
import os
import psycopg2
import commands
import re
import sys
from optparse import OptionParser

parser = OptionParser()
parser.add_option("-u","--username",dest="username",help="username for PostgreSQL")
parser.add_option("-m","--machine",dest="machine",help="machine to connect to.. aka: hostname")
parser.add_option("-d","--dbname",dest="dbname",help="database name to connect to")
parser.add_option("-p","--password",dest="password",help="password for PostgreSQL")
(options, args) = parser.parse_args()

osmem   ={}
# change these to match actual locations
fincore ="/home/kgorman/fincore.pl"
mydir   = "/data/mydb/base"

# get list of dbs on host, and return dictionary of db=oid sets
def lookup_dbs():
 dbs={}
 connectstr="host="+options.machine+" dbname="+options.dbname+" user="+options.username+" port=5432 password="+options.password
 handle=psycopg2.connect(connectstr)
 curs=handle.cursor()
 sql="select datname,oid from pg_database where datname = '"+options.dbname+"' and datname not like '%template%'"
 curs.execute(sql)
 for d in curs.fetchall():
   dbs[d[0]]=d[1]
 return dbs

# get object
def lookup_oid(oid,dbname):
 connectstr="host="+options.machine+" dbname="+dbname+" user="+options.username+" port=5432 password="+options.password
 handle=psycopg2.connect(connectstr)
 curs=handle.cursor()
 sql="select relname from pg_class where oid = "+oid
 curs.execute(sql)
 for d in curs.fetchall():
  return d[0]

dbs=lookup_dbs()
for v, i in dbs.iteritems():
  for ii in os.listdir(mydir+"/"+str(i)):
     p = re.compile('\d')
     if p.match(ii):
     	#print ii
        rel=lookup_oid(ii,v)
        fullpath=mydir+"/"+str(i)+"/"+ii
	cmd=fincore+" "+fullpath
	#print cmd
	pages=commands.getstatusoutput(cmd)
	#print pages
	n=pages[1].split(' ')
        size=n[1]
	if p.match(size):
           if rel:
	     osmem[v+":"+rel]=(int(size)*1024)

# sort and output
sdata=sorted(osmem.iteritems(), key=lambda (k,v): (v,k), reverse=True)
a=0
print "OS Cache Usage:"
while a &lt; len(sdata):
  print sdata[a][0]+":"+str(sdata[a][1])
  a=a+1

</pre>

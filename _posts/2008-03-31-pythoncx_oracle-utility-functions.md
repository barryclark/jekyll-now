---
title: Python/cx_Oracle utility functions
author: kgorman
layout: post
permalink: pythoncx_oracle-utiliy-functions
dsq_thread_id:
  - 134436301
fave-post_views:
  - 919
categories:
  - Python
tags:
  - Oracle
  - Python
---
I recently created some utility functions to startup, mount and stop Oracle via cx_Oracle and thought I would share them. You will want to make sure you have [password files](http://www.orafaq.com/wiki/Oracle_database_Security_FAQ) setup correctly in order for this stuff to work.

```python
# shutdown abort:
def shutdown_abort(sid):
 try:
   os.environ['TWO_TASK']=sid
   handle=cx_Oracle.connect("sys", "yourpwd", sid, cx_Oracle.SYSDBA)
   handle.shutdown(mode = cx_Oracle.DBSHUTDOWN_ABORT)
   return 0
 except cx_Oracle.DatabaseError,info:
   print "Error: ",info
   return 1

# startup nomount:
def startup_nomount(sid):
 try:
   os.environ['TWO_TASK']=sid
   handle=cx_Oracle.connect("sys", "yourpwd", sid, cx_Oracle.SYSDBA | cx_Oracle.PRELIM_AUTH)
   handle.startup()
   return 0
 except cx_Oracle.DatabaseError,info:
   print "Error: ",info
   return 1

# mount:
def db_mount(sid):
 try:
   os.environ['TWO_TASK']=sid
   handle=cx_Oracle.connect("sys", "yourpwd", sid, cx_Oracle.SYSDBA)
   cursor = handle.cursor()
   cursor.execute("alter database mount")
   return 0
 except cx_Oracle.DatabaseError,info:
   print "Error: ",info
   return 1

# open resetlogs
def db_open_resetlogs(sid):
 try:
   os.environ['TWO_TASK']=sid
   handle=cx_Oracle.connect("sys", "yourpwd", sid, cx_Oracle.SYSDBA)
   cursor = handle.cursor()
   cursor.execute("alter database open resetlogs")
   return 0
 except cx_Oracle.DatabaseError,info:
   print "Error: ",info
   return 1

# open
def db_open(sid):
 try:
   os.environ['TWO_TASK']=sid
   handle=cx_Oracle.connect("sys", "yourpwd", sid, cx_Oracle.SYSDBA)
   cursor = handle.cursor()
   cursor.execute("alter database open")
   return 0
 except cx_Oracle.DatabaseError,info:
   print "Error: ",info
   return 1

# Flashback database to a given restore point:
def flashback_db(restore_point,sid):
 try:
   os.environ['TWO_TASK']=sid
   handle=cx_Oracle.connect("sys", "yourpwd", sid, cx_Oracle.SYSDBA)
   cursor = handle.cursor()
   sql="flashback database to restore point "+restore_point
   print sql
   cursor.execute(sql)
   return 0
 except cx_Oracle.DatabaseError,info:
   print "Error: ",info
   os.exit(1)
```

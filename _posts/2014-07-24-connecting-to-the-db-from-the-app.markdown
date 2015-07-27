---
layout: post
title: Connecting to the DB from the App
date: '2014-07-24 20:21:26'
---

![Cherry Blossom Festival 2014](/content/images/2014/Jul/13850627274_dcfffc9b65_z.jpg)
A few times I had to connect from the Application server to the Database and I'm always scrambling for the code on how to do it.

So this time, I decided to document it in my Github Gist as well as embed it in the blog.

Its a simple process, but again, this is just only related to Blackboard. Although in other circumstances it might help, you can use it or modify it at your convenience.

{% highlight bash %}
#!/bin/sh

#custom vars
vDATE=`date +"%Y-%m-%d"`

# EXPORT BLACKBOARD BASIC CONFIGURATION
export BBHOME=`grep bbconfig.basedir= /usr/local/blackboard/config/bb-config.properties |cut -d= -f2`;
export BBCONF=$BBHOME/config/bb-config.properties;
export VINAME=`grep antargs.default.vi.db.name= $BBCONF|cut -d= -f2`;

# EXPORT PATH AND ORACLE HOME
export ORACLE_HOME=/usr/local/blackboard/apps/oracle-client;
export PATH=$ORACLE_HOME/bin64:$ORACLE_HOME/bin32:$PATH;
export LD_LIBRARY_PATH=$ORACLE_HOME/lib64:$ORACLE_HOME/lib32:$LD_LIBRARY_PATH;

## EXPORT DATABASE VARIABLES, BASED ON BBCONFIG FILE
export DBHOST=`grep bbconfig.database.server.fullhostname $BBCONF|cut -d= -f2`;
export DBPORT=`grep bbconfig.database.server.portnumber $BBCONF|cut -d= -f2`;
export ORASID=`grep bbconfig.database.server.instancename= $BBCONF|cut -d= -f2`;
export MAINPASSCURR=`grep antargs.default.vi.db.password $BBCONF|cut -d= -f2`;


echo "set feedback off pagesize 50000 linesize 200 long 99999
col course_id FORMAT a140
spool /var/tmp/temp_file.txt
select  * from course_main;
spool off
exit" | sqlplus -s "$VINAME/$MAINPASSCURR@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=$DBHOST)(PORT=$DBPORT))(CONNECT_DATA=(SID=$ORASID)))"

# here we can do anything we want
# execute another script
# rm files or make anything from the file that we just created


exit

{% endhighlight %}

Obviously the SQL part can be modified to whatever you want and you can do anything afterwards as well.

In any case, its a simple process or at least repetitive task once you have it set up.

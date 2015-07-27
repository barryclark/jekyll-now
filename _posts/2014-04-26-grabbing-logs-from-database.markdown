---
layout: post
title: Grabbing Logs from Database
date: '2014-04-26 14:17:00'
---

So, recently in Blackboard a lot of new things are stored in the database, to name two we can say the Authentication Logs and also the SIS.

Regarding the SIS logs, in Sp13 there was a bug where you couldn't actually look at the logs and for that reason you needed to search for them in the database.

One of my team members created a very handy SQL scrip that you can place in any Application Server or even in the Database. This script will grab the information and place it on a  file that you can later send via email or even via SFTP. So this post is kind of a mix because we are using the same or partially the same script to grab the information but then send it using SFTP, but again, you can send it via email. Both options will be expressed below.

#### E-mail option
The first option is what we already have, so looking at the code it should be something like:

<pre class="language-bash">#!/bin/sh
#!/usr/bin/env expect
# Error Received When Accessing SIS logs through the GUI After 9.1 SP13 CP8 is Applied
# Created by Tito  12/6/2013
# To be executed via cron from one of the app servers. Be sure to alter the email address accordingly (line 61).
# 12/7/2013.TH -- Method of accessing the database has been altered. Formatting issues in the report have been corrected.


export BBHOME=`grep bbconfig.basedir= /usr/local/blackboard/config/bb-config.properties |cut -d= -f2`;
export BBCONF=$BBHOME/config/bb-config.properties;
export VINAME=`grep antargs.default.vi.db.name= $BBCONF|cut -d= -f2`;


# Setup manual SQL*NET connection

export ORACLE_HOME=/usr/local/blackboard/apps/oracle-client;
export PATH=$ORACLE_HOME/bin64:$ORACLE_HOME/bin32:$PATH;
export LD_LIBRARY_PATH=$ORACLE_HOME/lib64:$ORACLE_HOME/lib32:$LD_LIBRARY_PATH;

export DBHOST=`grep bbconfig.database.server.fullhostname $BBCONF|cut -d= -f2`;
export DBPORT=`grep bbconfig.database.server.portnumber $BBCONF|cut -d= -f2`;
export ORASID=`grep bbconfig.database.server.instancename= $BBCONF|cut -d= -f2`;



## SETUP DATABASE ENVIRONMENT

export SYSPASSCURR=`grep bbconfig.database.server.systemuserpassword $BBCONF|cut -d= -f2`;
export SYSTEMPASSCURR=`grep bbconfig.cs.db.systemuser.pass $BBCONF|cut -d= -f2`;
export ADMINPASSCURR=`grep bbconfig.database.admin.password $BBCONF|cut -d= -f2`;
export MAINPASSCURR=`grep antargs.default.vi.db.password $BBCONF|cut -d= -f2`;
export STATSPASSCURR=`grep antargs.default.vi.stats.db.password $BBCONF|cut -d= -f2`;
export REPORTPASSCURR=`grep antargs.default.vi.report.user.password $BBCONF|cut -d= -f2`;
export CMSPASSCURR=`grep bbconfig.cs.db.cms-user.pass= $BBCONF|cut -d= -f2`;
export ADMINUSER=`grep bbconfig.database.admin.name= /usr/local/blackboard/config/bb-config.properties|cut -d= -f2 |tr '[:lower:]' '[:upper:]'`;


echo "set feedback off pagesize 1000 linesize 200 long 99999
col LOG_MESSAGE FORMAT a140
col LOGLEV FORMAT a6
col NAME format a15
spool /tmp/integlogs.txt
select d.NAME
, (case
WHEN dil.LOG_LEVEL=0 THEN 'Debug'
WHEN dil.LOG_LEVEL=1 THEN 'Info'
WHEN dil.LOG_LEVEL=2 THEN 'Warning'
WHEN dil.LOG_LEVEL=3 THEN 'Error'
END) LOGLEV
, dil.LOG_MESSAGE LOG_MESSAGE
from DATA_INTGR_LOG dil, DATA_INTGR d
where dil.DATA_INTGR_PK1=d.pk1
AND dil.LOG_DATE > sysdate-1
AND dil.LOG_LEVEL in (1,2,3)
AND dil.LOG_MESSAGE not like '%'' processed successfully.%'
order by dil.pk1;
spool off
exit" | sqlplus -s "$VINAME/$MAINPASSCURR@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=$DBHOST)(PORT=$DBPORT))(CONNECT_DATA=(SID=$ORASID)))"

echo "Errors and warnings from SIS logs attached." > /usr/local/blackboard/logs/dataintegration-message.txt

mail -s "SIS Integration Logs" -a /tmp/integlogs.txt myclient@someschool.edu < /usr/local/blackboard/logs/dataintegration-message.txt

mv /tmp/integlogs.txt /usr/local/blackboard/logs/integlogs-`date '+%Y%m%d%H%M'`.txt
exit</pre>

In the last lines you should be altering the emailas well as the intent of storing that file or removing it entirely.

#### SFTP Option
<pre class="language-bash">#!/bin/sh
# Error Received When Accessing SIS logs through the GUI After 9.1 SP13 CP8 is Applied
# Created by Tito  12/6/2013
# To be executed via cron from one of the app servers. Be sure to alter the email address accordingly (line 61).
# 12/7/2013.TH -- Method of accessing the database has been altered. Formatting issues in the report have been corrected.
# 03/15/2014.EV -- removing Email and adding SFTP option via passwordless credentials


export BBHOME=`grep bbconfig.basedir= /usr/local/blackboard/config/bb-config.properties |cut -d= -f2`;
export BBCONF=$BBHOME/config/bb-config.properties;
export VINAME=`grep antargs.default.vi.db.name= $BBCONF|cut -d= -f2`;


# Setup manual SQL*NET connection

export ORACLE_HOME=/usr/local/blackboard/apps/oracle-client;
export PATH=$ORACLE_HOME/bin64:$ORACLE_HOME/bin32:$PATH;
export LD_LIBRARY_PATH=$ORACLE_HOME/lib64:$ORACLE_HOME/lib32:$LD_LIBRARY_PATH;

export DBHOST=`grep bbconfig.database.server.fullhostname $BBCONF|cut -d= -f2`;
export DBPORT=`grep bbconfig.database.server.portnumber $BBCONF|cut -d= -f2`;
export ORASID=`grep bbconfig.database.server.instancename= $BBCONF|cut -d= -f2`;



## SETUP DATABASE ENVIRONMENT

export SYSPASSCURR=`grep bbconfig.database.server.systemuserpassword $BBCONF|cut -d= -f2`;
export SYSTEMPASSCURR=`grep bbconfig.cs.db.systemuser.pass $BBCONF|cut -d= -f2`;
export ADMINPASSCURR=`grep bbconfig.database.admin.password $BBCONF|cut -d= -f2`;
export MAINPASSCURR=`grep antargs.default.vi.db.password $BBCONF|cut -d= -f2`;
export STATSPASSCURR=`grep antargs.default.vi.stats.db.password $BBCONF|cut -d= -f2`;
export REPORTPASSCURR=`grep antargs.default.vi.report.user.password $BBCONF|cut -d= -f2`;
export CMSPASSCURR=`grep bbconfig.cs.db.cms-user.pass= $BBCONF|cut -d= -f2`;
export ADMINUSER=`grep bbconfig.database.admin.name= /usr/local/blackboard/config/bb-config.properties|cut -d= -f2 |tr '[:lower:]' '[:upper:]'`;


echo "set feedback off pagesize 1000 linesize 200 long 99999
col LOG_MESSAGE FORMAT a140
col LOGLEV FORMAT a6
col NAME format a15
spool /tmp/integlogs.txt
select d.NAME
, (case
WHEN dil.LOG_LEVEL=0 THEN 'Debug'
WHEN dil.LOG_LEVEL=1 THEN 'Info'
WHEN dil.LOG_LEVEL=2 THEN 'Warning'
WHEN dil.LOG_LEVEL=3 THEN 'Error'
END) LOGLEV
, dil.LOG_MESSAGE LOG_MESSAGE
from DATA_INTGR_LOG dil, DATA_INTGR d
where dil.DATA_INTGR_PK1=d.pk1
AND dil.LOG_DATE > sysdate-1
AND dil.LOG_LEVEL in (1,2,3)
AND dil.LOG_MESSAGE not like '%'' processed successfully.%'
order by dil.pk1;
spool off
exit" | sqlplus -s "$VINAME/$MAINPASSCURR@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=$DBHOST)(PORT=$DBPORT))(CONNECT_DATA=(SID=$ORASID)))"

#file: /tmp/integlogs.txt 
</pre>

As you can see this first part we are doing the same as before, grabbing the information and then storing it in the same file, next to that line, we will be sending it via sftp, you can add this script invoking it afterwards to have separate scripts or add it to the bottom with slight modifications

##### Option 1 - Adding it to the bottom
<pre class="language-bash"># global variables
vDATE=`date +"%Y-%m-%d"`
vDATE2=`date +"%Y%m%d"`
vBBLOG="integlogs.txt"
vPORT=22
vREMOTEPATH = "/"
vLOCALPATH = "/tmp/"
vREMOTEFILENAME = 'integrationlogs'-`date '+%Y%m%d%H%M'`.txt
# SFTP INFORMATION
# define your server and your username
vHOST='server'
vUSER='user'

# SFTP Connection using special port (usually is 22)
# remove the -oPort if you dont know if its using any other port (usually is 22)
sftp -oPort=${vPORT}  $vUSER@$vHOST << END_SCRIPT
# Changing directory if need to
cd $vREMOTEPATH
# Changing local path to get to file
lcd $vLOCALPATH
# upload file to directory with new name
put $vBBLOG $vREMOTEFILENAME

quit
END_SCRIPT
exit 0
</pre>

##### Option 2 - Making a separete entry
Well as you can see this is very straight forward but in the case you want to create a new file, you can do the same but splitting them.

1. First step you need to add the <code class="language-bash">Exit</code> to your first script (lets call it <code class="language-bash">getlogs.sh</code>
2. Now lets create our second script, lets call it <code class="language-bash">uploadlogs.sh</code>
In this file it will be like the following: 
<pre class="language-bash">#!/bin/sh
#!/usr/bin/env expect
#global variables
vDATE=`date +"%Y-%m-%d"`
vDATE2=`date +"%Y%m%d"`
vBBLOG="integlogs.txt"
vPORT=22
vREMOTEPATH = "/"
vLOCALPATH = "/tmp/"
vREMOTEFILENAME = 'integrationlogs'-`date '+%Y%m%d%H%M'`.txt
# SFTP INFORMATION
# define your server and your username
vHOST='server'
vUSER='user'

# SFTP Connection using special port (usually is 22)
# remove the -oPort if you dont know if its using any other port (usually is 22)
sftp -oPort=${vPORT}  $vUSER@$vHOST << END_SCRIPT
# Changing directory if need to
cd $vREMOTEPATH
# Changing local path to get to file
lcd $vLOCALPATH
# upload file to directory with new name
put $vBBLOG $vREMOTEFILENAME

quit
END_SCRIPT
exit 0
</pre>

Afterwards you need to enter the crontab <code class="language-shell">crontab -e</code>
And add the following line:

	0 0 * * * getlogs.sh
	15 0 * * * uploadlogs.sh

#### References:
* I built two scripts to upload logs (gzipped and not), you can read them at my Github account: [Upload to SFTP](https://github.com/enriquemanuel/upload_to_sftp) and [Upload to SFTP Gzipped](https://github.com/enriquemanuel/upload_logs_gzipped)
* More information about the Cron can be read [here](http://en.wikipedia.org/wiki/Cron) or you can do `man cron`

#### Thanks to:
* Thanks to my coworkers for developing this SQL / Bash script for workaround purposes.

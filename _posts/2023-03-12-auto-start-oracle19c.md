---
layout: post
title: Auto start oracle19c  when server restart ( Step by step )
---

# Step01: Allow service
$ vi /etc/oratab

```bash
orcl19c:/data/app/oracle/product/19.0.0:Y
```

# Step02: Script service name "dbora"

```bash
#! /bin/sh
ORA_HOME=/data/app/oracle/product/19.0.0
ORA_OWNER=oracle

case "$1" in
'start')
    # Start the Oracle databases:
    # The following command assumes that the oracle login
    # will not prompt the user for any values
    # Remove "&" if you don't want startup as a background process.
    su - $ORA_OWNER -c "$ORA_HOME/bin/dbstart $ORA_HOME" &
    touch /var/lock/subsys/dbora
    ;;

'stop')
    # Stop the Oracle databases:
    # The following command assumes that the oracle login
    # will not prompt the user for any values
    su - $ORA_OWNER -c "$ORA_HOME/bin/dbshut $ORA_HOME" &
    rm -f /var/lock/subsys/dbora
    ;;
esac
```

# Step03: Grant permission file dbora

$ chgrp dba dbora 
$ chmod 750 dbora

# Step04:

$ ln -s /etc/init.d/dbora /etc/rc0.d/K01dbora \
$ ln -s /etc/init.d/dbora /etc/rc3.d/S99dbora

# Step05: 

$ chmod 755 /data/app/oracle/product/19.0.0/network/log/listener.log /data/app/oracle/product/19.0.0/rdbms/log/shutdown.log \
$ chown oracle:oracle /data/app/oracle/product/19.0.0/network/log/listener.log /data/app/oracle/product/19.0.0/rdbms/log/shutdown.log /data/app/oracle/product/19.0.0/rdbms/log/startup.log

# Step06: Disable SE

$ vim /etc/selinux/config

```bash
SELINUX=disabled
SELINUXTYPE=targeted
```
\
\
\
\
\
<code style="color:Blue">Reference material:</code>\
https://docs.oracle.com/en/database/oracle/oracle-database/19/unxar/stopping-and-starting-oracle-software.html#GUID-CA969105-B62B-4F5B-B35C-8FB64EC93FAA

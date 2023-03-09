---
layout: post
title: Auto backup data postgresql and restore data
---
# Backup data postgresql

### _Step 01: Schedule backup file (use crontab)_
> sudo crontab -u postgres -e
> 

```bash
#backup once day at 23h59'
59 23 * * *  /usr/share/postgresql/backup_postgresql.sh
```

### _Step 02: Create file tool backup_

> vi /usr/share/postgresql/backup_postgresql.sh

```bash
$ mv /var/lib/postgresql/backup_file /var/lib/postgresql/backup_file_bak
cd /var/lib/postgresql && pg_dumpall > backup_file
```
### _Step 03: Grant permission user postgres_

>$ chown postgres:postgres /usr/share/postgresql/backup_postgresql.sh\
$ chmod 755 /usr/share/postgresql/backup_postgresql.sh

# Restore data postgresql

>$ su postgres \
$ cd /var/lib/postgresql && psql -f backup_file postgres

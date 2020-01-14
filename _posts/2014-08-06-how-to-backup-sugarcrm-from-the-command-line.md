---
layout: post
title: How to backup SugarCRM from the command line
permalink: /sql/how-to-backup-sugarcrm-from-the-command-line
post_id: 1294
categories:
- "*nix"
- Backup
- CommandLine
- Linux
- mysql
- SQL
- SugarCRM
---

From the linux command line, these commands let you backup and restore a SugarCRM database.<!--more-->

Update 2016-04-26:
Just saw this SugarCRM KB
[Providing a Backup Without Sensitive Data](http://support.sugarcrm.com/Knowledge_Base/Administration/Platform_Management/Providing_a_Backup_Without_Sensitive_Data/) which is really useful. Thanks Jared.

Firstly, for a proper back up of SugarCRM you'll need two ﬁles, one containing the application ﬁles, one containing the SQL database.

First up, the backup...

**Backup ﬁles** : Change to the folder you want to backup, then...

`tar -zcvf CRM-BACKUP-FILES.tar.gz .`

Edit: if you get an error 'Permission Denied' you may be trying to write to a folder you don't have permission for, instead try writing to `~/CRM-BACKUP-FILES.tar.gz` and it will likely work.

Edit: see also this [StackOverflow article](http://stackoverflow.com/questions/1622391/how-to-include-htaccess-in-tar-commands).

**Backup sql (empty copy of the database)**:

`mysqldump -u USERNAME -p -–no-data DATABASENAME > CRM-BACKUP-SQL.sql`

**Backup sql (with the data)**:

`mysqldump -u USERNAME -p DATABASENAME > CRM-BACKUP-SQL.sql`

Then you can 'tar' the .sql file with

`tar -zcvf DATABASENAME-mysql.tar.gz DATABASENAME-mysql.sql`

**Backup just a single table**

`mysqldump db_name table_name | gzip > table_name.sql.gz`

If you only want the database schema, then in the SugarCRM web application you can do the following:

- Admin
- Diagnostic Tool
- db schema
- Download that file

Then for the restoration...


**Restore ﬁles ** (to current folder):

`tar -zxvf CRM-BACKUP-FILES.tar.gz`

**Restore sql**:

`mysql -u USERNAME -p DATABASENAME < CRM-BACKUP-SQL.sql`

**Restore just a single table**

`gunzip < table_name.sql.gz | mysql -u username -p db_name`

These SugarCRM Knowledge Base articles may also be of use:

- [The process of migrating a potentially broken instance to a clean install](http://support.sugarcrm.com/02_Documentation/04_Sugar_Developer/Sugar_Developer_Guide_7.2/73_Migration/Migrating_From_a_Broken_Instance_to_a_Clean_Install).
- [Migrating an On-Demand instance to an On-Site instance](http://support.sugarcrm.com/02_Documentation/04_Sugar_Developer/Sugar_Developer_Guide_7.2/73_Migration/Migrating_From_On-Demand_to_On-Site).
- [Migrating an On-Site instance to an On-Demand instance](http://support.sugarcrm.com/02_Documentation/04_Sugar_Developer/Sugar_Developer_Guide_7.2/73_Migration/Migrating_From_On-Site_to_On-Demand).

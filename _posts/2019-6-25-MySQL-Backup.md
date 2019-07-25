---
layout: post
title: MySQL Scheduled Backup
---

Have you ever attempted to set up an automated backup of your MySQL database? The process of creating a scheduled backup is not as easy as SQL Server. In MySQL, we must use the command line to make this process automatically. The method uses a batch file to automatically backup and zip files each night at midnight. This happens using `mysqldump` command-line tool using Windows Task Scheduler:

<img src="/images/scheduler.png" />

Here’s the command which is being called behind the scene:

```js

set dbUser="DB_USER"
set dbPassword="YOUR PASSWORD"
set backupDir="PATH"
set dbName="DB_NAME"
set mysqldump="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"
set zip="C:\Program Files\7-Zip\7z.exe"

%mysqldump% --host="MYSQL_SERVER_ADDRESS" --user=%dbUser% -p@%dbPassword% --single-transaction --add-drop-table --databases %dbName% > %backupDir%\%dirName%\output.sql
%zip% a -tgzip %backupDir%\%dirName%\%fileSuffix%output.sql.gz %backupDir%\%dirName%\output.sql
del %backupDir%\%dirName%\output.sql
```

This command, first backups the database then uses `7zip` to zip the backup. Then the `sql` is deleted as we don't need it anymore.

<img src="/images/output.jpg" />

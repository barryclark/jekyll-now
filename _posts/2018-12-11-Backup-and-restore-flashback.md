---
layout: post
title: Flashback Database
theme: minimal
tags:
- flashback restore
- CDB
- PDB
- Oracle
---

###### Flashback a Container or a Pluggable Database [^1]
[^1]: The script is proved to work for Oracle 12.2.

This article contains scripts, which should be used for taking flashback restore points and restoring a pluggable database to these restore points (Doc ID [2308215.1](https://support.oracle.com/epmos/faces/DocumentDisplay?_afrLoop=441866581127929&id=2308215.1&displayIndex=1&_afrWindowMode=0&_adf.ctrl-state=vxgtnvmef_4#FIX%23FIX)).

- The Container Database (CDB) is called CDB$ROOT.
- The Pluggable Database (PDB) is called PDB.
- The scripts are executed from sqlplus using SYS user.


##### Prerequisites
- [X] Archivelog turned ON - ( [^2] )
- [X] Flashback turned ON - ( [^3] )

[^2]:
    ```shell
    CONN / AS SYSDBA
    SHUTDOWN IMMEDIATE
    STARTUP MOUNT
    ALTER DATABASE ARCHIVELOG;
    ALTER DATABASE OPEN;
    ```

[^3]:
    ```shell
    SELECT flashback_on FROM v$database;
    ALTER DATABASE FLASHBACK ON;
    ```
---

##### Take a regular restore point on  alive DATABASE
###### From the CDB
```shell
alter session set container=CDB$ROOT;
create restore point LIVE_RESTORE_POINT for pluggable database PDB guarantee flashback database;
```
###### From the PDB
```shell
alter session set container=PDB;
create restore point LIVE_RESTORE_POINT guarantee flashback database;
```

##### Restore PDB from a regular flashback restore point
```shell
alter session set container=CDB$ROOT;
alter pluggable database PDB close immediate instances=all;
flashback pluggable database PDB to restore point LIVE_RESTORE_POINT;
alter pluggable database PDB open resetlogs;
```

##### Take a clean flashback restore point on a Database which is shutdown (If PDB uses shared undo and restore point created when PDB was closed)
```shell
alter session set container=CDB$ROOT;
alter pluggable database PDB close immediate instances=all;
create clean restore point CLEAN_RESTORE_POINT for pluggable database PDB guarantee flashback database;
alter pluggable database PDB open instances=all;
```

##### Restore PDB from a clean flashback restore point
```shell
alter session set container=CDB$ROOT;
alter pluggable database PDB close immediate instances=all;
flashback pluggable database PDB to clean restore point CLEAN_RESTORE_POINT;
alter pluggable database PDB open resetlogs;
```

##### Notes:

When opening the PDB with RESETLOGS in the RAC environment, it can be executed with only one instance.

Solution: Run ALTER PLUGGABLE DATABASE <pdb-name> OPEN RESETLOGS without INSTANCES= clause.

Doc ID [2321868.1](https://support.oracle.com/epmos/faces/DocumentDisplay?_afrLoop=443998526803943&parent=EXTERNAL_SEARCH&sourceId=PROBLEM&id=2321868.1&_afrWindowMode=0&_adf.ctrl-state=vxgtnvmef_53).

---

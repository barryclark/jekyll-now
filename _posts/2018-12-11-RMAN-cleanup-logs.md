---
layout: post
title: Cleanup Database Logs with RMAN
tags:
- RMAN
- archivelog delete
- controlfile delete
- flashback delete
- log maintenance
- log housekeeping
- CDB
- PDB
- Oracle
---

###### Cleanup old archivelogs, control file backups and flashback restore points [^1].
[^1]: The script is proved to work in Oracle 12.2.;


The script below does the following things:

- Removes (deletes) orphaned, expired and obsolete archivelogs and backups
- Removes (deletes) past archivelogs
- Removes (deletes) control file backups
- Removes (deletes) flashback restore points on CDB and PDB(s)
- *Works with no parameters*

---

```shell
RUN {
#Deletes obsolete and orphaned archivelogs and controlfile backups
change archivelog all crosscheck;
report obsolete orphan;
report obsolete;
crosscheck backup;
crosscheck copy;
crosscheck backup of controlfile;
delete noprompt expired backup;
delete noprompt expired archivelog all;
delete noprompt expired backup of controlfile;
delete force noprompt expired copy;
delete force noprompt obsolete orphan;
delete force noprompt obsolete;

#Deletes archivelogs
crosscheck archivelog all;
delete force noprompt archivelog all;

#Deletes flashback restore points
declare
   l_drop_stmn varchar2(300);
begin
   DBMS_OUTPUT.ENABLE(1000);
   SELECT 'DROP RESTORE POINT ' || rp.name ||
          CASE
            WHEN UPPER(rp.pdb_restore_point) = 'YES' THEN
              ' FOR PLUGGABLE DATABASE ' || pdb.name
          END as cmd
     INTO l_drop_stmn
     FROM v$restore_point rp
        , v$pdbs pdb
    WHERE rp.con_id = pdb.con_id(+);
   EXECUTE IMMEDIATE l_drop_stmn;

EXCEPTION
   WHEN OTHERS THEN
      DBMS_OUTPUT.PUT_LINE(SQLERRM);
      NULL;
end;
/
}
```

---

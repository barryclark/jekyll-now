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

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.16/clipboard.min.js"></script>
<script>
var clipboard = new Clipboard('.btn');
clipboard.on('success', function(e) { console.log(e); });
clipboard.on('error', function(e) { console.log(e); });
</script>

##### Clean Archivelogs / ctrl file backups / flashback area [^1].
[^1]: The script is proved to work in Oracle 12.2.;

<br>
The script below does the following things:
<br>
- Removes (deletes) orphaned, expired and obsolete archivelogs and backups
- Removes (deletes) past archivelogs
- Removes (deletes) control file backups
- Removes (deletes) flashback restore points on CDB and PDB(s)
- *Works with no parameters*
- *Copy the script using this button &rarr;* <button class="btn" data-clipboard-target="#a" title="Copy code"><i class="fa fa-copy"></i></button>

<pre id="a" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
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
</pre>

---

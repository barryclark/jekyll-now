---
title: Incremental Commits in PostgreSQL
author: kgorman
layout: post
permalink: incremental-commits-in-postgresql
dsq_thread_id:
  - 134652137
fave-post_views:
  - 151
categories:
  - PostgreSQL
tags:
  - Database Engineering
  - Oracle
  - postgresql
---
On large and/or busy databases it&#8217;s often not feasible to update an entire table at one time. For instance, if one has to perform some background DML task to change all credit card limits on a 300gb table that sees 1000 transactions per second, and increase each card limit by $1000. Simply executing an update statement with no predicate would attempt to lock every row in the table and perform the update. Even if the lock was granted on such a busy table, you would block all updates to those rows (they would enqueue) until you commit (or rollback), and you would also cause lots of reads from the read-before images. This is bad in Oracle; <a href=http://asktom.oracle.com/pls/asktom/f?p=100:11:0::::P11\_QUESTION\_ID:1441804355350>ORA-01555: snapshot too old</a>, and also has <a href=http://www.postgresql.org/docs/8.2/interactive/routine-vacuuming.html>vacuum implications</a> in PostgreSQL. So in order to run our theoretical job above, we need some sort of procedure that runs in the background and commits the work every N rows. This is a pretty common technique in Oracle PL/SQL, and a simple construct exists:

```sql
DECLARE

 CURSOR mycur IS SELECT id FROM bigtab;
 COUNTER number := 0;

BEGIN

 FOR myrec IN mycur LOOP

    update bigtab set credit_limit = credit_limit+1000 WHERE id = myrec.id;

    IF mod(counter,2000)=0 THEN
       COMMIT;
    END IF;

    COUNTER:=COUNTER+1;

 END LOOP;

COMMIT;

END;
/

```

The above code incrementally commits every 1000 rows and performs all updates until the cursor is exhausted. In PostgreSQL, there is no simple <a href=http://www.postgresql.org/docs/8.2/interactive/plpgsql.html>PL/pgSQL</a> substitute because <a href=http://www.postgresql.org/docs/8.2/interactive/plpgsql-structure.html>COMMIT can not be called in a function</a>. So what to do? Well, python has a nice <a href=http://www.python.org/dev/peps/pep-0249/>fetchmany(size)</a> construct that allows us to create a small memory footprint program that commits incrementally just like the above Oracle code. The variable incremental\_commit\_size is the size of the commit batch, and the throttle_time is an amount to sleep after each commit to further make this process very slow and low impact. The code is also uses binds so you don&#8217;t create many cursor permutations.

```python
#!/usr/bin/env python
#
# incremental commits
# 2008 kcg

import psycopg2
import time

# vars
INCREMENTAL_COMMIT_SIZE = 1000    # number of rows
THROTTLE_TIME = 0                 # seconds

connectstr = "host=localhost dbname=postgres user=postgres port=5432"
handle = psycopg2.connect(connectstr)
cursor = handle.cursor()
cursor2 = handle.cursor()
sql = "select id from bigtab"
cursor.execute(sql)

while 1:

    output = cursor.fetchmany(incremental_commit_size)

    if not output:
        break
    for row in output:

        # update table
        sql = "update bigtab set credit_limit = credit_limit+1000 where id = %s"
        cursor2.execute(sql, ([row[0]]))

        # commit, invoked every incremental commit size
        handle.commit()
        time.sleep(throttle_time)

handle.commit()

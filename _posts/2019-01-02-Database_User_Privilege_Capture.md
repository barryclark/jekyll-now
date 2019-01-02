---
layout: post
title: Database User Privilege Capture
tags:
- Pribilege capture
- Privilege
- DBMS_PRIVILEGE_CAPTURE
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

##### Database User Privilege Capture [^1].
[^1]: The script is proved to work with Oracle 12c;

This article describes measures that should be taken on a regular basis, in order to understand the real-world usage of granted privileges, either by direct grants or by the means of roles.

The process is based on Package [DBMS_PRIVILEGE_CAPTURE](https://docs.oracle.com/database/121/ARPLS/d_priv_prof.htm) (available with Oracle 12c), described in the documentation below:

Release 12.1. - [Performing Privilege Analysis to Find Privilege Use](https://docs.oracle.com/database/121/DVADM/priv_analysis.htm#DVADM591)
<br>
Release 12.2. - [Performing Privilege Analysis to Find Privilege Use](https://docs.oracle.com/en/database/oracle/oracle-database/12.2/dvadm/performing-privilege-analysis-to-find-privilege-use.html#GUID-44CB644B-7B59-4B3B-B375-9F9B96F60186)

<br>
**\*All of the code below could be executed by any SYSDBA user**
<br>
The process of researching this usage is comprised of three steps:

1. In order to get the usage for a particular period, a capturing session needs to be initiated; the session captures privilege usage either on:
  * _Database level_
  * _Role level_
  * _Context level_
  * _Role and Context levels_
2. Generate the data, for this capturing session; the data being:
  * _Used system and object privileges_
  * _Unused system and object privileges_
3. Prepare a report with the results and possible suggestions on how to improve it; the report should contain:
  * _List of Groups of Users and their privileges (per group, such as DATACNTR, CUSTADMIN etc.)_
  * _List of Roles and the privileges they grant_
  * _List of Groups of Users privilege use for the capture period_
  * _List of Groups of Users privilege misuse for the capture period_
  * _List of used and unused system privileges during the capture process_
  * _List of directly granted privileges, which are not used or unused during the capture process_
4. Test Setup and Example Data
5. Drop the capture

<br>
**Get the privilege usage for particular period of time**

The code below should be ran on a representative environment, during a particularly high user activity, in order to get as close as possible to the real privilege usage. <button class="btn" data-clipboard-target="#a" title="Copy code"><i class="fa fa-copy"></i></button>

<pre id="a" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
declare
l_name varchar2(50) := 'Database priv capture';
l_desc VARCHAR2(50) := l_name;
l_condition VARCHAR2(200) := 'SYS_CONTEXT(''USERENV'', ''SESSION_USER'') = ''&SPECIFIC_USER''';
begin
DBMS_PRIVILEGE_CAPTURE.CREATE_CAPTURE( NAME => l_name,
DESCRIPTION => l_desc,
TYPE => dbms_privilege_capture.g_database, -- g_database, g_role , g_context , g_role_and_context
ROLES => role_name_list(),
CONDITION => NULL );
DBMS_PRIVILEGE_CAPTURE.ENABLE_CAPTURE(l_name);
end;
/
</pre>

> After executing the code, the Database starts capturing user activity.

**Generate the data, for this capturing session**

After enough time has elapsed, you should execute the following code to disable the capture and generate the results. <button class="btn" data-clipboard-target="#b" title="Copy code"><i class="fa fa-copy"></i></button>

<pre id="b" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
declare
l_name varchar2(30) := 'Database priv capture';
begin
DBMS_PRIVILEGE_CAPTURE.DISABLE_CAPTURE(l_name);
DBMS_PRIVILEGE_CAPTURE.GENERATE_RESULT(l_name);
end;
/
</pre>

> All the data can now be queried from the following dictionary views:
>
> 1. Used privileges
> * dba_used_sysprivs
> * dba_used_sysprivs_path
> * dba_used_objprivs
> * dba_used_objprivs_path
> 2. Unsed privileges
> * dba_unused_sysprivs
> * dba_unused_sysprivs_path
> * dba_unused_objprivs
> * dba_unused_objprivs_path

**Prepare a report with the results and possible suggestions on how to improve it**

> **An easy way to check for User's granted role and Role details**
```shell
SELECT dbms_metadata.get_granted_ddl( 'SYSTEM_GRANT', 'ROLE_NAME' ) FROM dual;<br>
SELECT dbms_metadata.get_granted_ddl( 'OBJECT_GRANT', 'USER_NAME' ) FROM dual;<br>
SELECT dbms_metadata.get_granted_ddl( 'ROLE_GRANT', 'USER_NAME' ) FROM dual;<br>
```


<details><summary>User Role Overview View / Query
</summary><button class="btn" data-clipboard-target="#c" title="Copy code"><i class="fa fa-copy"></i></button>
<p>
<pre id="c" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
create or replace force view user_role_overview_v
as
select dbu.username, dbu.profile user_group,
dbrp.granted_role, dbrp.admin_option,
rr1.granted_role as "Roles Granted to This Role",
rr2.role as "Roles Granted With This Role",
rsp.privilege as "Privilege Granted to Role",
nvl2(rtp.owner, rtp.privilege || ' on ' ||rtp.owner||'.'||rtp.table_name ||nvl2(rtp.column_name, '.'||rtp.column_name, NULL), NULL) as "Table Privilege"
from dba_users dbu,
dba_roles dbr,
dba_role_privs dbrp,
role_tab_privs rtp,
role_sys_privs rsp,
role_role_privs rr1,
role_role_privs rr2
where dbr.role = dbrp.granted_role
and dbu.username = dbrp.grantee(+)
and dbrp.granted_role = rtp.role(+)
and dbrp.granted_role = rsp.role(+)
and dbrp.granted_role = rr1.role(+)
and dbrp.granted_role = rr2.granted_role(+)
--and dbrp.granted_role = 'DBA'
--and dbu.username = '&username'
order by 1, 2, 3, 5, 6, 7, 8;
</pre>
</p>
</details>

<details><summary>Used privileges for the Capture
</summary><button class="btn" data-clipboard-target="#d" title="Copy code"><i class="fa fa-copy"></i></button>
<p>
<pre id="d" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
create or replace force view used_privs_overview_v
AS
select
       cap.name as capture, cap.type, cap.description,
       nvl2(dus.capture, dus.username || '->' ||dus.used_role, NULL) as sys_user_role,
       dus.sys_priv,
       dusp.path as SysPriv_Path,
       nvl2(duo.capture, duo.username || '->' ||duo.used_role, NULL) as obj_user_role,
       duo.obj_priv,
       duop.path  as ObjPriv_Path,
       nvl2(duo.capture, duo.object_owner || '.' || duo.object_name || ' (' || duo.object_type  || ')', NULL) as Object_Details
  from dba_priv_captures cap,
       dba_used_sysprivs dus,
       dba_used_sysprivs_path dusp,
       dba_used_objprivs duo,
       dba_used_objprivs_path duop
 where cap.name = dus.capture(+)
   and cap.name = dusp.capture(+)
   and dus.username = dusp.username(+)
   and cap.name = duo.capture(+)
   and cap.name = duop.capture(+)
   and duo.username = duop.username(+)
   --and cap.name = 'NEW_CAPTURE'
order by 1, 2, 3, 4, 5, 7, 8, 10;
</pre>
</p>
</details>

<details><summary>Unused privileges for the Capture
</summary><button class="btn" data-clipboard-target="#e" title="Copy code"><i class="fa fa-copy"></i></button>
<p>
<pre id="e" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
create or replace force view unused_privs_overview_v
AS
select
cap.name as capture, cap.type, cap.description,
nvl2(duns.capture, duns.username || '->' ||duns.rolename, NULL) as sys_user_role,
duns.sys_priv,
dunsp.path as SysPriv_Path,
nvl2(duno.capture, duno.username || '->' ||duno.rolename, NULL) as obj_user_role,
duno.obj_priv,
dunop.path as ObjPriv_Path,
nvl2(duno.capture, duno.object_owner || '.' || duno.object_name || ' (' || duno.object_type || ')', NULL) as Object_Details
from dba_priv_captures cap,
dba_unused_sysprivs duns,
dba_unused_sysprivs_path dunsp,
dba_unused_objprivs duno,
dba_unused_objprivs_path dunop
where cap.name = duns.capture(+)
and cap.name = dunsp.capture(+)
and duns.username = dunsp.username(+)
and cap.name = duno.capture(+)
and cap.name = dunop.capture(+)
and duno.username = dunop.username(+)
--and cap.name = 'NEW_USER'
order by 1, 2, 3, 4, 5, 7, 8, 10;
</pre>
</p>
</details>

<details><summary>List of direct grants to users
</summary><button class="btn" data-clipboard-target="#f" title="Copy code"><i class="fa fa-copy"></i></button>
<p>
<pre id="f" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
create or replace force view direct_grants_overview_v
AS
select tpm.name privilege,
       decode(mod(oa.option$,2), 1, 'YES', 'NO') grantable,
       ue.name grantee,
       ur.name grantor,
       u.name owner,
       decode(o.TYPE#, 0, 'NEXT OBJECT', 1, 'INDEX', 2, 'TABLE', 3, 'CLUSTER',
                       4, 'VIEW', 5, 'SYNONYM', 6, 'SEQUENCE',
                       7, 'PROCEDURE', 8, 'FUNCTION', 9, 'PACKAGE',
                       11, 'PACKAGE BODY', 12, 'TRIGGER',
                       13, 'TYPE', 14, 'TYPE BODY',
                       19, 'TABLE PARTITION', 20, 'INDEX PARTITION', 21, 'LOB',
                       22, 'LIBRARY', 23, 'DIRECTORY', 24, 'QUEUE',
                       28, 'JAVA SOURCE', 29, 'JAVA CLASS', 30, 'JAVA RESOURCE',
                       32, 'INDEXTYPE', 33, 'OPERATOR',
                       34, 'TABLE SUBPARTITION', 35, 'INDEX SUBPARTITION',
                       40, 'LOB PARTITION', 41, 'LOB SUBPARTITION',
                       42, 'MATERIALIZED VIEW',
                       43, 'DIMENSION',
                       44, 'CONTEXT', 46, 'RULE SET', 47, 'RESOURCE PLAN',
                       66, 'JOB', 67, 'PROGRAM', 74, 'SCHEDULE',
                       48, 'CONSUMER GROUP',
                       51, 'SUBSCRIPTION', 52, 'LOCATION',
                       55, 'XML SCHEMA', 56, 'JAVA DATA',
                       57, 'EDITION', 59, 'RULE',
                       62, 'EVALUATION CONTEXT',
                       'UNDEFINED') object_type,
       o.name object_name,
       '' column_name
        from sys.objauth$ oa, sys.obj$ o, sys.user$ u, sys.user$ ur, sys.user$ ue,
             table_privilege_map tpm
        where oa.obj# = o.obj#
          and oa.grantor# = ur.user#
          and oa.grantee# = ue.user#
          and oa.col# is null
          and oa.privilege# = tpm.privilege
          and u.user# = o.owner#
          and o.TYPE# in (2, 4, 6, 9, 7, 8, 42, 23, 22, 13, 33, 32, 66, 67, 74, 57)
  and bitand (o.flags, 128) = 0
union all -- column level grants
select tpm.name privilege,
       decode(mod(oa.option$,2), 1, 'YES', 'NO') grantable,
       ue.name grantee,
       ur.name grantor,
       u.name owner,
       decode(o.TYPE#, 2, 'TABLE', 4, 'VIEW', 42, 'MATERIALIZED VIEW') object_type,
       o.name object_name,
       c.name column_name
from sys.objauth$ oa, sys.obj$ o, sys.user$ u, sys.user$ ur, sys.user$ ue,
     sys.col$ c, table_privilege_map tpm
where oa.obj# = o.obj#
  and oa.grantor# = ur.user#
  and oa.grantee# = ue.user#
  and oa.obj# = c.obj#
  and oa.col# = c.col#
  and bitand(c.property, 32) = 0 -- not hidden column
  and oa.col# is not null
  and oa.privilege# = tpm.privilege
  and u.user# = o.owner#
  and o.TYPE# in (2, 4, 42)
  and bitand (o.flags, 128) = 0;
</pre>
</p>
</details>

<details><summary>Used and Unused system privileges
</summary><button class="btn" data-clipboard-target="#g" title="Copy code"><i class="fa fa-copy"></i></button>
<p>
<pre id="g" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
create or replace force view used_unused_sys_privileges_v
AS
select distinct usg.capture, du.username, du.profile, drp.granted_role, rsp.privilege, usg.used_or_not
 from dba_users du,
      dba_role_privs drp,
      role_sys_privs rsp
      , (select sys_priv, username, capture, 'Used' as USED_OR_NOT
           from dba_used_sysprivs dusp
         union
         select sys_priv, username, capture, 'Not Used' as USED_OR_NOT
           from dba_unused_sysprivs dunsp) usg
 where du.username   = usg.username
   --and usg.capture   = 'CAPTURE_NAME'
   --and du.username   = 'USER_NAME'
   and rsp.privilege = usg.sys_priv  
   and drp.grantee   = du.username
   and rsp.role      = drp.granted_role
order by 1,2,3,4,5;
</pre>
</p>
</details>

<details><summary>Used and Unused object privileges
</summary><button class="btn" data-clipboard-target="#h" title="Copy code"><i class="fa fa-copy"></i></button>
<p>
<pre id="h" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
create or replace force view used_unused_obj_privileges_v
AS
select distinct usg.capture, usg.username, usg.rolename,
usg.obj_priv || ' on ' || usg.object_owner || '.' || usg.object_name || ' (' || usg.object_type || usg.column_name || ')' as privilege,
usg.used_or_not
 from (select obj_priv, username, object_owner, object_name, object_type, used_role as rolename, column_name, capture, 'Used' as USED_OR_NOT
           from dba_used_objprivs dusp
         union
         select obj_priv, username, object_owner, object_name, object_type, rolename, column_name, capture, 'Not Used' as USED_OR_NOT
           from dba_unused_objprivs dunsp) usg,
       direct_grants_overview_v dg
 where usg.username     = dg.grantee(+)
   and usg.obj_priv     = dg.privilege(+)
   and usg.object_owner = dg.owner(+)
   and usg.object_name  = dg.object_name(+)
   and usg.object_type  = dg.object_type(+)
   and usg.column_name  = dg.column_name(+)
order by 1,2,3,4;
</pre>
</p>
</details>

<br>
List of Groups of Users and their assigned Roles (per group, such as DATACNTR, CUSTADMIN etc.) <button class="btn" data-clipboard-target="#i" title="Copy code"><i class="fa fa-copy"></i></button>
<pre id="i" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
SELECT DISTINCT user_group, granted_role
FROM user_role_overview_v
WHERE granted_role IS NOT NULL
ORDER BY 1,2;
</pre>
List of Roles and the privileges they grant <button class="btn" data-clipboard-target="#j" title="Copy code"><i class="fa fa-copy"></i></button>
<pre id="j" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
select role, privilege from role_sys_privs where role like 'ROLE_NAME%';
</pre>
List of per Groups of Users privilege use for the capture period <button class="btn" data-clipboard-target="#k" title="Copy code"><i class="fa fa-copy"></i></button>
<pre id="k" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
SELECT DISTINCT sys_user_role, sys_priv, obj_user_role, obj_priv FROM used_privs_overview_v;
</pre>
List of per Groups of Users privilege misuse for the capture period <button class="btn" data-clipboard-target="#l" title="Copy code"><i class="fa fa-copy"></i></button>
<pre id="l" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
SELECT DISTINCT sys_user_role, sys_priv, obj_user_role, obj_priv FROM unused_privs_overview_v;
</pre>
List of used and unused system privileges during the capture process <button class="btn" data-clipboard-target="#m" title="Copy code"><i class="fa fa-copy"></i></button>
<pre id="m" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
select * from used_unused_sys_privileges_v where capture = 'Database priv capture' and username = 'NEW_USER';
</pre>
List of directly granted privileges, which are not used or unused during the capture process <button class="btn" data-clipboard-target="#n" title="Copy code"><i class="fa fa-copy"></i></button>
<pre id="n" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
select * from used_unused_obj_privileges_v where capture = 'Database priv capture' and username = 'NEW_USER';
</pre>

### Test Setup and Example Data
The basic premise is the following:

1. Create a new user
2. Create a new role
3. Grant the role(s) to the user
4. Start capturing session
5. Gather Data
6. Stop Capturing
7. Examine the results

<details><summary>Create User / Grant Roles to User
</summary><button class="btn" data-clipboard-target="#o" title="Copy code"><i class="fa fa-copy"></i></button>
<p>
<pre id="o" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
CREATE USER new_user IDENTIFIED  BY new_user ;
CREATE ROLE NEW_ROLE;
GRANT CREATE SESSION to NEW_ROLE;
GRANT SELECT any table to NEW_ROLE;
GRANT SELECT on NEW_USER.INSTALLATION to new_user;
GRANT RESOURCE, NEW_ROLE TO new_user;
</pre>
</p>
</details>


> Information
>
> In this particular case, the two roles we grant to the NEW_USER user have been granted with the following privileges
>
> <details><summary>Role Privileges
> </summary>
> <p>
> <pre id="p" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
> SELECT role, privilege
>  FROM role_sys_privs
> WHERE role IN ('NEW_ROLE', 'RESOURCE');
> ROLE        PRIVILEGE
> ----------- -----------------
> NEW_ROLE SELECT ANY TABLE
> NEW_ROLE CREATE SESSION
> RESOURCE    CREATE SEQUENCE
> RESOURCE    CREATE TRIGGER
> RESOURCE    CREATE CLUSTER
> RESOURCE    CREATE PROCEDURE
> RESOURCE    CREATE TYPE
> RESOURCE    CREATE OPERATOR
> RESOURCE    CREATE TABLE
> RESOURCE    CREATE INDEXTYPE
> </pre>
> </p>
> </details>

<br>
<details><summary>Start Capturing Session
</summary>
<p>
<button class="btn" data-clipboard-target="#q" title="Copy code"><i class="fa fa-copy"></i></button>
<pre id="q" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
DECLARE
  l_name VARCHAR2(30)      := 'NEW_USER';
BEGIN
  DBMS_PRIVILEGE_CAPTURE.CREATE_CAPTURE( NAME        => l_name,
                                         TYPE        => dbms_privilege_capture.g_database
                                         --g_database, g_role , g_context , g_role_and_context
                                       );
  DBMS_PRIVILEGE_CAPTURE.ENABLE_CAPTURE(l_name);
END;
/
</pre>
</p>
</details>


> Information
>
> After the capture is being created, it should be enabled to activate it.
>
> \*Only one type of capture can be enabled at a time, with the exception of g_database, which can be enabled in place with any one of > the rest.

During the capture period, we connect as user NEW_USER and execute the following <button class="btn" data-clipboard-target="#r" title="Copy code"><i class="fa fa-copy"></i></button>

<pre id="r" style="border:1px solid White; display: inline-block; white-space:pre-wrap;">
CREATE TABLE table1 (
  id NUMBER,
  description VARCHAR2(50),
  CONSTRAINT tab1_px PRIMARY KEY (id)
);

CREATE SEQUENCE table1_seq;

CREATE VIEW table1_view AS
SELECT * FROM table1;

INSERT INTO table1
SELECT level, 'Description of ' || TO_CHAR(level)
FROM   dual
CONNECT BY level <= 5;

COMMIT;
</pre>

By using the query labeled _List of used and unused system privileges during the capture process_ and specifying the user name and capture name, we get the following results

```shell
USERNAME    PROFILE GRANTED_ROLE PRIVILEGE        USED_OR_NOT
----------- ------- ------------ ---------------- -----------
NEW_USER DEFAULT NEW_ROLE CREATE SESSION    Used
NEW_USER DEFAULT NEW_ROLE SELECT ANY TABLE  Used
NEW_USER DEFAULT RESOURCE    CREATE CLUSTER    Not Used
NEW_USER DEFAULT RESOURCE    CREATE INDEXTYPE  Not Used
NEW_USER DEFAULT RESOURCE    CREATE OPERATOR   Not Used
NEW_USER DEFAULT RESOURCE    CREATE PROCEDURE  Not Used
NEW_USER DEFAULT RESOURCE    CREATE TRIGGER    Not Used
NEW_USER DEFAULT RESOURCE    CREATE TYPE Not   Used
NEW_USER DEFAULT RESOURCE    CREATE SEQUENCE   Used
NEW_USER DEFAULT RESOURCE    CREATE TABLE      Used
```

By using the query labeled _List of directly granted privileges, which are not used or unused during the capture process_ and specifying the user name and capture name, we get the following results

```shell
USERNAME    ROLENAME PRIVILEGE                                      USED_OR_NOT
----------- -------- ---------------------------------------------- -----------
NEW_USER PUBLIC   EXECUTE on SYS.DBMS_SQL (PACKAGE)              Used
NEW_USER PUBLIC   EXECUTE on SYS.DBMS_UTILITY (PACKAGE)          Used
NEW_USER PUBLIC   SELECT on SYS.ALL_OBJECTS (VIEW)               Used
NEW_USER PUBLIC   SELECT on SYS.ALL_TABLES (VIEW)                Used
NEW_USER PUBLIC   SELECT on SYS.DATABASE_COMPATIBLE_LEVEL (VIEW) Used
NEW_USER PUBLIC   SELECT on SYS.DUAL (TABLE)                     Used
NEW_USER PUBLIC   SELECT on SYS.NLS_DATABASE_PARAMETERS (VIEW)   Used
NEW_USER PUBLIC   SELECT on SYS.NLS_SESSION_PARAMETERS (VIEW)    Used
NEW_USER PUBLIC   SELECT on SYS.V_$OPTION (VIEW)                 Used
NEW_USER PUBLIC   SELECT on SYS.V_$VERSION (VIEW)                Used
NEW_USER          SELECT on NEW_USER.INSTALLATION (TABLE)      Not Used
```

##### Drop the capture
After the report has been prepared and all the data has been exported externally off the Database, we may drop the capture.

```shell
declare
l_name varchar2(30) := 'Database priv capture';
begin
DBMS_PRIVILEGE_CAPTURE.DROP_CAPTURE(l_name);
end;
/
```

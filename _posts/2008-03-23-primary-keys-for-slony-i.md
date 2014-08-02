---
title: Primary Keys for Slony-I
author: kgorman
layout: post
permalink: primary-keys-for-slony=i
fave-post_views:
  - 59
categories:
  - PostgreSQL
tags:
  - PostgreSQL
  - slony
---
One of the prerequisites for <a href=http://slony.info>Slony</a> replication is to be sure that primary keys (or at least suitable columns) are defined for each table to be under replication. This is a simple example script for getting that data in postgresql. This assumes that the intention is to replicate all of the public schema.

<pre lang="sql">select tablename
from pg_tables
where tablename not in
 (select r.relname
 from pg_class r, pg_constraint c
 where r.oid = c.conrelid
 and c.contype = 'p'
 )
and schemaname = 'public';
</pre>

If the output shows tables without primary keys, then the decision can be made to either add them, or instruct slonik to use suitable columns that form a logical unique key. However, as the <a href=http://slony.info/documentation/definingsets.html>documentation states</a>, you might as well just define the keys if you go this far.

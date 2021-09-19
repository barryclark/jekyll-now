---
layout: post
title: The Order of Basic SQL execution
category: SQL
tags: [SQL, data]
---

[SQL](https://www.w3schools.com/sql/), short for Structured Query Lanuguage, is widely used in proramming and desigined for managing data in a [relational database management system](https://en.wikipedia.org/wiki/Relational_database#RDBMS).

A very basic SQL query looks like this:
```
select *
from 
[table_name]
where [col_name] = *
and
...
```

In the modern world, SQL query planners can do all sorts of tricks to make queries run more efficiently, but they must always reach the same final answer as a query that is executed per the standard SQL order of execution. This order is:

| Order         | Clause           | Function  |
|:------------- |:-------------|:-----|
| 1      | from | Choose and join tables to get base data |
| 2      | where      | Filters the base data |
| 3 | group by      | Aggregates the base data |
| 4 | having      | Filters the aggregated data|
| 5 | select      | Returns the final data |
| 6 | order by      | Sorts the final data |
| 7 | limit      | Limits the returned data to a raw count |

Looks like different from the writing order right?

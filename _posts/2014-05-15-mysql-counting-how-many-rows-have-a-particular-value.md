---
layout: post
title: MySQL - Counting how many rows have a particular value
permalink: /sugarcrm/mysql-counting-how-many-rows-have-a-particular-value
post_id: 1259
categories:
- Dashboards
- mysql
- Reporting
- SugarCRM
---

Working on a SugarCRM dashboard today, and I needed to count how many records had one value and how many records had a second value. I then wanted to know what percentage the first value was of the total. So there's a bit of MySQL code that helps make this easy to do.<!--more-->

<pre><code>
SELECT
  SUM(IF(field_name = 'value_one',1,0)) AS 'Value One',
  SUM(IF(field_name = 'value_two',1,0)) AS 'Value Two'
FROM table_name
</code></pre>

What this does is counts up how many times `value_one` and `value_two` appear in `field_name` in the table `table_name`.

You can then take this a step further, if you wanted to, and I did... you can use a line like this within your query:

<pre><code>
SELECT
  SUM(IF(field_name = 'value_one',1,0)) AS 'Value One',
  SUM(IF(field_name = 'value_two',1,0)) AS 'Value Two',
  ROUND(SUM(IF(field_name = 'value_one',1,0)) / (SUM(IF(field_name = 'value_one',1,0)) + SUM(IF(field_name = 'value_two',1,0))) * 100) AS 'Percentage'
FROM table_name
</code></pre>

This gives you the percentage that `value_one` is of (`value_one` + `value_two`).

Hat tip to this [stackoverflow answer by eisberg](http://stackoverflow.com/a/19047458/1220017).

Edit: 2014-05-26-21h53m put the [final code snippet into a 'Gist' on GitHub](https://gist.github.com/benhamilton/b26b032f21040ad75a0c).

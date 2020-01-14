---
layout: post
title: MySQL snippet for past and next 6 Months
permalink: /sugarcrm/mysql-snippet-for-past-and-next-6-months
post_id: 942
categories:
- Code
- mysql
- SugarCRM
---

Spent some time today working with
DATEDIFF,
DATE_ADD and all kinds of horrid looking code before realising that to do a MySQL query to get records where the date is in the past or the next
x months all I need is the following.


WHERE t_position_cstm.review_date_c <= DATE_ADD(DATE(now()), INTERVAL
**6**

**MONTH**
)

You can change the
**6**
 to whatever appropriate value you have, and you can change
**MONTH**
 to a variety of other values, for me the two I used today was
**MONTH**
 and
**DAY**
.

I’m using this on a SugarCRM MySQL database with a custom module of
**Position**
 (the actual table name is
t_position).

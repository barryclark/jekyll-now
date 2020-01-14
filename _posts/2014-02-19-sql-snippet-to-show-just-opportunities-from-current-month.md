---
layout: post
title: Sql snippet to show just opportunities from current month
permalink: /sql/sql-snippet-to-show-just-opportunities-from-current-month
post_id: 1120
categories:
- Opportunities
- SQL
- SugarCRM
---

I'm needing to do a sql query to show just the opportunities from the current month, the sql snippet for the WHERE clause to do this is the following:

WHERE MONTH(opportunities.date_closed) = MONTH(NOW()) and YEAR(opportunities.date_closed) = Year(now())

---
layout: post
title: How long running are those queries?
permalink: /sql/how-long-running-are-those-queries
post_id: 1335
categories:
- "*nix"
- mysql
- SQL
- Time
---

At the MySQL commandline, you can enter

`show processlist;`

and see what processes are running.

If you're tracking down some problematic code and you've got a query (or set of queries) that don't end, consume CPU cycles and generally bog everything down to a crawl, it can be helpful to know what time you've run the command above.<!--more--> Thusly, I now run this:

`show processlist; select now as current_date_time;`

and it rather nicely tells me the current date/time on the MySQL server, using the Time column from the processlist, you can work out a tad more accurately when a query started, giving you a starting point to look in other logs.

Now those long running sql queries are easier to track down.

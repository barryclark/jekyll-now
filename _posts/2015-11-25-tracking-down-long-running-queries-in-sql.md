---
layout: post
title: Tracking down long running queries in SQL
permalink: /sql/tracking-down-long-running-queries-in-sql
post_id: 1356
categories:
- "*nix"
- mysql
- SQL
- SugarCRM
---

I’ve had a client whose Linux Server (CentOS) gradually gets slower and slower, then falls over.

By logging into the MySQL command line, we were able to see that there were some long running queries that never end.<!--more-->

`show processlist;`

returns

<pre><code>
| Id | User | Host | db | Command | Time | State | Info |
+———+———-+——————-+————–+———+——+————–+——————————————————————————————————+
| 2322386 | ssgadmin | 10.21.1.149:58526 | sugarcrm_ssg | Query | 2202 | Sending data | SELECT IFNULL(hr_humanresources.last_name,’’) hr_humanresources_last_name ,l3_cstm.verification_c l3 |
</code></pre>

The key part here is that
`hr_humanresources_last_name` has an underscore between the table name when it should be a period i.e. `hr_humanresources.last_name`. Knowing the table name was enough to tell me it was caused by something to do with SugarCRM that’s running on that server. But we don’t yet know what action caused these queries.

Knowing it was 2202 seconds ago from the time we ran the query we are able to pinpoint a time the action occurred. Looking through the SugarCRM log files did turn up that the error was often caused by a single user, but didn't show up anything to help us figure out exactly what was the causal issue. Talking with that user, getting them to do what they’d done at that time didn’t turn up anything, the error wasn’t reproducing on demand.

So I turned to looking in the tracker table in the SugarCRM MySQL database for entries around the time of the error. Turns out that there is a Dashlet being loaded, that Dashlet uses a Report.

Each time I load the Dashlet or run the Report I get a corresponding long running query turn up. We’ve found our culprit, and we’re now able to recreate the report.

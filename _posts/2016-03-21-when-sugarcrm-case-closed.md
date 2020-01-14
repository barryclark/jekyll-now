---
layout: post
title: When SugarCRM Case Closed
permalink: /sql/when-sugarcrm-case-closed
post_id: 1450
categories:
- mysql
- SQL
- SugarCRM
---

Using the `cases.date_modified` is not the same as the date a case is closed, as the case may have been modified after it was closed.

Thus, the query below will return the date the case was transitioned to `Closed` provided the `cases.status` field is being audited.<!--more-->

<pre><code>
select
  CONVERT_TZ(cases_audit.date_created,'+00:00','+10:00') as 'date_closed',
  accounts.name as 'account',
  cases.case_number,
  cases.name as 'case_id'
from
  cases_audit
  join cases on cases.id = cases_audit.parent_id
  join accounts on accounts.id = cases.account_id
where
  cases_audit.field_name = "status"
  and cases_audit.after_value_string = "Closed"
order by
  accounts.name asc,
  cases_audit.date_created desc;
</code></pre>

Note, you might get more then one row returned per case if the case was re-opened, also my code above assumes a timezone of UTC+10

I happen to be in the UTC+10 timezone :).

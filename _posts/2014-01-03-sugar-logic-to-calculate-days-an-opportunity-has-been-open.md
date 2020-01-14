---
layout: post
title: Sugar logic to calculate days an opportunity has been open
permalink: /general/sugar-logic-to-calculate-days-an-opportunity-has-been-open
post_id: 970
categories:
- General
- How to
- Opportunity
- SugarCRM
- SugarLogic
---

We want to find out how many days an Opportunity in SugarCRM has been open, using a calculated custom integer field in SugarCRM Studio. I'm assuming you've already created a new custom integer field, likely called something similar to "Days open".

The sugar logic to calculate the difference between two dates is this:

`abs(subtract(daysUntil($date1),daysUntil($date2)))`

and the sugar logic to do an if then else is:

`ifElse(test,if_true,if_false)`

The first test we’ll do is if the sales stage is “Closed Lost” or “Closed Won”, if it’s true, we’ll calculate the days between the create date and the expected close date. If the sales stage is something other than “Closed Lost” or “Closed Won” then we’ll calculate the days between the create date and today.

This makes our pseudo sugar logic formula look like this:

<pre><code>
ifElse(
	or(
		equal($sales_stage,“Closed Lost”),
		equal($sales_stage,”Closed Won”)
	),
	calc_days_create_to_expected_close_date,
	calc_days_create_to_today
)
</code></pre>

Which, when we update it with the real sugar logic parts becomes this:

<pre><code>
ifElse(
	or(
		equal($sales_stage,"Closed Lost"),
		equal($sales_stage,"Closed Won")
	),
	abs(
		subtract(
			daysUntil($date_entered),
			daysUntil($date_closed)
		)
	),
	abs(
		subtract(
			daysUntil($date_entered),
			daysUntil(
				today()
			)
		)
	)
)
</code></pre>

This post was
[written in response to a question on LinkedIn](http://lnkd.in/dsuBitK).

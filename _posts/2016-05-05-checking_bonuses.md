---
layout: post
title: Checking Bonuses
tags: [money]
keywords: [checking, churning, bank, interest]
---

For fun (and profit!) I'm trying to see how many checking bonuses I can get. Since it's super easy to set up direct deposit at work - it's just through a web portal - I can add, remove, or change the amount going into bank accounts at will. I got to keep track of what accounts I have open. Just to get an idea of what I've done, here's a table:

<table>
<thead>
<tr>
	<th>Bank</th>
	<th>Start Date</th>
	<th>Initial Deposit</th>
	<th>Requirements</th>
	<th>Completed Date</th>
	<th>Bonus Received</th>
	<th>Bonus</th>
</tr>
</thead>
<tbody>
{% for row in site.data.churn %}
<tr>
	<td>{{ row.who }}</td>
	<td>{{ row.start_date }}</td>
	<td>${{ row.initial_deposit }}</td>
	<td>{{ row.requirements }}</td>
	<td>{{ row.completed_date }}</td>
	<td>{{ row.bonus_date }}</td>
	<td>${{ row.bonus }}</td>
</tr>
{% endfor %}
</tbody>
</table>

I'll probably update this table as time goes on, unless I don't do anymore bonuses. I'm going to close the Fifth Third one soon, but Chase needs to be open for at least six months or they'll take my bonus away. And yes, I know I have to pay taxes on these. Right now my Federal bracket is at 25% and my Ohio bracket is at 3.465%. Since these are interest payments (1099-INT) I don't pay any local tax on them.

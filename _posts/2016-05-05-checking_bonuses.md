---
layout: post
title: Checking Bonuses
tags: [money]
keywords: [checking, churning, bank, interest]
---

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

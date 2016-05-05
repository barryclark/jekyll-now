---
layout: post
title: Checking Bonuses
tags: [money]
keywords: [checking, churning, bank, interest]
excerpt: 1. Maximum and Minimum values; 2. String Length; 3. Constant String Length; 4. Variable Name Length
---

<table>
<thead>
<tr>
	<th>Bank</th>
	<th></th>
	<th></th>
	<th></th>
	<th></th>
</tr>
</thead>
<tbody>
{% for item in site.data.garagesale.stuff %}
<tr>
	<td>{{ item.name }}</td>
	<td>${{ item.price }}</td>
	<td >
		<a href="images/{{ item.image }}.jpg">
		<img src="images/{{ item.image }}.jpg" style="width: 270px; height: 152px;" />
		</a>
		<div class="fb-share-button" 
			 data-href="http://hendrixjoseph.github.io/garagesale/images/{{ item.image }}.jpg"
			 data-layout="button_count">
		</div>
	</td>
</tr>
{% endfor %}
</tbody>
</table>

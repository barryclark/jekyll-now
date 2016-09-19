---
layout: page
title: Fabbisogni
permalink: /fabbisogni/
---
<div class="row">
<div class="col-md-12">
<div class="list-group">
	{% for member in site.data.issuesjson %}
	{% if member.issue.labels contains "Fabbisogni" %}
	<a href="/issues/{{ member.number | datapage_url: '.' }}" class="list-group-item">
		<h4 class="list-group-item-heading">{{member.title}}</h4>
		<p class="list-group-item-text">{{member.issue.data.descrizione}}</p>
	</a>
	{% endif %}
	{% endfor %}
</div>
</div>
</div>
---
layout: page
title: Risorse disponibili
permalink: /risorse-disponibili/
---
<div class="row">
<div class="col-md-12">
<div class="list-group">
{% assign filteredissues = site.data.issuesjson | where: "state","open" %}
{% for member in filteredissues %}
{% if member.issue.labels contains "Donazioni" %}
<a href="/issues/{{ member.number | datapage_url: '.' }}" class="list-group-item">
	<h4 class="list-group-item-heading">{{member.title}}</h4>
	<p class="list-group-item-text">{{member.issue.data.descrizione}}</p>
</a>
{% endif %}
{% endfor %}
</div>
</div>
</div>

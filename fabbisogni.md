---
layout: page
title: Fabbisogni
permalink: /fabbisogni/
---
{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Fabbisogni" %}
* <a href="/issues/{{ member.number | datapage_url: '.' }}">{{member.title}}</a>
{% endif %}
{% endfor %}

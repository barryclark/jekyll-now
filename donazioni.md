---
layout: page
title: Risorse disponibili
permalink: /risorse-disponibili/
---

{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Donazioni" %}
* <a href="/issues/{{ member.number | datapage_url: '.' }}">{{member.title}}</a>
{% endif %}
{% endfor %}

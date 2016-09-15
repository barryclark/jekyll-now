---
layout: page
title: Alloggi
permalink: /alloggi/
---

{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Alloggi" %}
* <a href="{{ member.title | datapage_url: '.' }}">{{member.title}}</a>
{% endif %}
{% endfor %}

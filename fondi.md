---
layout: page
title: Raccolte Fondi
permalink: /fondi/
---

{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Raccolte Fondi" %}
* <a href="/issues/{{ member.title | datapage_url: '.' }}">{{member.title}}</a>
{% endif %}
{% endfor %}

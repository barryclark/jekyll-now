---
layout: page
title: News
permalink: /news/
---


{% assign filteredissues = site.data.issuesjson | where: "state","open" %}
{% for member in filteredissues %}
{% if member.issue.labels contains "Notizie Utili" %}
* <a href="/issues/{{ member.number | datapage_url: '.' }}">{{member.title}}</a>
{% endif %}
{% endfor %}

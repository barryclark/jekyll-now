---
layout: page
title: Bibliography in Buddhist Studies
permalink: /pages/study/bibliography
---

{% for entry in site.bibliography %}

## {{ entry.authors }}, _"{{ entry.title }}"_, {{ entry.year }}

Ref: {{ entry.authors }}, _"{{ entry.title }}"_, {{ entry.year }}, {{ entry.source }} {% if entry.isbn %}, ISBN {{ entry.isbn }}{%endif%} {% if entry.doi %}\[[doi](https://{{entry.doi}})\]{%endif%} {% if entry.download %}\[[download]({{ entry.download }})\]{%endif%} {% if entry.url %}\[[url]({{ entry.url }})\]{%endif%}

{{ entry.content }}
{% endfor %}

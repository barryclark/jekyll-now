---
layout: page
title: Bibliography in Buddhist Studies
permalink: /pages/study/bibliography
---

{% for entry in site.bibliography %}

## {{ entry.authors }}, _"{{ entry.title }}"_, {{ entry.year }}

Ref: {{ entry.authors }}, _"{{ entry.title }}"_, {{ entry.year }}, {{ entry.source }} {%if entry.doi %}\[[doi](https://{{entry.doi}})\]{%endif%} {% if entry.download %}\[[download]({{ entry.download }})\]{%endif%}

{{ entry.content }}
{% endfor %}

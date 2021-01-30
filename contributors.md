---
layout: page
title: Contributors
---

{% for person in site.people %}

<a href="{{ site.baseurl}}{{ person.url }}">{{ person.name }}</a>

{% endfor %}

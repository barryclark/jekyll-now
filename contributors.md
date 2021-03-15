---
layout: page
title: Contributors
---

{% for person in site.people %}

<h3><a href="{{ site.baseurl}}{{ person.url }}">{{ person.name }}</a></h3>

{% endfor %}

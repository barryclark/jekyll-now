---
layout: page
title: Contributors
---

Contributors to this course blog are:

{% for person in site.people %}

<a href="{{ site.baseurl}}{{ person.url }}">{{ person.name}}</a>

{% endfor %}

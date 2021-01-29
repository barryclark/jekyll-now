---
layout: page
title: Contributors
---

Contributors to this course blog are:

{% for person in site.people %}

<h2><a href="{{ site.baseurl}}{{ person.url }}">{{ person.name}}</a></h2>

{% endfor %}

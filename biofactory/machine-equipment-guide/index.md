---
layout: default
title: Machine & Equipment Guide
permalink: /biofactory/annex/machine-equipment-guide/
---

## Machine & Equipment Guide

Please use the following calender to book the machines in the Fablab during the days that are indicated as "Practical". Try to limit your reservations to 1 hour each.

{% include machine-calendar.html %}

Please read the following guides before using that particular machine or piece of equipment:

{% for page in site.pages %}
{% if page.url contains 'biofactory' %}'
{% if page.categories contains 'machine-equipment-guide' %}
* [{{ page.title }}]({{ page.url | prepend: site.baseurl }})
{% endif %}
{% endif %}
{% endfor %}
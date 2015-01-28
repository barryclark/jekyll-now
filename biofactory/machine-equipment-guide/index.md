---
layout: default
title: Machine & Equipment Guide
permalink: /biofactory/annex/machine-equipment-guide/
---

## Machine & Equipment Guide

Please read the following guides before using that particular machine or piece of equipment:

{% for page in site.pages %}
{% if page.categories contains 'machine-equipment-guide' %}
* [{{ page.title }}]({{ page.url | prepend: site.baseurl }})
{% endif %}
{% endfor %}
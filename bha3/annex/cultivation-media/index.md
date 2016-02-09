---
layout: default
title: Cultivation Media
permalink: /bha3/annex/cultivation-media/
alias: [/annex/cultivation-media]
---

## Cultivation Media

This is a list of all the cultivation media we can use during the course. Please use the comments to add information, other media you found useful or share interesting notes.

{% for page in site.pages %}
{% if page.url contains 'bha3' %}
	{% if page.categories contains 'cultivation-media' %}
* [{{ page.title }}]({{ page.url | prepend: site.baseurl }})
	{% endif %}
{% endif %}
{% endfor %}

## Materials

Here is a list with where to get which [materials](/bha3/annex/cultivation-media/materials.md).
---
layout: default
title: Cultivation Media
permalink: /biofactory/annex/cultivation-media/
alias: [/annex/cultivation-media]
---

## Cultivation Media

This is a list of all the cultivation media we will use during the course. Please use the comments to add information or share interesting notes.

{% for page in site.pages %}
	{% if page.categories contains 'cultivation-media' %}
* [{{ page.title }}]({{ page.url | prepend: site.baseurl }})
	{% endif %}
{% endfor %}

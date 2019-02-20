---
layout: default
title: Archive
permalink: /archive/
---

{% for post in site.posts %}{% assign year = post.date | date: "%Y" %}
{% unless prevyear or year == prevyear %}{{ year }}{% endunless %}{% assign prevyear = year %}
* {{ post.date | date: "%e" }} [{{ post.title }}]({{ post.url }})
{% endfor %}

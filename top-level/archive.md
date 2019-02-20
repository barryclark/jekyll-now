---
layout: default
title: Archive
permalink: /archive/
---

{% for post in site.posts %}{% assign year = post.date | date: "%Y" %}
{% unless prevyear %}{{ year }}{% assign prevyear = year %}{% endunless %}
* {{ post.date | date: "%e" }} [{{ post.title }}]({{ post.url }})
{% endfor %}

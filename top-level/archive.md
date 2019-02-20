---
layout: default
title: Archive
permalink: /archive/
---

{% for post in site.posts %}
* {{ post.date | date: "%e" }} [{{ post.title }}]({{ post.url }})
{% endfor %}

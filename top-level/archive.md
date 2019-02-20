---
layout: default
title: Archive
permalink: /archive/
---

{% for post in site.posts %}{% assign year = post.date | date: "%Y" %}{% assign month = post.date | date: "%B" %}
{% unless prevyear and year == prevyear %}{{ year }}{% endunless %}{% assign prevyear = year %}
{% unless prevmonth and month == prevmonth %}{{ month }}{% endunless %}{% assign prevmonth = month %}
* {{ post.date | date: "%e" }} [{{ post.title }}]({{ post.url }})
{% endfor %}

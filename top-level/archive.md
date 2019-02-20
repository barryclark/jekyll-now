---
layout: default
title: Archive
permalink: /archive/
---

{% for post in site.posts %}{% assign year = post.date | date: "%Y" %}{% assign month = post.date | date: "%B" %}
{% unless prevyear and year == prevyear %}<h2 id="year-{{ year }}"><a href="#year-{{ year }}">{{ year }}</a></h2>{% endunless %}{% assign prevyear = year %}
{% unless prevmonth and month == prevmonth %}<h3 id="{{ month }}-{{ year }}"><a href="#{{ month }}-{{ year }}">{{ month }} {{ year }}</a></h3>{% endunless %}{% assign prevmonth = month %}
* {{ post.date | date: "%e" }}: [{{ post.title }}]({{ post.url }})
{% endfor %}

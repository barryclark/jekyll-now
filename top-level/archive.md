---
layout: default
title: Archive
permalink: /archive/
---

{% for post in site.posts %}{% assign year = post.date | date: "%Y" %}{% assign month = post.date | date: "%B" %}
{% unless prevyear and year == prevyear %}<div id="year-{{ year }}"><a href="#year-{{ year }}">{{ year }}</a></div>{% endunless %}{% assign prevyear = year %}
{% unless prevmonth and month == prevmonth %}<div id="{{ month }}-{{ year }}"><a href="#{{ month }}-{{ year }}">{{ month }}</a></div>{% endunless %}{% assign prevmonth = month %}
* {{ post.date | date: "%e" }}: [{{ post.title }}]({{ post.url }})
{% endfor %}

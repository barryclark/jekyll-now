---
layout: default
title: Notes from Connect Tech 2018
permalink: :collection
exclude: true
---
Things I learned at Connect Tech 2018
{% assign sessions = site.connecttech2018 | where_exp: "item", "item.exclude != true "%}
<ol>
  {% for item in sessions %}
    <li><a href="{{item.url}}">{{item.title}}</a></li>
  {% endfor %}
</ol>

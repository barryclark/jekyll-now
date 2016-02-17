---
layout: page
title: Jekyll
permalink: /jekyll/
---



<p>Posts in category "jekyll" are:</p>

<ul>
  {% for post in site.categories.jekyll %}
    {% if post.url %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
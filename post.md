---
layout: page
title: Blog
titolo: Blog | Terremoto Centro Italia
permalink: /post/
---

{% for posts in site.posts %}
  <li><a href="{{ posts.baseurl }}{{ posts.url }}">{{ posts.title }}</a></li>
{% endfor %}

---
layout: page
title: Aggiornamenti
titolo: Aggiornamenti | Terremoto Centro Italia
permalink: /post/
---

{% for posts in site.posts %}
  <li><a href="{{ posts.baseurl }}{{ posts.url }}">{{ posts.title }}</a></li>
{% endfor %}

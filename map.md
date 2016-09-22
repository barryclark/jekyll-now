---
layout: page
title: Mappe
permalink: /mappe/
---

<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'mappe' %}
      <article class="post">
        <h4><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h4>
      </article>
    {% endif %}
  {% endfor %}
</div>

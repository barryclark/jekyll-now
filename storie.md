---
layout: page
title: Storie
permalink: /storie/
---

<div class="posts">
  {% for post in site.storie %}
    {% if post.categories contains 'storie' %}
      <article class="post">
        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Leggi tutto</a>
      </article>
    {% endif %}
  {% endfor %}
</div>

---
layout: page
title: Blog
permalink: /post/
---
<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'blog' %}
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
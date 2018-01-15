---
layout: page
title: Blog
permalink: /post/
---
<div class="posts">
{% assign filteredposts = site.posts | where_exp: "post","post.categories contains 'blog'"%}
  {% for post in filteredposts %}
      <article class="post">
        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Leggi tutto</a>
      </article>
  {% endfor %}
</div>

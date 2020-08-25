---
layout: page
title: Posts
permalink: /posts/
---
<section id="posts" class="home-section">
  <h1> Posts </h1> 
  <div class="posts">
    {% for post in site.posts %}
      <article class="post">
        <h2><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2> ({{ post.date | date_to_string }})
        <div class="entry">
          {{ post.excerpt }}
        </div> 
        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </article>
    {% endfor %}
  </div>
</section>

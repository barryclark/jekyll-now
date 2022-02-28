---
layout: page
title: Posts
permalink: /posts/
---
<section id="posts" class="home-section">
  <div class="posts">
    {% for post in site.posts %}
      <article class="post">
        <b><font size="-1">{{ post.date | date_to_string }}</font> <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></b> 
        <div class="entry">
          {{ post.excerpt }}
        </div> 
        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </article>
    {% endfor %}
  </div>
</section>

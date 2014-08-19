---
layout: page
title: Miriam Tocino
tagline: Web Developer
---
{% include JB/setup %}

{% for post in site.posts %}
  <article class="post">
      <p>{{ post.date | date_to_long_string }}</p>
      <h4 class="epsilon"><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h4>
      <div class="entry">
          {{ post.content | truncatewords:80}}
      </div>
      <a href="{{ BASE_PATH }}{{ post.url }}" class="btn read-more">Read More</a>
  </article>
{% endfor %}


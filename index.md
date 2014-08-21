---
layout: page
title:
tagline:
---
{% include JB/setup %}

{% for post in site.posts %}
  <article class="post">
      <div class="date">
        <span>{{ post.date | date_to_long_string }}</span>
      </div>

      <h2 class="epsilon"><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h2>

      <div class="entry">
          {{ post.content | truncatewords:40}}
      </div>

      <div class="container-read-more">
        <a href="{{ BASE_PATH }}{{ post.url }}" class="btn read-more">Read More</a>
      </div>
  </article>
{% endfor %}


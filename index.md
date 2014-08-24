---
layout: page
title:
tagline:
---
{% include JB/setup %}

<h1 class="text-center" style="color: #d33682;margin-top: 130px;">Coming soon!</h1>

{% for post in site.posts %}
  <article class="post">
      <div class="date">
        <span>{{ post.date | date_to_long_string }}</span>
      </div>

      <h3 class="epsilon"><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
      {% if post.tagline %}<small>{{post.tagline}}</small>{% endif %}
      </h3>

      <!--
      <div class="container-read-more">
        <a href="{{ BASE_PATH }}{{ post.url }}" class="btn read-more">Read More</a>
      </div>
      -->
  </article>
{% endfor %}


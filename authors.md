---
layout: page
title: Authors
subtitle: Posts By Author
---


{% capture rawauthors %}{% for post in site.posts %}{% if post.author %}{{ post.author }}|{% endif %}{% endfor %}{% endcapture %}
{% assign authors = rawauthors | split:'|' | sort %}

<section id="site-authors">
{% for author in authors %}
  {% capture rawposts %}{% for post in site.posts %}{% if post.author == author %}{{ post.title }}*{{ post.url }}|{% endif %}{% endfor %}{% endcapture %}
  {% assign posts = rawposts | split:'|' | sort %}
  <h3 id="{{ author | downcase }}-ref">{{ author }}</h3>
  {% for post in posts %}
  <ul>
    {% assign parts = post | split:'*' %}
    <li><a href="{{ BASE_PATH }}{{site.baseurl}}{{ parts[1] }}">{{ parts[0] }}</a></li>
  </ul>
  {% endfor %}
{% endfor %}
</section>
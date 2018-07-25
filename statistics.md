---
layout: page
title: Blog Statistics
permalink: /statistics/
---

* {{ site.posts | size }} total posts.
* {{ site.pages | size }} pages of posts.
* {{ site.tags | size }} different tags.
* The most recent post was on [{{ site.posts.first.date | date: "%B %e, %Y" }}]({{ site.posts.first.url }}).
* The first post was on [{{ site.posts.last.date | date: "%B %e, %Y" }}]({{ site.posts.last.url }}).

{% for post in site.posts %}
  {% assign words = site.posts.first.content.strip_html.number_of_words %}
  {% if mostwords %}
    {% if words > mostwords %}
      {% assign mostwords = words %}
    {% elsif words < leastwords %}
      {% assign leastwords = words %}
    {% endif %}
  {% else %}
    {% assign mostwords = words %}
    {% assign leastwords = words %}
  {% endif %}
{% endfor %}

* The post with the most words has {{ mostwords }} words.
* The post with the least words has {{ leastwords }} words.

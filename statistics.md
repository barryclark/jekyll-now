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
  {% capture text %}{{ post.content | strip_html }}{% endcapture %}
  {% assign words = text.size %}
  {% if mostwords %}
    {% if words > mostwords %}
      {% assign mostwords = words %}
      {% assign mostpost = post %}
    {% elsif words < leastwords %}
      {% assign leastwords = words %}
      {% assign leastpost = post %}
    {% endif %}
  {% else %}
    {% assign mostwords = words %}
    {% assign leastwords = words %}
    {% assign mostpost = post %}
    {% assign leastpost = post %}
  {% endif %}
{% endfor %}

* The post with the most words has {{ mostwords }} words. {{ mostpost.url }}
* The post with the least words has {{ leastwords }} words. {{ leastpost.url }}

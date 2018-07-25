---
layout: page
title: Blog Statistics
permalink: /statistics/
---

{% for post in site.posts %}
  {% capture text %}{{ post.content | strip_html }}{% endcapture %}
  {% capture alltext %}{{ alltext }} {{ text }}{% endcapture %}
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

* {{ site.posts | size }} total posts.
* {{ site.pages | size }} pages of posts.
* {{ site.tags | size }} different tags.
* There are {{ alltext | number_of_words }} words across all posts.
* That is an average of {{ alltext | number_of_words | divided_by:site.posts.size}} per post.
* The most recent post was on [{{ site.posts.first.date | date: "%B %e, %Y" }}]({{ site.posts.first.url }}).
* The first post was on [{{ site.posts.last.date | date: "%B %e, %Y" }}]({{ site.posts.last.url }}).
* The [post with the most words]({{ mostpost.url }}) has {{ mostpost.content | strip_html | number_of_words }} words.
* The [post with the least words]({{ leastpost.url }}) has {{ leastpost.content | strip_html | number_of_words }} words.
* {{ mostwords }}

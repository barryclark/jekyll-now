---
layout: page
title: Post Statistics
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
{% for tag in site.tags %}
  {% assign tagcount = tag[1].size %}
  {% if mosttag %}
    {% if tagcount > mosttagcount %}
      {% assign mosttagcount = tagcount %}
      {% assign mosttag = tag[0] %}
    {% elsif tagcount < leasttagcount %}
      {% assign leasttagcount = tagcount %}
      {% assign leasttag = tag[0] %}
    {% endif %}
  {% else %}
      {% assign mosttagcount = tagcount %}
      {% assign leasttagcount = tagcount %}
      {% assign mosttag = tag[0] %}
      {% assign leasttag = tag[0] %}
  {% endif %}
{% endfor %}

* There are {{ site.posts | size }} total posts.
* These posts are across {{ site.posts | size | plus:site.paginate | minus:1 | divided_by:site.paginate }} pages with {{ site.paginate }} posts per page.
* There are {{ site.tags | size }} different tags.
* The tag with the most posts is [{{ mosttag }}](/tags/#{{ mosttag }}) with {{ mosttagcount }} posts.
* The tag with the least posts is [{{ leasttag }}](/tags/#{{ leasttag }}) with {{ leasttagcount }} posts.
* There are {{ alltext | number_of_words }} words across all posts.
* That is an average of {{ alltext | number_of_words | divided_by:site.posts.size}} words per post.
* The most recent post was on [{{ site.posts.first.date | date: "%B %e, %Y" }}]({{ site.posts.first.url }}).
* The first post was on [{{ site.posts.last.date | date: "%B %e, %Y" }}]({{ site.posts.last.url }}).
* The [post with the most words]({{ mostpost.url }}) has {{ mostpost.content | strip_html | number_of_words }} words.
* The [post with the least words]({{ leastpost.url }}) has {{ leastpost.content | strip_html | number_of_words }} words.

---
layout: page
title: Post by Category
permalink: /categoryview/
sitemap: false
---

<div>
{% assign categories = site.categories | sort %}
{% for category in categories %}
<span class="site-tag">
    <a href="#{{ category | first | slugify }}">
        {{ category[0] | replace:'-', ' ' }} ({{ category | last | size }})
    </a>
</span>
{% endfor %}
</div>


<div id="index">

{% for category in categories %}
<a name="{{ category[0] }}"></a><h2>{{ category[0] | replace:'-', ' ' }} ({{ category | last | size }}) </h2>
{% assign sorted_posts = site.posts | sort: 'title' %}
{% for post in sorted_posts %}
{%if post.categories contains category[0]%}

  <h3><a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }} <p class="date">{{ post.date |  date: "%B %e, %Y" }}</p></a></h3>
  <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>

{%endif%}
{% endfor %}

{% endfor %}
</div>


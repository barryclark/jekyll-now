---
layout: page
title: All Posts
permalink: /tags/
---

{% for category in site.categories %}
<a class="tag_box" href="#{{ category | first }}">#{{ category | first }}<sup>{{ category | last | size }}</sup></a>{% endfor %}

{% for category in site.categories %}

#### #{{ category | first }}

<a name="{{ category | first }}"></a>

<ul>
{% for posts in category %}
  {% for post in posts %}
    {% if post.url %}
    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
{% endfor %}
</ul>

{% endfor %}
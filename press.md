---
layout: page
title: Press
permalink: /press/
---

Data            |Fonte                   |Titolo       |Fonte
:---------------|:-----------------------|:------------|:--------------
{% for member in site.data.press %} {{member.data}} | {{member.dove}} | {{member.titolo}} | [Fonte]({{member.link}})
{% endfor %}


<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'press' %}
      <article class="post">
        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Leggi Tutto</a>
      </article>
    {% endif %}
  {% endfor %}
</div>


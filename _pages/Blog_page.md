---
title:  "Blogs"
layout: archive
permalink: /Blogs/
author_profile: true
comments: true
---

Most of my blogs are technical blogs written mainly for my own reference. I'd be happy if any of you find them useful too.



<ul>
  {% for post in site.posts %}
    {% unless post.next %}
      <font color="#778899"><h2>{{ post.date | date: '%Y %b' }}</h2></font>
    {% else %}
      {% capture year %}{{ post.date | date: '%Y %b' }}{% endcapture %}
      {% capture nyear %}{{ post.next.date | date: '%Y %b' }}{% endcapture %}
      {% if year != nyear %}
        <font color="#778899"><h2>{{ post.date | date: '%Y %b' }}</h2></font>
      {% endif %}

    {% endunless %}
   {% include archive-single.html %}
  {% endfor %}
</ul>

## Notebooks:
- [**Python: assignment, function argument passing, views, and copies**](https://github.com/zengliX/Notebooks/blob/master/python_variable.ipynb)



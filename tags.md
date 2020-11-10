---
layout: page
title: Posts by Tag
---
<div>
    {% assign tags = site.tags | sort %}
    {% for category in tags %}
     <span class="site-tag">
        <a href="#{{ category | first | slugify }}">
                {{ category[0] | replace:'-', ' ' }} ({{ category | last | size }})
        </a>
       <br>
    </span>
    {% endfor %}
</div>
    
<div id="index">
{% for category in tags %}
    <h2 id="{{ category | first | slugify }}">{{ category[0] | replace:'-', ' ' }} ({{ category | last | size }}) </h2>
    {% assign sorted_posts = site.posts | sort: 'date' %}
    {% for post in sorted_posts %}
    {%if post.tags contains category[0]%}
      <h3><a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }} <p class="date">{{ post.date |  date: "%B %e, %Y" }}</p></a></h3>
       <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
    {%endif%}
    {% endfor %}
    {% endfor %}
</div>

---
layout: main
title: Tags
permalink: /tags/
---
{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
{% assign tag_words = site_tags | split:',' | sort %}

<section class="blog-tags">
  <h1>Tags in Blog</h1>
  <ul class="tags">
<!--  cycles through tag list and creates header row of all tags used in site with accompanying per-tag counts...-->
  {% for this_word in tag_words %}
    <li ><a href="#{{ this_word | cgi_escape }}" class="tag">{{ this_word }} <span>({{ site.tags[this_word].size }})</span></a></li>
  {% endfor %}
  </ul>
<!--cycles through tag list and creates subheader for each tag name...-->
  {% for this_word in tag_words %}
  <h2 id="{{ this_word | cgi_escape }}">{{ this_word }}</h2>
<!--  lists all posts corresponding to specific tag...-->
    {% for post in site.tags[this_word] %}{% if post.title != null %}
    <div class="tag-list">
        <span><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></span>
        <small><span>| {{ post.date | date_to_string }}</span></small>
    </div>
    {% endif %}{% endfor %}
  {% endfor %}
</section>

---
layout: post-index
title: Latest Posts
description: "Describe this nonsense."
tags: [Jekyll, theme, themes, responsive, blog, modern]
comments: false
image:
  feature: abstract-1.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

{% for post in paginator.posts %}
<article class="hentry">
  <header>
    {% if post.image.feature %}
      <div class="entry-image-index">
        <a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}"><img src="{{ site.url }}/images/{{ post.image.feature }}" alt="{{ post.title }}"></a>
      </div><!-- /.entry-image -->
    {% endif %}
    <div class="entry-meta">
      <span class="entry-date date published updated"><time datetime="{{ post.date | date_to_xmlschema }}"><a href="{{ site.url }}{{ post.url }}">{{ post.date | date: "%B %d, %Y" }}</a></time></span><span class="author vcard"><span class="fn"><a href="{{ site.url }}/about/" title="About {{ site.owner.name }}">{{ site.owner.name }}</a></span></span>
      {% if site.reading_time %}
      <span class="entry-reading-time">
        <i class="fa fa-clock-o"></i>
        {% assign readtime = post.content | number_of_words | divided_by:site.words_per_minute %}
        Reading time ~{% if readtime <= 1 %}1 minute{% else %}{{ readtime }} minutes{% endif %}
      </span><!-- /.entry-reading-time -->
      {% endif %}
    </div><!-- /.entry-meta -->
    {% if post.link %}
      <h1 class="entry-title"><a href="{{ site.url }}{{ post.url }}" class="permalink" rel="bookmark" title="{{ post.title }}"><i class="fa fa-bookmark"></i></a> <a href="{{ post.link }}">{{ post.title }}</a></h1>
    {% else %}
      <h1 class="entry-title"><a href="{{ site.url }}{{ post.url }}" rel="bookmark" title="{{ post.title }}" itemprop="url">{{ post.title }}</a></h1>
    {% endif %}
  </header>
  <div class="entry-content">
    {{ post.content }}
  </div><!-- /.entry-content -->
</article><!-- /.hentry -->
{% endfor %}

<div class="pagination">
  {% if paginator.previous_page %}
    {% if paginator.previous_page == 1 %}
      <a href="{{ site.url }}" class="btn">Previous</a>
    {% else %}
      <a href="{{ site.url }}/page{{ paginator.previous_page }}" class="btn">Previous</a>
    {% endif %}
  {% else %}
    Previous
  {% endif %}
  <ul class="inline-list">
    <li>
      {% if paginator.page == 1 %}
        <span class="current-page">1</span>
      {% else %}
        <a href="{{ site.url }}">1</a>
      {% endif %}
    </li>
    {% for count in (2..paginator.total_pages) %}
      <li>
        {% if count == paginator.page %}
          <span class="current-page">{{ count }}</span>
        {% else %}
          <a href="{{ site.url }}/page{{ count }}">{{ count }}</a>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
  {% if paginator.next_page %}
    <a href="{{ site.url }}/page{{ paginator.next_page }}" class="btn">Next</a>
  {% else %}
    Next
  {% endif %}
</div><!-- /.pagination -->
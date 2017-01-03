---
layout: page
title: Post by Date
permalink: /monthview/
sitemap: false
---

<div id="index">
{% for post in site.posts %}
{% unless post.next %}
<h2>{{ post.date | date: '%Y' }}</h2>
{% else %}
{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
{% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
{% if year != nyear %}
{% if forloop.index != 1 %}</ul>{% endif %}
  <h2>{{ post.date | date: '%Y' }}</h2>
{% endif %}
{% endunless %}

{% capture month %}{{ post.date | date: '%m%Y' }}{% endcapture %}
{% capture nmonth %}{{ post.next.date | date: '%m%Y' }}{% endcapture %}
{% if month != nmonth %}
{% if forloop.index != 1 %}</ul>{% endif %}
<h2>{{ post.date | date: '%B %Y' }}</h2><ul>
{% endif %}


{% if post.link %}
  <h3 class="link-post">
    <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    <a href="{{ post.link }}" target="_blank" title="{{ post.title }}"><i class="fa fa-link"></i></a></h3>
{% else %}
  <h3><a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}<p class="date">{{ post.date |  date: "%B %e, %Y" }}</p></a></h3>
  <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
{% endif %}


{% endfor %}
</div>
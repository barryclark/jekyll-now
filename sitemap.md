---
layout: default
title: Sitemap
permalink: /sitemap/
---

## Top Level

* [Front Page](/index.html)
* [About](/about/)
* [Privacy Policy](/privacy/)
* [T-Shirts](/t-shirts/)
* [Web Portfolio](/web-portfolio/)
* [Sitemap (this page)](/sitemap/)
* [Sitemap.xml](/sitemap.xml)
* [RSS feed](/feed.xml)
* [robots.txt](/robots.txt)

## Posts

| Date | Title | Tags |
|-------|--------|{% for post in site.posts %}{% assign tags = post.tags | sort %}
| {{ post.date | date: "%B %e, %Y" }} | [{{ post.title }}]({{ post.url }}) | {% for tag in tags %}{{ tag }}{% unless forloop.last %}, {% endunless %}{% endfor %} | {% if post.pages %}{% for page in (2..post.pages) %}
| {{ post.date | date: "%B %e, %Y" }} | [{{ post.title }} Page {{ page }}]({{ post.url }}page{{ page }}/) | {% for tag in tags %}{{ tag }}{% unless forloop.last %}, {% endunless %}{% endfor %} | {% endfor %}{% endif %}{% endfor %}

## Tags

{% for tag in site.tags %}
* [{{ tag[0] }}](/tags/{{ tag[0] | replace: ' ', '_' }}/) ({{ tag[1] | size}} posts){% endfor %}

## Pages

{% for page in (1..21) %}
* [Page {{ page }}]({% unless page == 1 %}{{ site.paginate_path | replace: ':num', page }}{% endunless %}/){% endfor %}

## 404s

* [404](/404.html)

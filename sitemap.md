---
layout: default
title: Sitemap
permalink: /sitemap/
---

## Top Level

* [Front Page](/index.html)
* [About](/about/)
* [Privacy Policy](/privacy/)
* [Sitemap (this page)](/sitemap/)
* [Sitemap.xml](/sitemap.xml)
* [robots.txt](/robots.txt)

## Posts

{% for post in site.posts %}
* {{ post.date | date: "%B %e, %Y" }}: [{{ post.title }}]({{ post.url }}){% endfor %}

## Tags

{% for tag in site.tags %}
* [{{ tag[0] }}](/tags/{{ tag[0] | replace: ' ', '_' }}/) ({{ tag[1] | size}} posts){% endfor %}

## Pages

{% for page in (1..13) %}
* [Page {{ page }}]({% unless page == 1 %}{{ site.paginate_path | replace: ':num', page }}{% endunless %}/){% endfor %}

## 404s

* [404](/404.html)

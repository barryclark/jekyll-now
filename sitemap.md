---
layout: default
title: Sitemap
permalink: /sitemap/
---

## Top Level

* [Front Page](/index.html)
* [About](/about/)
* [Privacy Policy](/privacy/)
* [My TeeSpring Tees](/teespring/)
* [Sitemap (this page)](/sitemap/)
* [Sitemap.xml](/sitemap.xml)
* [RSS feed](/feed.xml)
* [robots.txt](/robots.txt)

## Posts

| Date | Title | Tags |
|-------|--------|{% for post in site.posts %}
| {{ post.date | date: "%B %e, %Y" }} | [{{ post.title }}]({{ post.url }}) | {% assign tags = page.tags | sort %}{% for tag in tags %}{{ tag }}{% unless forloop.last %}, {% endunless %}{% endfor %} |{% endfor %}

## Tags

{% for tag in site.tags %}
* [{{ tag[0] }}](/tags/{{ tag[0] | replace: ' ', '_' }}/) ({{ tag[1] | size}} posts){% endfor %}

## Pages

{% for page in (1..17) %}
* [Page {{ page }}]({% unless page == 1 %}{{ site.paginate_path | replace: ':num', page }}{% endunless %}/){% endfor %}

## 404s

* [404](/404.html)

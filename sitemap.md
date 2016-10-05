---
layout: default
permalink: /sitemap2/
---

## Top Level

* [Front Page](/index.html)
* [About](/about/)
* [Privacy Policy](/privacy/)
* [Sitemap (this page)](/sitemap/)
* [Sitemap.xml](/sitemap.xml)

## Posts

{% for post in site.posts %}
* [{{ post.title }}]({{ post.url }}){% endfor%}

## Tags

{% for tag in site.tags %}
* <a href="/tags/{{ tag[0] | replace: ' ', '_' }}/">{{ tag[0] }}</a>{% endfor %}

## Pages

{% for page in (1..20) %}
* <a href="{% unless page == 1 %}{{ site.paginate_path | replace: ':num', page }}{% endunless %}/">Page {{ page }}</a>{% endfor %}

## 404s

* [404](/404.html)

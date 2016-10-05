---
layout: default
permalink: /sitemap2/
---

## Main

* [index.html](/index.html)
* [About](/about/)
* [Privacy Policy](/privacy/)

## Posts

{% for post in site.posts %}
* [{{ post.title }}]({{ post.url }}){% endfor%}

## Tags

{% for tag in tags %}
* <a href="/tags/{{ tag[0] | replace: ' ', '_' }}/">{{ tag[0] }}</a>
{% endfor %}

## 404s

* [404](/404.html)

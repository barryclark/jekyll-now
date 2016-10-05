---
layout: default
permalink: /sitemap2/
---

## Main

* [index.html](/index.html)
* [About](/about/)
* [Privacy Policy](/privacy/)

## Posts

{% for post in site.posts | strip_new_lines  %}
* [{{ post.title }}]({{ post.url }})
{% endfor%}

## Tags

{% for tag in tags % | strip_new_lines }{% capture page_url %}/tags/{{ tag[0] | replace: ' ', '_' }}/{% endcapture %}
* <a href="{{ page_url }}">{{ tag[0] }}</a>
{% endfor %}

## 404s

* [404](/404.html)

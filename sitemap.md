---
layout: default
permalink: /sitemap/
---

## Main

### [index.html](/index.html)
### [About](/about/)
### [Privacy Policy](/privacy/)

## Posts

{% for post in site.posts %}
* [{{ post.title }}]({{ post.url }})
{% endfor%}

## Tags

{% for tag in site.tags %}{% capture page_url %}/tags/{{ tag[0] | replace: ' ', '_' }}/{% endcapture %}
* [{{ tag[0] }}]({{ page_url }})
{% endfor%}

## 404s

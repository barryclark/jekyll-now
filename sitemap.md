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
### [{{ post.title }}]({{ post.url }})
{% endfor%}

## Tags

{% for tag in site.tags %}
{{ tag }}
### [{{ tag[0] }}]({{ tag[1] }})
{% endfor%}

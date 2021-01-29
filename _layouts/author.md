---
layout: default
---
<h2>{{ page.name}}</h2>

{{ content }}

<h2>Posts by {{ page.name }}:</h2>
<ul>
{% for post in site.posts %}
{% if post.author == page.name %}
<li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
{% endif %}
{% endfor %}
</ul>

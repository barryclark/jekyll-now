---
layout: default
---
<h2>{{ page.name}}</h2>

{{ content }}

<h3>Posts by {{ page.name }}:</h3>
<ul>
{% for post in site.posts %}
{% if post.author == page.name %}
<li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
{% endif %}
{% endfor %}
</ul>

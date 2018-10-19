---
title: Connect Tech 2018
---
Everything I saw:
<ul>
{% for talk in site.connecttech2018  %}
{% unless talk.slug == 'index'%}
<li><a href="{{talk.url}}">{{talk.title}}</a></li>
{% endunless s%}
{% endfor %}
</ul>

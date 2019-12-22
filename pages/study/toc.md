---
layout: page
title: Study
permalink: /pages/study/toc
---


{% for item in site.data.study.toc %}
<h3>{{ item.title }}</h3>
<ul>
{% for entry in item.subfolderitems %}
<li><a href="{{ entry.url }}">{{ entry.page }}</a></li>
{% endfor %}
</ul>
{% endfor %}

---
permalink: /temp/
---

{% for tag in site.tags %}

tag[0] = {{ tag[0] }}

tag[2] = {{ tag[2] }}

{% break %}
{% endfor %}
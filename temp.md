---
permalink: /temp/
---

{% for tag in site.tags %}

tag[0] = {{ tag[0] }}

tag[1] = {{ tag[1] }}

{% break %}
{% endfor %}
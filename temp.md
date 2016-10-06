---
permalink: /temp/
---

{% for tag in site.tags %}

tag[0] = {{ tag[0] }}

tag[1] size = {{ tag[1] | size }}

{% break %}
{% endfor %}
---
layout: page
title: Authors
subtitle: Posts By Author
---

{% for author in site.data.authors %}
  {{ author[1].name }}
{% endfor %}
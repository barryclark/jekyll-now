---
layout: default
title: Comments
permalink: /comments/
---

{% for comment in site.data.comments %}
{{ comment }}
{% endfor %}

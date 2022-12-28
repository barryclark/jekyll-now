---
layout: page
title: Members
permalink: /members/
---

{% for member in site.data.members %}

### {{member.name}}
{{member.description}}

{% endfor %}

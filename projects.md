---
layout: page
title: 
permalink: /projects/
---

{% capture includeGuts %}
{% include portfolio.html %} 
{% endcapture %}
{{ includeGuts | replace: '    ', ''}}

---
layout: page
title: 
permalink: /about/
---

{% capture includeGuts %}
{% include about.html %} 
{% endcapture %}
{{ includeGuts | replace: '    ', ''}}

---
layout: page
title: My TeeSpring Tees
permalink: /teespring/
---

<style>h1,h2{ text-align: center; } .entry img{ max-width: 500px; }</style>

{% for tee in site.data.teespring %}
## [{{ tee.title }}]({{ tee.link }})
{% include social/twitter-facebook-share.html url=tee.link text=tee.title width="500px" %}
[![{{ tee.title }}]({{ tee.image }} "{{ tee.title }}")]({{ tee.link }})
{% endfor %}

---
layout: page
title: My TeeSpring Tees
permalink: /teespring/
---

{% for tee in site.data.teespring %}
## [{{ tee.title }}]({{ tee.link }})

{% include social/twitter-facebook-share.html url=tee.link text=tee.title width="500px" %}

[![{{ tee.title }}]({{ tee.image }} "{{ tee.title }}")]({{ tee.link }})
{% endfor %}

## [White HTML Sarcasm T-Shirt](https://teespring.com/white-html-sarcasm-end-tag)

{% include social/twitter-facebook-share.html url="https://teespring.com/white-html-sarcasm-end-tag" text="White HTML Sarcasm T-Shirt" width="500px" %}

[![White HTML Sarcasm T-Shirt](/images/teespring/white-sarcasm-shirt.png "White HTML Sarcasm T-Shirt")](https://teespring.com/white-html-sarcasm-end-tag)

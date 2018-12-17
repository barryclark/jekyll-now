---
layout: default
permalink: /photography/
title: Photography Blog
---

<h1> Photography Blog </h1>

<section class="photos" data-featherlight-gallery data-featherlight-filter="a">
{% assign sorted_files = site.static_files | sort: 'name' | reverse %}
{% for image in sorted_files %}
    {% if image.path contains 'photography' %}
        <a href="{{ image.path }}">
            <img src="{{ image.path }}">
        </a>
    {% endif %}
{% endfor %}
</section>
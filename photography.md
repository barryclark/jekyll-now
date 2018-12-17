---
layout: default
permalink: /photography/
title: Photography Blog
---

<section id="photos" data-featherlight-gallery data-featherlight-filter="a">
    {% for image in site.static_files %}
        {% if image.path contains 'photography' %}
            <a href="{{ image.path }}">
                <img src="{{ image.path }}">
            </a>
        {% endif %}
    {% endfor %}
</section>
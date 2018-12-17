---
layout: default
permalink: /photography/
title: Photography Blog
---

<h1> Photography Blog </h1>

{% assign month = "init" %}
{% assign sorted_files = (site.static_files | sort: 'name') | reverse %}
{% for image in sorted_files %}
    {% if image.path contains 'photography' %}
        {% assign new_month = image.name | slice: 0,6 %}
        {% if new_month != month %}
            {% unless month == "init" %}
                </section>
            {% endunless %}
<div class="photo_title">
    <h2> {{ image.name | slice: 0,4 }} / {{ image.name | slice: 4,2 }} </h2>
</div>
            {% assign month = new_month %}
<section class="photos" data-featherlight-gallery data-featherlight-filter="a">
        {% endif %}
        <a href="{{ image.path }}">
            <img src="{{ image.path }}">
        </a>
    {% endif %}
{% endfor %}
</section>
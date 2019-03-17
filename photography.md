---
layout: default
permalink: /photography/
title: Photography Blog
---

<h1> Photography Blog </h1>

{% for album in site.data.album_data %}
    <h2>
    {{ album.name }}
    </h2>
    {% for photo in album.photos%}
        <p>
            {{ photo.filename }}
        </p>
    {% endfor %}
{% endfor %}

<section class="photos" data-featherlight-gallery data-featherlight-filter="a">
{% assign sorted_files = site.static_files | sort: 'name' | reverse %}
        <!--<a href="{{ image.path }}">-->
            <!--<img src="{{ image.path }}">-->
        <!--</a>-->
</section>

---
layout: page
title: Authors
subtitle: Posts By Author
---
<section id="site-authors">

    {% for author in site.data.authors %}
        <h2>{{author[1].name}}</h2>
        {% assign posts = site.posts | where: "author", author[0] %}
        <ul>
            {% for post in posts %}
                    <li><a href="{{site.baseurl}}{{ post.url }}">{{ post.title }}</a></li>
            {% endfor %}
        </ul>
    {% endfor %}

</section>
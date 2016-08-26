---
layout: page
title: Alloggi
permalink: /alloggi/
---
{% for member in site.data.alloggi %}
<div class="panel panel-info">
<div class="panel-heading">
{{member.Descrizione}}
</div>
<div class="panel-body">
<div class="row">
{{member.Dove}}
</div>
<div class="row">
{{member.Numero}}
</div>
<div class="row">
{{member.Email}}
</div>
<div class="row">
{{member.Link}}
</div>
<div class="row">
</div>
</div>
</div>
{% endfor %}

<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'alloggi' %}
      <article class="post">
        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </article>
    {% endif %}
  {% endfor %}
</div>

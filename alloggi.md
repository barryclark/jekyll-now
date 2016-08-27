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
{% if member.Dove %}
<div class="row">
<div class="col-md-2"><b>Indirizzo:</b></div> {{member.Dove}}
</div>
{% endif %}
{% if member.Numero %}
<div class="row">
<div class="col-md-2"><b>Numero:</b></div> {{member.Numero}}
</div>
{% endif %}

{% if member.Email and member.Email contains '@' %}
<div class="row">
<div class="col-md-2"><b>Email:</b></div> <a href="mailto:{{member.Email}}">{{member.Email}}</a>
</div>
{% endif %}

{% if member.Link %}
<div class="row">
<div class="col-md-2"><b>Link:</b></div><a href="{{member.Link}}">{{member.Link}}</a>
</div>
{% endif %}
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

---
layout: page
title: Vittime
permalink: /vittime/
---
{% for member in site.data.vittime %}
<div class="panel panel-info">
<div class="panel-heading">
{{member.Descrizione}}
</div>
<div class="panel-body">
{% if member.Cognome %}
<div class="row">
<div class="col-md-2"><b>Cognome:</b></div> {{member.Cognome}}
</div>
{% endif %}
{% if member.Nome %}
<div class="row">
<div class="col-md-2"><b>Nome:</b></div> {{member.Nome}}
</div>
{% endif %}

{% if member.Prefettura %}
<div class="row">
<div class="col-md-2"><b>Prefettura:</b></div> {{member.Prefettura}}
</div>
{% endif %}

{% if member.Data %}
<div class="row">
<div class="col-md-2"><b>Data di Nascita:</b></div> {{member.Data}}
</div>
{% endif %}

{% if member.Luogo %}
<div class="row">
<div class="col-md-2"><b>Luogo:</b></div> {{member.Luogo}}
</div>
{% endif %}

{% if member.Fonte %}
<div class="row">
<div class="col-md-2"><b>Fonte:</b></div> {{member.Fonte}}
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
    {% if post.categories contains 'vittime' %}
      <article class="post">
        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Leggi Tutto</a>
      </article>
    {% endif %}
  {% endfor %}
</div>

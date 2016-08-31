---
layout: page
title: Fabbisogni
permalink: /fabbisogni/
---

# Fabbisogni

Data	Ora	Breve descrizione delle necessità	Elenco completo dei fabbisogni	Indirizzo	Località	Comune	Fonte 	Link	Latitudine	Longitudine
{% for member in site.data.fabbisogni %}
<div class="panel panel-info">
<div class="panel-heading">
{{member.Data}} {{member.Ora}} {{member.['Breve descrizione delle necessità']}}
</div>
<div class="panel-body">
<div class="row">
<div class="col-md-12">
{{member.['Elenco completo dei fabbisogni']}}
</div>
</div>
{% if member.Indirizzo %}
<div class="row">
<div class="col-md-2"><b>Indirizzo:</b></div><div class="col-md-10">{{member.Indirizzo}}</div>
</div>
{% endif %}
{% if member.Località %}
<div class="row">
<div class="col-md-2"><b>Localita:</b></div><div class="col-md-10">{{member.Località}}</div>
</div>
{% endif %}

{% if member.Comune %}
<div class="row">
<div class="col-md-2"><b>Comune:</b></div><div class="col-md-10">{{member.Comune}}</div>
</div>
{% endif %}
{% if member.Fonte %}
<div class="row">
<div class="col-md-2"><b>Fonte:</b></div><div class="col-md-10">{{member.Fonte}}</div>
</div>
{% endif %}
{% if member.Link %}
<div class="row">
<div class="col-md-2"><b>Link:</b></div><div class="col-md-10"><a href="{{member.Link}}">{{member.Link}}</a></div>
</div>
{% endif %}
{% if member.Latitudine %}
<div class="row">
<div class="col-md-2"><b>Lat:</b></div><div class="col-md-10">{{member.Latitudine}}</div>
</div>
{% endif %}
{% if member.Longitudine %}
<div class="row">
<div class="col-md-2"><b>Lon:</b></div><div class="col-md-10">{{member.Longitudine}}</div>
</div>
{% endif %}
</div>
</div>
{% endfor %}

<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'donazioni' %}
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

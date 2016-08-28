---
layout: page
title: Bollettino
permalink: /bollettino/
---
{% assign bollettino = (site.data.bollettino | sort: 'Data') %}
{% for member in bollettino reversed %}
<div class="panel panel-info">
<div class="panel-heading">
{{member.Descrizione}}
</div>
<div class="panel-body">
{% if member.Comune %}
<div class="row">
<div class="col-md-2"><b>Comune:</b></div> {{member.Comune}}
</div>
{% endif %}
{% if member.Indirizzo %}
<div class="row">
<div class="col-md-2"><b>Indirizzo:</b></div> {{member.Indirizzo}}
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
{% if member.Data %}
<div class="row">
<div class="col-md-2"><b>Data:</b></div>{{member.Data}} {{member.Ora}}
</div>
{% endif %}
<div class="row">
</div>
</div>
</div>
{% endfor %}


<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'bollettino' %}
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

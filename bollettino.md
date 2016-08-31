---
layout: page
title: Bollettino
permalink: /bollettino/
---
{% assign bollettino = (site.data.bollettino | sort: 'Data') %}
{% for member in bollettino reversed %}
{% capture memberName %}{{member.Data}} {{member.Ora}} {{member.Descrizione}}{% endcapture %}
{% assign memberId = memberName|slugify|truncate:20,"" %}
{% capture memberUrl %}{{site.url}}{{page.url}}#{{memberId}}{% endcapture %}
<div class="panel panel-info">
<div class="panel-heading"><span class="anchor" id="{{memberId}}"></span>
{{member.Descrizione}}
</div>
<div class="panel-body">
{% if member.Comune %}
<div class="row">
<div class="col-md-2"><b>Comune:</b></div><div class="col-md-10">{{member.Comune}}</div>
</div>
{% endif %}
{% if member.Indirizzo %}
<div class="row">
<div class="col-md-2"><b>Indirizzo:</b></div><div class="col-md-10">{{member.Indirizzo}}</div>
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
{% if member.Data %}
<div class="row">
<div class="col-md-2"><b>Data:</b></div><div class="col-md-10">{{member.Data}} {{member.Ora}}</div>
</div>
{% endif %}
<div class="row">
</div>
</div>
<div class="panel-footer">
<ul class="share-buttons">
  <li>Condividi:</li>
  <li><a href="{{memberUrl}}" title="Copia link"><img alt="Copia link" src="/img/icone/link.png"></a></li>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u={{memberUrl | uri_escape}}&title={{memberName|truncate:70|uri_escape}} | {{ site.title }}" title="Condividi su Facebook" target="_blank"><img alt="Condividi su Facebook" src="/img/icone/Facebook.png"></a></li>
  <li><a href="https://twitter.com/intent/tweet?url={{memberUrl |uri_escape}}&text={{memberName|truncate:50|uri_escape}}&via=terremotocentro&hashtags=terremotocentro" target="_blank" title="Tweet"><img alt="Tweet" src="/img/icone/Twitter.png"></a></li>
</ul>
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

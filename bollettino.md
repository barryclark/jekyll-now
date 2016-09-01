---
layout: page
title: Bollettino
permalink: /bollettino/
---

* [Aperte](#Aperte)
* [Chiuse](#Chiuse)

<h1 id="Aperte">Aperte</h1>

<div class="panel-group">
{% assign bollettinoG = (site.data.bollettino | group_by: "Chiuso") %}

{% for member in bollettinoG[0].items reversed %}
{% capture memberName %}{{member.Descrizione}}{% endcapture %}
{% capture memberlnk %}{{member.Data}} {{member.Ora}} {{member.Descrizione}}{% endcapture %}
{% assign memberId = memberlnk|slugify|truncate:20,"" %}
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
{% if member.Note %}
<div class="row">
<div class="col-md-2"><b>Note:</b></div><div class="col-md-10">{{member.Note}}</div>
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
  <li><a href="https://twitter.com/intent/tweet?url={{memberUrl |uri_escape}}&text={{memberName|truncate:50|uri_escape}}&via=terremotocentro&hashtags=terremoto,terremotoinfo" target="_blank" title="Tweet"><img alt="Tweet" src="/img/icone/Twitter.png"></a></li>
 <li><a href="https://plus.google.com/share?url={{memberUrl |uri_escape}}" target="_blank" title="Condividi su Google+"><img alt="Condividi su Google+" src="/img/icone/Google+.png"></a></li>
 <li><a data-proofer-ignore href="mailto:?subject={{page.title}} | {{site.title}}&body={{memberName|uri_escape}}%20Clicca qui:%20{{memberUrl |uri_escape}}" title="Invia email"><img alt="Invia email" src="/img/icone/Email.png"></a></li>
</ul>
</div>
</div>
{% endfor %}
</div>

<h1 id="Chiuse">Chiuse</h1>

<div class="panel-group">
{% for member in bollettinoG[1].items reversed %}
<div class="panel panel-info">
<div class="panel-heading"><span class="anchor" id="{{memberId}}"></span>
<strike>{{member.Descrizione}}</strike>
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
{% if member.Note %}
<div class="row">
<div class="col-md-2"><b>Note:</b></div><div class="col-md-10">{{member.Note}}</div>
</div>
{% endif %}
{% if member.Chiuso %}
<div class="row">
<div class="col-md-2"><b>Chiuso:</b></div><div class="col-md-10">{{member.Chiuso}}</div>
</div>
{% endif %}
<div class="row">
</div>
</div>
</div>
{% endfor %}
</div>

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

---
layout: page
title: Risorse disponibili
permalink: /risorse-disponibili/
---

{% for member in site.data.donazioni reversed %}
{% if member.Descrizione %}
{% if member.Cosa %}
{% assign memberId = member.Descrizione|slugify|truncate:20,"" %}
{% capture memberUrl %}{{site.url}}{{page.url}}#{{memberId}}{% endcapture %}
{% capture memberName %}{{member.Cosa}}{% endcapture %}
{% endif %}
{% endif %}

<div class="panel panel-info">
<div class="panel-heading"><span class="anchor" id="{{memberId}}"></span>
{{member.Dove}}
</div>
<div class="panel-body">
{% if member.Cosa %}
<div class="row">
<div class="col-md-2"><b>Cosa:</b></div><div>{{member.Cosa}}
</div></div>
{% endif %}
{% if member.Descrizione %}
<div class="row">
<div class="col-md-12">
{{member.Descrizione}}
</div>
</div>
{% endif %}
{% if member.Indirizzo %}
<div class="row">
<div class="col-md-2"><b>Indirizzo:</b></div><div class="col-md-10">{{member.Indirizzo}}</div>
</div>
{% endif %}

{% if member.Contatti %}
<div class="row">
<div class="col-md-2"><b>Contatti:</b></div><div class="col-md-10">{{member.Contatti}}</div>
</div>
{% endif %}
{% if member.Link %}
<div class="row">
<div class="col-md-2"><b>Link:</b></div><div class="col-md-10"><a href="{{member.Link}}">{{member.Link}}</a></div>
</div>
{% endif %}
</div>
{% if member.Descrizione %}
{% if member.Cosa %}
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
{% endif %}
{% endif %}
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

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </article>
    {% endif %}
  {% endfor %}
</div>

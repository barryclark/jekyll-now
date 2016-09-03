---
layout: page
title: Fabbisogni
permalink: /fabbisogni/
---
{% assign fabbisogni = (site.data.fabbisogni | sort: 'Data') %}
{% for member in fabbisogni reversed %}

{% capture memberlnk %}{{member.Data}} {{member.Ora}} {{member.['Breve descrizione delle necessità']}}{% endcapture %}
{% assign memberId = memberlnk|slugify|truncate:20,"" %}
{% capture memberUrl %}{{site.url}}{{page.url}}#{{memberId}}{% endcapture %}
{% capture memberName %}{{member.['Breve descrizione delle necessità']}}{% endcapture %}

<div class="panel panel-info">
<div class="panel-heading"><span class="anchor" id="{{memberId}}"></span>
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
<div style="margin-left:15px"><b>Indirizzo: </b>{{member.Indirizzo}}</div>
</div>
{% endif %}
{% if member.Località %}
<div class="row">
<div style="margin-left:15px"><b>Localita: </b>{{member.Località}}</div>
</div>
{% endif %}

{% if member.Comune %}
<div class="row">
<div style="margin-left:15px"><b>Comune: </b>{{member.Comune}}</div>
</div>
{% endif %}
{% if member.Fonte %}
<div class="row">
<div style="margin-left:15px"><b>Fonte: </b>{{member.Fonte}}</div>
</div>
{% endif %}
{% if member.Link %}
<div class="row">
<div style="margin-left:15px"><b>Link: </b><a style="word-break: break-all" href="{{member.Link}}" data-proofer-ignore>{{member.Link}}</a></div>
</div>
{% endif %}
{% if member.Latitudine %}
<div class="row">
<div style="margin-left:15px"><b>Lat: </b>{{member.Latitudine}}</div>
</div>
{% endif %}
{% if member.Longitudine %}
<div class="row">
<div style="margin-left:15px"><b>Lon: </b>{{member.Longitudine}}</div>
</div>
{% endif %}
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

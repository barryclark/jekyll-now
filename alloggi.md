---
layout: page
title: Alloggi
permalink: /alloggi/
---

<div class="panel-group">
{% for member in site.data.alloggi %}

{% assign memberId = member.Descrizione|slugify|truncate:20,"" %}
{% capture memberUrl %}{{site.url}}{{page.url}}#{{memberId}}{% endcapture %}

<div class="panel panel-info">
<div class="panel-heading"><span class="anchor" id="{{memberId}}"></span>
{{member.Descrizione|strip_newlines}}
</div>
<div class="panel-body">
{% if member.Dove %}
<div class="row">
<div style="margin-left:15px; word-break: break-all;"><b>Indirizzo: </b>{{member.Dove}}</div>
</div>
{% endif %}
{% if member.Numero %}
<div class="row">
<div style="margin-left:15px"><b>Numero: </b>{{member.Numero}}</div> 
</div>
{% endif %}

{% if member.Email and member.Email contains '@' %}
<div class="row">
<div style="margin-left:15px"><b>Email: </b> <a href="mailto:{{member.Email}}">{{member.Email}}</a></div>
</div>
{% endif %}

{% if member.Link %}
<div class="row">
<div style="margin-left: 15px"><b>Link: </b><a style="word-break: break-all;" href="{{member.Link}}">{{member.Link}}</a></div>
</div>
{% endif %}
<div class="row">
</div>
</div>
<div class="panel-footer">
<ul class="share-buttons">
  <li>Condividi:</li>
  <li><a href="{{memberUrl}}" title="Copia link"><img alt="Copia link" src="/img/icone/link.png"></a></li>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u={{memberUrl | uri_escape}}&title={{member.Descrizione|truncate:70|uri_escape}} | {{ site.title }}" title="Condividi su Facebook" target="_blank"><img alt="Condividi su Facebook" src="/img/icone/Facebook.png"></a></li>
  <li><a href="https://twitter.com/intent/tweet?url={{memberUrl |uri_escape}}&text={{member.Descrizione|truncate:50|uri_escape}}&via=terremotocentro&hashtags=terremoto,terremotoinfo" target="_blank" title="Tweet"><img alt="Tweet" src="/img/icone/Twitter.png"></a></li>
  <li><a href="https://plus.google.com/share?url={{memberUrl |uri_escape}}" target="_blank" title="Condividi su Google+"><img alt="Condividi su Google+" src="/img/icone/Google+.png"></a></li>
  <li><a data-proofer-ignore href="mailto:?subject={{page.title}} | {{site.title}}&body={{member.Descrizione|uri_escape}}%20Clicca qui:%20{{memberUrl |uri_escape}}" title="Invia email"><img alt="Invia email" src="/img/icone/Email.png"></a></li>
</ul>
</div>
</div>
{% endfor %}
</div>

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

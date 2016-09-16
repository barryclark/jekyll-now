---
layout: page
title: Bollettino
permalink: /bollettino/
---

<div class="panel-group">
{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Bollettino" %}
{% capture memberName %}{{member.issue.data.descrizione}}{% endcapture %}
{% assign memberId = member.number %}
{% capture memberUrl %}{{site.url}}/issues/{{member.number}}{% endcapture %}
<div class="panel panel-info">
<div class="panel-heading"><span class="anchor" id="{{memberId}}"></span>
{% if member.issue.data.cosa %}
<a href="/issues/{{member.number}}">{{member.issue.data.cosa}}</a>
{% else %}
<a href="/issues/{{member.number}}">{{member.issue.data.descrizione|truncatewords: 10}}</a>
{% endif %}
</div>
<div class="panel-body">
{% if member.issue.data.descrizione %}
<div class="row">
<div class="col-md-12">{{member.issue.data.descrizione}}</div>
</div>
{% endif %}
{% if member.issue.data.data %}
<div class="row">
<div class="col-md-4"><b>Data: </b></div><div class="col-md-8">{{member.issue.data.data}}</div>
</div>
{% endif %}
{% if member.issue.data.indirizzo %}
<div class="row">
<div class="col-md-4"><b>Indirizzo: </b></div><div class="col-md-8">{{member.issue.data.indirizzo}}</div>
</div>
{% endif %}
{% if member.issue.data.link %}
<div class="row">
<div class="col-md-4"><b>Link: </b></div><div class="col-md-8"><a href="{{member.issue.data.link}}">{{member.issue.data.link}}</a></div>
</div>
{% endif %}
</div>
<div class="panel-footer">
<ul class="share-buttons">
  <li>Condividi:</li>
  <li><a href="{{memberUrl}}" title="Copia link"><img alt="Copia link" src="/img/icone/link.png"></a></li>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u={{memberUrl | uri_escape}}&title={{memberName|truncate:70|uri_escape}} | {{ site.title }}" title="Condividi su Facebook" target="_blank"><img alt="Condividi su Facebook" src="/img/icone/Facebook.png"></a></li>
  <li><a href="https://twitter.com/intent/tweet?url={{memberUrl |uri_escape}}&text={{memberName|truncate:50|uri_escape}}&via=terremotocentro&hashtags=terremotocentroitalia" target="_blank" title="Tweet"><img alt="Tweet" src="/img/icone/Twitter.png"></a></li>
 <li><a href="https://plus.google.com/share?url={{memberUrl |uri_escape}}" target="_blank" title="Condividi su Google+"><img alt="Condividi su Google+" src="/img/icone/Google+.png"></a></li>
 <li><a data-proofer-ignore href="mailto:?subject={{page.title}} | {{site.title}}&body={{memberName|uri_escape}}%20Clicca qui:%20{{memberUrl |uri_escape}}" title="Invia email"><img alt="Invia email" src="/img/icone/Email.png"></a></li>
</ul>
</div>
</div>
{% endif %}
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

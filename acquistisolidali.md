---
layout: page
title: Acquisti Solidali
permalink: /acquistisolidali/
---
<div class="panel-group">
{% assign filteredissues = site.data.issuesjson | where: "state","open" %}
{% for member in filteredissues %}
{% if member.issue.labels contains "acquisto solidale" %}

<div class="panel panel-default">
<div class="panel-heading">
<a href="/issues/{{ member.number | datapage_url: '.' }}">
<h4>
{{member.title}}
</h4>
</a>
</div>
<div class="panel-body">
<p class="list-group-item-text">{{member.issue.data.descrizione|markdownify}}</p>
  {% if member.issue.data.tel != blank %}
  <p class="list-group-item-text"><i class="fa fa-phone"></i><a href="tel:{{page.issue.data.tel}}">{{member.issue.data.tel}}</a></p>
  {% endif %}
  {% if member.issue.data.email != blank %}
  <p class="list-group-item-text"><i class="fa fa-envelope"></i> <a href="mailto:{{page.issue.data.email}}">{{member.issue.data.email}}</a></p>
  {% endif %}
  {% if member.issue.data.indirizzo != blank %}
  <p class="list-group-item-text"><i class="fa fa-home"></i>{{member.issue.data.indirizzo}}</p>
  {% endif %}
<p class="list-group-item-text">{{member.issue.data.data}}</p>
</div>
<div class="panel-footer">
<ul class="share-buttons">
  <li>Condividi:</li>
  <li><a href="http://terremotocentroitalia.info/issues/{{ member.number | datapage_url: '.' }}" title="Copia link"><img alt="Copia link" src="/img/icone/link.png"></a></li>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=http://terremotocentroitalia.info/issues/{{ member.number}}&title={{member.title|truncate:70|uri_escape}} | {{ site.title }}" title="Condividi su Facebook" target="_blank"><img alt="Condividi su Facebook" src="/img/icone/Facebook.png"></a></li>
  <li><a href="https://twitter.com/intent/tweet?url=http://terremotocentroitalia.info/issues/{{ member.number | datapage_url: '.' }}&text={{member.title|truncate:50|uri_escape}}&via=terremotocentro&hashtags=terremotocentroitalia" target="_blank" title="Tweet"><img alt="Tweet" src="/img/icone/Twitter.png"></a></li>
 <li><a href="https://plus.google.com/share?url=http://terremotocentroitalia.info/issues/{{ member.number | datapage_url: '.' }}" target="_blank" title="Condividi su Google+"><img alt="Condividi su Google+" src="/img/icone/Google+.png"></a></li>
 <li><a data-proofer-ignore href="mailto:?subject={{member.title|truncate:70|uri_escape}} | {{site.title}}&body={{member.title|truncate:70|uri_escape}}%20Clicca qui:%20http://terremotocentroitalia.info/issues/{{ member.number | datapage_url: '.' }}" title="Invia email"><img alt="Invia email" src="/img/icone/Email.png"></a></li>
</ul>
</div>
</div>
{% endif %}
{% endfor %}
</div>

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
<h4 class="panel-title">
{{member.title}} <small>({{member.issue.data.data}})</small>
</h4> 
</a>
</div>
<div class="panel-body">
<small>
<div class="row"><div class="col-xs-12">{{member.issue.data.descrizione|markdownify}}</div></div>
<div class="row">
<div class="col-xs-6"><div class="col-xs-1"><i class="fa fa-phone"></i></div><div class="col-xs-11">{% if member.issue.data.tel != blank %}<a href="tel:{{member.issue.data.tel}}">{{member.issue.data.tel}}</a>{% endif %}</div></div>
<div class="col-xs-6"><div class="col-xs-1"><i class="fa fa-envelope"></i></div><div class="col-xs-11">{% if member.issue.data.email != blank %}<a href="mailto:{{member.issue.data.email}}">{{member.issue.data.email}}</a>{% endif %}</div></div>
</div>
<div class="row"><div class="col-xs-6"><div class="col-xs-1"><i class="fa fa-home"></i></div><div class="col-xs-11">{{member.issue.data.indirizzo}}</div></div><div class="col-xs-6"></div></div>

</small>
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

---
layout: page
title: Raccolte Fondi
permalink: /fondi/
---

{% for member in site.data.raccolte %}

{% assign memberId = member.Chi|slugify|truncate:20,"" %}
{% capture memberUrl %}{{site.url}}{{page.url}}#{{memberId}}{% endcapture %}
{% capture memberName %}{{member.Chi}}{% endcapture %}

<div class="panel panel-info">
<div class="panel-heading"><span class="anchor" id="{{memberId}}"></span>
{{member.Chi}}
</div>
<div class="panel-body">
{% if member.Descrizione %}
<div class="row">
<div style="margin-left:15px">
{{member.Descrizione}}
</div>
</div>
{% endif %}
{% if member.Intestazione %}
<div class="row">
<div style="margin-left:15px"><b>Intestazione: </b>{{member.Intestazione}}</div>
</div>
{% endif %}

{% if member.IBAN %}
<div class="row">
<div style="margin-left:15px"><b>IBAN: </b>{{member.IBAN}}</div>
</div>
{% endif %}

{% if member.BICSWIFT %}
<div class="row">
<div style="margin-left:15px"><b>BIC/SWIFT: </b>{{member.BICSWIFT}}</div>
</div>
{% endif %}

{% if member.CCPostale %}
<div class="row">
<div style="margin-left:15px"><b>Cc postale: </b>{{member.CCPostale}}</div>
</div>
{% endif %}

{% if member.Causale %}
<div class="row">
<div style="margin-left:15px"><b>Causale: </b>{{member.Causale}}</div>
</div>
{% endif %}

{% if member.Link %}
<div class="row">
<div style="margin-left:15px"><b>Link: </b><a style="word-break: break-all" href="{{member.Link}}">{{member.Link}}</a></div>
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

---

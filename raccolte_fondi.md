---
layout: page
title: Raccolte Fondi
permalink: /raccolte-fondi/
---

# Raccolte fondi

{% for member in site.data.raccolte %}
<div class="panel panel-info">
<div class="panel-heading">
{{member.Chi}}
</div>
<div class="panel-body">
{% if member.Descrizione %}
<div class="row">
<div class="col-md-12">
{{member.Descrizione}}
</div>
</div>
{% endif %}
{% if member.Intestazione %}
<div class="row">
<div class="col-md-2"><b>Intestazione:</b></div><div class="col-md-10">{{member.Intestazione}}</div>
</div>
{% endif %}

{% if member.IBAN %}
<div class="row">
<div class="col-md-2"><b>IBAN:</b></div><div class="col-md-10">{{member.IBAN}}</div>
</div>
{% endif %}

{% if member.BICSWIFT %}
<div class="row">
<div class="col-md-2"><b>BIC/SWIFT:</b></div><div class="col-md-10">{{member.BICSWIFT}}</div>
</div>
{% endif %}

{% if member.CCPostale %}
<div class="row">
<div class="col-md-2"><b>Cc postale:</b></div><div class="col-md-10">{{member.CCPostale}}</div>
</div>
{% endif %}

{% if member.Causale %}
<div class="row">
<div class="col-md-2"><b>Causale:</b></div><div class="col-md-10">{{member.Causale}}</div>
</div>
{% endif %}

{% if member.Link %}
<div class="row">
<div class="col-md-2"><b>Link:</b></div><div class="col-md-10"><a href="{{member.Link}}">{{member.Link}}</a></div>
</div>
{% endif %}
</div>
</div>
{% endfor %}

---

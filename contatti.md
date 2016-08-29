---
layout: page
title: Fonti
titolo: Fonti | Terremoto Centro Italia
permalink: /fonti/
---
{% for member in site.data.contatti %}
  <div class="row">
  <div class="col-md-2">
{{member.Nome}}
</div>
  <div class="col-md-2">
{{member.Numero}}
</div>
</div>
{% endfor %}

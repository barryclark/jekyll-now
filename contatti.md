---
layout: page
title: Fonti
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

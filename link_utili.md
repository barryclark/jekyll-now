---
layout: page
title: Link utili
permalink: /link_utili/
---

Di seguito alcuni link utili per ricevere informazioni sull'evento.

* [Fonti Ufficiali](#fonti-ufficiali)
* [Progetti Web](#progetti-web)
* [Contatti](#contatti)

# Fonti Ufficiali

- [Osservatorio Terremoti INGVterremoti](http://cnt.rm.ingv.it/)

- [Protezione Civile](http://www.protezionecivile.gov.it/jcms/it/home.wp)

- [Protezione Civile Toscana](http://www.toscana-notizie.it/ambiente-e-territorio/protezione-civile)

- [Regioni e Province Autonome](http://www.regioni.it/materie/protezione-civile/)

- [Protezione Civile Lazio](http://www.regione.lazio.it/rl_protezione_civile/)

- [Volontariato Lazio](http://www.volontariato.lazio.it/)

# Progetti Web

- [Emergenza24](http://www.emergenza24.org/)

# Contatti

{% for member in site.data.contatti %}
  <div class="panel panel-info">
  <div class="panel-heading">
  {{member.Nome}}
  </div>
  <div class="panel-body">
  {% if member.Numero %}
  <div class="row">
  <div class="col-md-2"><b>Contatti:</b></div><div class="col-md-10">{{member.Numero}}</div>
  </div>
  {% endif %}
  {% if member.Note %}
  <div class="row">
  <div class="col-md-12">{{member.Note}}</div>
  </div>
  {% endif %}
  </div>
  </div>
{% endfor %}


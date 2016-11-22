---
layout: page
title: Link e contatti utili
permalink: /link_utili/
---

Di seguito la lista dei contatti registrati nei sistemi di terremotocenotroitalia

# Contatti

{% assign filteredissues = site.data.issuesjson | where: "state","open" %}
{% for member in filteredissues %}
{% if member.issue.labels contains "Contatti" %}
* <a href="/issues/{{ member.number | datapage_url: '.' }}">{{member.title}}</a>
{% endif %}
{% endfor %}

# Fonti Importanti

- [Osservatorio Terremoti INGVterremoti](http://cnt.rm.ingv.it/)

- [Protezione Civile](http://www.protezionecivile.gov.it/jcms/it/home.wp)

- [Protezione Civile Toscana](http://www.toscana-notizie.it/ambiente-e-territorio/protezione-civile)

- [Regioni e Province Autonome](http://www.regioni.it/materie/protezione-civile/)

- [Protezione Civile Lazio](http://www.regione.lazio.it/rl_protezione_civile/)

- [Volontariato Lazio](http://www.volontariato.lazio.it/)

- [Emergenza24](http://www.emergenza24.org/)

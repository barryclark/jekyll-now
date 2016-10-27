---
layout: page
title: Opendata
permalink: /opendata/
---

<p>In questa pagina saranno raccolti i link a tutti i contenuti e tutti i dati a cui puoi accedere tramite TerremotoCentroItalia.</p>

**Contenuti**
- [Archivio Documentazione TerremotoCentroItalia](https://archive.org/details/terremotocentroitalia)

**Dati**

{: .table .table-striped #opendata}
Nome            |Dataset      |Licenza        |Link Licenza   |Fonte
:---------------|:------------|:--------------|:--------------|:-------------
{% for member in site.data.opendata %} {{member.Nome}} | [Dataset]({{member.Dataset}}) | {{member.Licenza}} | [Link Licenza]({{member.Linklicenza}}) | [Fonte]({{member.Fonte}})
{% endfor %}

---
layout: page
title: Opendata
permalink: /opendata/
---

<p>
Il sistema TerremotoCentroItalia è open sia in termini di dati, che di strumenti usati, che di codice.
</p>

**Dati**
In tabella tutti i riferimenti a tutti i contenuti e tutti i dati a cui puoi accedere tramite TerremotoCentroItalia.

{: .table .table-striped #opendata}
Nome            |Dataset         |Licenza         |Link Licenza    |Fonte           |Formato         |Note
:---------------|:---------------|:---------------|:---------------|:---------------|:---------------|:---------------
{% for member in site.data.opendata %} {{member.Nome}} | [Dataset]({{member.Dataset}}) | {{member.Licenza}} | [Link Licenza]({{member.Linklicenza}}) | [Fonte]({{member.Fonte}}) | {{member.Formato}} | {{member.Note}}
{% endfor %}

---
layout: page
title: Opendata
permalink: /opendata/
---

<p>In questa pagina saranno raccolti i link dinamici a tutti i dati a cui puoi accedere tramite TerremotoCentroItalia. Le licenze e i dettagli relativi le trovi in ogni dataset</p>

{: .table .table-striped #opendata}
|Nome            |Dataset      |Licenza        |Link Licenza   |Fonte
|:---------------|:------------|:--------------|:--------------|:-------------
{% for member in site.data.opendata %} {{member.Nome}} | [Dataset]({{member.Dataset}}) | {{member.Licenza}} |[Link Licenza]({{member.Linklicenza}}) | [Fonte]({{member.Fonte}})
{% endfor %}

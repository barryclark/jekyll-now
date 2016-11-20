---
layout: page
title: Vittime
permalink: /vittime/
---

<script src="//code.jquery.com/jquery-1.12.3.js"></script>
<script src="//cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>

<script>
$(document).ready(function() {
  $('#vittime').dataTable({
    "pageLength": 300,
    "language": {
    "search": "Cerca: ",
	"info":           "Da _START_ a _END_ di un totale di _TOTAL_",
	"infoFiltered":   "(filtro su _MAX_ entità)",
	"infoEmpty":      "Nessun risultato"
	},
    "bPaginate": false,
    "bLengthChange": false
  });
});
</script>


{: .table .table-striped #vittime}
Cognome         |Nome                    |Prefettura   |Data di nascita|Luogo di nascita    |Fonte
:---------------|:-----------------------|:------------|:--------------|:-------------------|:----------------------------------------------------------------
{% for member in site.data.vittime %} {{member.Cognome}} | {{member.Nome}} | {{member.Prefettura}} | {{member.Data}} | {{member.Luogo}} | [Fonte]({{member.Fonte}})
{% endfor %}


<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'vittime' %}
      <article class="post">
        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Leggi Tutto</a>
      </article>
    {% endif %}
  {% endfor %}
</div>


---
layout: page
title: Vittime
permalink: /vittime/
---

<script src="//code.jquery.com/jquery-1.12.3.js"></script>
<script src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>

<script>
$(document).ready(function() {
  $('#vittime').dataTable({
    "pageLength": 300,
    "search": "Cerca:",
    "decimal":        "",
    "emptyTable":     "No data available in table",
    "info":           "Showing _START_ to _END_ of _TOTAL_ entries",
    "infoEmpty":      "Showing 0 to 0 of 0 entries",
    "infoFiltered":   "(filtered from _MAX_ total entries)",
    "infoPostFix":    "",
    "thousands":      ",",
    "lengthMenu":     "Show _MENU_ entries",
    "loadingRecords": "Loading...",
    "processing":     "Processing...",
    "search":         "Search:",
    "zeroRecords":    "No matching records found",
    "paginate": {
        "first":      "First",
        "last":       "Last",
        "next":       "Next",
        "previous":   "Previous"
    },
    "aria": {
        "sortAscending":  ": activate to sort column ascending",
        "sortDescending": ": activate to sort column descending"
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


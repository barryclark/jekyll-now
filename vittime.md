---
layout: page
title: Vittime
permalink: /vittime/
---

<link href="https://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet" />
<link href="https://cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="https://cdn.datatables.net/1.10.7/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap.js"></script>

</script>
$(document).ready(function() {
  $('#example').dataTable();
});
</script>

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


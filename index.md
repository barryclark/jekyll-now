---
layout: default
---

- [Ποιές εταιρείες και επαγγελματίες δέχονται Bitcoin στην Ελλάδα;](#merchant-table)
- [Που μπορώ να μάθω περισσότερα για το Bitcoin;](#bitcoin.org)

### <a name="merchant-table"></a>Ποιές εταιρείες και επαγγελματίες δέχονται Bitcoin στην Ελλάδα;

[Γεωγραφική αναζήτηση](https://coinmap.org/#/world/38.81403111/24.63134766/6)

<table>
{% for company in site.data.data %}
  <tr text-align: center;>
		{% if company.url %}
		<td text-align: center;><a href="{{company.url}}" rel="nofollow">{{company.company_gr}}</a></td>
		{% else %}
		<td text-align: center;>{{company.company_gr}}</td>
		{% endif %}
		<td text-align: center;>{{company.category_gr}}</td>
		<td text-align: center;>{{company.location_gr}}</td>
  </tr>
{% endfor %}
</table>

### <a name="bitcoin.org"></a>Που μπορώ να μάθω περισσότερα για το Bitcoin;

Η επίσημη σελίδα ενημέρωσης για το Bitcoin είναι το [bitcoin.org](https://bitcoin.org).

Τελευταία ενημέρωση: 2015-11-22

<!-- <div class="posts">
  {% for post in site.posts %}
    <article class="post">

      <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

      <div class="entry">
        {{ post.excerpt }}
      </div>

      <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
</div> -->

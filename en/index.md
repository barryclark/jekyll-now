---
layout: default_en
---

[Map search](https://coinmap.org/#/world/38.81403111/24.63134766/6)

<table>
{% for company in site.data.data %}
  <tr text-align: center;>
		{% if company.url %}
		<td text-align: center;><a href="{{company.url}}" rel="nofollow">{{company.company_en}}</a></td>
		{% else %}
		<td text-align: center;>{{company.company_en}}</td>
		{% endif %}
		<td text-align: center;>{{company.category_en}}</td>
		<td text-align: center;>{{company.location_en}}</td>
  </tr>
{% endfor %}
</table>

Last update: 2015-12-16

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

---
layout: default
---
<header class="post-header">
  <h1 class="post-title">Articles by category: {{ page.categories }}</h1>
</header>

<div class="post-content">
  <hr />
  {% for category in site.categories %}
    {% capture category_slug %}{{ category | first }}{% endcapture %}
    {% for c_slug in category_slug %}
      {% if c_slug == page.categories %}
        <button class="btn btn-sm btn-default active">{{ c_slug }}</button>
      {% else %}
        <a href="/category/{{ c_slug }}" class="btn btn-sm btn-default">{{ c_slug }}</a>
      {% endif %}
    {% endfor %}
  {% endfor %}

  <hr />
  {% if site.categories[page.categories] %}
    {% for post in site.categories[page.categories] %}
      {% capture post_year %}{{ post.date | date: '%Y' }}{% endcapture %}
      {% if forloop.first %}
          <h4>{{ post_year }}</h4>
          <div class="list-group">
      {% endif %}

      {% if forloop.first == false %}
        {% assign previous_index = forloop.index0 | minus: 1 %}
        {% capture previous_post_year %}{{ site.categories[page.categories][previous_index].date | date: '%Y' }}{% endcapture %}
        {% if post_year != previous_post_year %}
          </div>
          <h4>{{ post_year }}</h4>
          <div class="list-group">
        {% endif %}
      {% endif %}
        <ul class="posts">
          <li><a href="{{ post.url }}">{{ post.title }}</a> &raquo; <i><span>{{ post.date | date_to_string }}</span></i></li>
        </ul>
      {% if forloop.last %}
        </div>
      {% endif %}
    {% endfor %}
  {% else %}
    <p>There are no posts in this categories.</p>
  {% endif %}
</div>

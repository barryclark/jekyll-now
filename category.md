---
layout: page
title: Category
permalink: /category/
---

  <table class="overview">
    <thead>
      <tr>
        <th>Name</th>
        <th>Info</th>
        <th>Authors</th>
      </tr>
    </thead>
    <tbody>
      {% for post in site.posts %}
      {% if post.layout == 'app' %}
        <tr>
          <td><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></td>
          <td>{{ post.repository }}, {{ post.ppa }}</td>
          <td>{{ post.content}}</td>
        </tr>
      {% endif %}
      {% endfor %}
    </tbody>
  </table>

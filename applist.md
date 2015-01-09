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
          <td><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a><br/> ({% if post.web %}<a href="{{ post.web }}">Web</a>{% endif %} {% if post.github %}<a href="https://github.com/{{ post.github }}">GitHub</a>{% endif %} {% if post.launchpad %}<a href="https://launchpad.net/{{ post.launchpad }}">Launchpad</a>{% endif %} {% if post.googleplus %}<a href="https://plus.google.com/{{ post.googleplus }}">Google+</a>{% endif %})</td>
          <td>{{ post.generic }}</td>
          <td>{{ post.authors }}</td>
        </tr>
      {% endif %}
      {% endfor %}
    </tbody>
  </table>

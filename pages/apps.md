---
layout: page
title: Apps for elementary
permalink: /apps/
---

<table class="overview tablesorter">
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
        <tr id="{{ post.url }}">
          <td>
            <a href="{{ site.baseurl }}{{ post.url }}" style="font-weight:bold">
              {{ post.title }}
            </a>
            {% if post.package %}<span class="octicon octicon-package" title="Package available"></span>{% endif %}
            {% if post.screenshots %}<span class="octicon octicon-device-desktop" title="Screenshot available"></span>{% endif %}
            <br/>
            {% include list_links.html %}
          </td>
          <td>
            {{ post.generic }}<br/>
            {{ post.license }}
          </td>
          <td>
            {% include list_authors.html %}
          </td>
        </tr>
      {% endif %}
    {% endfor %}
  </tbody>
</table>
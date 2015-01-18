---
layout: page
title: Apps for elementary
permalink: /apps
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
            {% if post.web %}<a href="{{ post.web }}">Web</a>{% endif %}
            {% if post.github %}<a href="https://github.com/{{ post.github }}">GitHub</a>{% endif %}
            {% if post.launchpad %}<a href="https://launchpad.net/{{ post.launchpad }}">Launchpad</a>{% endif %}
            {% if post.googleplus %}<a href="https://plus.google.com/{{ post.googleplus }}">Google+</a>{% endif %}
          </td>
          <td>{{ post.generic }}</td>
          <td>{{ post.authors }}</td>
        </tr>
      {% endif %}
      {% endfor %}
    </tbody>
  </table>

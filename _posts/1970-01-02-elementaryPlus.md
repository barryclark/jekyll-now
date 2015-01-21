---
published: true
layout: app
category: art
title: elementary+
generic: Icon set
description: An addition to the default icon theme, containing icons for several third party applications that resemble the elementary style.
authors: 
  - name: Manuel Kehl
    url: https://github.com/mank319
license:

links:
  - web:
  - github:
  - launchpad:
  - googleplus:

repository:
repository-unstable:
package:
---

<table class="overview tablesorter">
  <thead>
    <tr>
      <th>16</th>
      <th>24</th>
      <th>32</th>
      <th>48</th>
      <th>64</th>
      <th>128</th>
    </tr>
  </thead>
  <tbody>
    {% for icon in site.data.icons %}
      <tr id="{{ icon }}">
        <td><img src="./apps/16/{{ icon }}.svg"/>{{ icon }}</td>
        <td><img src="./apps/24/{{ icon }}.svg"/></td>
        <td><img src="./apps/32/{{ icon }}.svg"/></td>
        <td><img src="./apps/48/{{ icon }}.svg"/></td>
        <td><img src="./apps/64/{{ icon }}.svg"/></td>
        <td><img src="./apps/128/{{ icon }}.svg"/></td>
      </tr>
    {% endfor %}
  </tbody>
</table>
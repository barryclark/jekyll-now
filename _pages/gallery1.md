---
layout: default
title: gallery1
permalink: /gallery1/
images:
  - image_path: ../images/spun_yarn.jpeg
    title: Spun yarn
  - image_path: ../images/dyed_fiber.jpeg
    title: Dyed fiber
  - image_path: ../images/spun_yarns1.jpeg
    title: More spun yarn
---

<ul class="photo-gallery">
  {% for image in page.images %}
    <li><img src="{{ image.image_path }}" alt="{{ image.title}}"/></li>
  {% endfor %}
</ul>

<table class="photo-gallery">
  {% for image in page.images %}
    <tr><td>
    <img src="{{ image.image_path }}" alt="{{ image.title}}"/>
    </td></tr>
  {% endfor %}
</table>
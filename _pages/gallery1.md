---
layout: default
title: gallery1
permalink: /gallery1/
images:
  - image_path: ../images/cakes/spun_yarn.jpeg
    title: Spun yarn
  - image_path: ../images/cakes/dyed_fiber.jpeg
    title: Dyed fiber
  - image_path: ../images/cakes/spun_yarns1.jpeg
    title: More spun yarn
---

<ul class="photo-gallery">
  {% for image in page.images %}
    <li><img src="{{ image.image_path }}" alt="{{ image.title}}"/></li>
  {% endfor %}
</ul>
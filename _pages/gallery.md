---
layout: default
title: gallery
permalink: /gallery/
images:
  - image_path: ../images/dyed_fiber_blue-yellow.jpeg
    title: Dyed fiber
  - image_path: ../images/dyed_fiber_blue.jpeg
    title: Dyed fiber
  - image_path: ../images/dyed_fiber_pastels.jpeg
    title: Dyed fiber
  - image_path: ../images/dyed_fiber_yellow-blue-purple.jpeg
    title: Dyed fiber
  - image_path: ../images/unplied_singles_pastels.jpeg
    title: Unplied singles
  - image_path: ../images/unplied_singles_blue.jpeg
    title: Unplied singles
  - image_path: ../images/spun_fiber_blue.jpeg
    title: Spun yarn
  - image_path: ../images/spun_yarn_blue-green.jpeg
    title: Spun yarn
  - image_path: ../images/spun_yarn_greens.jpeg
    title: Spun yarn
  - image_path: ../images/spun_yarn_pastels.jpeg
    title: Spun yarn
  - image_path: ../images/spun_yarn_pastels2.jpeg
    title: Spun yarn
  - image_path: ../images/spun_yarn_yellow-blue-purple.jpeg
    title: Spun yarn
  - image_path: ../images/spun_yarns1.jpeg
    title: Spun yarns
    
    
    
---

<p>These samples show the strange and unpredictable and miraculous transformation of color from the original dyed fiber—bright, blotchy, rough—through the first unplied singles where the colors have been attenuated and condensed, and finally to the plied yarn where the colors of the individual plies intertwine and enter into conversation. And, in the skein (or the woven or knitted cloth), the many strands of yarn encounter one another and create further complexity. The unplied singles show the colors at their most intense and lustrous; after the finished yarn has been washed, it blooms and fluffs up so that the light catches it more diffusely and softly.</p>

<ul class="photo-gallery">
  {% for image in page.images %}
    <li><img src="{{ image.image_path }}" alt="{{ image.title}}"/></li>
  {% endfor %}
</ul>



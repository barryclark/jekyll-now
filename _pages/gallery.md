---
layout: default
title: gallery
permalink: /gallery/
images:
  - image_path: ../images/dyed_fiber_blue-yellow.jpeg
    title: Dyed fiber (Merino and/or Columbia, hand-dyed)
  - image_path: ../images/dyed_fiber_foster_blues.jpeg
    title: Dyed fiber (Blue-faced Leicester/Cormo cross, hand-dyed)
  - image_path: ../images/dyed_fiber_field_flowers.jpeg
    title: Dyed fiber (Merino and/or Columbia, hand-dyed)
  - image_path: ../images/dyed_fiber_maine_day.jpeg
    title: Dyed fiber (Merino and/or Columbia, hand-dyed)
  - image_path: ../images/unplied_singles_field_flowers.jpeg
    title: Unplied singles (Merino and/or Columbia, hand-dyed)
  - image_path: ../images/unplied_singles_foster_blues.jpeg
    title: Unplied singles (Blue-faced Leicester/Cormo cross, hand-dyed)
  - image_path: ../images/spun_fiber_foster_blues.jpeg
    title: Spun yarn (Blue-faced Leicester/Cormo cross, hand-dyed)
  - image_path: ../images/spun_yarn_deep_water_.jpeg
    title: Spun yarn (Merino and/or Columbia, hand-dyed)
  - image_path: ../images/spun_yarn_fog_forest.jpeg
    title: Spun yarn (Merino and/or Columbia, hand-dyed)
  - image_path: ../images/spun_yarn_field_flowers.jpeg
    title: Spun yarn (Merino and/or Columbia, hand-dyed)
  - image_path: ../images/spun_yarn_field_flowers2.jpeg
    title: Spun yarn (Merino and/or Columbia, hand-dyed)
  - image_path: ../images/spun_yarn_maine_day.jpeg
    title: Spun yarn (Merino and/or Columbia, hand-dyed)
  - image_path: ../images/spun_yarns1.jpeg
    title: Spun yarns (Merino and/or Columbia, hand-dyed)
    
    
    
---

<p>These samples show the strange and unpredictable and miraculous transformation of color from the original dyed fiber—bright, blotchy, rough—through the first unplied singles where the colors have been attenuated and condensed, and finally to the plied yarn where the colors of the individual plies intertwine and enter into conversation. And, in the skein (or the woven or knitted cloth), the many strands of yarn encounter one another and create further complexity. The unplied singles show the colors at their most intense and lustrous; after the finished yarn has been washed, it blooms and fluffs up so that the light catches it more diffusely and softly.</p>

<p>The preparation of the fiber before spinning also has its effects. When the fiber is dyed prior to carding, and the colors are blended during the carding process, the colors can be more thoroughly mixed (as in the blue examples below), with each color potentially present in tiny quantities of a fiber or two, or in subtle drifts through the fiber that fade in and out of the finished yarn. When the fiber is carded first and the dye is applied to a long strip of roving (as in the unspun examples below), the colors mix less in the spinning process and remain more distinct in the finished yarn. The dye can also be applied to the finished yarn directly (e.g. in "hand-painted" yarns) where the colors may remain completely distinct, with long passages or spots of yarn in the same color; I find that approach less interesting because it is entirely controlled by the dyer, without the element of unpredictability and recombination of the other methods.</p>

<ul class="photo-gallery">
  {% for image in page.images %}
    <li><img src="{{ image.image_path }}" alt="{{ image.title}}" title="{{ image.title}}"/></li>
  {% endfor %}
</ul>


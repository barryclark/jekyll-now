---
layout: default
title: log
permalink: /log/
    
images:
  - image_path: ../images/spun_fiber_blue.jpeg
    title: Blue-faced Leicester/Cormo cross
    weight: 100g
    gauge: 4000 ypp
    yards: 1000 yards

  - image_path: ../images/spun_yarn_blue-green.jpeg
    title: Merino and/or Columbia
    weight: 100g
    gauge: 4000 ypp
    yards: 1000 yards

  - image_path: ../images/spun_yarn_greens.jpeg
    title: Merino and/or Columbia
    weight: 100g
    gauge: 4000 ypp
    yards: 1000 yards

  - image_path: ../images/spun_yarn_pastels.jpeg
    title: Merino and/or Columbia
    weight: 100g
    gauge: 4000 ypp
    yards: 1000 yards

  - image_path: ../images/spun_yarn_pastels2.jpeg
    title: Merino and/or Columbia
    weight: 100g
    gauge: 4000 ypp
    yards: 1000 yards

---
<p>This table shows a log of my yarn production.</p>

<table class="sortable">
	<thead>
		<tr class="log">
			<td>Name</td>
			<td>Weight</td>
			<td>Yards</td>
			<td>Gauge</td>
			<td>Image</td>
		</tr>
	</thead>
	<tbody>
  {% for image in page.images %}
    <tr class="log">
    <td>{{ image.title}}</td>
    <td>{{ image.weight}}</td>
    <td>{{ image.yards}}</td>
    <td>{{ image.gauge}}</td>
    <td><img src="{{ image.image_path }}" height="50px" alt="{{ image.title}}" title="{{ image.title}}"/></td>
    </tr>
  {% endfor %}
  
  	</tbody>
</table>
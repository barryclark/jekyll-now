---
layout: default
title: log
permalink: /log/
    
images:
  - image_path: ../images/spun_fiber_blue.jpeg
    title: Foster Blues (Blue-faced Leicester/Cormo)
    weight: 100g
    gauge: 4000 ypp
    yards: 1000 yards

  - image_path: ../images/spun_yarn_blue-green.jpeg
    title: Deep Water (Merino and/or Columbia)
    weight: 143g
    gauge: 1628 ypp
    yards: 514 yards

  - image_path: ../images/spun_yarn_greens.jpeg
    title: Fog Forest (Merino and/or Columbia)
    weight: 190g
    gauge: 1020 ypp
    yards: 428 yards

  - image_path: ../images/spun_yarn_pastels.jpeg
    title: Soft Rainbow (Merino and/or Columbia)
    weight: 191 g
    gauge: 877 ypp
    yards: 370 yards


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
    <td><img src="{{ image.image_path }}" height="200px" alt="{{ image.title}}" title="{{ image.title}}"/></td>
    </tr>
  {% endfor %}
  
  	</tbody>
</table>
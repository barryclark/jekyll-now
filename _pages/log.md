---
layout: default
title: log
permalink: /log/
    
images:
  - image_path: ../images/spun_fiber_blue.jpeg
    title: Foster Blues (Blue-faced Leicester/Cormo)
    weight: 1000g
    gauge: 4000
    yards: 1000 

  - image_path: ../images/spun_yarn_blue-green.jpeg
    title: Deep Water (Merino and/or Columbia)
    weight: 143g
    gauge: 1628
    yards: 514

  - image_path: ../images/spun_yarn_greens.jpeg
    title: Fog Forest (Merino and/or Columbia)
    weight: 190g
    gauge: 1020
    yards: 428

  - image_path: ../images/spun_yarn_pastels.jpeg
    title: Soft Rainbow (Merino and/or Columbia)
    weight: 191g
    gauge: 877
    yards: 370


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
    <td class="txt">{{ image.title}}</td>
    <td class="num">{{ image.weight}}</td>
    <td class="num">{{ image.yards}}</td>
    <td class="num">{{ image.gauge}}</td>
    <td><img src="{{ image.image_path }}" height="200px" alt="{{ image.title}}" title="{{ image.title}}"/></td>
    </tr>
  {% endfor %}
  
  	</tbody>
</table>
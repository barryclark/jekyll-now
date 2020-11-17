---
layout: default
title: log
permalink: /log/
images:
  - title: Blue-faced Leicester/Cormo cross, hand-dyed
	weight: 100g
    yards: 1000 yards
    gauge: 4000 ypp
  	image_path: ../images/spun_fiber_blue.jpeg
  - title: Merino and/or Columbia, hand-dyed
	weight: 200g
    yards: 2000 yards
    gauge: 4000 ypp
	image_path: ../images/spun_yarn_blue-green.jpeg
  - title: Merino and/or Columbia, hand-dyed
	weight: 150g
    yards: 1000 yards
    gauge: 3000 ypp
  	image_path: ../images/spun_yarn_greens.jpeg
  - title: Merino and/or Columbia, hand-dyed
	weight: 200g
    yards: 100 yards
    gauge: 40 ypp
  	image_path: ../images/spun_yarn_pastels.jpeg
  - title: Merino and/or Columbia, hand-dyed
	weight: 100g
    yards: 1000 yards
    gauge: 4000 ypp
  	image_path: ../images/spun_yarn_pastels2.jpeg
  - title: Merino and/or Columbia, hand-dyed
	weight: 100g
    yards: 1000 yards
    gauge: 4000 ypp
  	image_path: ../images/spun_yarn_yellow-blue-purple.jpeg
    
    
    
    
---


<table class="sortable">
	<thead>
		<tr>
			<td>Name</td>
			<td>Weight</td>
			<td>Yards</td>
			<td>Gauge</td>
			<td>Image</td>
		</tr>
	</thead>
	<tbody>
  {% for image in page.images %}
    <tr>
    <td>{{ image.title}}</td>
    <td>{{ image.weight}}</td>
    <td>{{ image.yards}}</td>
    <td>{{ image.gauge}}</td>
    <td><img src="{{ image.image_path }}" alt="{{ image.title}}" title="{{ image.title}}"/></td>
    </tr>
  {% endfor %}
  
  	</tbody>
</table>


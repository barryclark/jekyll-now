---
layout: default
title: log
permalink: /log/
    
images:
  - image_path: ../images/dyed_fiber_blue-yellow.jpeg
    title: Dyed fiber (Merino and/or Columbia, hand-dyed)
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
    <td><img src="{{ image.image_path }}" alt="{{ image.title}}" title="{{ image.title}}"/></td>
    </tr>
  {% endfor %}
  
  	</tbody>
</table>
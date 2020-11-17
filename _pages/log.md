---
layout: default
title: log
permalink: /log/
    
images:
  - title: Blue-faced Leicester/Cormo cross
  	image_path: ../images/spun_fiber_blue.jpeg

---
<p>This table shows a log of my yarn production.</p>

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
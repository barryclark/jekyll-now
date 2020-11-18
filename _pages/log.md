---
layout: default
title: log
permalink: /log/
    
images:
  - image_path: ../images/spun_fiber_blue.jpeg
    title: Foster Blues (Blue-faced Leicester/Cormo)
    weight: 1000
    gauge: 4000
    yards: 1000 

  - image_path: ../images/spun_yarn_blue-green.jpeg
    title: Deep Water (Merino and/or Columbia)
    weight: 143
    gauge: 1628
    yards: 514

  - image_path: ../images/spun_yarn_greens.jpeg
    title: Fog Forest (Merino and/or Columbia)
    weight: 190
    gauge: 1020
    yards: 428

  - image_path: ../images/spun_yarn_pastels.jpeg
    title: Soft Rainbow (Merino and/or Columbia)
    weight: 191
    gauge: 877
    yards: 370

  - image_path: ../images/grey_unknown.jpeg
    title: Grey and Fuzzy (unknown breed)
    weight: 10
    gauge: 10
    yards: 10

  - image_path: ../images/gotland.jpeg
    title: Elvish (Gotland)
    weight: 10
    gauge: 10
    yards: 10

  - image_path: ../images/romney_alpaca.jpeg
    title: Gentle (Romney and alpaca blend)
    weight: 10
    gauge: 10
    yards: 10


---
<p>This table shows a log of my yarn production. The columns are sortable (just click on the heading and then on the little sort triangle).</p>

<table class="sortable">
	<thead>
		<tr class="log">
			<td>Name and breed</td>
			<td>Weight (g)</td>
			<td>Yards</td>
			<td>Gauge (ypp)</td>
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
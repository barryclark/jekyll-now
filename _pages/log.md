---
layout: default
title: log
permalink: /log/
    
images:

  - image_path: ../images/grey_unknown.jpeg
    title: Grey and Fuzzy (unknown breed)
    desc: This yarn was a delight to spin! 
    weight: 10
    gauge: 10
    yards: 10
    date: 9 May 2020

  - image_path: ../images/romney_alpaca.jpeg
    title: Gentle (Romney and alpaca blend)
    desc: This yarn was a delight to spin! 
    weight: 10
    gauge: 10
    yards: 10
    date: 22 August 2020

  - image_path: ../images/spun_fiber_blue.jpeg
    title: Foster Blues (Blue-faced Leicester/Cormo)
    desc: This yarn was a delight to spin! 
    weight: 1000
    gauge: 4000
    yards: 1000
    date: 13 September 2020

  - image_path: ../images/spun_yarn_pastels.jpeg
    title: Soft Rainbow (Merino and/or Columbia)
    desc: This yarn was a delight to spin! 
    weight: 191
    gauge: 877
    yards: 370
    date: 22 September 2020

  - image_path: ../images/gotland.jpeg
    title: Elvish (Gotland)
    desc: This yarn was a delight to spin! 
    weight: 10
    gauge: 10
    yards: 10
    date: 8 October 2020

  - image_path: ../images/spun_yarn_greens.jpeg
    title: Fog Forest (Merino and Columbia)
    desc: This yarn was a delight to spin! 
    weight: 190
    gauge: 1020
    yards: 428
    date: 11 October 2020

  - image_path: ../images/spun_yarn_blue-green.jpeg
    title: Deep Water (Merino)
    desc: This yarn was a delight to spin! 
    weight: 143
    gauge: 1628
    yards: 514
    date: 28 October 2020



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
			<td>Date completed</td>
		</tr>
	</thead>
	<tbody>
  {% for image in page.images %}
    <tr class="log">
    <td class="txt">{{ image.desc}}</td>
    <td class="num">{{ image.weight}}</td>
    <td class="num">{{ image.yards}}</td>
    <td class="num">{{ image.gauge}}</td>
    <td><img src="{{ image.image_path }}" height="200px" alt="{{ image.title}}" title="{{ image.title}}"/></td>
    <td class="date">{{ image.date}}</td>
    </tr>
  {% endfor %}
  
  	</tbody>
</table>
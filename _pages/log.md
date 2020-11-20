---
layout: default
title: log
permalink: /log/
    
images:

  - image_path: ../images/grey_unknown.jpeg
    title: Grey and Fuzzy (unknown breed)
    desc: This yarn was a delight to spin! The fiber came from a local wool producer at the RI Fiber Festival and the preparation was light and beautifully clean. 
    weight: 10
    gauge: 10
    yards: 10
    date: 2020-05-09

  - image_path: ../images/romney_alpaca.jpeg
    title: Gentle (Romney and alpaca blend)
    desc: This was another delightful fiber, very light and soft, with enough crimp to hold together well even when spun fine. This was my first experiment in applying my friend Iris's advice to spin soft, ply hard to make a lofty yarn, and it was a revelation. 
    weight: 10
    gauge: 10
    yards: 10
    date: 2020-08-22

  - image_path: ../images/spun_fiber_blue.jpeg
    title: Foster Blues (Blue-faced Leicester/Cormo)
    desc: This fiber comes from a neighbor who is still trying out different sheep shearers; this particular fleece had a lot of second cuts, i.e. 
    weight: 1000
    gauge: 4000
    yards: 1000
    date: 2020-09-13

  - image_path: ../images/spun_yarn_pastels.jpeg
    title: Soft Rainbow (Merino and/or Columbia)
    desc: This yarn was my first experience of spinning Merino, which is very soft and light. The yarn is somewhat uneven in thickness, and also has a lot of white undyed patches which lighten up the overall colors, which were more vivid in the unspun fiber. 
    weight: 191
    gauge: 877
    yards: 370
    date: 2020-09-22

  - image_path: ../images/gotland.jpeg
    title: Elvish (Gotland)
    desc: This Gotland fiber was exceptionally difficult to spin, being quite coarse and almost entirely lacking in crimp, so that it tended to fly apart.  
    weight: 10
    gauge: 10
    yards: 10
    date: 2020-10-08

  - image_path: ../images/spun_yarn_greens.jpeg
    title: Fog Forest (Merino and Columbia)
    desc: This batch of fiber included some Merino and some Columbia roving, which feel somewhat different. I should probably have divided them equally to create a more consistent yarn but instead I allowed them to mix more or less randomly. 
    weight: 190
    gauge: 1020
    yards: 428
    date: 2020-10-11

  - image_path: ../images/spun_yarn_blue-green.jpeg
    title: Deep Water (Merino)
    desc: I spun this yarn after getting more familiar with Merino; I had better control and was able to spin a bit finer and more consistently. 
    weight: 143
    gauge: 1628
    yards: 514
    date: 2020-10-28



---
<p>This table shows a log of my yarn production. The columns are sortable (just click on the heading and then on the little sort triangle).</p>

<table class="sortable" width="100%">
	<thead>
		<tr class="log">
			<td width="30%">Name and breed</td>
			<td width="10%">Weight (g)</td>
			<td width="10%">Yards</td>
			<td width="10%">Gauge (ypp)</td>
			<td width="30%">Image</td>
			<td width="10%">Date completed</td>
		</tr>
	</thead>
	<tbody>
  {% for image in page.images %}
    <tr class="log">
    <td class="txt">{{ image.title}}<br/>{{ image.desc}}</td>
    <td class="num">{{ image.weight}}</td>
    <td class="num">{{ image.yards}}</td>
    <td class="num">{{ image.gauge}}</td>
    <td><img src="{{ image.image_path }}" height="200px" alt="{{ image.title}}" title="{{ image.title}}"/></td>
    <td class="date">{{ image.date}}</td>
    </tr>
  {% endfor %}
  
  	</tbody>
</table>
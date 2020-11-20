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
    desc: This fiber comes from a neighbor who is still trying out different sheep shearers; this particular fleece had a lot of second cuts (i.e. short bits of wool resulting from a second pass with the clippers, undesirable in fleece intended for spinning) which made for a somewhat lumpy yarn. But apart from that, it's a very appealing fiber: fine and lustrous with a beautiful crimp. 
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
    desc: This Gotland fiber was exceptionally difficult to spin, being quite coarse and almost entirely lacking in crimp, so that it tended to fly apart. Although it needed a fair amount of twist to hold the yarn together, that same twist tended to make a very dense and heavy yarn. I'm not sure I would spin this again, although Gotland has its enthusiasts. A closely related breed of wool was apparently used in the Lord of the Rings movies to make the dark grey cloaks that resemble chain mail, hence the name of this yarn. 
    weight: 10
    gauge: 10
    yards: 10
    date: 2020-10-08

  - image_path: ../images/spun_yarn_greens.jpeg
    title: Fog Forest (Merino and Columbia)
    desc: This batch of fiber included some Merino and some Columbia roving, which feel somewhat different. I should probably have divided them equally to create a more consistent yarn but instead I allowed them to mix more or less randomly, so the yarn has some softer patches (the Merino) and some that have a little more tooth (the Columbia). 
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
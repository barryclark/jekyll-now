---
layout: default
title: log
permalink: /log/
    
images:

  - image_path: ../images/spun_yarn_coggeshall.jpeg
    title: Coggeshall (unknown breed)
    desc: This yarn was a delight to spin! The fiber came from a local wool producer at the RI Fiber Festival (held at Coggeshall Farm in Bristol) and the preparation was light and beautifully clean. 
    weight: 1162
    gauge: 536
    yards: 1376
    date: 2020-05-09

  - image_path: ../images/spun_yarn_gentle.jpeg
    title: Gentle (Romney and alpaca blend)
    desc: This was another delightful fiber, very light and soft, with enough crimp to hold together well even when spun fine. This was my first experiment in applying my friend Iris's advice to spin soft, ply hard to make a lofty yarn, and it was a revelation. 
    weight: 1434
    gauge: 1084
    yards: 3434
    date: 2020-08-22

  - image_path: ../images/spun_fiber_foster_blues.jpeg
    title: Foster Blues (Blue-faced Leicester/Cormo)
    desc: This fleece had a lot of second cuts, i.e. short bits of wool resulting from a second pass with the clippers, undesirable in fleece intended for spinning, which made for a somewhat lumpy yarn.  But apart from that, it's a very appealing fiber, fine and lustrous with a beautiful crimp.
    weight: 307
    gauge: 812
    yards: 550
    date: 2020-09-13

  - image_path: ../images/spun_yarn_field_flowers.jpeg
    title: Field Flowers (Merino and/or Columbia)
    desc: This yarn was my first experience of spinning Merino, which is very soft and light. The yarn is somewhat uneven in thickness, and also has a lot of white undyed patches which lighten up the overall colors, which were more vivid in the unspun fiber. 
    weight: 191
    gauge: 877
    yards: 370
    date: 2020-09-22

  - image_path: ../images/spun_yarn_elvish.jpeg
    title: Elvish (Gotland)
    desc: This Gotland fiber was exceptionally difficult to spin, being quite coarse and almost entirely lacking in crimp, so that it tended to fly apart. Although it needed a fair amount of twist to hold the yarn together, that same twist tended to make a very dense and heavy yarn.
    weight: 454
    gauge: 499
    yards: 500
    date: 2020-10-08

  - image_path: ../images/spun_yarn_fog_forest.jpeg
    title: Fog Forest (Merino and Columbia)
    desc: This batch of fiber included some Merino and some Columbia roving, which feel somewhat different. I should probably have divided them equally to create a more consistent yarn but instead I allowed them to mix more or less randomly, so the yarn has some softer patches (the Merino) and some that have a little more tooth (the Columbia).
    weight: 190
    gauge: 1020
    yards: 428
    date: 2020-10-11

  - image_path: ../images/spun_yarn_deep_water.jpeg
    title: Deep Water (Merino)
    desc: I spun this yarn after getting more familiar with Merino; I had better control and was able to spin a bit finer and more consistently. 
    weight: 143
    gauge: 1628
    yards: 514
    date: 2020-10-28

  - image_path: ../images/spun_yarn_maine_day.jpeg
    title: Maine Day (Merino)
    desc: This is my favorite color so far. 
    weight: 191
    gauge: 1257
    yards: 530
    date: 2020-10-30

  - image_path: ../images/spun_yarn_warm_jacob.jpeg
    title: Warm Jacob (Jacob)
    desc: A crisp, springy yarn; the wool had nice crimp after washing. 
    weight: 454
    gauge: 1038
    yards: 1038
    date: 2020-11-08

  - image_path: ../images/spun_yarn_blueberry_meadow.jpeg
    title: Blueberry Meadow (Merino)
    desc: A fine, soft yarn 
    weight: 229
    gauge: 1637
    yards: 828
    date: 2020-11-21

  - image_path: ../images/spun_yarns1.jpeg
    title: Total
    desc: All of my spinning since May 2020 
    weight: 4944
    gauge: n/a
    yards: 9996
    as of: 2020-11-25


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
    <td class="txt"><strong>{{ image.title}}</strong><br/>{{ image.desc}}</td>
    <td class="num">{{ image.weight}}</td>
    <td class="num">{{ image.yards}}</td>
    <td class="num">{{ image.gauge}}</td>
    <td><img src="{{ image.image_path }}" height="200px" alt="{{ image.title}}" title="{{ image.title}}"/></td>
    <td class="date">{{ image.date}}</td>
    </tr>
  {% endfor %}
  
  	</tbody>
</table>
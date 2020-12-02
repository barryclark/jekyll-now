---
layout: default
title: log
permalink: /log/
    
images:

  - image_path: ../images/spun_yarn_coopworth.jpg
    title: Coopworth Knobbly
    desc: One of my first spinning efforts, and the first fleece I ever bought. The fiber preparation and the spinning are very uneven and the fleece itself was all sorts of different shades of brown and grey, so the resulting yarn is all over the place.
    weight: 1229
    gauge: 687
    yards: 1864
    date: 2008-01-20

  - image_path: ../images/spun_yarn_ashford.jpeg
    title: Ashford Brick
    desc: This yarn was an early learning experience, using commercially dyed Merino roving from Ashford. 
    weight: 242
    gauge: 827
    yards: 442
    date: 2008-03-30


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

  - image_path: ../images/spun_yarn_penobscot.jpeg
    title: Penobscot (BFL/Cormo)
    desc: This is a three-ply yarn made with fleece from my neighbor's Blue-faced Leicester X Cormo sheep.
    weight: 195
    gauge: 911
    yards: 392
    date: 2020-11-29

  - image_path: ../images/spun_yarns1.jpeg
    title: Total
    desc: All of my spinning since May 2020 
    weight: 6420
    gauge: n/a
    yards: 12266
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

<p>This is a visualization of this data using RawGraphs.io, with yards per pound (a measure of how fine the yarn is) on the vertical axis, the size of each dot reflecting the total yardage for each batch of yarn, and the color of the dot representing the different types of fiber:</p>

<svg width="617" height="500" xmlns="http://www.w3.org/2000/svg" version="1.1"><g transform="translate(40,20)"><g class="x axis" transform="translate(0,440)" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle" style="stroke-width: 1px; font-size: 10px; font-family: Arial, Helvetica;"><path class="domain" stroke="#000" d="M0.5,-440V0.5H557.5V-440" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></path><g class="tick" opacity="1" transform="translate(65.84835281615302,0)"><line stroke="#000" y2="-440" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" y="3" dy="0.71em">June</text></g><g class="tick" opacity="1" transform="translate(151.08533475026567,0)"><line stroke="#000" y2="-440" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" y="3" dy="0.71em">July</text></g><g class="tick" opacity="1" transform="translate(239.1635494155154,0)"><line stroke="#000" y2="-440" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" y="3" dy="0.71em">August</text></g><g class="tick" opacity="1" transform="translate(327.24176408076517,0)"><line stroke="#000" y2="-440" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" y="3" dy="0.71em">September</text></g><g class="tick" opacity="1" transform="translate(412.4787460148778,0)"><line stroke="#000" y2="-440" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" y="3" dy="0.71em">October</text></g><g class="tick" opacity="1" transform="translate(500.55696068012753,0)"><line stroke="#000" y2="-440" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" y="3" dy="0.71em">November</text></g></g><g class="y axis" fill="none" font-size="10" font-family="sans-serif" text-anchor="end" style="stroke-width: 1px; font-size: 10px; font-family: Arial, Helvetica;"><path class="domain" stroke="#000" d="M557,440.5H0.5V0.5H557" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></path><g class="tick" opacity="1" transform="translate(0,440.07456379395524)"><line stroke="#000" x2="557" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" x="-3" dy="0.32em">500</text></g><g class="tick" opacity="1" transform="translate(0,401.44495677954774)"><line stroke="#000" x2="557" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" x="-3" dy="0.32em">600</text></g><g class="tick" opacity="1" transform="translate(0,362.81534976514035)"><line stroke="#000" x2="557" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" x="-3" dy="0.32em">700</text></g><g class="tick" opacity="1" transform="translate(0,324.1857427507329)"><line stroke="#000" x2="557" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" x="-3" dy="0.32em">800</text></g><g class="tick" opacity="1" transform="translate(0,285.5561357363255)"><line stroke="#000" x2="557" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" x="-3" dy="0.32em">900</text></g><g class="tick" opacity="1" transform="translate(0,246.926528721918)"><line stroke="#000" x2="557" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" x="-3" dy="0.32em">1,000</text></g><g class="tick" opacity="1" transform="translate(0,208.29692170751053)"><line stroke="#000" x2="557" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" x="-3" dy="0.32em">1,100</text></g><g class="tick" opacity="1" transform="translate(0,169.6673146931031)"><line stroke="#000" x2="557" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" x="-3" dy="0.32em">1,200</text></g><g class="tick" opacity="1" transform="translate(0,131.03770767869565)"><line stroke="#000" x2="557" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" x="-3" dy="0.32em">1,300</text></g><g class="tick" opacity="1" transform="translate(0,92.40810066428827)"><line stroke="#000" x2="557" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" x="-3" dy="0.32em">1,400</text></g><g class="tick" opacity="1" transform="translate(0,53.77849364988083)"><line stroke="#000" x2="557" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" x="-3" dy="0.32em">1,500</text></g><g class="tick" opacity="1" transform="translate(0,15.148886635473332)"><line stroke="#000" x2="557" style="shape-rendering: crispedges; fill: none; stroke: rgb(204, 204, 204);"></line><text fill="#000" x="-3" dy="0.32em">1,600</text></g></g><g class="circle"><circle transform="translate(557, 0)" r="10.329720297987079" style="fill: rgb(191, 105, 105); fill-opacity: 0.9;"></circle><text transform="translate(557, 0)" text-anchor="middle" dy="15" style="font-size: 10px; font-family: Arial, Helvetica;">Blueberry Meadow</text></g><g class="circle"><circle transform="translate(0, 425.5030146753387)" r="13.027148478511856" style="fill: rgb(191, 191, 105); fill-opacity: 0.9;"></circle><text transform="translate(0, 425.5030146753387)" text-anchor="middle" dy="15" style="font-size: 10px; font-family: Arial, Helvetica;">Coggeshall</text></g><g class="circle"><circle transform="translate(488.6920297555792, 3.729944671535577)" r="8.350806912152937" style="fill: rgb(191, 105, 105); fill-opacity: 0.9;"></circle><text transform="translate(488.6920297555792, 3.729944671535577)" text-anchor="middle" dy="15" style="font-size: 10px; font-family: Arial, Helvetica;">Deep Water</text></g><g class="circle"><circle transform="translate(431.8673751328374, 440)" r="8.25000753117517" style="fill: rgb(105, 191, 105); fill-opacity: 0.9;"></circle><text transform="translate(431.8673751328374, 440)" text-anchor="middle" dy="15" style="font-size: 10px; font-family: Arial, Helvetica;">Elvish</text></g><g class="circle"><circle transform="translate(386.40765143464404, 293.73262862678075)" r="7.236692297167749" style="fill: rgb(191, 105, 105); fill-opacity: 0.9;"></circle><text transform="translate(386.40765143464404, 293.73262862678075)" text-anchor="middle" dy="15" style="font-size: 10px; font-family: Arial, Helvetica;">Field Flowers</text></g><g class="circle"><circle transform="translate(471.6446333687566, 238.52982389494548)" r="7.707726401471273" style="fill: rgb(191, 105, 105); fill-opacity: 0.9;"></circle><text transform="translate(471.6446333687566, 238.52982389494548)" text-anchor="middle" dy="15" style="font-size: 10px; font-family: Arial, Helvetica;">Fog Forest</text></g><g class="circle"><circle transform="translate(360.83655685441016, 319.21880122892225)" r="8.603872047996754" style="fill: rgb(105, 191, 191); fill-opacity: 0.9;"></circle><text transform="translate(360.83655685441016, 319.21880122892225)" text-anchor="middle" dy="15" style="font-size: 10px; font-family: Arial, Helvetica;">Foster Blues</text></g><g class="circle"><circle transform="translate(298.32943676939425, 213.66894530351124)" r="20" style="fill: rgb(105, 105, 191); fill-opacity: 0.9;"></circle><text transform="translate(298.32943676939425, 213.66894530351124)" text-anchor="middle" dy="15" style="font-size: 10px; font-family: Arial, Helvetica;">Gentle</text></g><g class="circle"><circle transform="translate(494.3744952178534, 147.14237114251716)" r="8.464339606034983" style="fill: rgb(191, 105, 105); fill-opacity: 0.9;"></circle><text transform="translate(494.3744952178534, 147.14237114251716)" text-anchor="middle" dy="15" style="font-size: 10px; font-family: Arial, Helvetica;">Maine Day</text></g><g class="circle"><circle transform="translate(440.3910733262487, 238.52982389494548)" r="7.707726401471273" style="fill: rgb(191, 105, 105); fill-opacity: 0.9;"></circle><text transform="translate(440.3910733262487, 238.52982389494548)" text-anchor="middle" dy="15" style="font-size: 10px; font-family: Arial, Helvetica;">Pearly Blue</text></g><g class="circle"><circle transform="translate(520.0639744952178, 231.74727805644318)" r="11.446050770676576" style="fill: rgb(191, 105, 191); fill-opacity: 0.9;"></circle><text transform="translate(520.0639744952178, 231.74727805644318)" text-anchor="middle" dy="15" style="font-size: 10px; font-family: Arial, Helvetica;">Warm Jacob</text></g><g class="point"><circle transform="translate(557, 0)" r="1" style="fill: rgb(0, 0, 0);"></circle></g><g class="point"><circle transform="translate(0, 425.5030146753387)" r="1" style="fill: rgb(0, 0, 0);"></circle></g><g class="point"><circle transform="translate(488.6920297555792, 3.729944671535577)" r="1" style="fill: rgb(0, 0, 0);"></circle></g><g class="point"><circle transform="translate(431.8673751328374, 440)" r="1" style="fill: rgb(0, 0, 0);"></circle></g><g class="point"><circle transform="translate(386.40765143464404, 293.73262862678075)" r="1" style="fill: rgb(0, 0, 0);"></circle></g><g class="point"><circle transform="translate(471.6446333687566, 238.52982389494548)" r="1" style="fill: rgb(0, 0, 0);"></circle></g><g class="point"><circle transform="translate(360.83655685441016, 319.21880122892225)" r="1" style="fill: rgb(0, 0, 0);"></circle></g><g class="point"><circle transform="translate(298.32943676939425, 213.66894530351124)" r="1" style="fill: rgb(0, 0, 0);"></circle></g><g class="point"><circle transform="translate(494.3744952178534, 147.14237114251716)" r="1" style="fill: rgb(0, 0, 0);"></circle></g><g class="point"><circle transform="translate(440.3910733262487, 238.52982389494548)" r="1" style="fill: rgb(0, 0, 0);"></circle></g><g class="point"><circle transform="translate(520.0639744952178, 231.74727805644318)" r="1" style="fill: rgb(0, 0, 0);"></circle></g></g></svg>
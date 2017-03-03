---
layout: post
title: Compound Interest Calculator and Chart
tags: [money]
keywords: [compound interest calculator, compound interest chart, compound interest, interest, calculator, chart, chart]
javascripts: [/js/d3.min.js, /js/c3.min.js, /js/parseGet.min.js]
deferedjavascripts: [/js/compound-interest.js]
csses: [/css/c3.css]
image: /images/covers/2017-03-03-compound-interest-calculator-and-chart.png
permalink: /newpost/
---

<div id="interest-chart" style="width: 100%; height: 300px;"></div>

<style>
.calc-label {
  display: inline-block;
  width: 175px;
}
.calc-label + input {
  width: 100px 
}
</style>

<form>
<div><span class="calc-label">Initial balance</span><input type="number" name="start" step="0.01" value="100" min="0" required></div>
<div><span class="calc-label">Rate</span><input type="number" name="rate" value="1" min="0" max="100" required></div>
<div><span class="calc-label">Period (times a year)</span><input type="number" name="period" value="12" min="0" max="365" required></div>
<div><span class="calc-label">Periodic deposits</span><input type="number" name="invest" step="0.01" value="10" min="0" required></div>
<div><span class="calc-label">Years</span><input type="number" name="years" step="1" value="2" min="1" max="50" required></div>
<div><span class="calc-label"></span><input type="submit"></div>
</form>

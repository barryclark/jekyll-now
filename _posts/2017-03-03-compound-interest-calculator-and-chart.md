---
layout: post
title: Compound Interest Calculator and Chart
tags: [money]
keywords: [compound interest calculator, compound interest chart, compound interest, interest, calculator, chart, chart]
javascripts: [/js/d3.min.js, /js/c3.min.js, /js/parseGet.min.js]
deferedjavascripts: [/js/compound-interest.min.js]
csses: [/css/c3.min.css]
image: /images/covers/2017-03-03-compound-interest-calculator-and-chart.png
---

For fun, I created this [compound interest](https://en.wikipedia.org/wiki/Compound_interest) calculator with a chart. Just enter your values in the form below the chart, hit submit, and it will display your results.

**Caveats:**
* Rounds to the nearest penny using [Math.round(num * 100) / 100](http://stackoverflow.com/a/11832950/6323312)
* Period is a number from 1 (yearly) to 365 (daily). Use 12 for monthly, 52 for weekly.

**Quick story:** I used to think that if you had a savings account at 10%, you got 10% interest everytime it was calculated. Therefore it made sense to me that interest compounded daily would make 365 times that calculated once a year. As it turns out, interest compounded daily would get 1/365th the annual interest daily, and monthly would get 1/12th the annual interest monthly.

[Check out the source here.](https://github.com/hendrixjoseph/hendrixjoseph.github.io/blob/master/js/compound-interest.js)

<h2 id="final-amount"></h2>
<div id="interest-chart" style="width: 100%; height: 300px;"></div>

<style>
#final-amount {
  text-align: center;
}
form.calc-input {
  margin: 0 auto;
  width: 275px;
}
form.calc-input span {
  display: inline-block;
  width: 175px;
}
form.calc-input input {
  width: 100px 
}
</style>

<form class="calc-input">
<div><span>Initial balance</span><input type="number" name="start" step="0.01" value="100" min="0" required></div>
<div><span>Rate</span><input type="number" name="rate" value="1" min="0" max="100" required></div>
<div><span>Period (times a year)</span><input type="number" name="period" step="1" value="12" min="1" max="365" required></div>
<div><span>Periodic deposits</span><input type="number" name="invest" step="0.01" value="10" min="0" required></div>
<div><span>Years</span><input type="number" name="years" step="1" value="2" min="1" max="50" required></div>
<div><span></span><input type="submit"></div>
</form>

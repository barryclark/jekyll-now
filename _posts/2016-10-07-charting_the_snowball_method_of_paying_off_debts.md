---
layout: post
title: Charting the Snowball Method of Paying Off Debts
tags: [money, math, javascript, html5]
keywords: [avalanche, snowball, debt, debts, chart, charts, interest]
jquery: true
javascripts: [/js/d3.min.js, /js/c3.min.js, /js/parseGet.min.js]
csses: [/css/c3.css, /css/debtChart.css]
image: /images/avalanche.jpg
---

I was curious as to the difference between the two methods of snowballing debt. [The snowball method](https://en.wikipedia.org/wiki/Debt-snowball_method), if you're not familiar with it, is used when you have multiple debts. You keep paying the same amount each month, and when you finish paying off one debt, you add that payment amount to another debt. The other debt is either the one with the lowest balance, which is much more commonly associated with the snowball method, or the one with the highest interest rate, which is much more mathematically advantageous.

Scroll down to the bottom to play with the variables. I used [c3](http://c3js.org/) for the charts, which in turn uses [d3](https://d3js.org/). I also used [jQuery](https://jquery.com/). After I was done, I used [jscompress.com](https://jscompress.com/) to minify and hopefully improve some performance. [Check out the unminified code here.](https://github.com/hendrixjoseph/hendrixjoseph.github.io/blob/master/_includes/avalanche.html)

{% include avalanche.html %}

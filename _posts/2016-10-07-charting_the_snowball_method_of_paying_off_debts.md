---
layout: post
title: Charting the Snowball Method of Paying Off Debts
tags: [money, math, javascript, html5]
keywords: [avalanche, snowball, debt, debts, debt snowball, debt stacking, debt avalanche, chart, charts, interest]
jquery: true
javascripts: [/js/d3.min.js, /js/c3.min.js, /js/parseGet.min.js]
deferedjavascripts: [/js/avalanche.js]
csses: [/css/c3.min.css, /css/debtChart.css]
image: /images/avalanche.jpg
thumbnail: true
excerpt: I was curious as to the difference between the two methods of snowballing debt. The snowball method, if you're not familiar with it, is often used when you have multiple debts. You keep paying the same amount each month...
updated: 2016-01-26
---

*January 26, 2017 Update: I added a sentence mentioning debt stacking / debt avalance.*

*November 29, 2016 Update: I cleaned up the code some, simplified the input table, performed some bug fixes, and provided a better default example.*

I was curious as to the difference between the two methods of snowballing debt. [The snowball method](https://en.wikipedia.org/wiki/Debt-snowball_method), if you're not familiar with it, is often used when you have multiple debts. You keep paying the same amount each month, and when you finish paying off one debt, you add that payment amount to another debt. The other debt is either the one with the lowest balance, which is much more commonly associated with the snowball method, or the one with the highest interest rate, which is more mathematically advantageous. This second method is sometimes called [*debt stacking*](http://classroom.synonym.com/debt-stacking-work-12644.html) or *debt avalanche* in order to contrast it with the debt snowball. 

Scroll down to the bottom to play with the variables. I used [c3](http://c3js.org/) for the charts, which in turn uses [d3](https://d3js.org/). I also used [jQuery](https://jquery.com/). After I was done, I used [jscompress.com](https://jscompress.com/) to minify and hopefully improve some performance. [Check out the unminified code here.](https://github.com/hendrixjoseph/hendrixjoseph.github.io/blob/master/js/avalanche.js)

{% include avalanche.html %}

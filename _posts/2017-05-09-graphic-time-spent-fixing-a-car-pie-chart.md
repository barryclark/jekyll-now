---
layout: post
title: "Graphic: Time Spent Fixing a Car (Pie Chart)"
tags: [humor]
keywords: [graphic, pie chart, car, mechanic, time spent]
javascripts: [/js/d3.min.js, /js/c3.min.js]
csses: [/css/c3.css]
image: /images/covers/2017-05-09-graphic-time-spent-fixing-a-car-pie-chart.png
---

This is just a quick pie chart illustrating the time spent when ever I am working on either my car or friend and family's car.

The isn't the time spent at a mechanic's shop. This is DIY "[shadetree mechanic](https://en.wikipedia.org/wiki/Shadetree_mechanic)" stuff.

<div id="time-pie"></div>

<script>
$(document).ready(function() {
    c3.generate({
        bindto: '#time-pie',
        data: {
            columns: [
                ['running around for parts', 60],
                ['looking for that tool YOU JUST HAD IN YOUR HAND', 15],
                ['taking a quick break', 60],
                ['swearing', 20],
                ['wondering where that 10mm socket went', 10],
                ['soaking a rusted bolt in PB Blaster', 20],
                ['actually working on the car', 5]
            ],
            type: 'pie'
        }
    });
});
</script>

---
layout: post
categories: robots
title: Motor Control MOSFET Thermal Calculator
---

At work I was tasked with creating an internal tool to track and display vital company stats. I knew that meant I would likely be displaying some data in charts and graphs. Thus began my search for an easily customizable data visualization library.

I perused the roundup of libraries that Google and Stack Overflow offered: [Highcharts.js](http://www.highcharts.com/), [Flot](http://www.flotcharts.org/), [gRaphael](http://g.raphaeljs.com/), [jsCharts](http://www.jscharts.com/), and finally [d3.js](http://d3js.org/) (I hadn't seen [Chart.js](http://www.chartjs.org/) at the time, but it looks pretty nice). I won't go into comparisons on the various libraries, but I will tell you why I chose d3.js:

- easy to use (after the beginner's hump)
- uses svg: scalable & widely supported
- completely customizable
- flexible & extendable
- extremely powerful
- [lots of examples](https://github.com/mbostock/d3/wiki/Gallery)
- [even more examples](http://bl.ocks.org/mbostock)

At the top of this article I've inserted a simple bar chart as an example. You can see [some screenshots](http://dribbble.com/shots/966448-Monitor-fullview?list=users) of actual real-time data visualizations I created for our company monitor. Let's take a look at how D3 makes these animating bar charts:

First, let's drop in a few simple styles:

#### Gate driver
Ion (A): <input type="text" name="Ion" value="" size="10" maxlength="50" />
Ioff (A): <input type="text" name="Ioff" value="" size="10" maxlength="50" />

#### FET
Qg (nC): <input type="text" name="Qg" value="" size="10" maxlength="50" />
Rds (mOhm): <input type="text" name="Rds" value="" size="10" maxlength="50" />

#### Firmware parameters
PWM freq (Hz): <input type="text" name="fpwm" value="" size="10" maxlength="50" />
<input type="submit" name="submit" value="sign me up!" />

<figure class="final">
  <figcaption>The final result</figcaption>
</figure>

<a href="http://codepen.io/mshwery/pen/uCBbn" class="codepen" target="_blank">Check out the code in action on CodePen</a>

<style>
  svg {
    font: 10px sans-serif;
  }

  .foreground {
    fill: #2D6A99;
  }

  .background {
    fill: #eee;
  }
</style>
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script type="text/javascript">

  var n = 10,
      random = function() { return Math.floor(Math.random() * 100); },
      data = d3.range(n).map(random);
  
  var barChart = {
    init: function(el) {
      this.height = 80;
      this.width = 220;
      this.padding = 12;
      barWidth = Math.floor((this.width - (this.padding * (data.length - 1))) / data.length);
      barHeight = this.height;

      this.svg = d3.select(el).insert('svg', ':first-child')
        .attr('width', this.width)
        .attr("height", this.height);

      this.draw();
    },

    draw: function() {
      var self = this;

      this.meters = this.svg
        .append("g")
          .attr("class", "meter")
          .selectAll("rect")
            .data(data)
            .enter()
            .append('g')
              .attr("class", "bar");

      this.drawBar().attr("class", "background").attr("y", 0).attr("height", barHeight);
      this.drawBar().attr("class", "foreground").attr("y", barHeight).attr("height", 0);

      setInterval(function() {
        data = d3.range(n).map(random);
        self.update();
      }, 2000);
    },

    update: function () {
        var self = this;
        d3.selectAll("rect.foreground").each(self.animate);
    },

    animate: function (d, i) {
      var total = data[i];
      var bar = d3.select(this);
      if (barHeight - total != bar.attr("y")) {
        bar.transition().duration(1500).attr("height", total).attr("y", barHeight - total);
      }
    },

    drawBar: function () {
      var self = this;

      return this.meters.append("rect")
        .attr("x", function (d, i) {
          return i * (barWidth + self.padding);
        })
        .attr("width", barWidth);
    }
  }

  barChart.init('figure.final');
</script>

<script type="text/javascript"
      src="https://www.google.com/jsapi?autoload={
        'modules':[{
          'name':'visualization',
          'version':'1',
          'packages':['corechart']
        }]
      }"></script>

<script type="text/javascript">
  google.setOnLoadCallback(drawChart);


  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ]);

  function updateData() {

  }
  function drawChart() {

    var options = {
      title: 'Company Performance',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }
</script>

<div id="curve_chart" style="width: 900px; height: 500px"></div>
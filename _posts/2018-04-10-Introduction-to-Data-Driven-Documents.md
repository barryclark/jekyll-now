---
layout: post
title: An Introduction to Data Driven Documents (D3)
categories: blog
comments: true
published: false
date: 2018-04-10 00:00:00 +0000
---

This article is a continuation of my earlier post on [how to migrate data from Twitter to MongoDB](https://julianjoseph.github.io/blog/2018/02/15/Retweeter-MongoDB-Integration/). I had been looking at ways of presenting the Twitter data from MongoDB in a graphical format. While searching, I came across the [D3 (Data Driven Documents) JavaScript library](https://d3js.org/).

![Sample line chart](https://raw.githubusercontent.com/julianjoseph/julianjoseph.github.io/master/images/fdt-line-chart.jpg)

D3 has been around since about 2011, but, like so many other dev tools, was completely new to me! I started by going through the excellent PluralSight course: [D3.js Data Visualization Fundamentals](https://app.pluralsight.com/library/courses/d3js-data-visualization-fundamentals/table-of-contents), then had a go at creating my own simple chart, using my MongoDB data in the cloud. This post is just an overview, and there are loads of excellent tutorials available online, so I won't go into too much detail on how to get up and running with D3.

D3 is definitely not a "here's my x series data, here's my y series data, plot a line chart" tool. It is quite low level, and requires a fairly good understanding of:
* DOM
* CSS
* JavaScript programming
* HTML

In return for the heavier investment in technical skills required to get up and running, you get incredibly fine-grained control over your visuals - which would be very hard or impossible to do with many other higher level graphing tools. D3 acts as a thin layer between your data and the DOM, and harnesses the power of [SVG (Scalable Vector Graphics)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) to allow you to create interactive visuals declaratively using XML style syntax. This screenshot shows you what D3 outputs to the page within the SVG tag:

![Source code extract](https://raw.githubusercontent.com/julianjoseph/julianjoseph.github.io/master/images/fdt-line-chart-source.jpg)

I will run through the example I put together, after spending a couple of hours going through the PluralSight course.

As part of my daily load from my @furzedowntweets Twitter stream to MongoDB, I have also been storing the total number of followers each day. I know this won't provide any amazing insights, but I thought it would be a good data source to use for a simple graphing example - not requiring any data manipulation within MongoDB.

As I have been learning the [Flask Python web development micro-framework](http://flask.pocoo.org/) recently, I thought I would continue with that platform for this exercise. So I set up a basic Flask app with two application routes:
* Index - returns the default page - this will contain all the graphing functionality
* RawData - this will connect my MongoDB Atlas instance in the cloud, and return the followers by date data in json format
I created a graph.js file which contains all the d3 functionality.

The entry point uses one of the d3 built-in data import functions - in this case we are using json, but it caters for a wide range of different data files. The method below runs when the index.html page loads - calls the /rawdata method, checks for any errors, then passes the json data to the main plotGraph method.

```javascript
var data;
d3.json("/rawdata", function(error, json) {
    if (error) return console.warn(error);
    data = json;
    plotGraph(error, data);
  });
```

You can see the full graph.js module (including definition of plotGraph) [here](https://github.com/JulianJoseph/d3-intro/blob/master/graph.js), but in summary, these are the steps I followed to generate an animated line chart showing total twitter followers over time:

* Initialisation - define height and width of SVG element plus other layout constants
* Data Parameters - get max and min of date range and follower count range
* Add text headings to page
* Define y scale
```javascript
    var yScale = d3.scale
        .linear()
        .domain([min,max + 10])
        .range([h-padding, 10])
        .nice();
```        
* Define x scale
```javascript
    var xScale = d3.scale
        .linear()
        .domain([0, followerData.length-1])
        .range([5, w]);
```        
* Define our graph line
```javascript
    var drawLine = d3.svg.line()
        .x(function(d,i){ return xScale(i);})
        .y(function (d){ return yScale(d.count); })
        .interpolate("monotone");
```
* Add SVG element to the page
```javascript
    var svg = d3.select("body")
        .append("svg")        
        .attr({
            width: w,
            height: h
       });
```
* Define path attributes - ie colour, width etc of the line, and define the transition which animates the line
* Define plot points - we are highlighting the max and min follwer count points with a red circle, and also defining a mouseover event handler for all the plot points which will show the count and date for each point
* Define the plot point labels - we are only showing the counts for the max and min counts, as well as for the earliest and latest dates in the data range

And that's it. It sounds like a lot, and the code looks quite long - but the d3 methods are all pretty intuitive. A lot of the coding is just dynamically rendering CSS elements or attributes based on values from our dataset. In theory, you could make this code a lot more elegant by moving re-usable parts to another javascript module, but otherwise, as my first attempt at a d3 graph, I think it shows the potential of what you can achieve using this library.

If you want to see the full potential of d3, go to [Mike Bostock's Blocks](https://bl.ocks.org/mbostock). Mike was one of the core developers of the d3 library. His website has thousands of examples which you can incorporate easily into your own code.

To deploy my Flask web app, I needed a Linux web server. I always like to take the opportunity to try something new on these projects, and didn't want to just sign up to a new Linux hosting account. This is going to be a tiny website, with very little traffic, so ideally I want a free or near to free as possible hosting solution. Of course, now is the time to try out Amazon Web Services. I already have an account but have never used it. To be honest, whenever I have looked into AWS I have found the sheer range of services available and huge wealth of documentation slightly overwhelming. However, with a bit of persistence and help from a couple of handy online tutorials, I managed to get a free Ubuntu web server up and running on Amazon EC2 in a couple of hours. I deployed by code to the AWS server using WinSCP over SFTP.

I used this excellent tutorial: [Running a Flask app on AWS EC2](https://www.datasciencebytes.com/bytes/2015/02/24/running-a-flask-app-on-aws-ec2/).

And here is a link to the finished graph: [FurzedownTweets Data - Twitter Followers over Time](http://ec2-35-178-126-204.eu-west-2.compute.amazonaws.com/)


The full source code for this example can be found here: https://github.com/JulianJoseph/d3-intro

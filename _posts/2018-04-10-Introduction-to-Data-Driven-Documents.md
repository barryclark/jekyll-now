---
layout: post
title: An Introduction to Data Driven Documents (d3)
categories: blog
comments: true
published: false
date: 2018-04-10 00:00:00 +0000
---

Topics to cover:
- next step from MongoDB/Twitter article
- flexible way to create charts
- target audience is web developers - people who understand javascript/dom etc
- steps to create line chart showing @furzedowntweets users over time
- always a new thing to learn: hosted on amazon ec2 instance
- update ec2 code to show animated chart with highlighted min/max values

This article is a continuation of my earlier post on [how to migrate data from Twitter to MongoDB](https://julianjoseph.github.io/blog/2018/02/15/Retweeter-MongoDB-Integration/). I had been looking at ways of presenting the Twitter data from MongoDB in a graphical format. While searching, I came across the [D3 (Data Driven Documents) JavaScript library](https://d3js.org/).

D3 has been around since about 2011, but, like so many other dev tools, was completely new to me! I started by going through the excellent PluralSight course: [D3.js Data Visualization Fundamentals](https://app.pluralsight.com/library/courses/d3js-data-visualization-fundamentals/table-of-contents). This post is just an overview, so I won't go into too much detail on how to get up and running with D3.

D3 is definitely not a "here's my x series data, here's my series data, plot a line chart" tool. It is quite low level, and requires a fairly good understanding of:
* DOM
* CSS
* JavaScript programming
* HTML

In return for the heavier investment in technical skills required to get up and running, you get incredibly fine-grained control over your visuals - which would be very hard or impossible to do with many other higher leve graphing tools. D3 acts as a thin layer between your data and the DOM, and harnesses the power of [SVG (Scalable Vector Graphics)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) to allow you to create interactive visuals dynamically all within the browser.

I will run through the example I put together, after spending a couple of hours going through the PluralSight course.

As part of my daily load from my @furzedowntweets Twitter stream to MongoDB, I have also been storing the total number of followers each day. I know this won't provide any amazing insights, but I thought it would be a good data source to use for a simple graphing example - not requiring any data manipulation within MongoDB.

As I have been learning the [Flask Python web development micro-framework](http://flask.pocoo.org/) recently, I thought I would continue with that platform for this exercise. So I set up a basic Flask app with two application routes:
* Index - returns the default page - this will contain all the graphing functionality
* RawData - this will connect my MongoDB Atlas instance in the cloud, and return the followers by date data in json format
I created a graph.js file which contains all the d3 functionality.

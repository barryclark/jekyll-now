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
In return for the heavier investment in technical skills required to get up and running, you get incredibly fine-grained control over your visuals - which would be very hard or impossible to do with many other higher leve graphing tools. D3 acts as a thin layer between your data and the DOM, and harnesses the power of SVG to allow you to create interactive visuals dynamically all within the browser.

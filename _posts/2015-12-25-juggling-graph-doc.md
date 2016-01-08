---
title: Generating Fractals with Lindenmayer Systems
title: Building a Siteswap Visualizer in d3.js
layout: post
project: Siteswap Visualizer
projurl: http://jbuckland.com/juggling-graph
---

[<img src="https://github.com/ambuc/juggling-graph/raw/gh-pages/example.png">](/juggling-graph)

##About Siteswaps

*from [Wikipedia](https://en.wikipedia.org/wiki/Siteswap).*

> Siteswap is a juggling notation used to describe or represent juggling patterns. It encodes the number of beats of each throw, which is related to their height, and the hand to which the throw is to be made: "The idea behind siteswap is to keep track of the order that balls are thrown and caught, and _only_ that."[1] It is an invaluable tool in determining which combinations of throws yield valid juggling patterns for a given number of objects, and has led to previously unknown patterns (such as 441). However, it does not describe body movements such as behind-the-back and under-the-leg.

This is a visualization engine for Siteswaps, a notation system used in juggling to represent patterns in space. It accepts input in the form of numbers `0-9`, letters `a-z`, and brackets `[ ]`, which denote multiplexes, i.e. synchronous events. `juggling-graph` draws arrows from each valid throwable position to each valid catch position. Multiplexes throw from their contents, but recieve at their opening bracket.

This project was my first venture into exclusively-compiled web development, utilizing [Coffeescript](http://coffeescript.org) and [Jade](http://jade-lang.com/). Both were a joy to use.

The source can be found [on Github](https://github.com/ambuc/juggling-graph).

See the demo at **[/juggling-graph](/juggling-graph).**

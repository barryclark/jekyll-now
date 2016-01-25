---
title: Using d3.js to Model the NYC Subway Map Independent of Physical Geometry
layout: post

project_title: /subway
proejct_url: http://jbuckland.com/subway

github: http://github.com/ambuc/subway
---

[<img src="/images/subway_thumbnail.png">](/subway)

Here I attempted to render the NYC Subway system as a [force-directed graph](http://en.wikipedia.org/wiki/Force-directed_graph_drawing) in [d3.js](http://d3js.org/). The purpose of a force-directed graph is to

>“…position the nodes of a [graph](http://en.wikipedia.org/wiki/Graph_(mathematics)) in two-dimensional or three-dimensional space so that all the edges are of more or less equal length and there are as few crossing edges as possible, by assigning forces among the set of edges and the set of nodes, based on their relative positions, and then using these forces either to simulate the motion of the edges and nodes or to minimize their energy.” ~ [Wikipedia](http://en.wikipedia.org/wiki/Force-directed_graph_drawing)

The subway data was entered manually, (doing the work by hand took less time and energy than its automation would have) and is rendered live in your browser. The hard part is finding a satisfying set of parameters for a clean display. Still, it’s fun to play around with.

See the demo at **[/subway](/subway/).**

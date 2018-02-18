---
layout: post
title: Creating interactive art with javascript
date: 2017-10-15 15:16
author: dsbrown
comments: true
categories: [Javascript]
---
Following up on my first article, I realized this week that I forgot to add a category. One of the things I really enjoyed about creating dashboards at my first job was working with very low-level javascript frameworks to create visualizations.

There are a lot of cool things you can do with these javascript frameworks. For a quick impression of whats possible, check out some of these examples from some of the ones I checked out:
<ul>
 	<li><a href="http://paperjs.org/examples/">Paper.js</a></li>
 	<li><a href="http://soulwire.github.io/sketch.js/">Sketch.js</a></li>
 	<li><a href="http://processingjs.org/exhibition/">processing.js</a></li>
</ul>

I decided to choose <a href="http://paperjs.org/">paper.js</a> for the kinds of projects I wanted to do, since it has really nice <a href="http://paperjs.org/tutorials/">tutorials</a>, <a href="http://paperjs.org/reference/global/">documentation </a>and lots of <a href="http://paperjs.org/examples/">examples</a>. It also makes use of some nice high-level abstractions to make creating stuff easier.

For my first project I wanted to try out something really simple, to test out how to work with the library, and to have some fun.

<blockquote>Click on the image to pause animation</blockquote>

<script type="text/javascript" src="/js/paper-full.min.js"></script><script type="text/paperscript" src="/js/expanding_circles.js" canvas="myCanvas"></script><canvas id="myCanvas" style="width: 100%;"></canvas>

This is just a few hours of messing around, but there are a lot more projects in the pipeline!

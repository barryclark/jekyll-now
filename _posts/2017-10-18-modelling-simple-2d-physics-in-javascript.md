---
layout: post
title: Modelling simple 2D physics in Javascript
date: 2017-10-18 07:07
author: dsbrown
comments: true
categories: [Javascript]
published: false
---

One of the cool things about javascript is that you can quickly see the results of your code, and even play around with it in an interactive way using your browser.

In this post I want to share how I implemented a (really simple) example of bouncing balls in a box, and the steps it took to implement the physics involved. I hope to eventually learn enough about these systems to create my own physics engine!
>Here we're using the Paper.js javascript framework framework, which can be found <a href="http://paperjs.org/">here</a>

So to start things off with a little teaser, this is the physics example I mentioned earlier. Try clicking and dragging you mouse to fling a ball somewhere. The source code can be found [here]

<script type="text/javascript" src="/js/paper-full.min.js"></script><script type="text/paperscript" src="/js/ball_physics.js" canvas="myCanvas"></script><canvas id="myCanvas" style="width: 100%;"></canvas>

## Newton's laws of motion
Newton's laws of motion are three simple laws which laid the foundation for classical mechanics. He initially published these laws in the Principia Mathematica in 1687. These laws can be stated in these three principles:
* If the sum of all forces on an object is zero, then the velocity of the object is constant
* The net force on an object is equal to the mass times the acceleration

$$ \mathbf{a} = \begin{pmatrix} a_{x} \\ a_{y} \end{pmatrix} $$

$$ \mathbf{F}_{\text{net}} = m \cdot \mathbf{a} $$

Something about finite difference methods, and solving differential equations numerically.

$$ f(x) := \frac{y + 2}{x + 3}$$

---
layout: post
title: 'Iterating On a Digital Sketch with Processing'
author: carol
---

Sometimes, when I'm feeling down, I pick up a pen or a paintbrush and process my feelings with art. Painting has helped me through some pretty dark times, so today I decided to try to paint with code. <a href="http://hello.processing.org/">Processing</a> is a language I've been wanting to experiment with for a while, and I just iterted on my first digital sketch with the language.

I'm trying to remember where I first heard about Processing. I think they had a project on the <a href="https://code.org/learn">Hour of Code</a> site a few years ago. More recently I was looking for examples of art made with code and a lot of the results referenced Processing, and it reminded me that I did some tinkering a while ago but never really followed through to make something cool looking. My goal right now is to make something cool looking with code. Let's see how hard that is.

First I had to <a href="https://processing.org/download/">download</a> the software. The OS X version opened right up after I downloaded it, and suddenly I had a blank canvas to work with. I noticed they have a Python wrapper. I've been writing a lot of Python lately so I decided to stick with my comfort language since I'll be programming with a different objective than usual. I don't want to get hung up on syntax when I'm trying to be creative. Downloading the Python Mode for Processing 3 lets me write Processing sketches in Python. Fun.

I wanted to start pretty simple, so I went with dots. 

```
size(500, 500, P2D)

for x in range(100):
    r = random(99)
    dot = createShape(ELLIPSE, 0, 0, r, r)
    dot.setFill(color(random(255),random(255),random(255)))
    dot.setStroke(color(0))
    shape(dot, random(0,499), random(0,499))
``` 

<div style="text-align:center">
    <img src="https://libbyh.github.io/methods-f16/images/dots-1.png" height="500px" width="500px" display="block"/>
</div>



That doesn't look very good. I think the circles are too small. There probably aren't enough of them. Plus I want them to cover up that ugly gray background. My first try drew 100 dots, so let's see what happens when I try 200 dots (see below: `for x in range(200):`). I also increased the max radius of the dots from 99 to 149 (see below: `r = random(149)`) to increase coverage.

```
for x in range(200):
    r = random(149)
    dot = createShape(ELLIPSE, 0, 0, r, r)
    dot.setFill(color(random(255),random(255),random(255)))
    dot.setStroke(color(0))
    shape(dot, random(0,499), random(0,499))
``` 

<div style="text-align:center">
    <img src="https://libbyh.github.io/methods-f16/images/dots-2.png" height="500px" width="500px" display="block"/>
</div>


Now that I've got the background covered, I need to do something about those colors. I think allowing any color to be randomly generated is having a negative affect on the overall visual appeal. So I play around with the color parameters. 

```
for x in range(200):
    r = random(149)
    dot = createShape(ELLIPSE, 0, 0, r, r)
    dot.setFill(color(random(99,199),random(99,199),random(99,199)))
    dot.setStroke(color(0))
    shape(dot, random(0,499), random(0,499))
``` 

<div style="text-align:center">
    <img src="https://libbyh.github.io/methods-f16/images/dots-3.png" height="500px" width="500px" display="block"/>
</div>

Oooh, that's a lot nicer - way less jarring. Next I want to add a new layer of dots, this time smaller dots in a different color palette. I add another `for` loop below the first one.

```
for x in range(200):
    r = random(49)
    dot = createShape(ELLIPSE, 0, 0, r, r)
    dot.setFill(color(random(49,99),random(149,199),random(149,249)))
    dot.setStroke(color(0))
    shape(dot, random(0,499), random(0,499))
``` 

<div style="text-align:center">
    <img src="https://libbyh.github.io/methods-f16/images/dots-4.png" height="500px" width="500px" display="block"/>
</div>

That looks pretty good, but I don't really like the dark outline around the blue Now we play around with outlines. Processing uses the term `stroke` to refer to outlines, so I can make the outline lighter by increasing the value of the `stroke` color.

```
for x in range(200):
    r = random(49)
    dot = createShape(ELLIPSE, 0, 0, r, r)
    dot.setFill(color(random(49,99),random(149,199),random(149,249)))
    dot.setStroke(color(215))
    shape(dot, random(0,499), random(0,499))
``` 

<div style="text-align:center">
    <img src="https://libbyh.github.io/methods-f16/images/dots-5.png" height="500px" width="500px" display="block"/>
</div>

Time for more dots! This time I made them even smaller. I also adjusted where they would be drawn on my canvas so that they aren't too close to the edges.

```
for x in range(200):
    r = random(19)
    square = createShape(ELLIPSE, 0, 0, r, r)
    square.setFill(color(random(149,199),random(149,199),random(199,249)))
    square.setStroke(color(33))
    shape(square, random(9,499), random(9,499))
``` 

<div style="text-align:center">
    <img src="https://libbyh.github.io/methods-f16/images/dots-6.png" height="500px" width="500px" display="block"/>
</div>

Finally fix the color palette of the first layer of dots. There's too much variety and it looks weird with the new dot layers I've added.

```
for x in range(200):
    r = random(149)
    dot = createShape(ELLIPSE, 0, 0, r, r)
    dot.setFill(color(random(129,179),random(99,149),random(129,189)))
    dot.setStroke(color(0))
    shape(dot, random(0,499), random(0,499))
``` 

<div style="text-align:center">
    <img src="https://libbyh.github.io/methods-f16/images/dots-7.png" height="500px" width="500px" display="block"/>
</div>

There we go. That looks kinda neat. I'm happy with the results of this digital art experiment, and I know I've only scratched the surface of what's possible using these tools.
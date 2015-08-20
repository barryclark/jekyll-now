---
title: Building a Zoomable JSON Visualizer
layout: post
project: Seesaw
projurl: http://jsrmath.github.io/seesaw/
---

<!-- [<img src="/images/lindenmayer_thumbnail.png">](/lindenmayer) -->

**[Seesaw](http://jsrmath.github.io/seesaw/)** is a web-based tool [Julian](http://julianrosenblum.com) and I built for inspecting complex JSON structures, without having to click to expand and collapse folders. You can click a box to zoom to it, or use the arrow keys to navigate around the structure. 

The central conceit of Seesaw is that everything is either a bottom-level key-value pair, or a box containing either key-value pairs or other boxes. Every JSON element is drawn onscreen on load, and each associated div is printed nested inside its parent. Bottom-level key-value pairs are colored consistently, so that a `name` key is, for example, always red. This, coupled with the tendency of arrays to look visually consistent, makes exploring a complex, nested data structure much easier.

The up and down arrows go up and down a level in the object, and the left and right arrows navigate to siblings.

Seesaw uses [Janne Aukia](http://www.simplicitydesign.fi/)'s library [Zoomooz](http://jaukia.github.io/zoomooz/) for a suspiciously smooth zooming experience across browsers. 

The Javascript source can be found [on Github](https://github.com/jsrmath/seesaw).

Use the tool at **[http://jsrmath.github.io/seesaw/](http://jsrmath.github.io/seesaw/).**
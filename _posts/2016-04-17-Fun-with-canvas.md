---
layout: post
title: Fun with canvas
tag: javascript
published: true
---

After my [last post on creating a setup for modern JS development]({% post_url 2016-04-16-Building-a-modern-setup-for-JS-development %}), I thought I'd see how that setup fared. So I set out to build a small canvas experiment on it, and it's been fun.

What is it? Well hopefully you can see it below, it's a tiny thing that builds mostly random levels for a hypothetical platform game:

<style>
  #level-gen-container {overflow: hidden;}
</style>
<div id="level-gen-container" class="content-vert-breathing-room" data-level-gen-sprite="../images/sprites.png"></div>
<script src="../scripts/level-gen.js"></script>

Refreshing the page will result in totally different layout, give it a try!

### How it works
The core idea is to use a fixed set of possible blocks, and [Markov chains](http://setosa.io/blog/2014/07/26/markov-chains/) to decide on what block comes next. Once we have a list of block types, we can map those to sprites and render through a canvas element.

I could have stopped there but I tried to go one step further, and have some form of "section detection", so that I could use different sprites for the left and right edges of a platform.

The code sits on [my GitHub](https://github.com/mikaelgramont/level-generator).

### Conclusion
I'm pretty happy with the setup for development. Working on a brand new code base with decent tools makes it super easy to do [TDD](https://en.wikipedia.org/wiki/Test-driven_development).

My workflow has been the following:

- start running tests in the background through ```npm run tests```
- start writing new specs for objects I've decided I need. Those will start failing immediately.
- write the implementation. Hack until tests go green.

This worked so well that I didn't notice until late that I never set up a command to continuously build my main bundle. Easily solved by replacing ```browserify``` with ```watchify``` in my [npm config](https://github.com/mikaelgramont/level-generator/commit/7d17ee0046aee3af2c461ddffd9867bc977a0e99).
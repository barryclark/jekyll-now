---
layout: post
title: Curious Dangers of Using JavaScript as a Modern Developer
published: false
---

In case you missed it, nowadays JavaScript is pretty much the bees knees. Within the last few years, the utiltiy value of the language has exploded thanks to projects like NodeJS, v8 (which powers Node!), and many others. Nowadays just about anything you want to accomplish with code can be done with JavaScript.

Getting comfortable with the language to begin with is a huge hurdle, not to mention learning all of the different frameworks and engines you'll need to build a given project. JavaScript is hard, but once you've climbed the steep learning curve it can quickly become your favorite language - at least that's how it went for me! However, even JS experts can get tripped up by some of the quirky behaviours of the language. I've written a few posts in the past about some of these quirky behaviours.

In just this last week, I've stumbled across a few *very* peculiar issues that arise - primarily due to the use of precompilation tools (which, incidentally have also become de facto in just the last few years!). As the many usages of JavaScript continues to evolve, we as developers will continue to find and iterate on the best practices for using our tool of choice. Hell, even Douglas Crockford changes his mind on some things occasionally - that's just the way knowledge works!

So without further ado, here are some interesting quirks you might have to account for while using JavaScript.

## Comment Formatting

`//` vs `/**/`

Code Comments. Love 'em or Hate 'em, they're here to stay. Personally, I probably use comments a little too often to describe sections of code that probably make sense themselves. However, I'm also part of the camp that believes you can never have too much documentation, only too little. That said, until Tuesday this week my goto comment format has been the double-slash, or `//`. 

## Non-Terminated IIFEs

;(function(){})()

http://johntantalo.com/blog/dangers-of-anonymous-function-closures/

---
layout: post
title: Multimethods for JavaScript
---

[Originally posted to [Living Code](http://livingcode.org/entries/2015_01_09_multimethods/)]

I've been thinking a lot about generic methods, aka multimethods, aka multiple dispatch. The idea, as I understand it, is that instead of dispatching a method on the type of it's class, to dispatch it on the arguments passed at runtime. I could use this while I'm rewriting [Waterbear](http://waterbearlang.com/), to help simplify both the runtime code for blocks and to avoid having many blocks that only vary on the types of arguments they accept. For instance, I'd like to have an `add` or `sum` block that takes any combination of numbers, arrays, and vectors (and maybe more). Two numbers are added normally. Two arrays would be concatentated. Two vectors would have their components added to produce a new vector. Things get interesting when you mix them up: a number added to a vector would be added to both components (assuming a 2D vector). A number or a vector added to an array would recursively call the `add` multimethod to add the number or vector to each element of the array.

 Reg "Raganwald" Braithwaite has a great write-up, and a fairly advanced implementation of this, in his book [JavaScript Spessore](https://leanpub.com/javascript-spessore/read#leanpub-auto-multiple-dispatch) (which you should go buy right now, it's a great book). And Kris Jordan also has a good [writeup and implementation](http://krisjordan.com/multimethod-js), although I prefer fewer dependencies.

So all that was percolating in the back of my mind, but one trouble I've had is actually getting the types of things in JavaScript to dispatch on. Function signatures aren't typed, and the `typeof` operator is hopelessly broken for this use. So when my kid pointed out the nifty `type` one-liner on [You might not need JQuery](http://youmightnotneedjquery.com/#type), which almost did what I wanted. It handles all the built-in types remarkably well, but I added a couple of lines so it could also handle user-defined types.

With this in hand, I sat down tonight to see if I could write a short and sweet implementation of multimethods. I don't need (right now) full-on predicate dispatch, which can choose functions based on any arbitrary test (like "is this a number greater than 3 but less than 9?"), just being able to dispatch on the types of the arguments would be sufficient for what I need now.

And my simple implementation worked. It's not terribly efficient, but for now it seems to be working well enough for my purposes, and I can add trampolining later if the speed becomes a burden. Here is the implentation and its own test code:

<a class="jsbin-embed" href="http://jsbin.com/xavajexogi/1/embed">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

Aside from the `type` function, the implementation is only 22 fairly straightforward lines of code. I'm sure there are some problems with it, but based on this test I'm going to go ahead and start using it to see what I run up against. You can see in the **jsbin** above how it is used, but let's step through it to be clear.

First you create a new multimethod with `new Method()`. Most of the methods on it are fluent (or chained). To add each function you pass two arguments the `when` method (name based on Kris Jordan's implemention). Also based on his implementation I added a `default` method to call when none of the other methods match. The test above has a problem if you call it with arguments that don't match anything, because the default is to just reverse two arguments. This works fine in this simple example, but would cause an infinite loop for arguments that don't match in either configuration. Once you have everything set up, you can call the `send` method with your arguments, but when we're defining a multimethod like `add` we want to be able to call `add(2,2)` not `add.send(2,2)`, so we end with the `fn()` call which binds `send()` with the full Method object as its `this` and returns us a nice encapsulated function.

I hope that's fairly clear. I was pretty jazzed about it and it solves a problem I was having. If you have a use for it, feel free to use it, and [let me know](https://github.com/waterbearlang/waterbear/issues) if you find problems or make improvements.

--Dethe

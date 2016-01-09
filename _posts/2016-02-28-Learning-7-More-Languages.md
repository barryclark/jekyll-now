---
layout: post
title: Learning 7 More Languages
category: learning
tags: learning, languages, lua, factor, elm, elixir, julia, minikanren, idris
---

This winter I worked through [Seven More Languages in Seven Weeks](https://pragprog.com/book/7lang/seven-more-languages-in-seven-weeks) by Bruce Tate, Fred Daoud, Jack Moffitt, and Ian Dees. As the name implies, this book introduced 7 recent programming languages and gave a quick introduction to each.

I wrote these reactions as I worked through the sections. Now that I've finished the book I've added some final thoughts.

# Lua

I found [Lua](http://www.lua.org/) to be a very approachable scripting language. The metaprogramming abilities were very interesting, though from a learning perspective, figuring out what functions to write in the metatable was a little tricky. This was also my first introduction to coroutines, which I will be interested in reading about further in other languages (a [Scala coroutine library](http://storm-enroute.com/coroutines/) was announced just as I finished this section).

The final exercise for this section did a very nice job of showing how to embed Lua in C++ code, without making this a chapter about C++. The final result (a midi player where the song is scripted in Lua) was fun, engaging and illustrative, and made me want to keep playing with it. Very nice intro.

# Factor

[Factor](http://factorcode.org/) is a concatenative programming language in the style of Forth. I've not worked with Forth or other concatenative programming languages, but I'm aware of stack-based assembly languages including the JVM. Getting used to this style of programming was an interesting challenge, and I could tell I was learning something. The way that stack-orientation and reverse polish notation combine to produce code that looks very imperative and sequential was very interesting. 

Ultimately though, I was a little put off by how much stack manipulation is required to accomplish things. Even the canonical form for doing ```if - else if - else``` requires duplicating elements on the stack, which then get thrown out if the first branch applies, in order to have that element available for the second ```if```. Otherwise there is lots of stack duplicating, swapping, grabbing earlier elements, and dropping elements.

I didn't find the exercises for this section quite as engaging as the Lua section. The exercises did a good job of giving reasons to try out features and research patterns and libraries, and there was a good curve of different difficulties. However, there was not a final project that stepped up from "exercise" to a clear use case.

# Elm

# Elixir

# Julia

# MiniKanren

# Idris

# Final Thoughts

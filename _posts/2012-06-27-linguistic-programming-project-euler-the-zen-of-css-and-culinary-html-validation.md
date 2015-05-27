---
title: Linguistic Programming: Project Euler, The Zen of CSS, and Culinary HTML Validation
link: https://flotsametc.wordpress.com/2012/06/27/linguistic-programming-project-euler-the-zen-of-css-and-culinary-html-validation/
author: jamesbuckland
description: 
post_id: 108
created: 2012/06/27 22:03:30
created_gmt: 2012/06/28 02:03:30
comment_status: open
post_name: linguistic-programming-project-euler-the-zen-of-css-and-culinary-html-validation
status: publish
post_type: post
layout: post
---

# Linguistic Programming: Project Euler, The Zen of CSS, and Culinary HTML Validation

Today was a writing day. Fired up TextMate this morning and knocked off a few non-trivial Project Eulers. Felt really good. They were all of the difficulty where it was, at least initially, totally unclear whether or not I could bring them to completion. And I did. All of them. That felt kickass. [Problem 17](http://projecteuler.net/problem=17) asks 

> If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total. If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used? **NOTE:** Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.

For [my solution](http://pastebin.com/ZXS38sZF) I mapped the numerical alphabet (so to speak) to its linguistic equivalents, allowing for translation back and forth between, say, `145` and `one hundred and forty-five`. There were undoubtedly easier ways to do this (saving the lengths of each word or word fragment in an array, adding the values as called) and harder ways (using a dictionary, for god's sake) but I'm reasonably satisfied with this one, which not only returns a tidy printout of the program's thought process, but also has the ability to return the linguistic equivalent of any number. I could probably have done this in J a billion times shorter, but it would not have been quite as satisfying. For whatever reason, my tendencies as a programmer have always been ostentatious; I like the presentation, the output of a program. Not to sacrifice value in the program itself, but so that any strength programmer can at least understand the program's path, if not its workings. The other thing I did today (which I may be just as proud of) is I finally got around to cracking open HTML/CSS. Working in Coda 2, they're not terribly hard (about as tedious as LaTeX, my first love) but they're very pretty. As much as I like hard documents, there's something magical about forcing (tricking, sometimes!) design into staying consistent across all browsers. I did not stop for lunch until my code was fully validated. That was a good feeling.
---
layout: post
title: Find command - files larger in size
date: '2011-08-15 16:00:00'
---

Folks, short post for today.

Sometimes you are looking for a particular file but you dont know the name or you just want to find the files that are larger than a particular size.
For that matter the find can also help.

**Quick tip for the day:**

	find . -size +200000000c
That will find files bigger than 190mb.
The conversion is in bytes so you should find it and made what you need.

There is more information in this [manual]

[manual]: http://www.grymoire.com/Unix/Find.html
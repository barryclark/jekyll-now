---
#layout: post
title: Grep Markdown Image Links
---

So I wanted to find all links to images in a folder of markdown documents.<!--more-->

A markdown image link is in the format of `![linktext](filename.jpg)`

So from the command line I've used `grep` to output a list of the files with links:

`grep '\!\[' *.md > images.txt`

So the what's happening here is that we're calling `grep` and giving it a regular expression `\!\[` (wrapped in single quotes) to look for (basically the `\` are *escaping* the following characters) so it's looking for `![` in files that match the pattern of `*.md` and then redirects `>` that output into a file called `images.txt`

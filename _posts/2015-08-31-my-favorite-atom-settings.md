---
title: My favorite Atom editor settings
author: kgorman
comments: true
layout: post
categories:
- Developers
- Atom
---

![pic]({{ site.baseurl }}images/atom.png)

For the last six months or so I have been exclusively using Atom as my editor. If you aren't familiar, Atom is the editor created by Github. It's simple, easily hackable, and generally awesome. It also doesn't seem to be as slow as it used to be.

I switched to Atom mainly because I liked the design and hack-ability of the editor, but also the simple Github integration without needing plug-ins. The editor has become the main tool I use every day. Mostly I use it for writing [Github flavored markdown](https://help.github.com/articles/github-flavored-markdown/) and code in Python, Java, SQL, or JS (MongoDB shell).

With my use case in mind, I thought I would share my favorite and fairly modest hacks:

##1. Themes

As one would expect, themes are simple in Atom. I use the One Dark built in theme. The 'One' themes [came out](http://blog.atom.io/2015/02/18/one-themes.html) in February of 2015, and are bundled with the editor itself. I love the capability to change color schemes between the editor itself and the syntax highlighting. But frankly haven't done so myself, it's good right from the box for me.

##2. vim mode

What can I say, I am a vi guy. My fingers perform vi commands without me thinking about it, and I love not having to use the mouse. I use the Atom [vim-mode](https://github.com/atom/vim-mode) and [ex-mode](https://atom.io/packages/ex-mode) plugins. It's a non-perfect implementation for sure, but it's close enough that I stay productive. Also, it keeps my vi skills fresh.

To install vim-mode simply use apm as:

```bash
apm install vim-mode
apm install ex-mode
```

Then restart Atom.

##4. Plug-ins

I use just a couple simple plug-ins, nothing fancy.

- [Linter](https://atom.io/packages/linter) (the base linter)
- [Linter-Pep8](https://atom.io/packages/linter-pep8) (python linting)
- vim-mode (see above)
- [Markdown Preview](https://github.com/atom/markdown-preview) (Preview pane for markdown)

##5. Font

Today I switched to [Hack](https://github.com/chrissimpkins/Hack) for my main editor and syntax font. Time will tell if I stay with it, but so far I realy like that I can drop the size of the font on pt and the text is still very readable. The installation instructions are [here](https://github.com/chrissimpkins/Hack#desktop-usage) and [here](https://atom.io/docs/v0.186.0/customizing-atom).

##6. Keyboard Shortcuts

I use a lot of vi commands via the keyboard, but here are some of the additional shortcuts I use inside Atom:

- &#8984;-f  (find dialogue)
- &#8984;-] and &#8984;-[ (indenting, because python)
- &#8984;-s (save, cause paranoid, even with auto-save plugin on)

Here is a [handy list](http://d2wy8f7a9ursnm.cloudfront.net/atom-editor-cheat-sheet.pdf) of most of them.

## Getting Atom.

You can download Atom [here](https://atom.io/).

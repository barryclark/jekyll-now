---
layout: post
title: Theming is Hard
---

There's a reason for the week gap between introducing my laser project and the first update. 
And no, it's not anything vaguely productive. 
For the longest time, I had been using a (simple) custom theme on my linux partitions.
It was a mixture of [Numix](https://numixproject.org/) and [Base16-default-dark](https://github.com/chriskempson/base16).
I had changed the whites, grays, blacks, and reds to match Numix's colors in the terminal and text editors. 
It was simple, boring, and (due to issues getting a 256 color terminal to display properly) a total pain in the ass to keep looking nice.
Vim really, really didn't like the theme-terminal combination, so I had about 20 lines of custom highlighting in my .vimrc.
That *sucked*. 
Especially if I wanted to adjust anything else.

So.

A while back I switched to an *even more generic*, but simpler to maintain, [Arc](https://github.com/horst3180/arc-theme) and [Solarized](https://github.com/altercation/vim-colors-solarized) theme.
It worked out of the box as xfce's default terminal comes with a solarized colorscheme.
But it's still simple, boring, and not all that great looking.

So I've been spending most/all of my free time recently trying for a new setup. 

XUbuntu 17.10 (what I've been using for a while now):

Positive:
    * Very configurable.
    * Lightweight and fast.
    * Very stable.

Negative:
    * Keyboard shortcuts required hacky solutions.
    * Boring.

I tried Ubuntu 17.10 and its defualt gnome:

Positive:
    * Lots and lots of GTK themes to pick from (Arc, Numix, Adapta, etc).
    * Good keyboard shortcuts.
    * Manages workspaces well.
    * EXTENSIONS.

Negative:
    * Ubuntu's version of dash to panel is *abominable*.
    * The open/close animation for the app menu looks like it runs at 15fps.
    * I don't like how I can't set the transparency of the panel through either ubuntu-panel or dash-to-panel.
    * On the whole not particularly configurable (DPI is a significant problem area).

Having tried the most common DEs, I'm moving on to experimenting with WMs. 
And Arch, because why not.
I have an AntergOS Openbox install waiting on for me at home on a VM, and Manjaro i3 and Arch ISOs waiting to be installed.
So here I go into the deep end of ricing. 
Thanks [unixporn](https://www.reddit.com/r/unixporn).

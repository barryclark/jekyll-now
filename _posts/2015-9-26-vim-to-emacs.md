---
layout: post
title: My Journey From Vim to Emacs
---

Those who know me well know that I'm a big fan of Vim.  I would frequently preach the wonders of modal editing in the hallways, and would attempt to show people the kind of productivity you can achieve if you understand an editor like Vim.  I have on multiple occasions contemplated disabling arrow keys in a few peoples vim configuration. I bought, read, and frequently reference a book on Vim, and I try to find and use Vim modes in almost all the programs I use daily.  Yet, I now type this blog post in Emacs.  What happened?

First, let me give you a bit of background in how I got into Vim.

After witnessing an instance of the all too common holy war that occurs between these two editors on Reddit, StackOverflow, Quora, and other sites that I frequent, I decided to give Emacs a try back around December of 2013.  I was attracted to the claims of increased productivity and customizability that people claimed both of the editors had, and decided on Emacs because I knew some Scheme, which I figured would help in writing Emacs Lisp, and because many of the flaws users had pointed out in Vim seemed to be remedied by Emacs.

I booted up Emacs, and went through the tutorial.  I was instantly turned off by the seemingly nonsensical key chords, and the complete lack of productivity I had with editing text while using it.  I definitely should have given Emacs more of a chance, but I was naive and impatient. I decided that everyone on Vim's side in the holy war must have been right about Emacs, and decided to give Vim a try.

I went through vimtutor, opened up some homework, and starting editing some code.  I stumbled over modal editing, spent far too much time in insert mode, and struggled through editing text.  I did what I probably should have done with Emacs initially, and spent the entire winter break just writing all of my code in Vim.  I learned things like the linux command line, regular expressions, Tmux, and more by trying to dig deeper into Vim's power.  My productivity was always increasing, and I was in love. I continued using Vim for almost 2 years, until about a month or so ago.

What finally made me switch?

My friend Danny has been using Emacs for a while, and had been showing me cool Emacs plugins and features for quite some time. I would always counter with an existing Vim plugin, as both have amazing plugin ecosystems (Thanks Tim Pope).  I liked the features of Emacs I was being shown, and a lot of the plugins were awesome (I'm looking at you, Magit), but I couldn't fathom switching over to Emacs. The keybindings for editing just made no sense to me and I felt my time investment into Vim would be a sunk cost. One day I was bored so I looked up how to install Evil-mode in Emacs.  Evil-mode implements the majority of Vim inside Emacs, and having used many Vim emulators in different programs, I had an idea of what to expect.

Apparently, I was completely wrong.

I was expecting another mediocre Vim emulation, filled with features of the original that I'd wish I had access to.  I consider myself an advanced beginner to intermediate Vim user, and I have literally not found a single feature I used regularly in Vim that is not implemented in Evil-mode.  My text editing productivity hasn't changed at all, but I now have access to all the features and philosophies that attracted me to Emacs in the first place.  I no longer have to use Tmux, or have a plugin to manage my plugins, Emacs does it all for me, and it does it well.  Combine this with Evil-mode, which contains the text editing power of Vim that I fell in love with, and I have zero regrets for having made the switch.  I don't think anything will ever beat Vim for me when logging into an unknown system with no configuration, but on my own machines I will now be running Emacs for development.


If you've been toying with the thought of making the switch, give it a shot.  You never know what you might find.

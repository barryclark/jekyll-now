---
layout: post
title: Change Atom Command Palette Keyboard Shortcut
permalink: /how-to/change-atom-command-palette-keyboard-shortcut
post_id: 1514
categories:
- atom
- How to
- Keyboard
- Shortcut
---

Testing out using [Atom](https://atom.io/) as a text editor on Mac OS. I found that the default keyboard shortcut for the Command Palette of *shift-cmd-p* doesn't work for me. Dang!<!--more-->

So I used *cmd-.* to see what was going on. I could see that when pressing *shift-cmd-p* it wasn't being caught (look at the bottom of the Atom window).

The steps to resolve this were:

*cmd-,* I've gone to**Preferences**  (aka Settings) > **Packages** > scroll to the **command-palette** package > scroll to **Keybindings**  > un-tick **Enable**.

Then open up **Preferences** > **Keybindings** > click on **your keymap file**

This will opened up a file called `keymap.cson`. Then I added to the bottom of this file the following:
<pre>
# remap the command-palette:toggle keyboard shortcut
'.platform-darwin, .platform-darwin .command-palette atom-text-editor':
  'cmd-p': 'command-palette:toggle'
</pre>

This lets me use *cmd-p* as the keyboard shortcut to access the command palette.

Now I can start playing with it :)

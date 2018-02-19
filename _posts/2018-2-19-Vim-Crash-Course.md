---
layout: post
title: Vim Crash Course
---

This is summary of the vim introducation given to my by the lovely Jonathan :blush: Let me make clear from the start, this is not a vim user's guide to vim. This is an oh-crap-some-command-just-dumped-me-into-vim-help! user's guide to vim. There's quite a difference. And if you're wondering, yes, that's happened to me _multiple_ times before.

First things first, your panic button: escape. If in doubt, hit escape until you're sure you're out of whatever mode you've got yourself into, then take a deep breath and start over. Unless otherwise stated, this guide assumes that you're starting from a nice clean new vim window (which, fyi, you might not have if you've been unexpectedly catapulted into it). Or that you've mashed esc until you have one.

Second key point: everything is case sensitive. Upper and lower case versions of commands tend to do _similar_ things, but they are **not** the same. Pay attention to case, or find youself wondering why you're typing at the end of your file instead of the start.

Finally, I suggest playing around with the following commands in a text file you don't care about. It's much easier to understanding how exactly everything behaves by actually _seeing_ it. The command `vim file.txt` will create and open a new file called file.txt in the current (unless one already exists, in which case it will just open it).

---

#### Saving and exiting

**`:w`** writes (saves) any changes you've made.

**`:q`** quits vim, if you have no unsaved changes. If you do have unsaved changes, it will give you nice warning message instead.

**`:q!`** quits vim, discarding any unsaved changes.

Most commands proceeded by a `:` can be chained (although you won't see any more in this guide), so `:wq` is a quick way to save and quit.

#### Adding text

**`i`** gets you into insert mode. This lets you type text like you normally would. Take care though: unless you move your cursor, you'll start typing _before_ the character under you cursor.

**`a`** is for append, and is very similar to `i`. The difference is that while `i` insters before the current character, `a` appends after the current character.

**`I`** starts you inserting at the start of the current line, and **`A`** starts you appending at the end of the current line.

#### Copying and pasting

**`yy`** yanks (copies) the current line. If you hit a number first (e.g `3yy`), you can yank multiple lines starting from the current one.

**`p`** pastes after the current line, and **`P`** pastes before the current line.

**`dd`** deletes (cuts) the current line, and like `yy` can be proceeded by a number to cut multiple.

#### Making mistakes

**`u`** undoes the last action. Gotcha: everything you type between hitting `i` (or `a` etc) and hitting escape counts as one action. If you insert 5 paragraphs, escape and then undo, you will lose them all. Consider at minimum exiting insert mode occassionally (and preferrably saving).

**`^r`** (control + r) to redo the last thing you undid.




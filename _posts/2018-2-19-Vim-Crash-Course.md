---
layout: post
title: Vim Crash Course
---

This is summary of the vim introduction given to my by the lovely Jonathan :blush: Let me make clear from the start, this is not a vim user's guide to vim. This is an oh-crap-some-command-just-dumped-me-into-vim-help! user's guide to vim. There's quite a difference. And if you're wondering, yes, that's happened to me _multiple_ times before.

First things first, your panic button: escape. If in doubt, hit escape until you're sure you're out of whatever mode you've got yourself into, then take a deep breath and start over. Unless otherwise stated, this guide assumes that you're starting from a nice clean new vim window (which, fyi, you might not have if you've been unexpectedly catapulted into it). Or that you've mashed esc until you have one.

Second key point: everything is case sensitive. Upper and lower case versions of commands tend to do _similar_ things, but they are **not** the same. Pay attention to case, or find yourself wondering why you're typing at the end of your file instead of the start.

Finally, I suggest playing around with the following commands in a text file you don't care about. It's much easier to understand how exactly everything behaves by actually _seeing_ it. The command `vim file.txt` will create and open a new file called _file.txt_ in the current directory (unless that file already exists, in which case it will just open it).

---

#### Saving and exiting

**`:w`** writes (saves) any changes you've made.

**`:q`** quits vim, if you have no unsaved changes. If you do have unsaved changes, it will give you nice warning message instead.

**`:q!`** quits vim, discarding any unsaved changes.

Most commands proceeded by a `:` can be chained (although you won't see any more in this guide), so `:wq` is a quick way to save and quit.

#### Adding text

**`i`** gets you into insert mode. This lets you type text like you normally would. Take care though: unless you move your cursor, you'll start typing _before_ the character under you cursor.

**`a`** appends, and is very similar to `i`. The difference is that while `i` inserts before the current character, `a` appends after the current character.

**`I`** starts you inserting at the start of the current line, and **`A`** starts you appending at the end of the current line.

#### Moving around

Your arrow keys should let you move your cursor around the document. If these don't work, try using **`h j k l`** instead (for left, down, up, and right respectively).

**`$`** takes you to the start of the current line, and **`^`** takes you to the end. If you're on a mac, you can alternatively use fn + left / right arrow.

**`gg`** goes to the start of the document. If you precede it with a number (e.g `8gg`) then you will go to that line.

**`G`** goes to the end of the document.

#### Copying and pasting

**`yy`** yanks (copies) the current line. If you hit a number first (e.g `3yy`), you can yank multiple lines starting from the current one.

**`p`** pastes after the current line, and **`P`** pastes before the current line.

**`dd`** cuts (or if it's easier to remember, deletes) the current line, and like `yy` can be proceeded by a number to cut multiple.

#### Making mistakes

**`u`** undoes the last action. Warning: everything you type between hitting `i` (or `a` etc) and hitting escape counts as one action. If you insert 5 paragraphs, escape and then undo, you will lose them all. Consider at minimum exiting insert mode occasionally (and preferably saving).

**`^r`** (control + r) to redo the last thing you undid.

#### Searching text

**`/`** will let you type text for which to search. Press enter to search for what you typed (e.g. `/hello` followed by enter will take you to the first instance of the word _hello_). **`n`** will move you to the next instance.

You can add some regex-style expressions for more sophisticated searching, although vim uses a largely different syntax from the more standard perl-style one. A quick search for _vim regex_ should point you in the right direction.

---

Beyond the above commands, there's some useful settings which might make your life easier (especially if you're editing code). These can be typed in (followed by enter) when you open a document, or added to your `~/.vimrc` so that they run automatically every time you open something in vim.

**`set number`** shows line numbers.

**`syntax enable`** enables syntax highlighting.

**`set showmatch`** will highlight matching brackets.

**`set scrolloff=3`** will keep 3 lines visible above and below your cursor (if possible). Substitute other numbers for more or fewer.

```
set foldenable
set foldlevelstart=99
set foldmethod=indent
```
will let you fold blocks of code (nicely) with **`za`**. This acts as a toggle, so `za` will also unfold.

```
set autoindent
set expandtab
set smarttab
set shiftwidth=2
set tabstop=2
set softtabstop=2
 ```
will give you nicer, auto-indenting tabs.

---

There's a lot deeper you can go into vim, and **lot** more ways to make editing in it more efficient. But the above should be all you need to actually _use_ it at a basic level, and not have to start desperately web-searching if you're ever forced to :stuck_out_tongue_closed_eyes:


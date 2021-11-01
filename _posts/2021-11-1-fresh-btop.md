---
layout: post
title: Move over htop it's time for btop++
---

Hello friendos! Today, in the early hours of the morning,
I decided I'd write a little post.

Over the past few weeks I've been getting
recommendations for this [youtube video](https://www.youtube.com/watch?v=YmzBJmpFMpw).
Disclaimer: I still haven't watched it, nor is it from
a channel I know anything about. With that said though the
video had a thumbnail of `btop` that caught my attention. (Kudos to the
video creator for actually showing the program in the thumbnail.)

If you're wondering what btop looks like in its freshly installed state
then here you are!

![btop](https://raw.githubusercontent.com/TylerSeanRau/tylerseanrau.github.io/master/images/btop.png)

---

## `htop` dislikes

The reason it caught my attention was that, from a quick glance,
it appeared to be a version of `htop` that had changed a
few of the things I really did not like about it.

Those things were,

1. It gave a clearer break down of memory, `htop`'s memory display
   follows some strange color coding that isn't explained anywhere
   that is immediately obvious. I think green means resident, yellow
   means cache. I don't know what blue means and I've also seen red
   without any clue what that means either.

    ![htop memory breakdown](https://raw.githubusercontent.com/TylerSeanRau/tylerseanrau.github.io/master/images/htop-memory.png)

2. `htop` for some reason attempts to include the entire
   command used to invoke each running process. To me, the flags
   used to invoke each command are not useful in this situation.
   If I wanted those flags then I'm probably doing some piping between
   commands rather than looking at a monitoring tool.

    ![htop memory breakdown](https://raw.githubusercontent.com/TylerSeanRau/tylerseanrau.github.io/master/images/htop-commands.png)

3. `htop` doesn't give much indication about cpu usage history.
    I think it is suppose to give some but I believe that's apart
    of the color coding. Which, like memory's color coding, isn't
    explained anywhere obvious.

---

## `btop` likes

In addition to correcting those issues there are a few other
things I like about `btop`

1. `btop` includes network usage in it's freshly installed form.
2. `btop` includes disk usage in its freshly installed form.
   (with a quick hotkey to switch to disk io instead.)

---

## `btop` early pains

One thing I've noticed right away with btop is if you push numeric keys then
you change the display. Additionally if you close `btop` and reopen it then
the display stays in that changed state.  Right away this is annoying to me
because I use `tmux` and if I goof up my prefix key before switching to another
window then I muck up my `btop` display.

---

## Install

With all this in mind, I've decided to leave `htop` behind for now and
give `btop` a try. If you'd like to do the same you can find it here:
[https://github.com/aristocratos/btop](https://github.com/aristocratos/btop).
I installed it using the most recent release package for my system and it
came through without issue. Quickly,

---

I'll note that at the time of writing this `btop` uses the Apache-2.0 License.
Which in my opinion is extremely friendly and means this should be greenlit by
legal teams the world over. :) Disclaimer: this is not legal advise nor does this
imply the opinion of any of my past, present, or future employers or their legal team(s).

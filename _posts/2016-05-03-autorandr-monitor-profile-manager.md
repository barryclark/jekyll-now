---
layout: post
title: ARandR display profile manager on Ubuntu
---

For a while now, I've been looking for a solution to seamlessly switch between having 1 and 2 monitors enabled on my home desktop, running Ubuntu 15.10.

![Cinnamon's display settings panel](/images/display-settings.png){: .alignMiddle}

The basic gist of the situation is this: I have 2 monitors, but often only want to use one for the PC. The other has an xbox connected for mostly media purposes, and the occasional gaming. The secondary monitor is on the left, and the primary on the right.

So, the process for switching between using solely the primary display and using both was a bit cumbersome:

* Open display settings panel
* Enable the secondary display
* Drag the secondary display to the left since by default the display settings panel puts it on the right (every time)
* Apply the settings, then close the settings panel

Four steps may seem insignificant, but if you switch even 2 or 3 times a day (8 steps to switch, then switch back), the time consumed adds up. I partly have [Rands](http://randsinrepose.com/archives/saving-seconds/) (I too have a love-hate relationship with the mouse) to thank for this mindset, though I'm sure he wasn't the first person to discuss it.

## Enter ARandR

ARandR is available from the official sources, and can be installed like this:

    $ sudo apt-get install arandr

This version of arandr is a GUI, so if you're cool with opening a small app to load and manage your profiles, this one has you covered as well. However, as we'll see shortly, it gives us a nice way to swap profiles via the command line as well, which is what I was ultimately after.

## Setting up

As with the original method, we'll be working with two profiles, one for dual monitors, and one for a single monitor. So, open up arandr, configure your monitors and save the layouts. In my case, the layouts were saved in a folder called .screenlayout, and each profile is saved as your name of choice with an .sh extension.

The result is a folder in the home directory with the following structure:

    .screenlayout
      single.sh
      dual.sh

You can probably see already where this is going. To invoke each layout, a simple terminal command is all you need, no sudo required:

    $ ~/.screenlayout/single.sh
    $ ~/.screenlayout/dual.sh

If you want to take this a step further, you can add these scripts as launchers to your panel, and take care of the whole process in a single click. Just add a new launcher, browse to the scripts, and you're off to the races.

Enjoy!

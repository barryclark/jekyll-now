---
layout: post
title: Autorandr display profile manager on Ubuntu
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

## Enter Autorandr

Originally by [wertarbyte](https://github.com/wertarbyte/autorandr) on github, autorandr is described as:

> A tool to automatically select a display configuration based on connected devices

It basically lets you set up your monitors the way you want them, then save that configuration as a profile for later use. Its original intent--I believe--was for people using laptops that docked to monitors throughout the day, but it suits my needs perfectly.

## Installation and usage

When I installed wertarbyte's version, I encountered an x11 error that prevented profiles from being loaded after they were saved. YMMV. Thankfully, phillipberndt has forked the project and resolved that issue, [so I installed his](https://github.com/phillipberndt/autorandr/).

Once you've downloaded the zip, extract it and use make to install it. Open a terminal, navigate to the directory where you have the zip downloaded and issue the following commands:

    $ unzip autorandr-master.zip
    $ cd autorandr-master
    $ sudo make install

After a few seconds, autorandr should be installed and you can start setting up your profiles. For me, I used two profile names which were pretty self-explanatory:

* main
* dual

For each profile you want, use the display settings panel to set things up the way you want them and then use the following command (substituting 'main' for the name you want):

    $ autorandr --save main

And to load a profile:

    $ autorandr -l main

Nice and simple. Quicker than using a GUI, and flexible enough to handle all your display profile needs.

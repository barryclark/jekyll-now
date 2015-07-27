---
layout: post
title: Performance anxiety
---

Testing on Android is always difficult, there are too many devices out there with different specs to know how your game or app is going to perform well on everything. Nubbles was tested on a range of devices before release, and we didn't see any real problems. However, once released into the wild, a few issues came to light. 

Firstly there was some graphical glitching around the circles, they weren't being smoothly rendered. After a bit of investigation, it turns out that libgdx's TexturePacker defaults to a filtering strategy which is great for performance, but not so great for accurate rendering. In the pack.atlas file we had:

filter: Nearest, Nearest

changing this to :

filter: Linear, Linear

seemed to clean up the graphical glitches, so we released an update. 

However, on some low end devices we noticed a significant performance problem. This time we spent a bit more time investigating, and looking at how the filter properties actually work. The explanation at the libgdx blog goes into more detail and explains all the different properties for the filters. I'm not going to replicate it here, so you should go and give it a read.

In the end, after some trial and error, we found using:

filter: MipMapLinearNearest,Nearest

gave us the best compromise between rendering and performance.
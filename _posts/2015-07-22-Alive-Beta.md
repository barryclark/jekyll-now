---
layout: post
title: Alive Beta Released!
---

Today we're pleased to release the [Alive Beta](http://comealive.io). This is our biggest release since our initial alpha launch one and a half months ago. The graduation from alpha to beta is more than just a name change and includes a bunch of new features and bugfixes.

### Overhauled UI
Alive's original UI did a poor job telling you what was going on. We've rebuilt it to explicitly show you what's going on when you're using Alive. We've now made it clear when Alive is working, when it has encountered an error and when execution has succeeded.

<center>
  <video width="526" height="233" autoplay loop>
    <source src="https://zippy.gfycat.com/CheapPiercingBarracuda.webm" type="video/webm">  
  </video>
</center>

### Keyboard Shortcuts

First posted on our [public issue tracker](https://github.com/CodeConnect/AliveFeedback/issues/17) by RaffaelG, this feature has been long overdue. Now you can launch Alive directly from the keyboard by pressing: `Ctr-[, Ctr-[`

### Expanded Project Support

We've been trying hard to support more project types as we try to reach parity with Visual Studio. If Visual Studio can load and run it, we think Alive should be able to as well.

It's taken a lot of work, but we've made progress on ASP .Net 5 projects. The Alive beta now supports **DNX projects that target the full framework**. We're working hard to support .Net Core 5 as well, but it's been difficult with a lot of this stuff being undocumented and in beta. On the bright side, we plan to have support for .Net Core 5 in our v1.0 release.

### Misc Features and Bug Fixes

As usual, we've included a number of bug fixes and miscellaneous improvements.

* You can now invoke static generic methods directly
* You can now pass any parameters to static methods
* Improved method tracking

The Full Release Notes may be found on our [issue tracker](https://github.com/CodeConnect/AliveFeedback/wiki/Changelog-0.5).

If you're interested in using Alive, you can purchase a license from [our website](http://comealive.io).

You can update your copy of Alive from within Visual Studio or from the [Visual Studio Extension Gallery](https://visualstudiogallery.msdn.microsoft.com/4af8eb1a-c64f-4da8-9bf0-6835cf3e95c8).



---
layout: post
title: Manjaro KDE-Next 2015.08 released
---

<img src="https://manjaro.github.io/images/manjaro-kde-next-2015.08.jpg">

With this release we have focused our efforts, bringing you a preview of our upcoming KDE edition featuring Plasma 5.4.

Plasma brings many nice touches for our users such as much improved high DPI support, KRunner auto-completion and many new beautiful icons. It also lays the ground for the future with a tech preview of Wayland session available. We're shipping a few new components such as an Audio Volume Plasma Widget, monitor calibration tool and the User Manager tool comes out beta.

Audio Volume applet works now directly with Pulseaudio, the popular sound server for Linux, to give you full control over volume and output settings in a beautifully designed simple interface. KRunner now remembers your previous searches and automatically completes from the history as you type. The Networks applet is now able to display network traffic graphs. It also supports two new VPN plugins for connecting over SSH or  SSTP.

Calamares, the used installer framework, has received a lot of work. Highlights of the additions:

* Added the option of not installing a boot loader on MBR (legacy BIOS boot) systems.
* Added the option of changing the file system type when editing a partition.
* More robust partition detection and mounting/unmounting
* Swap partition support in automatic partitioning
* Fixed an issue which could result in the wrong mount point being set for a swap partition
* Adjusted the Install page so that the QML slideshow is loaded and started exactly when the install operation starts
* Improved branding mechanism, with distribution branding option on the Welcome page

Changes for Octopi include: At Info tab, packages in 'depends On' field are shown as clickable anchors. Information tab now supports 'ctrl+F' searching. Help/About dialog now shows Pacman information. StatusBar msg got updated with number of selected packages more visible. When outdated packages are printed at Output tab, you can see their information just hovering the mouse over them.

We hope you enjoy this release.

----

## Links

* [Forum post](https://forum.manjaro.org/index.php?topic=25219.0)
* [Download here](https://sourceforge.net/projects/manjarotest/files/2015.08/kde-next/)

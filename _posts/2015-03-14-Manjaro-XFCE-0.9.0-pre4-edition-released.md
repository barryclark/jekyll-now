---
layout: post
title: Manjaro XFCE 0.9.0-pre4 edition released
---

<img src="{{ site.baseurl }}/images/manjaro-xfce-090-pre4.jpg">

After two weeks of development we are proud to present to you another preview of our next stable release, Manjaro 0.9.0. This time we ship XFCE 4.12 tweaked and patched to have the best XFCE experience possible! 

Thunar file manager finally supports tabs and other cool features like inverting the selection, improves on location handling and the shortcuts side pane. On the panel we have now a popup calendar and support for timezones. The settings area has improved display settings with the ability to clone displays via the GUI and other basic monitor management options. Last but not least, the window manager has smart placement optimizations for determining the best area to place a new window where it’s least covered on the screen. It also now supports alinging windows next to each other rather than using random gaps.

We worked also hard to improve our graphical installer Calamares and our system tools to make the installation and usage of Manjaro as easy and smooth as possible. For more information please also take a look at the [changelog](http://sourceforge.net/projects/manjarotest/files/0.9.0/xfce/0.9.0-pre4/manjaro-xfce-0.9.0-pre4-change.log).

## New features and enhancements

* xfce4-power-manager now handles light-locker’s settings in its “Security” tab
* xfce4-panel now has an intelligent hiding mode
* xfwm4 has window previews, better support for CSD and corner-tiling
* the display dialog now has improved support for multiple monitors
* the appearance dialog shows previews of themes’ palettes and icon-themes
* Thunar now has improved keyboard navigation

## Manjaro tools changes

* [util-msg] try more color fixing #65 
* [util-iso-calamares] make desktop file executable
* [buildiso/util-iso] enable logging on -L switch
* [util-iso-image] fix enabling displaymanager service
* [util-iso-image] split displaymanager service code
* [buildiso] #70 more dynamic iso boot entires attempt
* [util-livecd] fix empty locale and keyboard settings with efi
* [util-iso-profile] add a profile lib
* [buildiso] move iso-profile settings away from manjaro-tools
* [sets] update iso buildsets
* [util-iso-image] only setup DM if not set to none
* [util] make syslog-ng default on openrc
* [util-iso-boot] move some code away from util-iso
* [util-iso-image] msg cosmetics
* [util-iso-boot] add isolinux.msg writer and updater
* [util-iso] set environment QT_STYLE_OVERRIDE in image
* [conf] fix SyncFirst

## Calamares changes

* [204] add cleartempmountsjob to partition module
* [207] add debug window function
* prevent crash when going back from EraseDiskPage and then next
* merge transifex translations

## Pamac changes

With this release we stabilized Pamac and made it more unified.
v2.2 mainly contains internal changes not visible to the user.
Changes we want to point out:

* automatic refresh after mirrorslist generation
* code improvements
* possible null string fixed
* updated translations

This release comes with XFCE 4.12 series, linux319 kernel series and all the usual Manjaro and upstream updates. Stable branch was used to create these install medias. Please give us feedback and report any issues with this release.

kind regards
Philip Müller, Manjaro Development Team

----

## Links

* [Download here](http://sourceforge.net/projects/manjarotest/files/0.9.0/xfce/0.9.0-pre4/)
* [Forum post](https://forum.manjaro.org/index.php?topic=21286.0)

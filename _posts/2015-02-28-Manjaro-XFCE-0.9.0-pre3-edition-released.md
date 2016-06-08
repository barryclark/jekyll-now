---
layout: post
title: Manjaro XFCE 0.9.0-pre3 edition released
---

<img src="{{ site.baseurl }}/images/manjaro-xfce-090-pre3.jpg">

Almost one month passed since our last preview of our next stable release, Manjaro 0.9.0. This build ships XFCE most closely to the upcoming 4.12 release. 

Thunar file manager finally supports tabs and other cool features like inverting the selection, improves on location handling and the shortcuts side pane. On the panel we have now a popup calendar and support for timezones. The settings area has improved display settings with the ability to clone displays via the GUI and other basic monitor management options. Last but not least, the window manager has smart placement optimizations for determining the best area to place a new window where it’s least covered on the screen. It also now supports alinging windows next to each other rather than using random gaps.

We worked also hard to improve our graphical installer Calamares and our system tools to make the installation and usage of Manjaro as easy and smooth as possible. For more information please also take a look at the [changelog](http://sourceforge.net/projects/manjarotest/files/0.9.0/xfce/0.9.0-pre3/manjaro-xfce-0.9.0-pre3-change.log).

**New features and enhancements**

 - xfce4-power-manager now handles light-locker’s settings in its “Security” tab
 - xfce4-panel now has an intelligent hiding mode
 - xfwm4 has window previews, better support for CSD and corner-tiling
 - the display dialog now has improved support for multiple monitors
 - the appearance dialog shows previews of themes’ palettes and icon-themes
 - Thunar now has improved keyboard navigation

**Manjaro tools changes**

 - [util-iso] load checksum mode from conf, or default to md5
 - [util-iso] create isomounts on the fly
 - [util-iso] add a possible logger, but commented out
 - [util-livecd] add QT5 override workaround
 - [util-iso/livecd] try a more dynamic approach to determine the DE name
 - [util-iso] update DISTRIB_CODENAME to fix #49 
 - [util-iso-calamares] add user conf writer function using addgroups array
 - [util-iso] copy kbd-model-map to livecd
 - [util-iso-calamares] fix gummiboot config

**Calamares changes**

 - The Quit button is now Cancel, except on the last page.
 - New Finish view module, with restart capability.
 - Better window size constants for netbook displays.
 - [PEP 263] Corrected Encoding Headers 
 - [PEP8] Corrections
 - [bootloader] merge grub and optimize code
 - Allow zone subdivisions in timezones list.
 - Process user-visible strings in TimezoneWidget and LocalePage.
 - [umountall] Module to umount all partitions 
 - Fix execution environment and error reporting in ProcessJob.
 - Python Better Docstrings
 - [displaymanager] Explicitly unset autologin if not checked.

**Pamac changes**

 - fix possible conflict between tray and updater
 - fix showing empty change summaries
 - fix not respecting ignorepkg
 - fix column widths for package lists
 - fix issue with number of downloaded data
 - fix packages list display size
 - fix dbus errors within normal usage
 - fix transaction.to_remove.steal
 - fix hangs on conflicting file check during complete system-upgrade
 - fix transaction cancel
 - fix false update notification
 - fix issue DB locked after reboot
 - prevent from AUR errors
 - make updater to use daemon to get updates
 - improve updater ui
 - improve memory management
 - re-add feature to install missing extramodules if multiple kernels are present
 - do not erase empty lines in pacman.conf
 - some code improvements
 - small improvements on the manager window UI
 - update translations

This release comes with XFCE 4.12 series, linux319 kernel series and all the usual Manjaro and upstream updates. Stable branch was used to create these install medias. Please give us feedback and report any issues with this release.

kind regards
Philip Müller, Manjaro Development Team

----

## Links

* [Download here](http://sourceforge.net/projects/manjarotest/files/0.9.0/xfce/0.9.0-pre3/)
* [Forum post](https://forum.manjaro.org/index.php?topic=20924.0)

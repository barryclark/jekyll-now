---
layout: post
title: Manjaro KDE 0.9.0-pre3 edition released
---

<img src="{{ site.baseurl }}/images/manjaro-kde-090-pre3.jpg">

Almost one month passed since our last preview of our next stable release, Manjaro 0.9.0.

With this new release of Plasma 5 providing a visually updated core desktop experience that is easy to use and familiar to the user. Changes under the hood of KDE include the migration to a new, fully hardware-accelerated graphics stack centered around an OpenGL(ES) scenegraph. Plasma is built using Qt 5 and Frameworks 5. Plasma 5.2.0 introduces a new major version of KDE's workspace offering. The Manjaro Art Team has forked the new KDE Breeze set and named it Menda to follow in line with the rest of our visually appealing desktops, this artwork concept introduces cleaner visuals and improved readability.

We worked also hard to improve our graphical installer Calamares and our system tools to make the installation and usage of Manjaro as easy and smooth as possible.

**New features and enhancements**

- **BlueDevil**: a range of desktop components to manage Bluetooth devices. It'll set up your mouse, keyboard, send & receive files and you can browse for devices.
- **KSSHAskPass**: if you access computers with ssh keys but those keys have passwords this module will give you a graphical UI to enter those passwords.
- **Login theme configuration (SDDM)**: SDDM is now the login manager of choice for Plasma and this new System Settings module allows you to configure the theme.
- **KScreen**: getting its first release for Plasma 5 is the System Settings module to set up multiple monitor support.
- **GTK Application Style**: this new module lets you configure themeing of applications from Gnome.
- **KDecoration**: this new library makes it easier and more reliable to make themes for KWin, Plasma's window manager. It has impressive memory, performance and stability improvements.

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

**Octopi changes**

- Thanks to Michaël Lhomme, it brings a new tool called cachecleaner, a frontend to paccache
- Honor plural forms in translations
- Repoeditor got it’s own translations
- More safety checks in notifier startup
- Octopi now starts only showing installed packages for better performance

This release comes with KDE Plasma 5.2.0 series, linux319 kernel series and all the usual Manjaro and upstream updates. Stable branch was used to create these install medias. Please give us feedback and report any issues with this release.

kind regards
Philip Müller, Manjaro Development Team

----

## Links

* [Download here](http://sourceforge.net/projects/manjarotest/files/0.9.0/kde/0.9.0-pre3/)
* [Forum post](https://forum.manjaro.org/index.php?topic=20938.0)

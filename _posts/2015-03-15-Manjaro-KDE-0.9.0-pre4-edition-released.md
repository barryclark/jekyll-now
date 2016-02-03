---
layout: post
title: Manjaro KDE 0.9.0-pre4 edition released
---

<img src="{{ site.baseurl }}/images/manjaro-kde-090-pre4.jpg">

After two weeks of development we are proud to present to you another preview of our next stable release, Manjaro 0.9.0. This time we ship Plasma 5.2.1 and latest KDE Apps 14.12.3!

With this new release of Plasma 5 providing a visually updated core desktop experience that is easy to use and familiar to the user. Changes under the hood of KDE include the migration to a new, fully hardware-accelerated graphics stack centered around an OpenGL(ES) scenegraph. Plasma is built using Qt 5 and Frameworks 5. Plasma 5.2.1 introduces a new major version of KDE's workspace offering. The Manjaro Art Team has forked the new KDE Breeze set and named it Maia to follow in line with the rest of our visually appealing desktops, this artwork concept introduces cleaner visuals and improved readability.

We worked also hard to improve our graphical installer Calamares and our system tools to make the installation and usage of Manjaro as easy and smooth as possible.

## New features and enhancements

- **BlueDevil**: a range of desktop components to manage Bluetooth devices. It'll set up your mouse, keyboard, send & receive files and you can browse for devices.
- **KSSHAskPass**: if you access computers with ssh keys but those keys have passwords this module will give you a graphical UI to enter those passwords.
- **Login theme configuration (SDDM)**: SDDM is now the login manager of choice for Plasma and this new System Settings module allows you to configure the theme.
- **KScreen**: getting its first release for Plasma 5 is the System Settings module to set up multiple monitor support.
- **GTK Application Style**: this new module lets you configure themeing of applications from Gnome.
- **KDecoration**: this new library makes it easier and more reliable to make themes for KWin, Plasma's window manager. It has impressive memory, performance and stability improvements.

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

## Octopi changes

- Thanks to Michaël Lhomme, it brings a new tool called cachecleaner, a frontend to paccache
- Honor plural forms in translations
- Repoeditor got it’s own translations
- More safety checks in notifier startup
- Octopi now starts only showing installed packages for better performance

This release comes with KDE Plasma 5.2.1 series, linux319 kernel series and all the usual Manjaro and upstream updates. Stable branch was used to create these install medias. Please give us feedback and report any issues with this release.

kind regards
Philip Müller, Manjaro Development Team

----

## Links

**Notice**: This release is not supported by VMWare Player nor VirtualBox. Test it **only** on real hardware!

* [Download here](http://sourceforge.net/projects/manjarotest/files/0.9.0/kde/0.9.0-pre4/)
* [Forum post](https://forum.manjaro.org/index.php?topic=21295.0)

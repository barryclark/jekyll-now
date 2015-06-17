---
layout: post
title: Netrunner Rolling 15.06 (beta3) released
---

<img src="https://manjaro.github.io/images/netrunner-1506.jpg">

Based on Manjaro 0.8.13 [Blue Systems](http://www.blue-systems.com/) is proud to present Netrunner Rolling 15.06 (beta 3) to you.

This time we ship Plasma 5.3.1, KDE Frameworks 5.10.0, latest KDE Apps 15.04.1 and the brand new graphical installer Calamares 1.1-rc2!

##New in KDE

With this new release of Plasma 5 providing a visually updated core desktop experience that is easy to use and familiar to the user. Changes under the hood of KDE include the migration to a new, fully hardware-accelerated graphics stack centered around an OpenGL(ES) scenegraph. Plasma is built using Qt 5 and Frameworks 5. Plasma 5.3 introduces a new major version of KDE's workspace offering. The Netrunner Art Team has worked on their theme to follow in line with the rest of our visually appealing desktops. Most of the known errors within KDE5 are now fixed. Post those, we should still take a look at ...

##Changes in Calamares

The idea of Calamares arose from a desire of several independent Linux distributions to come together and work on a shared system installer. Instead of everyone working on their own implementation and forking forks of forks, why not work together on something that can be used by many?

* An improved boot loader module with GRUB2 and Gummiboot support
* EFI support for partitioning and boot loader
* More robust partition detection and mounting/unmounting
* Swap partition support in automatic partitioning
* An improved Python modules API
* User experience improvements, including all new Welcome and Summary pages
* A greatly improved branding mechanism, with QML and translations support
* An all new diagnostics interface for system integrators
* Fixed issue with Boost.Python built against Python 3 not being found on Debian derivatives in some cases
* Fixed issue which caused Calamares to crash on systems with LVM
* Added support for not setting the root password in the Users module
* Fixed build with GCC 4.8.4
* Replaced Gummiboot with systemd-boot (optional, this is not a hard dependency on systemd)
* Improved job status messages while installing
* Updated translation languages
* Improved documentation

This release comes KDE Plasma 5.3.1, linux318 kernel and all the usual Manjaro and upstream updates. **Stable** branch was used to create these install medias. Please give us feedback and report any issues with this release.

kind regards
James Kittsmiller, Netrunner Development Team

----

##Links

* [Download here](http://arch.netrunner-os.com/ISO/)
* [Forum post](http://forums.netrunner.com/forumdisplay.php?fid=33)

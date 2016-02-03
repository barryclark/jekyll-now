---
layout: post
title: Manjaro Cinnamon 0.8.13 released
---

<img src="https://manjaro.github.io/images/manjaro-cinnamon-0.8.13.jpg">

The Manjaro Community is proud to present to you our Cinnamon 2.6 Edition.

## New features and enhancements

* Cinnamon 2.6
  * Latest cinnamon version
* Desktop freezes
  * On supported hardware Cinnamon now uses a newer “cogl” API. This change is known to prevent some of the causes of desktop freezes I observed in earlier releases.
* logind/consolekit-upower support
  * systemd-logind support also consolekit (possibly openrc).
* Responsiveness, load times and CPU usage
* Multi-monitor and multi-panel support
* Screensaver
  * Xscreensaver as optional depency also installed on iso.
* Panels and applets
  * Panels can now be added/removed/configured individually and moved to different positions across one or multiple monitors.
* Applet improvements
  * With new inhibit applet you can use presentation mode
* Better settings
  * System settings where redesigned
* Nemo improvements
  * Nemo features a brand new plugin manager.
* Accessibility improvements
  * Efforts were made to improve ATK/Orca support in visual Cinnamon components.

## Changes in Thus

We worked also hard to improve our graphical installer Thus and our system tools to make the installation and usage of Manjaro as easy and smooth as possible. With this install medias we now support Manjaro to be installed on MMC/SD-Cards aswell. This will some of you to install our distribution to smaller devices without hard drives. Also this install media fixes the issue we had with RAID0 and ext4.

* Adopt to Cinnamon 2.6.8
* Fix disk size calculation for LVM and luks
* Fix double "us" keyboard layout
* When creating lvm partition with sgdisk, use "all available space".
* Add fstab module from calamares
* Add support for luks in fstab generation
* Fix ssd detection for MMC devices
* Remove uneeded mkdir_p function, remove run()
* Show root StateBox, refractor, move some comments to docstrings
* Fixes for gummiboot and luks
* Clean and "pepify" bootloader.py
* Remove debug output line in chroot.py, clean up a little
* Some cleanup of process.py
* Cleaned advanced partitioning mountpoints check code
* Ignore some devices in partition-module (propers mmc support)
* Simplify creating directories
* Use platform.machine instead of os.uname to get architecture
* Create /etc/X11/xorg.conf.d if necessary before writing the keyboard configuration
* Setting the LANG variable in /etc/environemnt is not needed
* Move console and X11 keyboard configuration closer together
* Services are enabled in buildiso
* Always add "us" as second keyboard language. 
* Change advanced partition requirements depending if using gummiboot or grub2
* vmlinuz, initramfs and fallback is provided now directly with thus.conf
* Don't look for internet connection endless if none is available
* Use google.de for ping
* Adjust ping url in misc
* Smaller efi partition
* Don't unmount root (done on final step)
* More logging when unmounting
* Simplify mounting/unmounting code and try to fix unmounting problems
* Each gummiboot entry has its own file, or will only show the last one
* Fix vmlinuz and initramfs strings for Manjaro kernels.
* Efi partition only exist with efi and grub2
* Fix gummiboot automatic partitioning
* Remove hdparm and keyboardctl bits
* Changes from Antergos/Cnchi@aef279f
* We don't support separate /usr by default
* Refractor chroot.py, unmount dirs in reverse, more debug logging
* Bootloader, install grub efi in a chroot
* Mount special dirs at the start of configure_system functions
* Fix mounting special dirs
* Fix bootloader checking logic
* Slice the efi_path correctly
* Remove --verbose flag when installing grub-install
* Use default value when creating last partition with sgdisk
* Remove useless code
* Call grub-install with verbose option, for debugging
* Pass efi path in automatic mode
* Calculate partition sizes using integer divisions
* Use correct device partition number in automatic partitioning
* Round up swap size in automatic installation
* Fix validation in user_info
* Make sure part sizes are ints
* Mount boot (/boot) before efi (/boot/efi) partition
* Don't mount/unmount within mkinitcpio
* Fix grub-install call
* Add efi partition size when calculating root partition size
* Fix some typos in slides
* Add gtk 3.16 compatibility
* Fix bootloader crash
* More efi fixing
* Fix double-installation attempt of bootloader
* Fix broken creation of /home folder for user
* Fix issue with wrong ssd options in /etc/fstab
* Remove pulseaudio-ctl call
* Fix crash when detecting ssd
* Efi partition is /boot/efi
* Add more translation strings
* Fix forward labeling issue
* Fix slide order in check
* Fix translation issues
* Added new slides by David Linares
* LUKS support in advanced mode (manual partitioning)
* Bootloader installation is now optional in all modes
* PEPified code
* Tweaked UI
* Update translations

## Changes in CLI-Installer
* Adopt syslinux changes
* Adopt initramfs/vmlinuz renaming
* Try to fix pacman configuration
* Add option for x11 keyboard config

This release comes with Cinnamon 2.6, linux318 kernel and all the usual Manjaro and upstream updates. **Stable** branch was used to create these install medias. Please give us feedback and report any issues with this release.

kind regards
Ringo de Kroon, Community Support and IRC Manager

----

## Links

* [Download here](http://sourceforge.net/projects/manjarolinux/files/community/Cinnamon/2015.06/)
* [Forum post](https://forum.manjaro.org/index.php?topic=23666.0)

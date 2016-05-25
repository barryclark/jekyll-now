---
layout: post
title: Manjaro Lxqt "Ice" 16.05 released
---

We are happy to announce a maintenance release of the latest Manjaro-Lxqt Community edition

<img src="https://manjaro.github.io/images/manjaro-lxqt-16.05.jpg">

LXQt is one of the lighter desktops (written in QT5 and based on Openbox) for those who seek speed or have older computers with limited resources, but is still very complete.
Latest Manjaro-Tools (0.11.6) and stable repositories were used to create the ISO files.
The 32 bit version is CD-sized and needs 300 MB for installation with Calamares.

## Main programs

* kernel 4.4.10 LTS, Manjaro settings manager, sddm, plymouth, octopi, compton, plank (64bit)
* pcmanfm-qt, gimp, lximage-qt
* firefox (64bit) | otter-browser (32bit), hexchat, transmission-qt
* abiword, qpdfview, gnumeric (64bit), leafpad
* mpv, smplayer, pulseaudio (64bit) | clementine qt5 (32bit)
* gparted, qisousb, lxtask, xsensors
* ffmpegthumbnailer
* capture tool + key Print Screen configured for taking screenshots (also with Alt or Shift)
* xscreensaver (64bit) | i3lock-shiver (32bit)
* AUR support

This release comes with our advanced graphical installer Calamares as well as our CLI-installer.

## Notes

Great effort has been made to avoid:

* Kde tools
* Qt4
* python2
* mplayer/mplayer2 (replaced by mpv)

In order to achieve that some utilities were specifically developed:

* clementine-lqxt
* smplayer-lxqt

Other tools, themes and icons are available in the **manjaro-lxqt repository** (maintained by the community).

## Links

* [Download](https://sourceforge.net/projects/manjarolinux/files/community/LXQT/2016.05/)
* [Forum Post](https://forum.manjaro.org/t/stable-manjaro-lxqt-ice-16-05-released/1804)

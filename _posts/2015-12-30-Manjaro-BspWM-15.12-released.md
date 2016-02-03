---
layout: post
title: Manjaro BspWM Community Edition 15.12 released
---

<img src="https://manjaro.github.io/images/manjaro-bspwm-15.12.jpg">

We are happy to announce a new addition to our community editions, BspWM edition!

BspWM is a manual tiling window manager based on binary space partitioning that features intuitive mouse and keyboard controls. Compared with our i3 edition, it is more minimalistic and cli oriented, with 64bit edition booting at 105mb ram used (depending on hardware). It uses minimal ram and cpu, to be as light as possible without sacrificing functionality. This edition tries to make command line more accessible for beginners by including good cli tools, sane configurations and well commented setting files.

## Features:

* New 4.4 kernel
* All gtk3 apps, with no gtk2 (gedit, spacefm, midori, gufw)
* Bspwm-manjaro: New git build of bspwm, with some added extra convenience, and possibility of automatically updating your configuration files if bspwm syntax changes in the future
* Improved multihead support
* Two light and functional panels based on lemonbar: limepanel and lemonpanel
* Openbox style desktop menu based on dmenu-manjaro
* Draggable window gaps: left clicking and dragging window gaps allows resizing windows
* Many powerful scripts and dmenu based helpers
* Controls that aim to be
 - usable with either mouse or keyboard
 - accessible to use with one hand
 - familiar from other places (games, other tiling window managers or browsers)

## Terminal related features:

* Urxvt configured in a beginner friendly way 
* Easy switching between terminal colorschemes, featuring base16 colors
* Syntax highlighting in nano
* Bmenu, new cli menu that allows executing most common configuration tasks from command line interactively. From disk partitioning and choosing the kernel to selecting themes and setting screen resolution, bmenu is likely to cover most of your configuration needs.
* Pacli as a package manager. This interactive pacman frontend makes managing packages a breeze
* Ranger, moc and other excellent command line tools
* Zsh as default terminal shell, providing incredible tab completion and other useful features
* Dash as sxhkd shell. This increases performance and ensures that your keybindings work even if you set fish as your default shell
* Beginner friendly configuration for tmux and fish shell, which are not installed but automatically used by the terminal launcher if the user installs them
* Of-my-fish for easy configuration of fish shell

Kind regards, Chrysostomus - Maintainer

----

## Links

* [Talk about this release](https://forum.manjaro.org/index.php?topic=16994.0)
* [Download here](https://sourceforge.net/projects/manjarolinux/files/community/BspWM/2015.12/)

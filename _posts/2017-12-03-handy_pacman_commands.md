---
layout: post
title: Handy Pacman Commands
---

This is a list of Arch **pacman** commands that I have found useful and worth remembering.

| Command | Description     |
| :------------- | :------------- |
| **pacman -Syyu** | Sync all packages (ie -S), Refresh the master package database and force refresh (ie -yy), System upgrade (ie -u) |
| **pacman -S --needed $(< pkglist.txt)** | Send a list of packages to be installed from a text doc |
| **pacman -Qm**       | Restrict or filter output to packages that were not found in the sync database(s). Typically these are packages that were downloaded manually and installed with --upgrade.|
| **pacman -Qqent**       | List all explicitly installed native packages that are not direct or optional dependencies, Remove **-q** if you would like package versions to be displayed as well.      |
| **pacman -Rns $(pacman -Qdtq)**       | Recursively remove orphaned packages and their config files       |
| **pacman --needed** | Only install packages that are needed, can be used with other options as well, Will tell *pacman* not to reinstall packages that are already up-to-date |
| **pacman -Rs** | Remove a package by name |
| **pacman -Scc** | Automatically clean pacman cache |
| **man pacman** | Manual pages for *pacman*|
| **cat /var/log/pacman.log** | View logs |


### Resources

- [Pacman Home Page](https://www.archlinux.org/pacman/)
- [Pacman ArchWiki](https://wiki.archlinux.org/index.php/Pacman/Tips_and_tricks)
- [Pacman Rosetta](https://wiki.archlinux.org/index.php/Pacman/Rosetta) - really awesome resource showing pacman commands and there equivalents in other distros!!!!!

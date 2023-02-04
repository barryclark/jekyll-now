---
layout: post
title: Install Packages from the AUR
---

Some quick and dirty steps to install packages from the Arch User Repo (AUR).

## Manual

1. Unzip the tar file: `tar zxf /path/to/file`
1. Navigate to the directory
1. `makepkg -s` - this will download and install any dependencies.
1. `sudo pacman -U [package.pkg.tar.xz]`

## Alternatively Install Yaourt

### Install Package-query

```
git clone https://aur.archlinux.org/package-query.git
cd package-query
makepkg -si
cd ..
rm -rf package-query
```


### Install Yaourt

```
git clone https://aur.archlinux.org/yaourt.git
cd yaourt
makepkg -si
cd .. 
rm -rf yaourt
```


### Usage

Just use the following command to find the package your are looking for. Then, Select the number(s) next to the package(s)_that you would like to install.

`yaourt [package-name]`


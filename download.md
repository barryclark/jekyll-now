---
layout: page
title: Manjaro Installation Media
permalink: /download/
---


Welcome to the official Manjaro Linux ISO-image page. Here you will find the latest releases for download as ISO images.

 ![XFCE]({{ site.baseurl }}/images/desktop-environment-xfce.png "XFCE edition")
 ![KDE]({{ site.baseurl }}/images/desktop-environment-kde.png "KDE edition")
 ![NET]({{ site.baseurl }}/images/net-edition.png "Net edition")
 ![GNOME]({{ site.baseurl }}/images/desktop-environment-gnome.png "GNOME edition")
 ![LXDE]({{ site.baseurl }}/images/desktop-environment-lxde.png "LXDE edition")
 ![MATE]({{ site.baseurl }}/images/desktop-environment-mate.png "MATE edition")
and more...

<iframe width="640" height="360" src="https://www.youtube.com/embed/H4DKR5TeorQ" frameborder="0" allowfullscreen></iframe>

Both 32 and 64 bit versions of Manjaro are available in the following flavours (i.e. with the following desktop environments pre-installed):


## XFCE

  - [manjaro-xfce 16.06 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc2/xfce/manjaro-xfce-16.06-rc2-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc2/xfce/manjaro-xfce-16.06-rc2-x86_64.iso.sig)
   `SHA1SUM: 8f90d118e58f57ecfe9cb33fb8efa5f30364c53d`
  - [manjaro-xfce 16.06 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc2/xfce/manjaro-xfce-16.06-rc2-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc2/xfce/manjaro-xfce-16.06-rc2-i686.iso.sig)
   `SHA1SUM: 84b9831f360a7dfb02f26d744e82cba3fdee16a2`

## KDE

  - [manjaro-kde 16.06 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc2/kde/manjaro-kde-16.06-rc2-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc2/kde/manjaro-kde-16.06-rc2-x86_64.iso.sig)
   `SHA1SUM: 7b0fd99598d3f858d5c96ae38c09be81c6c0b81c`
  - [manjaro-kde 16.06 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc2/kde/manjaro-kde-16.06-rc2-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc2/kde/manjaro-kde-16.06-rc2-i686.iso.sig)
   `SHA1SUM: faff4aa1d082ef7768394072de960c7fb4468cac`

## Net-Edition

The NET edition of Manjaro provides a base installation without a pre-installed display manager, desktop environment, or any desktop software applications. It allows you to build your own version of Manjaro from the ground up.

 - [manjaro-net 16.06 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc2/netinstall/manjaro-net-16.06-rc2-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc2/netinstall/manjaro-net-16.06-rc2-x86_64.iso.sig)
   `SHA1SUM: 7671c6ffd86a9fce8c513a7b1d437582a946e68f`
 - [manjaro-net 16.06 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc2/netinstall/manjaro-net-16.06-rc2-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc2/netinstall/manjaro-net-16.06-rc2-i686.iso.sig)
   `SHA1SUM: 39ce01c716843984b759f588b35602ee1c05b53a`

### Other flavours

Cinnamon, Enlightenment, Fluxbox, Gnome, i3, LXDE, LXQT, MATE, Netbook, Openbox and PekWM can be installed from our Community Editions released when ready.

Razor-QT and other window-managers are also available for installation from the Official Manjaro repositories.

[Manjaro Stable repository](http://sourceforge.net/projects/manjarolinux/files/) | 
[Manjaro Testing repository](http://sourceforge.net/projects/manjarotest/files/) |
[Sonar repository](https://sourceforge.net/projects/sonargnulinux/files/)

## Download Manjaro using torrents

![Torrents]({{ site.baseurl }}/images/transmission.png "Download torrents")

[Manjaro Torrents Repository](http://sourceforge.net/projects/manjarotorrents/)

## How to verify our install medias

Please read the according chapter (from page 19 onwards) in our [Manjaro Beginners Guide](https://sourceforge.net/projects/manjarolinux/files/release/15.12/manjaro-15.12-documentation.pdf) on how to verify your downloaded install media. Beginning with our upcoming 16.06 release we also provide gpg verifcation. Therefor you need to get the [developer signatures](https://github.com/manjaro/packages-core/raw/master/manjaro-keyring/manjaro.gpg) from Manjaro.

**Example:**

```
wget https://github.com/manjaro/packages-core/raw/master/manjaro-keyring/manjaro.gpg
gpg --import manjaro.gpg
gpg --verify manjaro-xfce-16.06-rc2-x86_64.iso.sig
```

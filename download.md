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

<iframe width="640" height="360" src="https://www.youtube.com/embed/KNSfwgGbrTA" frameborder="0" allowfullscreen></iframe>

Both 32 and 64 bit versions of Manjaro are available in the following flavours (i.e. with the following desktop environments pre-installed):


## XFCE

  - [manjaro-xfce 16.06 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-pre3/xfce/manjaro-xfce-16.06-pre3-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-pre3/xfce/manjaro-xfce-16.06-pre3-x86_64.iso.sig)
   `SHA1SUM: 9b5fd3ad6050712f495abcbac2e8e80aa6192708`
  - [manjaro-xfce 16.06 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-pre3/xfce/manjaro-xfce-16.06-pre3-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-pre3/xfce/manjaro-xfce-16.06-pre3-i686.iso.sig)
   `SHA1SUM: 07512e8d5b84e2ebc5c40c5996fe2452154fad5c`

## KDE

  - [manjaro-kde 16.06 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-pre3/kde/manjaro-kde-16.06-pre3-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-pre3/kde/manjaro-kde-16.06-pre3-x86_64.iso.sig)
   `SHA1SUM: 1ceb4e675bcc25c4278936d65e87a2a03ffe2ee8`
  - [manjaro-kde 16.06 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-pre3/kde/manjaro-kde-16.06-pre3-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-pre3/kde/manjaro-kde-16.06-pre3-i686.iso.sig)
   `SHA1SUM: e70fb231856622145ab7661766ebe108d6d07221`

## Net-Edition

The NET edition of Manjaro provides a base installation without a pre-installed display manager, desktop environment, or any desktop software applications. It allows you to build your own version of Manjaro from the ground up.

 - [manjaro-net 15.12 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/15.12/netinstall/manjaro-net-15.12-x86_64.iso)
   `SHA1SUM: a7560ba40fa0282459b46c9295a574aadd24275a`
 - [manjaro-net 15.12 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/15.12/netinstall/manjaro-net-15.12-i686.iso)
   `SHA1SUM: 91d721f0325e62685a18447f9ebac4e37c32033c`

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
gpg --verify manjaro-xfce-16.06-pre3-x86_64.iso.sig
```

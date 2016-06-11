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

  - [manjaro-xfce 16.06.1 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06.1/xfce/manjaro-xfce-16.06.1-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06.1/xfce/manjaro-xfce-16.06.1-x86_64.iso.sig)
   `SHA1SUM: c4204cb831b32f2a6a72cfe52ef59847e50e0035`
  - [manjaro-xfce 16.06.1 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06.1/xfce/manjaro-xfce-16.06.1-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06.1/xfce/manjaro-xfce-16.06.1-i686.iso.sig)
   `SHA1SUM: 7fa5b3cb3ed9f6d894e31172ef17cdd4331fdcf0`

## KDE

  - [manjaro-kde 16.06.1 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06.1/kde/manjaro-kde-16.06.1-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06.1/kde/manjaro-kde-16.06.1-x86_64.iso.sig)
   `SHA1SUM: b046cf30278052d825d9429588e6b5f04885cdb2`
  - [manjaro-kde 16.06.1 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06.1/kde/manjaro-kde-16.06.1-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06.1/kde/manjaro-kde-16.06.1-i686.iso.sig)
   `SHA1SUM: 79c9faa7a4275b5f5280f751affdc2784021217f`

## Net-Edition

The NET edition of Manjaro provides a base installation without a pre-installed display manager, desktop environment, or any desktop software applications. It allows you to build your own version of Manjaro from the ground up.

 - [manjaro-net 16.06.1 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06.1/netinstall/manjaro-net-16.06.1-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06.1/netinstall/manjaro-net-16.06.1-x86_64.iso.sig)
   `SHA1SUM: e686d5633ba1772d15c0aa60954e9acb57e7bbc4`
 - [manjaro-net 16.06.1 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06.1/netinstall/manjaro-net-16.06.1-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06.1/netinstall/manjaro-net-16.06.1-i686.iso.sig)
   `SHA1SUM: 391ee8a950c4a4525c646a6dfe3f53d1eabad9ae`

### Other flavours

BspWM, Budgie, Cinnamon, Deepin, Enlightenment, Fluxbox, Gnome, i3, JWM, LXDE, LXQT, MATE, Netbook, Openbox and PekWM can be installed from our [Community Editions]({{ site.baseurl }}/download-community/) released when ready.

Other window-managers are also available for installation from the Official Manjaro repositories.

[Manjaro Stable repository](http://sourceforge.net/projects/manjarolinux/files/) | 
[Manjaro Testing repository](http://sourceforge.net/projects/manjarotest/files/) |
[Sonar repository](https://sourceforge.net/projects/sonargnulinux/files/)

## Download Manjaro using torrents

![Torrents]({{ site.baseurl }}/images/transmission.png "Download torrents")

[Manjaro Torrents Repository](http://sourceforge.net/projects/manjarotorrents/)

## How to verify our install medias

Please read the according chapter (from page 19 onwards) in our [Manjaro Beginners Guide](https://sourceforge.net/projects/manjarolinux/files/release/16.06.1/manjaro-16.06.1-documentation.pdf) on how to verify your downloaded install media. Beginning with our 16.06.1 release, we also provide gpg verifcation. Therefore you need to get the [developer signatures](https://github.com/manjaro/packages-core/raw/master/manjaro-keyring/manjaro.gpg) from Manjaro.

**Example:**

```
wget https://github.com/manjaro/packages-core/raw/master/manjaro-keyring/manjaro.gpg
gpg --import manjaro.gpg
gpg --verify manjaro-xfce-16.06.1-x86_64.iso.sig
```

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

  - [manjaro-xfce 16.06 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06/xfce/manjaro-xfce-16.06-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06/xfce/manjaro-xfce-16.06-x86_64.iso.sig)
   `SHA1SUM: d2d93c99a51736afbf62971d07c65f8dfb03e7e7`
  - [manjaro-xfce 16.06 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06/xfce/manjaro-xfce-16.06-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06/xfce/manjaro-xfce-16.06-i686.iso.sig)
   `SHA1SUM: 2a70e08f943d9ecaf8d5bbe078bfa00fc6747595`

## KDE

  - [manjaro-kde 16.06 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06/kde/manjaro-kde-16.06-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06/kde/manjaro-kde-16.06-x86_64.iso.sig)
   `SHA1SUM: 1eeb9327ebca784d91cfb3bfa4f3e90449671354`
  - [manjaro-kde 16.06 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06/kde/manjaro-kde-16.06-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06/kde/manjaro-kde-16.06-i686.iso.sig)
   `SHA1SUM: 8750b1f5d8ea313be729eeb911ebcfc1e05829f0`

## Net-Edition

The NET edition of Manjaro provides a base installation without a pre-installed display manager, desktop environment, or any desktop software applications. It allows you to build your own version of Manjaro from the ground up.

 - [manjaro-net 16.06 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06/netinstall/manjaro-net-16.06-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06/netinstall/manjaro-net-16.06-x86_64.iso.sig)
   `SHA1SUM: 919a452c416b4d8806cff1c5d0701d2407e653e1`
 - [manjaro-net 16.06 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06/netinstall/manjaro-net-16.06-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06/netinstall/manjaro-net-16.06-i686.iso.sig)
   `SHA1SUM: e6a70b745a3290c482131c9cf5b0ec148f0379aa`

### Other flavours

BspWM, Budgie, Cinnamon, Deepin, Enlightenment, Fluxbox, Gnome, i3, JWM, LXDE, LXQT, MATE, Netbook, Openbox and PekWM can be installed from our [Community Editions](http://manjaro.github.io/download-community/) released when ready.

Other window-managers are also available for installation from the Official Manjaro repositories.

[Manjaro Stable repository](http://sourceforge.net/projects/manjarolinux/files/) | 
[Manjaro Testing repository](http://sourceforge.net/projects/manjarotest/files/) |
[Sonar repository](https://sourceforge.net/projects/sonargnulinux/files/)

## Download Manjaro using torrents

![Torrents]({{ site.baseurl }}/images/transmission.png "Download torrents")

[Manjaro Torrents Repository](http://sourceforge.net/projects/manjarotorrents/)

## How to verify our install medias

Please read the according chapter (from page 19 onwards) in our [Manjaro Beginners Guide](https://sourceforge.net/projects/manjarolinux/files/release/16.06/manjaro-16.06-documentation.pdf) on how to verify your downloaded install media. Beginning with our 16.06 release, we also provide gpg verifcation. Therefore you need to get the [developer signatures](https://github.com/manjaro/packages-core/raw/master/manjaro-keyring/manjaro.gpg) from Manjaro.

**Example:**

```
wget https://github.com/manjaro/packages-core/raw/master/manjaro-keyring/manjaro.gpg
gpg --import manjaro.gpg
gpg --verify manjaro-xfce-16.06-x86_64.iso.sig
```

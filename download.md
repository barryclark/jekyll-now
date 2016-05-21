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

  - [manjaro-xfce 16.06 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc1/xfce/manjaro-xfce-16.06-rc1-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc1/xfce/manjaro-xfce-16.06-rc1-x86_64.iso.sig)
   `SHA1SUM: 7b6cba4b1f3b16baba9e6070671f5ccd4d2ef381`
  - [manjaro-xfce 16.06 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc1/xfce/manjaro-xfce-16.06-rc1-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc1/xfce/manjaro-xfce-16.06-rc1-i686.iso.sig)
   `SHA1SUM: 7c832fcce95a46de12d93b110283d691c254ecf4`

## KDE

  - [manjaro-kde 16.06 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc1/kde/manjaro-kde-16.06-rc1-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc1/kde/manjaro-kde-16.06-rc1-x86_64.iso.sig)
   `SHA1SUM: e89d6e6f9cc0433dd916fd3efe34267067719273`
  - [manjaro-kde 16.06 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc1/kde/manjaro-kde-16.06-rc1-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc1/kde/manjaro-kde-16.06-rc1-i686.iso.sig)
   `SHA1SUM: ff849b6fbc0730bf708450387d3740f7396d7db8`

## Net-Edition

The NET edition of Manjaro provides a base installation without a pre-installed display manager, desktop environment, or any desktop software applications. It allows you to build your own version of Manjaro from the ground up.

 - [manjaro-net 16.06 (64 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc1/netinstall/manjaro-net-16.06-rc1-x86_64.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc1/netinstall/manjaro-net-16.06-rc1-x86_64.iso.sig)
   `SHA1SUM: 67da8a4cc1c51f0cc3325f0f00a92c5a6933a02d`
 - [manjaro-net 16.06 (32 bit)](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc1/netinstall/manjaro-net-16.06-rc1-i686.iso) [SIG](http://sourceforge.net/projects/manjarolinux/files/release/16.06-rc1/netinstall/manjaro-net-16.06-rc1-i686.iso.sig)
   `SHA1SUM: 4fd2555d439ac5808f7710f17da1a62afaacb232`

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

Please read the according chapter (from page 19 onwards) in our [Manjaro Beginners Guide](https://sourceforge.net/projects/manjarolinux/files/release/16.06-rc1/manjaro-16.06-rc1-documentation.pdf) on how to verify your downloaded install media. Beginning with our upcoming 16.06 release we also provide gpg verifcation. Therefor you need to get the [developer signatures](https://github.com/manjaro/packages-core/raw/master/manjaro-keyring/manjaro.gpg) from Manjaro.

**Example:**

```
wget https://github.com/manjaro/packages-core/raw/master/manjaro-keyring/manjaro.gpg
gpg --import manjaro.gpg
gpg --verify manjaro-xfce-16.06-rc1-x86_64.iso.sig
```

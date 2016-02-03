---
layout: post
title: Manjaro XFCE 0.9.0-pre2 edition released
---

<img src="{{ site.baseurl }}/images/manjaro-090p1-xfce.jpg">

Another week, another preview of our next stable release 0.9.0. Hopefully we will release Manjaro 0.9.0 by end of February. Next week you can use 0.8.12 as your install media until we have ironed out all issues you may find in this release. This build feels more feature complete and reflects almost the look and feel we will ship with our final release when ready. So what changed?

**Manjaro tools changes**

- simplify displaymanager configuration
- [buildiso] add switch to remove iso before writing iso
- [livecd] fix pulse-audio-ctl call
- [livecd] workaround for issue #36 
- [mkchroot] proper default locales 
- [mkchroot/mkiso] create locale within root-image
- [util-iso] fix aufs mount order
- [util-livecd/livecd] remove unneeded quirks

**Calamares changes**

- [slideshow] add QML slideshow support
- [postcfg] remove unneeded quirks 

**Pamac changes**

- fix false update notification
- fix issue with DB locked after reboot

This release comes with XFCE 4.11 series, linux318 kernel series and all the usual Manjaro and upstream updates. Stable branch was used to create these install medias. Please give us feedback and report any issues with this release.

kind regards

Philip Müller
Manjaro Development Team

----

## Links

* [Download here](http://sourceforge.net/projects/manjarotest/files/0.9.0/xfce/0.9.0-pre2/)
* [Forum post](https://forum.manjaro.org/index.php?topic=19900.0)

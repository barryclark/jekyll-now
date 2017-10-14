---
published: false
title: CLFS Notes Part 2
---
## Cross Linux From Scratch Notes - Part 2

This post is a follow up to my first post documenting some of the issues I encountered while working through the **Cross-Compiled Linux From Scratch - Version 3.0.0-SYSVINIT-x86_64-Multilib Book**. 
For my host OS I used **Slackware 14.2**

I don't believe I mentioned before, but the entire development process took place inside a virtual machine running under **VirtualBox**.

I was eventually able to get **Perl** to compile and continue with this version of the **CLFS** book, although I did spend a couple weeks dabbling with the current development book for **CLFS**, as well as the current release of the **LFS** book.

I worked through this version of the **CLFS** book over the course of two months in my free time. I definitely learned to appreciate package management through my dabbling in dependency hell. Even though repositories have been compiled with all the necessary source code, I sometimes encountered issues where timestamps from the server existed in the future, which resulted in changing command structure for unarchiving. 

The resulting **CLFS** distro from this project was fairly buggy, but the entire purpose of this exercise for me was purely educational. It seems quite clear to me now just why most linux distributions are forks of pre-existing distributions. 

Occasionally, a **make** command would result in a bad compilation, simply re-running the **make** command resulted in a successful compilation. This was rather odd behavior. 

Additionally, the method for compiling **GCC** in this version of the **CLFS** book is explicitly what the **GCC** developers state not to do when compiling **GCC**. 

Furthermore, many of the issues I encountered might have been resolved had I been using a host OS, such as Fedora or Debian due to package-management, although some might consider that cheating. Many of the resources I found in my research to resolve certain issues simply had the resulting answer of _"install the dev package,"_ which simply isn't an option with **Slackware**. 

Moving forward, I would recommend this exercise, despite it feeling masochistic to some, as it is exceptionally educational. If I were to revisit the **LFS** distro, I'd likely dabble with the [**ALFS**](http://www.linuxfromscratch.org/alfs/download.html) project.


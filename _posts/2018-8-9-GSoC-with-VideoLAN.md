---
layout: post
title: GSoC with VideoLAN - VLC macOS Interface Redesign
---

It has been a phenomenal summer. I have blessed to get a chance to work on one of the highest impact open source projects. Let's have a look at my contributions to the mac VLC Interface.

You can have a look at my [GSoC Project Page](https://summerofcode.withgoogle.com/dashboard/project/5721689099337728/overview/) and [Proposal](https://storage.googleapis.com/summerofcode-prod.appspot.com/gsoc/core_project/doc/5893931313659904_1522091486_VLC_GSoC_Proposal_-_Daksh_Shah.pdf?Expires=1533884264&GoogleAccessId=summerofcode-prod%40appspot.gserviceaccount.com&Signature=DRVg%2FJ48gQiEFYj%2B6bgd6jPYuLVVY2GjnHmU67iElkT99cmcwOqiTf5gwiLZ0y60JfqIl4peBPCa76HGtRvxcuq8jjvVSYDc1nYVZQpNsLF14TOZqELqfbndEhAa9OcuxAdi9Jxi0fcy39cpD3EyAcUxJrnS8%2B5pjmJUv1lRwz6UbGKzIRmspisT1N6BFtsKV%2FsmPNqnNMA8HBUk%2Fc9HmjjxSs58tO%2BTnR5y2mA6Tg2lpI0C%2F3tr1WpSz5NeUjXUcpjylaiIZdtvN7Q4eVdfbDncqHVj9Itx%2FprlBY0e2djK49m0HgtCJgNpGpwX2z3t0TkzKQL9LKI%2FTJXK2i5PWA%3D%3D)

## Our Team
* [Jean-Baptiste Kempf](https://code.videolan.org/jbk) (President of VideoLAN) 
* [Felix Paul Kühne](https://code.videolan.org/fkuehne) (Mentor)
* [David Fuhrmann](https://code.videolan.org/dfuhrmann) (Mentor)
* [Vibhoothi](https://code.videolan.org/vibhoothiiaanand) (Student, Amrita University)
* [Daksh Shah](https://code.videolan.org/Daksh) (Me)

Let's start by looking at our workflow. VLC has a [GitHub Repository](https://github.com/videolan/vlc) which is read-only.  We use our [mailing list](https://wiki.videolan.org/Sending_Patches_VLC/) to send Patches. For my GSoC project, my mentors created a clone of upstream at the beginning of our coding period. It helped to keep things organized and eased the process of reviewing. You can find the repository we worked on during the summer at [https://code.videolan.org/GSoC2018/macOS/vlc](https://code.videolan.org/GSoC2018/macOS/vlc)

![_config.yml]({{ site.baseurl }}/images/config.png)


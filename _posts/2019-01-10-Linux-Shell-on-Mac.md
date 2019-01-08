---
layout: post
title: Linux Shell on Mac?
---

I was trying to use GCC in combination with GDB. There were some errors, that are still unresolved. The problem was that GDB was unable to use the output that was created. I tried changing from `clang` to gcc provided by `brew install gcc` but it did not work out.

I did Google for a while and it seemed to be some error with GCC or Mac. I could possibly look deeper into it and try to resolve. But I considered... what if I want to use Linux Shell

* Linux/Ubuntu as a Virtual Machine: Might consume too much space. I have 128 GB Mac and hardly much space left
    * If you do wanna try this out. [Parallels](https://www.parallels.com/blogs/linux-on-mac/) might be a nice option
    * A [random blog](https://www.macworld.co.uk/how-to/mac/how-install-linux-on-mac-3637265/) on instructions for setting up
* Dual Boot: Would need an external hard disk/pendrive of enough size. But seems like a reasonable option. Though the dual booting software on Mac is a little buggy
* Docker! Seems to be the perfect solution. Should not consume much space... When I installed it, the binary was a little heavy and I was asked to make an account too. Further, I had to install 30 MB image for Ubuntu and about 300 MB of GCC + GDB. Seems reasonable. But somehow this totaled up to 7.11 GB. <img align="right" src="{{ site.baseurl }}/images/docker-mac-size.png"/>
    * [Docker Image OF Ubuntu](https://hub.docker.com/_/ubuntu/?tab=reviews)
    * [Run a Docker Image](https://stackoverflow.com/a/18498313/2806163)
    * [Install Packages in Ubuntu - inside Docker](https://stackoverflow.com/a/27273543/2806163)
* Noah! Seems like some sort of magical solution that I found in [this](https://unix.stackexchange.com/a/212761/251573) SO Answer. It is on [GitHub](https://github.com/linux-noah/noah)... trying it out
* If that does not work, I will probably look for some lightweight/barebones Linux OS and install it on a VM perhaps. Something that does not take a lot of space or computing power
* https://stackoverflow.com/a/37779659/2806163
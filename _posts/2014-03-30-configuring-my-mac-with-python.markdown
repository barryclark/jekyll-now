---
layout: post
title: Configuring my Mac with python
date: '2014-03-30 20:49:17'
---

A few days ago, i wanted to restart my mac and reset it installing [Mavericks](http://www.apple.com/osx/) again. Well come to the task that will delete everything, 

After all, the idea is to delete everything that might have become unwated or obsolete. Well this task is by far not so easy, because at the end you have to start again from scratch. Well i have learned a bit and wanted to document for future versions.

#### Steps
1. First before you do anything and start installing anything, install a installer program, it might be [Brew](http://brew.sh/) or [MacPorts](http://www.macports.org/). I prefer brew for the time being/ Although I have tried both, i continue to like Brew. So installint it is as simple as to launch the terminal and executing its command: <pre class="language-bash">ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"</pre>
2. Then I like to update python. <pre class="language-bash">brew install python </pre>
3. This will actually point to the  best version (which at this time is 2.7.5) and configure it correctly
4. And since now I'm doing a few projects with PyCurl and Mechanize i actually intalled them, and since the <pre class="language-bash">brew install python</pre> already installed pip then there is no need to do so and continue normally.

I will have to say that one of the reasons I do this now, is because before I didn't and all the suddent installations like <pre class="language-bash">pycurl</pre> or something else did not work correctly because of missing libraries or inconsistencias. So preferably this is what i do now.

If you want no dependant libraries and pretty much all installed correctly, I suggest you do the same to start with. It doesn't matter if your computer already has python which if its a mac, it already has, its nice to have things separately.

ALso, I would encourage you guys to start learning about <pre class="language-bash">virtualenv</pre> which is something that I'm starting to read and its nice to have it for many environments in the same place and remove inconsistencies.

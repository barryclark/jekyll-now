---
layout: post
title: Windows 8 - Gone?
date: '2012-08-21T15:10:00.003-04:00'
author: Daniel Smith
tags:
- windows 7
- fixboot
- fixmbr
- windows 8
- developer preview
- bootrec
- ubuntu
- chkdsk /f
modified_time: '2012-08-21T15:10:56.394-04:00'
blogger_id: tag:blogger.com,1999:blog-358950712929443967.post-5740563715559517250
blogger_orig_url: http://www.getabetterpic.com/2012/08/windows-8-gone.html
---

I've been running the Windows 8 developer preview on my primary PC for a little over a month now. However, in the last week or so, I have been having a seemingly minor issue that has really started to grate on me. I cannot get Windows to shut down. This sounds weird, and it shouldn't be a problem, but anytime I click on the power icon, then tell it to shutdown, the screen goes black, but the computer is still running. If I click a button, I am immediately back at the login screen.

Why it is doing this, I'm not sure. I also haven't researched the issue since I didn't have the time and just needed to log in this morning to get some work done. So I switched back to Windows 7. Or at least attempted to.

Interesting thing about Windows 8: when it won't shutdown through the normal means (meaning I had to shut it down through the command prompt), it doesn't give you the option to boot into Windows 7. So I proceeded to pop my Windows 7 disc in and run a boot fix from it. That took care of the issue until I couldn't boot all the way into 7. Argh. So back in goes the Windows 7 disc to run a chkdsk /f. After sitting through that for several minutes, I was finally running back in Windows 7. Except now my grub loader is gone, so I'll have to boot into Ubuntu presently to run update-grub to get that back up and running.

Although there were things to like in Windows 8, and the issues I experienced may well be due to it being a preview, I don't know that I will be spending the money to upgrade. Ubuntu has come so far, it covers most of my needs. And when I need to remote in to work, I have Windows 7, which I love. My guess is Windows 8 will be great for touchscreens such as tablets (and I'm excited to try some), but I don't see it replacing the solid desktop approach that 7 takes.

Now to decide if I am going to delete the Windows 8 partition and reclaim that 50GB, or keep it just in case I get a hankering to check it out again?
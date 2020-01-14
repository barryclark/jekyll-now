---
layout: post
title: Find Process to Kill Process
permalink: /how-to/find-process-to-kill-process
post_id: 1436
categories:
- "*nix"
- CommandLine
- How to
- Linux
- Mac
---

Need to find a process so you can kill it?

Find the process first, replace NAMEOFPROCESS with the name or part thereof of the process you're trying to find:

`ps -ax | grep NAMEOFPROCESS`

The first column lists the process id.

Then kill the process, replacing PROCESSID with the actual number of the process:

`kill PROCESSID`

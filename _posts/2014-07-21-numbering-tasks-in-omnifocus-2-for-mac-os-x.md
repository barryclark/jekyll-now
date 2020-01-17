---
layout: post
title: Numbering tasks in OmniFocus 2 for Mac OS X
permalink: /how-to/numbering-tasks-in-omnifocus-2-for-mac-os-x
post_id: 1276
categories:
- GTD
- How to
- KeyboardMaestro
- OmniFocus
- Productivity
- Shell
---

I'm using OmniFocus 2 on my MacBook Pro and wanting to 'number' tasks because at the end of each week, I print a PDF of the tasks completed and outstanding for a particular client. Task numbers make it much easier for the client to reconcile the work I've done with the lists they use.<!--more-->

The problem is that OmniFocus doesn't have a 'task number' function.

Keyboard Maestro and a shell script to the rescue. This allows me to get the next sequential task number. Now all I do is type,,task
and it expands out to the next available task number.

In a nutshell I use the shell script to get a variable from a text file (which is the last task number I used), and increment it. Keyboard Maestro is wrapped around this to both trigger it and make it look pretty.

The shell script itself is quite basic, any improvements you can suggest, please do.

Here is a screenshot of the Keyboard Maestro recipe (edit:
[I've since modified this recipe to be a little faster](/productivity/faster-numbering-of-omnifocus-tasks))

![Keyboard Maestro recipe to increment task number](/images/Screenshot-2014-07-21-10.39.28-600px.png) Get last task number, increment it, save it.

This relies on you having a text file named `last_task_number.txt` in your home folder.

The format of this file is just a single line of text as follows:
```
TaskNumber=0
```

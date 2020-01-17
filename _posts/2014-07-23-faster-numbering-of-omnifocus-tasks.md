---
layout: post
title: Faster Numbering of OmniFocus Tasks
permalink: /productivity/faster-numbering-of-omnifocus-tasks
post_id: 1284
categories:
- GTD
- KeyboardMaestro
- OmniFocus
- Productivity
- Script
- Shell
---

I
[wrote up how I'm numbering tasks in OmniFocus](/how-to/numbering-tasks-in-omnifocus-2-for-mac-os-x), but I've now modified the Keyboard Maestro recipe so it's just a touch faster.

Here's a screenshot:

![Updated, faster recipe for numbering tasks in OmniFocus](/images/Screenshot-2014-07-23-16.56.03-600px.png)

I've also since created a separate recipe in Keyboard Maestro for each key Project I have in OmniFocus, each with it's own .txt file that it refers to. This lets me do `,,taskadmin` and it'll spit out "(Admin #7)" or if I type `,,taskcrm` it'll spit out "(CRM #15)".

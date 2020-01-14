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
[wrote up how I'm numbering tasks in OmniFocus](http://ben.hamilton.id.au/how-to/numbering-tasks-in-omnifocus-2-for-mac-os-x), but I've now modified the Keyboard Maestro recipe so it's just a touch faster.

Here's a screenshot:

[caption id="attachment_1286" align="aligncenter" width="600"]
[![Updated, faster recipe for numbering tasks in OmniFocus](http://ben.hamilton.id.au/cms/wp-content/uploads/2014/07/Screenshot-2014-07-23-16.56.03-600px.png)](http://ben.hamilton.id.au/cms/wp-content/uploads/2014/07/Screenshot-2014-07-23-16.56.03-600px.png) Updated, faster recipe for numbering tasks in OmniFocus[/caption]

I've also since created a separate recipe in Keyboard Maestro for each key Project I have in OmniFocus, each with it's own .txt file that it refers to. This lets me do,,taskadmin
and it'll spit out "(Admin #7)" or if I type

,,taskcrm
it'll spit out "(CRM #15)".

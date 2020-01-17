---
layout: post
title: Getting ifttt to add to RTM
permalink: /productivity/getting-ifttt-to-add-to-rtm
post_id: 782
categories:
- GTD
- ifttt
- Productivity
- RTM
- SageACT
- SugarCRM
---

If that headline made sense to you, then you're in the right place :)

![ifttt recipe for adding a task to Remember The Milk](/images/IFTTT_RTM.png)]

The problem I had is that
[ifttt](http://ifttt.com/) doesn't by default integrate with
[RTM](http://rememberthemilk.com/).

So I've come up with a way that creates a new RTM task for me whenever there is a new item in a particular RSS feed.

We create a ifttt recipe that:

- When there is a new item in the specified RSS feed.
- Will send me an email with a unique subject line.
- Our email program (GMail in my case) has a filter set to look for that unique subject line and then forward that email to our special RTM email address ([see this page for help with the RTM email stuff](https://www.rememberthemilk.com/services/email/#inbox)).

I've used [RTMwithSOMEuniqueLETTERS] as my subject line so that nothing will accidentally happen.

[RTM](https://www.rememberthemilk.com/) (Remember The Milk) and ifttt have a bunch of features that I wish the [Sage ACT!](http://www.act.com/) or [SugarCRM](http://www.sugarcrm.com/) task lists would emulate (or buy), it's this sort of automation that can become very handy.

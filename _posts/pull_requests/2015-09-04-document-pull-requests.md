---
layout: post
title: Have Well Documented Commits
chapter: true
---
<a href='/steps-for-better-pull-request/'>Back</a>

Making decisions about design is really difficult when you're just getting to know  a codebase.  Before we write one line of code, we have to know what's happening in the code right now.  We need to understand why things are written the way they are, and sometimes it requires some spiking before we can figure out the best approach.

Recently, when I started working on this new team, I was overly excited about refactoring pretty much everything I saw. Unaware of the fragilty of our testing environment, I submitted a pull request to turn an instance variable on the controller into a local variable.  Hey -- it was being referenced only within that one controller action and was nowhere in the view either.  All the tests passed, so I didn't think that would break anything.  Little did I know -- that one little change resulted in some strange behavior that took two senior engineers a while to figure out.  Had the use of that instance variable been properly documented, it would've save everyone a lot of time.

When I say 'document', I'm not necessarily referring to 'comments', though in some cases they are necessary.  Every time we open a pull request, it's important to be explicit about what the branch does, what it does it to and why.  Imagine you get abducted by some aliens right after you open a pull request.  Imagine this happens right before you get to assign this pull request to someone, and even worse -- they shut down Pivotal Tracker, so your story is no where to be found!  

Now that you're probably in a cage flying somewhere into space, you're thinking about that last pull request nobody knows about and nobody has the story for.  What exactly would you like other developers to know about this pull request?

Comments like: "fix for #2342373", "new feature", "spiking" say ***ABSOLUTELY NOTHING*** about what you did.

__PLEASE!  WE NEED BETTER DOCUMENTATION!__  Investing some time today will save us some time tomorrow.

The sequence of commits should tell a story.  As a rule of thumb -- separate your commits into small units of work.  That means -- style, logic, fixtures... should all be separate from one another.

What's the Secret Formula?
----

I recently came across a [great format for commit messages](https://git.xogrp.com/discovery/site_search/blob/master/.gitmessage.txt).  I saw it in one of the emails shared by my old team.  If you don't feel like opening the link, here's a copy-paste:

```
Summarize the changes

Explain the changes in more detail, e.g.,

- What did you change and why?
- Is the change complete? Is there anything left todo?
- Are there any unintended consequences?
- Is there any techincal debt?

[References: <STORY_ID>]

[ ] Follows code style guide,
[ ] Commit message is detailed and references a ticket,
[ ] Suppliments documentation,
[ ] Adds to or maintains level of test coverage,
[ ] Peer reviewed (by two developers).
```
There's not much to say about that format.  It's clear and concise and will help us better understand the history of our code.  Please everyone -- if you change something, say something!
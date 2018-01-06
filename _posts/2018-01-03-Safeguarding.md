---
layout: post
title: What is Safeguarding? (A definition)
---

At Tableau we use the term "Safeguarding" to describe a particular way of reducing future defects by learning from past defects. Arlo described it in [a parable](http://arlobelshee.com/improving-testing-is-not-safe-a-parable/). Here's my current concrete understanding:

Safeguard after you address a problem.
===

If production goes down, get production up again. If you find a bug, fix the bug. Then move on to safeguarding.

Safeguard as soon as the fire is out / the bleeding has stopped. Safeguard before returning to other, non-emergency tasks.

Safeguard the genus.
===

If you fix a bug, the software is better for your users, but it is not safer for developers to work in. Even adding a test for the exact defect you're fixing is not good enough; you'll just keep having new defects that you don't have tests for. Look deeper. Learn something about the underlying causes. 

What made it possible to create this problem? What factors led to this happening? Was something confusing to us? Have we created this kind of problem before, and what is the commonality?

Safeguarding is quick and lightweight.
===

Now that you've identified a deep underlying cause for a broad genus of problems, don't fix the whole genus at once. Find one thing you can do to make things a little bit better. If you can reduce the size of the genus by 15%, that's about right.

Look for things that each take about an hour. This makes it easy to justify the cost. You'll capture the value of your efforts quickly. If your idea doesn't pan out, you haven't lost much. If you get interrupted during the 3rd hour, you'll still have two safeguards completed.

For serious problems, Safeguard repeatedly.
====

If production was down for a day, it's worth spending more than an hour of your time to make sure that doesn't happen again. But don't spend a week rewriting a subsystem. Instead do a series of quick and light safeguards. Do as many as is justified by the severity of the problem.

An example would be useful right now.
====

| Idea | Is this safeguarding? |
|------|-----------------------|
| Add a test when fixing a bug. | No. |
| Find a second instance of a bug you're fixing. Merge duplicate code. Add a test. | Yes. |
| Convert integration tests to unit tests. | Yes. |
| Add a story to the backlog to refactor some gnarly code. | No. | 
| Factor 1 responsibility out of some gnarly code. | Yes. |
| Around the code where you're fixing a bug, rename 1 local variable. | Yes. |
| Add a static analysis check for a construct that led to a bug. | Yes. |
| Admonish developers to remember that a VIN / Windows file name / user name is case-insenstive. | No. |
| Create a class with an Equals override for a VIN / Windows file name / user name. | Yes. |
| Create classes with an Equals override for every bare string in your system, all at once. | No. |

Is this the Camp Site Rule?
====

Safeguarding is closely related to the Camp Site Rule, aka the Scouting Rule, "Always leave the campground cleaner than you found it.", but applies to a more specific context (in response to a problem) and is a more constrained action (15% reduction of the genus).

Is this Refactoring?
====

Some safeguarding is refactoring. Some is testing. Some is tooling. 

Safeguarding does not include educating developers not to use a certain code construct. That puts the burden in the wrong place. 

Is this Root Cause Analysis?
====

Safeguarding includes analysis of underlying causes, although the word "root" implies a single cause. Software systems are complex, and casues intertwine. 

I often see attempts at RCA that are too shallow, such as "we've found the line of code that brought the site down." Safeguarding is deeper than that; deep enough to address a genus.

At the same time, Safeguarding can be *less* deep than RCA. It need only go deep enough to reduce the genus by 15%. The next time you have a problem in this area, it will be easier for safeguarding to go a little deeper.

I don't have time for Safeguarding
====
Then you need more Safeguarding.

Sometimes you can take the time to clean up the code you're working in, as you're working in it.

Sometimes you can't afford to delay the work, and make the quick, targeted change. That's when you need Safeguarding. How rushed you feel = how much safeguarding you need.

Remember that Safeguarding comes *after* fixing the problem, so it won't stop you from getting the urgent thing done quickly, but it will reduce the need for urgency in the future.

Thanks
====
Thanks to a bunch of folks at Tableau who did a lot of thinking about Safeguarding, and Steve Meredith and Evan Bailey who reviewed drafts of this article.

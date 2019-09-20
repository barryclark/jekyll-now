---
layout: post
title: Why the code you write today is the legacy code of tomorrow
---

The code that you write today will become the legacy code of tomorrow.
There is no silver bullet that will prevent that.

"But", I hear you say, "we follow agile practices. We do TDD with TCR.  We
have internalised all the best practice coding books written in
the past decade."

# Hang on a second, what's "legacy code"

Michael Feathers in his excellent book "Working Effectively with Legacy Code"
defines it as "code without tests".
That is useful to him, but not even TDD protects you from accidental
addition of an uncovered edge case.

Let's take an example - go away now and write using TDD a method that
takes the average of two positive integers... I'll wait.

Now, the test case that you possibly missed.

[](#spoiler "Get the average of MAXINT-3 and MAXINT-1")

If you caught that test case, then give yourself a round of applause.
Does everyone on your team always catch every example of that in every
possible circumstance?

If you didn't catch it, you've written "legacy" code under that definition.
But the code that you've written is likely very understandable and
unlikely to cause confusion.

Michael Feathers even prefaces his definition with the words "to me".
This suggests that legacy code is more of a heuristic, and what seems
to you to be legacy code may not seem so to me.

Let's try a heuristic that's describes our experience better.
We all sometimes wonder "who wrote this piece of garbage",
then find out it was us!  So in more formal language:

**"Legacy code is that code which requires significant cognitive load to understand."**

This will vary from person
to person, and code that you have interacted with recently will
require less effort to understand.
By this definition, if code generates confusion or misunderstanding in
the reader of that code - then it's "legacy".

# Why is it that legacy code occurs?

There are many reasons why your code will become legacy.
Let's take a look at them.

## Experience accumulates gradually.

Everyone will experience this sometime in their career.  The piece of work that you are doing relates to a system, language, library or
framework with which you are not very familiar;  no problem, you're a good developer and you do TDD and all that good stuff.
Six months on, and you're rather more experienced with the element in use.

The code written on day one did not get refactored in line
with your understanding.  This is because experience doesn't progress in great leaps
where you realise "the better way" and go back to refactor everything; experience is a gradual accumulation.

## This name sounds good

Requirements change, teams pivot, products morph into things that no-one conceived.
Did you go back and change all the names of things to be better?
You didn't have to migrate customers using an API that has a now-poor name?

Naming stuff is hard - but we do it all the time: functions, classes, variables, repositories, API endpoints.
Sometimes the name is good and it can remain unchanged relevant for the lifetime of the project.
Other times we will be the victim of change.

## Anyone ever left your team, or someone new joined it?

Unless you work solo all the time, then there's a team of people working on the code.

If someone leaves they take some knowledge with them. That knowledge is essential to the understanding of a piece of the system.  Any change there
would stray from that original intent and will lead a later developer to be confused.  This can also happen without anyone leaving, if the 
original developer doesn't review every commit...

Or worse, one of the team passes over to the "other side" (Google obviously),
leaving an empty desk behind with no chance for a handover.

Someone new coming in will bring fresh ideas, that's cool, right?  Do you immediately refactor everything to take into account these new
ideas that the team likes?

Of course, you never hire assholes who write a whole bunch of odd stuff, merge it without review, then move on to
the next poor victim to repeat the process.  That never happens.

In order to combat this, either no-one ever leaves and the team
never expands, or you somehow
develop a hive mind.   Then you don't need to have everyone review every
commit and have personal experience of every line of code written.

## Production is down and you need to fix forward.

Through no fault of the code itself, production is down.  There can
be many reasons for this;  a security patch has been applied, or a
CDN has changed the headers it is supplying, or some data has been
imported that doesn't fit assumptions made at design time.

Since it's not a code fault, rolling back won't help.  So the team
dealing with the problem need to fix forward.

They put into place enough code to fix the problem. I bet it's
out of hours.  So they roll it out, sigh in relief and go back to bed.

Now there's a patch in the code that is not on the priority list to
become a well defined feature - but that's ok, the hive mind
knows all!

## VIP wants a specific feature.

A high profile customer, a member of the board or other VIP with clout,
wants a new feature that is very specific to them and doesn't fit well
with the rest of the product.   Argue as you might, the CEO puts their foot
down; you will implement the feature.

So it gets implemented, and the team does the best it can to make it
fit with the rest of the code.  This is always going to be a bit of
snowflake code.  Without a hive mind with perfect knowledge of the code,
this is going to result in future confusion.

## Conflicting requirements.

So there is no special feature, phew.  Let's see what requirements
the stakeholders have.  What a surprise, we have some conflicting
requirements; we build software for humans who have different agendas.

For example; it's security telling us that we have to "fail-secure" and the
safety engineer telling us that it has to "fail-safe".  That's a direct
conflict, fine;  the product owner can make the call, right?

More likely; it's a subtle conflict and the PO will make a
compromise.  Congratulations, you've encoded a compromise; it's
brittle, and any edit to that code will need to be in the context
of the compromise.

## Microservices rot.

So you've followed the modern advice of steering away from monoliths and
split the system up into a series of replaceable microservices.

A year on, what do those microservices look like?

Some were replaced with better alternatives - that was
the whole point.

Some have grown organically and might have exceeded their original design.
That may or may not be a problem.

The rest have never changed since they
were first written - paradigms and models have moved on around
them, but they soldier on with their original code.

An engineer examining this old service with the mental models of
the rest of the system is going to have moments of confusion to
understand why the service doesn't handle common cases that exist
in the new world.  For example; imagine every image now has some metadata
field, but the image resizing service doesn't have code to ensure
that it remains unchanged, that works "by acccident".
This is what I mean by rot, stagnation might be
a better word but it's not as good a subtitle.

# Okay, what do we do about it?

If you're still with me, you'll agree that teams are
never an unchanging pantheon of godlike coders with a hive mind.  So what
do we do about it?

You may already have been through the first stages whilst reading this
post:  Denial, Anger, Bargaining, Depression and Acceptance.

Now that you've grieved your loss of innocence - you can
approach your coding with a fresh viewpoint.

* Write code in the certain knowledge that whoever next opens the file may be completely lacking context
  * name your methods and variables as helpful as possible
  * add comments that acknowledge the compromises embedded herein
* Test behaviour, not implementation.  This is a hard task, but leads to tests that describe the behaviour, making it easier to understand.
* A collection of small pieces.  Microservices is the ultimate progression of this approach, but not the only one.
  * Think unix command line tools, lots of small things that together with pipes can achieve very powerful results.
* Design with replacement in mind - if you design something to be easy to replace then it may be simpler to understand.
  * Actually replace those things, or at least review them to reduce rot.

Remember to show kindness to those who come after you - it could be you.

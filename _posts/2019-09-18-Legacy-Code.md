---
layout: post
title: Today's Code, Tomorrow's Legacy
---

The code that you write today will become the legacy code of tomorrow,
and there is no silver bullet that will prevent that.

"But", I hear you say, "we follow agile practices, do TDD with TCR, and
have complete internalised all the best practice coding books written in
the past decade."

So, lets examine some scenarios that I'm sure will sound familiar,
in order to support my assertion.

# Hang on a second, what's "legacy code"

Michael Feathers in his excellent book "Working Effectively with Legacy Code"
defines it as code that isn't covered by tests.
But that's not greatly useful, not even TDD protects you from accidental
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

Let's try a definition that's maybe more useful.

**"Legacy code is that code which requires significant cognitive load to understand."**

This will vary from person
to person, and code that you have interacted with recently will
require less effort to understand.
By this definition, if code generates confusion or misunderstanding in
the reader of that code - then it's almost certainly "legacy".

So on to the scenarios...

# Experience accumulates gradually.

Everyone will experience this sometime in their career.  The piece of work that you are doing relates to a system, language, library or
framework with which you are not very familiar;  no problem, you're a good developer and you do TDD and all that good stuff.
Six months on, and you're rather more experienced with the element in use.  Great, you've increased your experience.

The code you wrote back on day one might have been refactored
away or improved in line with your understanding, but the chances are that it hasn't because experience doesn't always progress in great leaps
where you realise "the better way" and go back to refactor everything; experience is a gradual accumulation.

This is part of the reason why we all sometimes wonder "who wrote this piece of garbage", then find out it was us!

# This name sounds good

Naming stuff is hard - but we do it all the time: functions, classes, variables, repositories, api endpoints.
Sometimes we will luck out and create a name that is ideal and will remain relevant for the lifetime of the project.

But requirements change, teams pivot, products morph into things that no-one originally conceived.  Were you lucky enough to be able to
go back and change all the names of things to be better?  So no-one was using that API with the now-poor name?

# You work in a team, right?

Okay, I get it, you're perfect.  You write good code, the best code, it's bigly.  It could never become legacy code.

You work in a team though, right?  Is it a pantheon of god-like developers?

No?  Well perhaps you personally review every commit?

No?  Oh.

# Anyone ever left your team, or someone new joined it?

So your pantheon of gods never has anyone leave, adds anyone new, or has the sad day when one passes over to the "other-side" (Google, obvs)

If someone leaves, they take some knowledge with them that may be essential to way that a piece of the system is implemented - any change there
would stray from that original intent and might lead a later developer to be confused.  This can also happen without anyone leaving, if the 
original developer doesn't review every commit...

Someone new coming in will bring fresh ideas, that's cool, right?  Do you immediately refactor everything to take into account these new
ideas that the team likes?

Of course, you never hire assholes who write a whole bunch of odd stuff, merge it without review, then move on to
the next poor victim to repeat the process.  That never happens.

Fortunately none of these things are an issue for your frozen pantheon
of gods, because you also have a hive mind.

# Production is broken and you need to fix forward.

Through no fault of the code itself, production is broken.  There can
be many reasons for this that we don't need to go into now.

Since it's not a code fault, rolling back won't help.  So the team
dealing with the problem need to fix forward.

They put into place just enough to fix the problem, given it's probably
out of hours, roll it out and sigh in relief.

Now there's a patch in the code that may or may not be prioritised to
be expanded to a clearly defined feature - but that's ok, the hive mind
knows all!

# VIP wants a specific feature.

A high profile customer, perhaps even a member of the board, wants a
new feature that is very specific to them and doesn't fit well with
the rest of the product.   Argue as you might, the CEO puts their foot
down; the feature must be implemented.

So it gets implemented, and the team does the best it can to make it
fit with the rest of the code.  This is always going to be a bit of
snowflake code, fortunately the hive mind can always maintain the
context of the snowflakes in the system.

# Conflicting requirements.

So maybe there is no special feature, phew.  Let's see what requirements
the stakeholders have.  What a surprise, we have some conflicting
requirements.

Maybe it's security telling us that we have to "fail-secure" and the
safety engineer telling us that it has to "fail-safe".  That's a direct
conflict, fine;  the product owner can make the call, right?

It's probably more subtle than a direct conflict and the PO will make a
compromise.  Congratulations, you've encoded a compromise; it's probably
brittle, and any edit to that code will need to be in the context
of the compromise.  Thankfully the hive mind takes care of that.

# Microservices rot.

So you've followed the modern advice of steering away from monoliths and
split the system up into a series of easily replaceable microservices.

Great!

A year on, what do those microservices look like?

Some have been replaced with better alternatives, brilliant - that was
the whole point.

Some have grown organically and might have exceeded their original design.
That may or may not be a problem.

It is also likely that some of them have never been touched since they
were originally written - paradigms and models have moved on around
them, but they soldier on with their original code.

An engineer examining this old service with the mental models of
the rest of the system is going to have moments of confusion to
understand why the service doesn't handle common cases that exist
in the new world.  This is what I mean by rot, stagnation might be
a better word but it's not as good a subtitle.

But I forgot, you've got a pantheon of godlike coders who would never
let this happen.

# Okay, what do we do about it?

Hopefully if you're still with me, you'll agree that teams are almost
never a frozen pantheon of godlike coders with a hive mind.  So what
do we do about it?

You may already have been through the first stages whilst reading this
post:  Denial, Anger, Bargaining, Depression and Acceptance.

Now that you've properly grieved your loss of innocence - you can
approach your coding with a fresh viewpoint.

* Write code in the certain knowledge that whoever next opens the file may be completely lacking context
  * name your methods and variables as helpfully as possible
  * add comments that acknowledge the compromises embedded herein
* Test behaviour, not implementation.  This is a hard task, but leads to tests that describe the behaviour, making it easier to understand.
* A collection of small pieces.  Microservices is the ultimate progression of this approach, but not the only one.
  * Think unix command line tools, lots of small things that together with pipes can achieve very powerful results.
* Design with replacement in mind - if you design something to be easy to be replaced then it may be simpler to understand.
  * Actually replace those things, or at least review them to reduce rot.

Overall, show kindness to those who come after you - it could be you.

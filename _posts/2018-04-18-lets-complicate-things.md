---
layout: post
title: Let's Complicate Things
tags: [math]
keywords: [math problem, math word problem, orchestra, beethoven, beethoven's 9th]
image: /images/trick-math-question.jpg
---

An old "ridiculous" math problem about how long it takes an orchestra to play Beethoven's 9th that went [somewhat viral on Twitter](https://twitter.com/dmataconis/status/917496578285490178) and elsewhere a year or so ago made me think about less-obvious problems in math word problems.

First, let's look at that problem so we can see the issue with it:

> An orchestra of 120 players takes 40 minutes to play Beethoven's 9th. How long would it take for 60 players to play the symphony?
>
> Let P be the number of players and T be the time playing.

The tweet:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">That&#39;s not how this works. That&#39;s not how any of this works. <a href="https://t.co/EdSSJInqEp">pic.twitter.com/EdSSJInqEp</a></p>&mdash; Doug Mataconis (@dmataconis) <a href="https://twitter.com/dmataconis/status/917496578285490178?ref_src=twsrc%5Etfw">October 9, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Despite the obvious that adding or removing players to a symphony won't make the players finish the symphony any faster or slower, [Beethoven's 9th is an hour-or-more-long symphony](http://www.funtrivia.com/askft/Question102908.html).

Apparently, this was intentional on the teacher's part: it was meant to show that the math concepts they were learning wouldn't apply to everything. The worksheet explicitly said, "Beware there is one trick question!"

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">I wrote this!! How did you get this??? I am a maths teacher in Nottingham UK. Wrote this 10 years ago. Here is the original whole worksheet <a href="https://t.co/jYX55GSBKz">pic.twitter.com/jYX55GSBKz</a></p>&mdash; Claire Longmoor #FBPE (@LongmoorClaire) <a href="https://twitter.com/LongmoorClaire/status/918014499071897600?ref_src=twsrc%5Etfw">October 11, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

This is actually good on the teacher's part: it's teaching the students to think beyond the question to see if it makes sense.

So all this made me think of a style of math word problems we used to do back in grade school. These problems asked how much quicker two or more people working together would complete a task than each individual would on their own. For example, take the following problem:

> John takes 29 minutes to mow a lawn. Tim takes 19 minutes. How long does it take them to mow 11 lawns?

The problem with this question is that it assumes that John and Tim will work, at least sometimes, on the same lawns and the same time. It assumes that they neither slow each other down nor get in the way of one another.

Perhaps that is the case with mowing lawns - after all, you can have more than one person mow a lawn - but other jobs might not have that same feature.

We'll get to adding the assumption that they won't work on the same lawn at the same time later. For now, let's solve the problem as-is. Here's how I would solve it, although there may be other ways:

    J = 1 lawn / 29 minutes
    T = 1 lawn / 19 minutes
    Combine their rates: J + T = 1/29 + 1/19 = 48 lawns / 551 minutes
    Multiply by lawns: 11 lawns * 551 minutes / 48 lawns = 126.27 minutes
         or 2 hours, 6 minutes, and 16 seconds

One thing I like to do when solving problems is to check if they are intuitive. For this math word problem, John and Tim should mow 11 lawns faster together than either one alone. In particular, faster than the fastest mower, which is Tim:

    T = 1/19 * 11 = 209 minutes
    126.27 minutes is faster than 209 minutes

Intuition checks out.

Now, let's try the problem with the beforementioned assumption:

> John takes 29 minutes to mow a lawn. Tim takes 19 minutes. How long does it take them to mow 11 lawns? Assume they never work on the same lawn at the same time.

For this problem, I constructed a table:

minutes | lawns Tim mowed | lawns John mowed | total lawns mowed
--- | --- | --- | ---
0 | 0 | 0 | 0
19 | 1 | 0 | 1
38 | 2 | 1 | 3
57 | 3 | 1 | 4
76 | 4 | 2 | 6
95 | 5 | 3 | 8
114 | 6 | 3 | 9
133 | 7 | 4 | 11

The final row shows the answer to our newly-formed question: 133 minutes. It also satisfies our intuition check of being less than 209 minutes.

> Fun Excel tip: each row, beyond the zero-base-case row, is calculated from the following Excel formulas:
>
> minutes | lawns Tim mowed | lawns John mowed | total lawns mowed
> --- | --- | --- | ---
> 0 | 0 | 0 | 0
> =A1+19 | =A2/19 | =ROUNDDOWN(A2/29,0) | =C2+B2

## The Point?

The point is, other than I just enjoy math and thinking maybe a bit too much, is that *any* math problem takes some assumptions. Physics problems, which are essentially real-world math problems, are famous for this with frictionless planes and spherical cows.

Oh, and before I go, one last math problem:

> John takes 29 minutes to mow a lawn. Tim takes 19 minutes. How many lawns can they mow in an 8-hour workday?

    J = 29 minutes / lawn
    T = 19 minutes / lawn
    8 hours * 60 minutes / hour = 480 minutes

    480 / 29 = 16.55 lawns
    480 / 19 = 25.26 lawns

    We're not going to mow partial lawns, so finally:
    16 + 25 = 41 lawns

---
layout: post
title: The Three Lighthouse Math Problem Visualized
tags: [math]
keywords: [three lighthouses, math problem]
image: /images/lighthouse-math/lighthouse.jpg
---

I was playing around on the new [Mix.com](https://www.mix.com/) social media website and came across this click-bait article from MentalFloss: [This Math Problem for 8-Year-Olds Left Parents Stumped](http://mentalfloss.com/article/546153/math-problem-8-year-olds-left-parents-stumped). The problem, which I'll repeat below, turned out not the be that complex. I have no idea why it "left parents stumped." That said, I'm a sucker for math problems, and I wanted to explore the question further.

What is the math problem that supposedly stumped parents? Here it is in all its glory:

> On the coast there are three lighthouses. The first light shines for 3 seconds, then it is off for 3 seconds. The second light shines for 4 seconds, then it is off for 4 seconds. The third light shines for 5 seconds, then it is off for 5 seconds. All three lights have just come on together.
> 
> When is the first time that all three of the lights will be off together?
> 
> When is the next time that all three lights will come on at exactly the same moment?”

![A lighthouse.](/images/lighthouse-math/lighthouse.jpg)
*A lighthouse.*

8-year-olds are typically in the second or third grade, at least in the United States, so this problem shouldn't be that hard - and it isn't. It's not even "common core" hard.

The first question asks when all three lights will be off together. The first time the longest shining light is off is at second six. At second six, the three-second light is also off, as well as the four-second light, since they're off from seconds four through six and five through eight, respectively:

![Graph showing the first time all lighthouses are off together.](/images/lighthouse-math/first-off.png)

The second question is essentially a [lowest-common-multiple problem](https://en.wikipedia.org/wiki/Least_common_multiple), or LCM.

So is it the LCM of 3, 5, and 8? Well, no, it's the LCM of *double* those values. Basically, it's the LCM of a complete cycle - on and off.

In fact, it's it's the LCM plus one - which will give you a different answer than the "correct" one on MentalFloss's website.

Okay, first, let's do the math, then we'll take a peek at a visual.

First, let's break down 6, 8, and 10 into their prime components:

    6 = 2 * 3
    8 = 2^3
    10 = 2 * 5

Now multiply the prime components, avoiding duplicate components, and using the max power for each component:

    2^3 * 3 * 5 = 120

So, the LCM of 6, 8, and 10 is 120. Adding one gets us to 121.

Why add one? It's time for a visual:

![Graph showing the next time all lighthouses come on together.](/images/lighthouse-math/all-on.png)

Ok, that's a lot to take in. Let's look at just the end:

![Graph showing the final few seconds before the next time all lighthouses come on together.](/images/lighthouse-math/all-on-end.png)

At 120 seconds, all three lighthouse lights are off. You have to wait one more second for them to turn on.

Think about it: when is the first time the three-second light turns on? One second. The second time? Seven seconds.

What about the four-second light? The first time it turns on is, again, one second. The second is nine seconds.

I supposed you could argue that all the lights first turn on at zero seconds; after all, if you're timing them with a stopwatch, they'll be on from 0.0 seconds to just under they're associated lengths. That would change the answer first question, however - they would first all be off at second number five.
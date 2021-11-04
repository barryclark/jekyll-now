---
layout: post
title: Why Fibonacci Estimates are Dumb (a rant)
---

The software industry seems to like Fibonacci for estimates. I hate estimates so whenever we talk about them, I'm grumpy.

When I ask "why do we use Fibonacci?" the usual answer is "I like that as the numbers get bigger, the gap grows, matching our decreasing confidence with larger items". This idea does not withstand inspection. The jump from first item to 2nd item (1 -> 2) is 2x, but from 2nd to 3rd items (2 -> 3) is only 50%.

Notice that people often use 1/2/3/5/8/13/20 - we replace 21 with 20. If we're willing to change the numbers to be more convenient, then we don't _actually_ care about Fibonacci.

I think the real reason people use Fibonacci is that we are enamored with it. Snails! Flowers! The Parthenon!

If we're willing to consider alternatives, what else might we use? Powers of two (`2^n`) have approximately the same curve as Fibonacci. And programmers have a much easier time thinking about 1/2/4/8/16/32 than 1/2/3/5/8/13/2?.

And if you're ok with `2^n` then we should talk about `k^n` for varying values of `k`. We can adjust `k` to represent our target confidence level. For example, `k=4` would be 1/4/16/64 which we might call Small, Medium, Large, Extra-large.

I'm a fan of `k=10` (1/10/100) which I'd call "Small, Large, and No. Just No."


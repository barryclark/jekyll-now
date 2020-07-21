---
layout: post
title: Technical Debt Ratio
---

A little while back we wrote a feature in an existing legacy product that seemed like a simple idea but took a lot of effort to implement. There was some behavior _B_ that had been assumed for the prior decade and a half; the request was that in certain contexts we'd switch to behavior _B'_. How much of the cost of this feature was down to technical debt?

What made it difficult was that _B_ was an emergent behavior that every part of the system had to participate in. To change to _B'_ meant finding every place that did _B_ and make a code change. And not every place implemented _B_ the same way, so each change was "artisinal". A handful of places actually didn't want _B_ at all but were in a context where _B_ was already applied, so they implemented the opposite _~B_ for that place. And the build was slow. As were the tests. Uggh.

# What if ideal?

We posed a question: in an ideal world, what would this code look like? If the developers came before us had tried to write the cleanest code they knew how, for the then-current features and requirements. (Not if they had anticipated the feature we might eventually want to write, but just for the existing features. YAGNI).

> _B_ would be described in exactly one place in an explicit, declarative way, where anyone could read it and see "Ahh, this does _B_". 

In that hypothetical situation, how long would the feature have taken? If we just had to edit a couple of places to describe _B'_ and the decision about which behavior applied at this time? And a few tests, which are easy to write because the code is nicely decoupled?

The ratio was about `1000:1`. This was the "technical debt cost" for the feature: 99.9% waste, 0.1% feature.

# What if less than ideal?

Maybe our hypothetical situation is unrealistic, and those earlier developers might have picked a different design that didn't suit us so well, but was still very clean and well-suited to the features at the time. A bit of sketching hand waving and we figured `100:1` ratio instead. 99% waste, 1% feature.

# What if even less than ideal?

One of the assumptions in that hypothesis is that those developers could have known how to write such clean code. Maybe I'm being unrealistic in my expectations. If I look around at the current system, what is the range of cleanliness? What if they only knew how to write within that range - if that was the understanding available in-house? A bit more gesticulation and we figured `10:1`.

# Is this realistic?

Yes.

Maybe you think about the last bit of coding work you did and sure, it could have gone more smoothly if the code was cleaner, but 10x-1000x faster? 

Most software teams are aware of opportunities for improving the code where the return is closer to 10%, not orders-of-magnitude better.

In my experience, orders-of-magnitude opportunity is common but difficult for the team to see, due to some combination of the current code being so familiar, and having not seen examples of real systems with really clean code. As an industry, we're doing ourselves a disservice - we need to teach developers about what is possible.

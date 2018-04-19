I feel like this is already well-covered ground. We already know never to rewrite from scratch. The demise of Netscape has been discussed thoroughly. So I'm only going to be able to add a little.

If you're doing a rewrite, your goal is to implement a new system that meets the same needs as the old system, but with a clean, fresh design that will be more pleasant to work in.

While you're doing the rewrite, those needs will change. You'll need to take time away from the rewrite project to update the old system to keep users happy. But you won't do as much for them as you could, because you'd rather be working on the rewrite. 

Your rewrite is now chasing a moving target. So it won't get done as soon as you hoped. And the longer it takes, the more pressure there will be to update the old system. 

As you make progress, you'll start to discover lots of little details in the old system that you weren't aware of when you started. These details are important to users but don't fit cleanly in the design of the new system. You compromise the design to get the feature parity you need. Now the new system isn't as clean and fresh as you wished for, and it still hasn't shipped.

By the way, you'll probably call your rewrite The Phoenix Project. I've seen that one more than a few times.

# Tough Talk

You don't know how to refactor, and that will lead to misery.

I know you don't know how to refactor ([safely](http://jay.bazuzi.com/Neither-Necessary-nor-Sufficient/), [cheaply](http://jay.bazuzi.com/The-Cost-of-Refactoring/), with [discipline](http://jay.bazuzi.com/Disciplined-Refactoring/)) because if you did know, you would have done that on the old system instead of attempting to rewrite. You would have been able to keep customers happy while cleaning up the code, without the cost of maintaining two systems in parallel for a rewrite that may never reach parity.

And if you start on a rewrite without refactoring skills, then pretty soon the rewrite will be gnarly legacy code, too.

You see, the old system started out great once. It was perfectly designed for some feature set at some point. Then a new feature was added, but the design was not updated to accomodate the new feature. Instead the new feature was shoehorned into the existing design. That process was repeated with each new feature, and that's how we got to this state. This mess.

If you start a rewrite with the same approach, then pretty soon you'll end up in the same place. You need refactoring.

# Good news

The best place to learn refactoring is in legacy code. Part of refactoring effectively is learning to detect code smells, and in legacy code the smells are very strong. The low-hanging fruit is very juicy, so there's a lot of ROI to be had.

# What if the code is really bad?

I'm not impressed. No matter how bad the code is, it can be refactored to the architecture you want. There are companies that have switched *programming languages* with safe, incremental refactoring, while continuing to release features.

# When to rewrite

There's one context in which I do believe a rewrite is warranted: when the current system doesn't do what you need, at all. When the market wants you to go in the different direction. This is a business decision, not a technical one.

# A microservice exception

I've heard a story of an organization that had fanstistic results without refactoring. Here's how it went:

- teams are writing services
- by rule, no service may exceed _n_ lines of code
	- because hitting this limit while writing a feature would be a big problem, in practice they had a soft cap of _3/4 * n_ lines
- if you want one service to depend on a second service, the second must be published in a marketplace
- when you publish in the marketplace, you are signing up to support the service for any user in the organizatioon
- the marketplace supports rating and reviews

Because each service was so small, it was easy to comprehend and work in, even if the code wasn't super-clean. 

Because of the rating/reviews, if you needed a service you could quickly pick the best one available instead of depending on the one the Senior Architect selected at the start of the project.

I don't know what other factors went into their success, so I don't know how to reproduce it, but it's interesting that there is an exception to the "always refactor" strategy I'm used to.


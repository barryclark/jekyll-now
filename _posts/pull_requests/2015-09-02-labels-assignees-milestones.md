---
layout: post
title: Use Labels, Assignees and Milestones on PR
chapter: true
---
<a href='/steps-for-better-pull-request/'>Back</a>
 
While some people are extra enthusiastic about reviewing pull requests, it is not the reality for everyone.  I know my brother is one who even looks at pull requests that have been merged already.  He has a true passion for keeping code DRY, abstract, and beautiful. Unfortunately, not everyone goes out of their way to review pull requests.  If you want to ensure your pull request gets reviewed in a timely manner, assign it to a specific person.  Make sure you rotate your assignees.  It's important that we all take ownership of our applications, and we can learn a lot from getting feedback from different people.

As a courtesy, let the reviewer know that you're assigning a pull request.  Not only is it good for the reviewer to get the heads up, it's also an opportunity to hear from the reviewer about any blocks he or she may have.  What if they're going to be in meetings all day long and won't be able to get to it for another day or two?  It may even be the case that he's going on vacation and won't look at it for another week or two.  Remember -- there is no such thing as "over communication".  Don't just assume they'll get the notification, because there are times when we don't even get to check our messages.  I'm sure that must happen to you too!

Don't forget to remind them periodically, in case they forget.*

Milestones
----

Using `milestones` on GitHub is another great tool to use.  Aside from ensuring better documentation, it can be helpful to the reviewer when prioritizing pull requests.  I recently worked on a team where stories were being completed faster than they were getting reviewed.  As a result, we accumulated ~17 branches that were just sitting there waiting to be merged.  Two of our developers took about 3-4 days just reviewing these pull requests, some of which were large chunks of work that required a lot of debugging.  Sometimes, merging one branch resulted in other branches becoming 'unmergeable'. In order to ensure our deploy was on time, our lead decided to go down the list of pull requests and assign milestones, which helped the two developers focus specifically on the changes that were more immediately necessary.  It would've been great to have had these milestones assigned from the beginning, right?

Lastly -- don't be a jerk! As with anything else in life -- be respectful of the other person.  They also have stories of their own to complete.  Make yourself available to answer any questions or concerns.  In some cases, it may even be beneficial to have a paring session to review the work.  At the end of the day -- don't forget to say 'thank you'.  These two words can go a long way.
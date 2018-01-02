---
layout: post
title: Why do a code review?
author: jake_hall
external_url: http://blog.florxlabs.com/code-reviews
---

Code reviews are an integral part of the teams that I work on, and recently I was asked what value they added versus the time they took. Here are a few thoughts about why they are absolutely vital to any software development project.

# What do I mean by a code review? #

To us, a code review is the final check by the team that the change being delivered has the following attributes, before being merged into the main branch: 
* there are no obvious issues with logic
* follows agreed best practice, and coding standards
* code is understandable, maintainable and clean
* all automated tests are written, and have the necessary coverage
* the acceptance criteria on the ticket has been met

# How do we do code reviews? #

In order to gain the most from our code reviews, we try and stick the following: 
* Two other people to review each pull request (PR)
* Picking reviewers that will have the most impact
* Adding comments to the PR on anything you think needs explaining
* Not being defensive when receiving comments on own code (See [you are not the code you write](https://hackernoon.com/you-are-not-the-code-you-write-e54f02876ca3))
* Always aim to resolve all review comments, if they improve the project as a whole, no matter how trivial/minor.
* Be concerned if we get no comments, PRs are rarely perfect first time!

# Why are they so important? #

## Prevent Issues ##

Code reviews are an additional gate, and more pairs of eyes on a change. This can increase the likelihood of picking up issues before they out of the development environment where fixing is much quicker and cheaper. At this point the developer is unlikely to have context switched too, so can make the change relatively easily.

As we do our branching as feature/bug branches, this allows us to prevent a merge onto master/develop before it's approved. This can then be coupled with Continuous Integration to check the code also builds and tests succeed before the merge also.

## Knowledge Sharing and Mentoring ##

Nobody wants to be lumbered with a critical production issue in a part of the codebase they have never seen before. At least if you have seen the changes as they were going in, you may have some semblance of understanding of what may have happened recently to cause any issues.

Knowledge sharing also allows teams to move around the product and work on different parts, as ideally all members of the team will know the majority of the system through reviews, planning and design sessions.

Additionally, reviews allow junior developers to come up to speed quicker with a system, learning the internals and potentially picking up more language features along the way. They can learn as they go, either through reading reviews, or having their code critiqued; how to code more defensively, coding to support deployment (rather than "it works on my machine"), and better practices.

## Improvement one review at a time ##

If you aren't doing code reviews yet, or have inherited a legacy code base, it's unlikely that a big bang change to reduce your technical debt is really going to work. Even if you fixed it all in one go, it would just creep back in change by change if the team don't keep on top of it.

Instead, incremental improvement through reviews can reduce the debt in a more controlled way, and is more likely to consistently keep debt down in the long term. Through each PR and review, the team can come to a consensus on what "good" looks like, and what their best practice is.

This standard of best practice can (and should) evolve over time, sure you can write it down and put it on the wall, but only through repetition in code reviews does it become second nature. As it's also evolved through team consensus, members are more likely to buy into it and follow in the long term.

On my projects once we have a strong foundation of standards, I like to then introduce "Scouts Honour", (also known as the Boy Scouts Rule). Put simply, Scouts "Always leave the campground cleaner than you found it." which also applies to code. It doesn't matter if you didn't touch that method, if it needs refactoring, then do it. 

We expect that every PR will contain some form of refactoring, which continues to drive down that tech debt, improve maintainability, and gives developers ownership over the codebase which reaffirms the "[you are not the code you write](https://hackernoon.com/you-are-not-the-code-you-write-e54f02876ca3)" value.

## Better Estimates ##

If the whole team has a better understanding of the codebase, then it's only natural that it will lead to better estimates. More knowledge in how to implement the feature, and how it will sit with the existing code, means a more accurate estimate. Alternatively, it may reveal how much of an unknown this new feature is, which is also valuable and can then lead to a [Spike](http://agiledictionary.com/209/spike/).

## Blameless ##

We like to have a blameless project, and as we usually aim for two code reviews, there have been three developers that have looked at a change. This gives shared responsibility for any issues to almost the whole team, rather than down to any individual.

## Better-self ##

As you're having to show your code to your peers every time there is a change, naturally you are going to make sure it's as good as you can make it (with the time constraints of course), this means that we have found that people start doing their own personal code reviews first picking up on the agreed best practice issues that can easily get missed.

The more you strive as an individual to produce better code, the better it is for the team, and the fewer comments being passed around on a PR. We're always aiming for that holy "LGTM!" review.

Only for us to be suspicious about it later... thinking it's too good to be true
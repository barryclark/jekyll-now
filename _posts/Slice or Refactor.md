---
layout: post
title: When to slice, and when to refactor
---

Many teams struggle with large work items that can't be completed, demoed, and deployed in a single sprint.

> TL;DR: slice User Stories to a quarter of a sprint. If you can't, either A) get better at slicing or B) refactor.

A lot has been written about slicing vertically, and I agree that it is very important. Vertical slicing is a skill that people don't automatically start with. It takes time to learn. When you first think about the valuable feature you want to build and deliver, it will be hard to see that it can be sliced more thinly.

> Most software organizations actively discourage vertical slicing by rewarding "big wins". If org is used to celebrating the delivery of a feature that took a year, and a team delivers 365 incremental improvements in the same, the team mostly won't get recognized for their work. People who are good at slicing will tend to change how they work or leave the company. 

If you aren't practiced with vertical slicing and a mentor says "you really need to slice more thinly", a common response is to slice _horiztonally_. One "story" for database, one for the plumbing, one for the UI. This practice is bad, but it's very tempting.

Don't let yourself off the hook: you probably can slice more thinly, but you just can't see it yet. Keep at it.

# However

There is another reason you might not be able to slice thinly enough to fit in the sprint: technical debt. I see this when the idea is a simple one ("what if we changed the background color?") but the story still takes a while.

Being able to see this is also a learned skill: if a developer is not accustomed to working in a clean, well-factored, well-tested codebase, then it can be difficult to see how much developer time is going to the vig. An order of magnitude is not uncommon.

When technical debt is all around you all the time, work just feels like work. I have to deliberately remind myself what it feels like to work in a clean system. How we can go from "hmm, I wonder if..." to "shipped and now we know" in an hour.

# What is a User Story, really?

A User Story is an increment of work that a *User* can understand as progress towards meeting their needs. Since users don't see implementation details, implementation details are not User Stories. Plumbing is not a user story. Refactoring is not a user story. Product Owners care about User Stories. You can completed demo User Stories.

A User Story may not actually be valuable by itself. A customer may be happy to see that a User Story is completed, but that doesn't mean they want it to be deployed yet - it may only become value when combined with other User Stories. This is part of why the "Tech Story" trap is easy to fall in to, because the structure of "multiple Stories combined to create something of value" looks similar with both User and Tech Stories.

# INVEST

The INVEST model says User Stories should be:

- Independent
- Negotiable
- Valuable
- Estimable
- Small
- Testable

That's what I'm trying to set up here. I want my Product Owner to be able to say "in the next iteration, let's do User Stories A, B, and C but not D". They're only Negotiable that way if they are Independent, Valuable, and Small.

# How Small?

1/2 of a Team Sprint is good. Any larger than that and the P.O. doesn't have much flexibility to work with.

1/4 of a Team Sprint is awesome. Once you're able to hit that reliably, make your sprints smaller.

# Who?

Slicing of 

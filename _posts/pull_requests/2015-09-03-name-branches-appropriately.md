---
layout: post
title: Naming Your Branches Appropriately
chapter: true
---
<a href='/steps-for-better-pull-request/'>Back</a>

The branch name is the first glance at your story. In a team of developers, it's not always clear what other people are working on.  We're not always aware of what chores, bugs and features are getting addressed.

Being able to look at current branches and know exactly what they're responsible for is a great way to improve everyone's awareness of our code.

Specifically when opening a pull request, the reviewer should be able to know at a higher level what the branch does, before reading through the story and through the code.

<strong>`landing_page_bug`</strong>, <strong>`bug_fix`</strong>, <strong>`new_feature`</strong> are way too generic!

How many bugs could there possibly be on the landing page?  Imagine a bunch of pull requests with names `landing_page_bug`, `bug_fix`, `bug`, etc.  Now imagine it's someone's first day on your team -- how are they going to know what's going on?!

Something like `bug/remove-broken-links-from-landing-page-452394823` is descriptive and tells the other developers exactly what the branch is responsible for. Without looking through the stories on Pivotal Tracker and even without going to team planning meetings or standups, ANYONE can look at this branch name and tell that:

- It addresses a bug -- not a chore or a feature.
- It removes broken links.
- Broken links are on the landing page
- The story number is 452394823.

So What's the Secret Formula?
----

`[branch-type]/[what it does]-[where it does it]-[story-number]`

I know!  It's THAT simple!

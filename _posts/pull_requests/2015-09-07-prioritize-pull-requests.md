---
layout: post
title: Prioritize Pull Requests
chapter: true
---
<a href='/steps-for-better-pull-request/'>Back</a>

It's Wednesday morning.  You get to work.  You have some work in progress from yesterday.  What do you do?
You probably get yourself a cup of coffee... plug in your computer... check your emails -- probably respond to one or two... the working branch is on your local machine... so...  now what?  Do you start coding right away?  No.  We're forgetting a vital step!  Check your open pull requests!

I'm not sure why, but it often seems pull requests are not treated as first-class citizens.  If we imagine our branches are like passengers at an airport -- pull requests are passengers with a passport and boarding pass.  They're at the gate -- ready to board.  All they need is one last scan to give them the go-ahead.  Why wait for passengers who don't even have their tickets yet (aka new stories).

__What are the implications of procrastinating reviewing pull requests?__

1. You could miss the momentum

2. It may be too late when you realize:
	- the branch fails to satisfy the acceptance criteria.
	- the implementation has unintended consequences.
	- leveraged resources have been deprecated.
	- style is inconsistent.
	- the branch is no longer mergeable.
3. Changes may not be deployed on time.

__Where do I find the time to review pull requests?__

Here are some ideas:

- 1st thing in the morning
- while your test suite is running
- as an end-of-day task
- right after lunch

Just remember -- it's more important to ensure that we deliver stories as a team than as individuals.  

<i>"La unión hace la fuerza!"</i>

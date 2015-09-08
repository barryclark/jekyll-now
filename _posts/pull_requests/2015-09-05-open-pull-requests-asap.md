---
layout: post
title: Open Pull Requests Right Away
chapter: true
---
<a href='/steps-for-better-pull-request/'>Back</a>

If you're working on a project with other people, it's important for everyone to be on the same page.  It's pretty suspicious if you intentionally keep your branch a 'secret' from certain members of the team.  Doing so can make people (rightfully) question your work-ethics and your intentions:

__Are you avoiding questions because you don't feel confident enough to answer them?__

If so -- talking about this with the team can be really helpful!  Sometimes it's difficult to articulate our thought-process, but the more vocal we are, the better it gets.

__Are you afraid you're going to get unwanted criticism?__ 

Remember -- feedback is what it's all about. Don't take anything personal! We all need to give each other feedback to become better developers, better coworkers and better people.

If the feedback you're getting seems like a personal attack -- talk to the person who's giving it!  They're probably not even aware of how it's coming across.  I guarantee -- it's not intentional.

Opening a pull request as soon as your branch is on the cloud is a perfect way to document progress and can help everyone get an idea of what you're working on.  Also -- doing so really improves the workflow because you'll get feedback in small increments as opposed to getting a really large amount of feedback all at once.

What If I Am Working On an Epic?
----

If you are working on an epic, make sure you have a separate `epic` branch from where other branches are born.  Don't forget to keep this branch updated with `develop` to avoid conflicts later down the line.  As soon as this branch is created, open a pull request.  It's OK to open one with a WIP (work-in-progress) status.  This will help the rest of the team know what you're working on and get a feel for how it's going.

When you branch out of your epic branch, open pull requests against it as well, and treat them how you would treat regular pull requests.  That means -- use labels and assignees.  If your pull requests are reviewed regularly as such, you'll save yourself and the reviewer a lot of time later, since they won't have to look at days of code at-a-time, and you won't have to revisit all the feedback at once.  Doing this will increase the chances of delivering the story on time.

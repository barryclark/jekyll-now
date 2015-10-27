---
layout: post
title: Code Coverage Report for Waterbear
author: Alex MacLean
---

- intro about unit tests and why knowing code coverage is important
- introduce the modules involved
- how I hooked it up
- how to run it

So we have all heard many times about how important it is to test our code, and there are many ways to do so, but when discussing unit testing it is especially important to consider how we'll know what parts have been tested.

Enter the code coverage report. This is a powerful tool that should be included in any project. The idea is simple, it checks that each line/branch/statement has been considered by a unit test. If the report shows that some lines have not been touched then the decision of what to test next is a simple one.

Javascript makes this process slightly more complicated then a no-nonsense language like C but there are still helpful modules available to make this a relatively painless task.

For Waterbear, we used a 3-part combo: [Karma](http://karma-runner.github.io/0.13/index.html), [PhantomJS](http://phantomjs.org/), and [Istanbul](https://gotwarlost.github.io/istanbul/). 
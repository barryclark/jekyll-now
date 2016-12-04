---
layout: post
title: Learning a new programming language with Exercism
---

![Exercism]({{ site.baseurl }}/images/exercism.png)

Recently I learned about [Exercism](http://exercism.io), a neat website and a command line program that allows you to work on exercises in a variety of languages. Each comes with a description of the problem and a suite of unit tests that your module must pass. Upon submitting your solution you can see the solutions that other users submitted. Anyone can comment on submitted code to offer tips on style or optimization strategies.<!--more-->

I've been using it to learn [Elm](http://elm-lang.org) and it's a lot of fun so far. For each exercise I take a first swing at the problem on my own, consulting official documentation as necessary, and then run elm-format to follow formatting conventions. After I submit it then I check out how other people have solved the problem and edit my code if I see some nifty alternatives. It's been a good way to not get overwhelmed with a new language right off the bat.

For those interested in doing the same, I highly recommend [Visual Studio Code](https://code.visualstudio.com/) (free and cross-platform). I have elm-test set up as my build task with the unit test file so that I can hit Cmd-Shift-B and see how I'm progressing with the unit test suite. There's also an Elm extension that provides nice syntax checking.

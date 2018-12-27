---
layout: post
title: All About PSKoans
date: 2018-12-27
categories: [PowerShell, PSKoans, Tools, Beginner]
tags: [koans, learning, powershell]
---

It's been a handful of months since I started working on the PSKoans module, so I thought I'd take
the time to set down the story behind the PSKoans module.
It borrows from some koans modules from other languages, and the concept of koans as a programming
tool seems to originate from a Ruby project &mdash; although at least a handful of other languages
now have koan libraries available for learners.

The concept of _kōans_ was first introduced to me when I first decided to learn how to code in F#.
Initially, I struggled quite a bit.
For those of you who mightn't be familiar with it, it's a bit of an unusual language that aims to
bring functional language features into a .NET family language.
This places it in a bit of a strange in-between, where many of the libraries are heavily
object-oriented, and yet the language itself is quite clearly built for more functional constructs.

Whilst searching for learning resources, I stumbled across
[Chris Marinos' F# Koans](https://github.com/ChrisMarinos/FSharpKoans), which (like other koans
projects) aim to teach you F# by presenting you with a series of failing assertions, and guiding you
towards fixing them, teaching you the logic behind how it works.
These in turn are inspired by [EdgeCase's Ruby Koans](https://github.com/edgecase/ruby_koans), and
the readme there has further links and information as the origins of the concept itself.

# First, Some Definitions

You could say the simplest definition of a _kōan_ is "a logical contradiction." The term is **old**,
dating back to Zen Buddhist monks, who would be instructed to meditate upon logical contradictions
until they could arrive at a purely _intuitive_ understanding of a concept being studied, rather
than simply reasoning logically.
It is often written simply as _koan_, mainly because the accented O character can be a bit tricky to
type on English keyboards.

For programming purposes, a koan usually is framed as an assertion which is initially written in a
'failing' state.
A contradiction.
Something simple like `1 + 1 | Should -Be 3` (at least, if you write it in Pester syntax) should
give you the general idea.
In actuality, many koans projects opt to define a custom `blank` function to represent a space to be
filled in; in PSKoans I have a function named `Get-Blank` which uses `__` as its alias, and a
similar idea is used in Chris Marinos' F# Koans.

This is used to create an assertion that will always fail the first time around, and often some
interaction framework is used as an in-between to help guide the pupil to where to look in the error
message and how to find the issue and resolve it For example:

```powershell
Describe 'Addition' {
    It 'is basic arithmetic' {
        __ | Should -Be ( 5 + 1 )
    }
}
```

Executing this in PowerShell (with PSKoans installed, or a simple `return $null` function aliasing
the `__` command call) will result in the following output:

```diff
+ Describing Addition
-   [-] is basic arithmetic 3.9s
-     Expected 6, but got $null.
-     3:         __ | Should -Be ( 5 + 1 )
```

Pretty straightforward; tells you what's wrong, and where it needs to be fixed.

# Closing the Gap

Up until recently, a _majority_ of PowerShell learning materials fit into the following categories:

* Books
* Talks
* Blog Posts
* Documentation

These are all _wonderful_ ways to learn and expand on what you know.
However, they lack a certain something that I would have loved to have when I was learning the ropes
myself &mdash; that extra bit of interactivity.
For me, learning to code from a _book_ has always been a doomed prospect.
There's something incredibly disconnecting about the code being on a printed (or even digital) book
page; if you ever want to try something out, you have to write everything out all at once, and if
you're not familiar with the language, chances are you'll mess it up and not even begin to know
where you went wrong.
Books are great for teaching concepts, but for me they miss by a large margin when trying to convey
or really impress the practicality of the language, or even the depth of its usefulness.

Talks have a similar issue, I fear; they're fantastic for opening up your breadth of knowledge and
showing you some really cool stuff you mightn't see or hear about otherwise, but they fall quite
flat when you don't have the basics down and can't really follow what's going on quite yet.

And blog posts and documentation can often be far too dry to really spark those learning moments.
Not that they're _bad_, of course.
They have their place, as everything else I listed does &mdash; and I'm sure I missed a few methods,
as well &mdash; but there's a gap where it really truly pays to have some form of interactive
experience, and I **hope** that that's where PSKoans can come in and really shine.
My wife likens it to a game &mdash; we set the challenges, and you need to solve them one by one or
in bulk if you prefer, and we can give you feedback of how you're doing, where you're going wrong,
and (down the development road, anyway) potentially even eventually some suggestions of how to
proceed in areas you might get stuck.

# Taking the Plunge

I'm sure many of my readers are probably tending towards the more advanced, but it's been my own
experience that we tend to have little holes in our knowledge even of the more basic things.
In fact, as I create the koans for a particular topic I often learn new things about that very topic
_while I'm writing them!_
So, if you've not yet found the time to knock out a few koans and see why I keep suggesting new
folks try it, I can only encourage you to give it a shot &mdash; you may well learn something from
the experience.

If nothing else, perhaps you'll gain enough familiarity to simply be able to provide a gentle
recommendation for those learning PowerShell.
I've been chatting to a few people about their possible application in a more controlled group
classroom or training-type setting as well, and [Thomas Rayner](https://thomasrayner.ca) has already
begun teaching some of his coworkers using PSKoans as one of the primary tools.
His initial results are encouraging, but as with any stress test I tend to miss the occasional
oddity until someone stumbles across it.
It's very hard to properly review your own writings, after all, even when they are in PowerShell
&mdash; but I try my best!

## Installing the Module

PSKoans is available from the PowerShell gallery, or the [Github page](https://bit.ly/pskoans), so
you can install it anywhere you have a PowerShell 5.1 or PowerShell Core engine available.
It's designed to be fairly easy to work with, but it does require a recent version of Pester to be
installed, so make sure you have that down and then it's simply an `Install-Module PSKoans` away!
If you have any issues or concerns, feel free to leave an issue on the Github and I'll get back to
you shortly &mdash; or if it's urgent, you can reach me on the
[PowerShell Discord server](https://j.mp/psdiscord).
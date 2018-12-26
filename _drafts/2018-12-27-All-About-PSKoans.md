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

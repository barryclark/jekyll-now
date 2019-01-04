---
layout: post
title: PowerShell's Functional Language Features
date: 2019-01-10
categories: [powershell]
tags: [powershell, functional, language]
---

Functional languages differ from typical, more concretely object-oriented languages in a few
important ways.
One of the simplest to point out and demonstrate is that in most functional languages, every code
path returns a value &mdash; there's effectively no such thing as a method that exists purely to
create some side effect like there often is in object oriented languages.

I'll restrict my comments here to languages I know pretty well myself, so that really only leaves me
with C#, F#, and PowerShell at the time of writing.
I have some experience in a few others, but they're all pretty thoroughly object-oriented languages,
so I'll leave them aside for the time being.

# Functional Concepts

Before I even begin, yes, PowerShell breaks a _lot_ of functional programming rules.
I'm not here to pretend it doesn't, that would be silly.
However, it's worth looking at PowerShell's features from a functional language perspective from
time to time, because it can really help you grasp those unfamiliar concepts at times, and it's also
quite fun to just use another lens once in a while.
It can really change how you approach your code.

## Rule 1: Functions are Pure

> A function called multiple times with the same arguments will always return the same value.
> Always.
>
> No side effects occur throughout the function’s execution.

I'll be honest, I've never actually used a functional programming language where this is strictly
true and properly enforceable.
F# _can_ certainly write very pure functions, but it's also tied to .NET, which means a whole heap
of side effects available for use and abuse at a moment's notice.

Similarly, PowerShell _can_ have pure functions, but mostly... doesn't.
Being an automation tool, a great many parts of PowerShell exist precisely _because_ of their side
effects, and rightly so.

## Rule 2: Functions are First-Class Citizens

However, in some ways its functions _are_ first-class citizens.
PowerShell has both script functions and cmdlets, which differ in quite a few ways, but in _both_
cases they are themselves a type of object that can be manipulated and worked with.
Cmdlets are their own class type itself, which inherit from the
`System.Management.Automation.Cmdlet` base class.

Functions are themselves also a type of object &mdash; each function can be worked with as an
instance of the `System.Management.Automation.FunctionInfo` class, and after storing a
`FunctionInfo` object, you can later execute it.
However, you can't simply store a function itself as an object directly, and you do need to use
the `Get-Item` cmdlet to retrieve a function from the current session.

```powershell
# Declare function
function Test-FunctionInfo { "Testing..." }

# Get FunctionInfo object
$Function = Get-Item -Path 'Function:\Test-FunctionInfo'

# Retrieve just the contents of the function (its script block)
$FunctionScript = ${Function:\Test-FunctionInfo}

# Invoke the function later
& $Function
```

However, although it's _technically_ possible to create "higher-order" functions in PowerShell,
which themselves return some other function, it's generally not particularly feasible or
well-supported to program in such a fashion in PowerShell.




Ref: https://thesocietea.org/2016/12/core-functional-programming-concepts/
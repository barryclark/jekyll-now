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

I've been meaning to write this post for a while now, ever since my post on
[Anonymous Functions](/2018/10/26/Anonymous-Functions/).
I've been turning over in my head the similarities PowerShell has to some functional languages,
perticularly F#, so I thought it was about time I wrote about it!

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

I'll be borrowing the core concepts list from [this article](https://thesocietea.org/2016/12/core-functional-programming-concepts/)
in the interest of keeping things as straightforward as possible.
Functional programming concepts can be a bit weird to wrap your head around for those of us really
accustomed to the more object-oriented concepts.

## Concept 1: Functions are Pure

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

## Concept 2: Functions are First-Class Citizens

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

## Concept 3: Variables are Immutable

For those of us who are not very familiar with functional languages (myself included), this concept
seems very _odd_.
Programming? With immutable variables? Say _what_?
F# follows this _to an extent_ &mdash; its variables are immutable by default, with an optional
modifier that makes them mutable.
It also requires that mutable variables be updated with a special operator for clarity in the code
in terms of which variables are mutable or not.

```fsharp
// Immutable variables
let x = 1 // Attempting to re-assign a value later will be a compilation error

// Mutable variables
let mutable y = 4 // Initial assignment
y <- 5 // Assigning a new value
```

PowerShell, however, has _very_ mutable variables by default.
However, if you _wanted_ to program in a more functional manner, you could conceivably do so using
`Set-Variable` or `New-Variable` to create read-only variables or constants.

```powershell
# Readonly variables can be removed later with Remove-Variable -Force
Set-Variable -Name readonly -Value 5 -Option ReadOnly
$Readonly # Output: 5

# Constant variables can never be removed from the scope they're created in
Set-Variable -Name const -Value 12 -Option Constant
$Const # Output: 12
```

If you wanted to program with this ideal in mind, I would generally recommend using read-only
variables instead of constants.
Constants in PowerShell are _really_ hard to work with at times, but I suppose if you **really**
wanted to enforce the functional programming concept of immutable variables you could do so with it.
However, I'd still strongly recommend never setting constant variables in the global scope &mdash;
the only way to wipe the slate clean there is to literally restart the whole PowerShell session.

Because PowerShell is a console and an automation framework, it often won't make that much sense to
use too many immutable variables in general use, but I could definitely see that perhaps in a given
module you may want to attempt to code in this matter for greater reliability of results.
However, it's also important to remember that use of some objects may make it rather difficult to
enforce completely &mdash; for example, a constant variable may store a hashtable reference, but as
long as you're using an actual hashtable there isn't really a way to make it read only.

You could, conceivably, instead opt to create a `[System.Collections.ObjectModel.ReadOnlyDictionary[T1,T2]]`
rather than a hashtable, and use `[System.Collections.ObjectModel.ReadOnlyCollection[T]]` instead of
a standard array, however &mdash; so if you would like to attempt to go that route, it may be
possible to do so.
Personally, I think having a constant or read-only variable that points to a hashtable that remains
mutable may still be an interesting concept to play with at times.

## Concept 4: Functions Have Referential Transparency

As the [linked article](https://thesocietea.org/2016/12/core-functional-programming-concepts/)
details, _referential transparency_ is a bit of a tricky thing to define properly.
But given the definition in that article, I think it's pretty safe to say that the vast majority of
PowerShell functions and cmdlets are not referentially transparent by nature.
Certainly you _can_ opt to make something referentially transparent in PowerShell, but in the
majority of places you want to use PowerShell it's probably not a particularly valuable option.

## Concept 5: Basis in Lambda Calculus

This really comes down to two things. First, that all functions can be written without a name, and
second, that functions are curried.

### Nameless Functions

In PowerShell, separating a function from its name or creating a nameless function is quite simple
and straightforward.
You can simply extract the script block from the function to create what is effectively a nameless
function, which can be executed independently as its own object.
Script blocks can also be created independently of functions and passed as parameters or executed on
their own using the `&` operator or either the `$sb.Invoke()` or `$sb.InvokeReturnAsIs()` methods.

```powershell
$Scriptblock = Get-Item -Path Function:mkdir | Select-Object -ExpandProperty ScriptBlock
& $Scriptblock 'C:\Test'

$NewScriptblock = {
    param([string] $Path)
    Get-ChildItem -Path $Path
}

$NewScriptBlock.Invoke('C:\Program Files')
```

### Currying Functions

Currying is probably something most people working with PowerShell either haven't heard of or don't
really use very often.
PowerShell isn't really _designed_ for currying functions, which I would say is mostly because it's
designed to function as a shell for administrative and automation purposes.
Currying is what a language like F# does naturally, and it's a bit of an unusual concept to those of
us accustomed to working with less functionally-minded languages.

In F#, all functions have a single set of parameters that are all mandatory, unlike PowerShell.
If you call an F# function with less parameters than it needs to function, it doesn't return any
errors or warnings.
Instead, it's designed such that doing so actually creates a _new version_ of that function which
effectively has some preset parameters compared to the original.
It's a bit easier to _show_ than to _tell_ with this sort of thing, so let's see how this tends to
work.

```fsharp
// Define the "base" function
let sumNumbers x y z =
    x + y + z

// This function can be called directly, with 3 parameters
sumNumbers 1 2 3 // returns: 6

// Define a curried function
let addToThree x y =
    printNumbers 3

// Call curried version, with two parameters
addToThree 2 2 // returns: 7
```

PowerShell typically isn't designed to work like this.
However, given that functions can be pretty easily built on the fly with script blocks, you could
potentially design a framework to curry functions in PowerShell.
In general, though, this would almost certainly become rather complicated with PowerShell's ability
to define complex parameter sets and optional parameters.
But if you were _really_ determined to make it work, you definitely could do so &mdash; and with
PowerShell's splatting ability combined with `$PSBoundParameters`, it is actually relatively easy to
do so.

```powershell
function Add-Numbers {
    param([int] $x, [int] $y)

    $x + $y
}

# "curried" function
function Add-ToSquare {
    param([int] $x)

    $Square = $x * $x
    Add-Numbers @PSBoundParameters $Square
}
```

As a result, in general usage function currying is, to an extent, almost "baked in" in some ways
to the function design itself, depending on how you choose to construct your parameters, set default
parameters, and permit optional parameters to be omitted.
Working directly with script blocks and the `&` operator also brings it a bit closer to the
functional programming language methodology, as well.
However, unlike true functional languages, it doesn't do currying by default with all functions.

## Implicit Return

F# has something that I would usually call an "implicit return" &mdash; that is, there isn't really
a `return` statement, and anything called on a line on its own will return the value to whatever
assignment is "upstream", if there is any.
If there is no upstream assignment going on, it simply outputs the variable to the console.
I'm not sure if this is something that's super common in functional languages, but it is something
that PowerShell also mimics by design.

```powershell
$Values = foreach ($Number in 1..10) {
    # Note there is no assignent happening here, so it is passed upstream to the $Values variable
    # and stored as an array.
    $Number * 2
}

function Get-Numbers {
    param([int] $Start, [int] $End)

    # Simply outputs the values when the function is called
    $Start..$End
}

Get-Numbers 1 10 # Prints numbers 1 through 10 to the console
```

PowerShell _does_ still have a `return` statement, but its primary operation here is purely for
flow control.
You can pass it a value if you like, but it doesn't require a value to operate.
When called, `return` in PowerShell simply passes control back to the caller of the function or
script.
This can be a bit confusing for some, who are more accustomed to a language like C#, which doesn't
allow for this kind of implicit return, and assume that unless they specify `return` no values will
be output.
Because of this, the usual recommendation is to restrict use of `return` only to places where it is
really needed for flow control (to exit a function early) or in classes, where the stricter parsing
and JIT compilation modes make it a requirement.

# PowerShell is Weird

PowerShell has a lot of object-oriented tendencies, and that's really the core principle of its
overall design.
But because it's _also_ a functional administrative **shell**, it also takes a few pages from the
functional programming book as it needs them.
It's a very interesting combination, and I am rather fond of it myself, though I understand all too
well that this unusual combination of concepts can tend to make it a rather confusing language to
work with.

I've found that at least for myself, I understood PowerShell pretty readily only because I had prior
experience with _both_ F# and C#, and as a result I was able to pretty easily categorise and note
the different interplay of concepts which often don't really work together in other languages.

For anyone who wants to get a little more familiar with a more functionally-minded language, I
highly recommend a bit of dabbling in F#.
When I was first looking for learning materials on it, I discovered Chris Marinos'
[F# Koans](https://github.com/ChrisMarinos/FSharpKoans), which I _highly_ recommend for anyone
wanting to take a look at F# from a beginner's perspective &mdash; they were also the inspiration
for [PSKoans](https://bit.ly/pskoans), after all!

Thanks for reading!
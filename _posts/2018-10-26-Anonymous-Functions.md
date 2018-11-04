---
layout: post
title: Anonymous Functions in PowerShell
date: 2018-10-26
categories: [powershell]
tags: [powershell, lambda, anonymous, function]
---

PowerShell sits in quite an unusual place in terms of classifying programming languages. Most
languages can be pretty easily categorised; C# is an _object-oriented_ programming language.
Haskell is the classic example of a _functional_ programming language.

PowerShell sits in a strange _in-between_, a bit like F# does; it has **strong** object-oriented
roots being built upon C# and the .NET Framework (or .NET Core) platform. However, it is also very
much a _functional_ language.

## PowerShell as a Functional Language

* Any uncaptured data is treated as _output_; explicit `return` statements are not required.
* PowerShell's pipeline is solidly reminiscent of F#'s similar pipe operator.
* Use of lambda (unnamed functions) is incredibly easy.

However, just like F#, you can quite easily _ignore_ PowerShell's functional programming behaviour
and treat it just like any old object-oriented language, relying on .NET features rather than some
of the more interesting native language features.

## What _is_ an Anonymous Function in PowerShell

Well, for all intents and purposes, your `{ basic script block }` is the de facto anonymous function
in PowerShell. In fact, even a named function can be separated from its script block, and the script
block can be used independently:

```powershell
$FunctionObject = Get-Item 'Function:\mkdir'
$ScriptBlock = $FunctionObject.Scriptblock

# The oneliner version, using variable-provider-access syntax:
$ScriptBlock = ${function:mkdir}
```

You can look at the contents of the script block, examine parameters, and even manually invoke the
script block with a simple `$ScriptBlock.Invoke()` and pass arguments to the script block by placing
them positionally inside the parentheses of the `Invoke()` method.

## Places Anonymous Functions are Used

One common place you will actually _need_ to use an anonymous function is when calling .NET methods
that require delegates. My favourite example is a lesser-known method on the `List<T>` class called
`FindAll()`.

```powershell
using namespace System.Collections.Generic

$List = [List[int]](1..100)
$List.FindAll(
    {
        param($Item)
        $Item % 4 -eq 0
    }
) -join ', '

# Output
4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100
```

As you can see, the `FindAll()` method takes a... script block? That might not seem odd to some of
you, but for those of you coming from C#, this code looks a little more like this:

```csharp
List<int> myList = new List<int>();
for (int i = 1; i <= 100; i++)
{
    myList.Add(i);
}

int[] matchingItems = myList.FindAll(x => x % 4 == 0);
```

Not only is it much more code to get the same result, but _that is not a script block_. That's a C#
lambda function. PowerShell actually **translates** the script block into a pseudo-delegate for the
method to use.

For things like this, the script block or delegate must have a boolean end result to work correctly,
but not all C# delegates require such simple (or any) output. Similar constructs are used when
working with UWP, Forms, or WPF GUI scripts from PowerShell; many of their `Add_Click()` and similar
interaction events use script blocks in PowerShell as well.

### Anonymous Functions in the PowerShell Pipeline

I'm sure many of you are familiar with `ForEach-Object`. It's the pipeline equivalent to the
familiar `foreach ($i in $Collection) {}` loop construct.

What I think far _fewer_ people are familiar with is that you can do something eerily similar to
this with a simple script block.

```powershell
1..100 | & {
    process {
        if ($_ % 2 -eq 0) { $_ }
    }
}
```

Wait, what? Really? That's a bit... odd. The `&` operator is used to tell PowerShell that, yes, we
are deliberately invoking the script block as a command, not simply placing it as an object. This
can also be done with script blocks stored in variables.

There are actually _two modes_ of doing this, as well. The above construction will _not_ allow you
to define variables within it that can be used outside the script block. In other words, this will
give you no result:

```powershell
1..100 | & {
    begin { $a = 0 }
    process {
        if ($_ % 2 -eq 0) { $a += $_ }
    }
}

$a
```

However, make _one small change_, and this suddenly becomes very curiously similar to
`ForEach-Object` itself:

```powershell
1..100 | . {
    begin { $a = 0 }
    process {
        if ($_ % 2 -eq 0) { $a += $_ }
    }
}

$a
```

Thanks to the scope-merging capabilities of the dot-sourcing operator, variables that are defined
inside the script block are also now available to the wider script.

`ForEach-Object` does have some additional capabilities that make it worth the while, and it will
also handle errors more effectively than a nameless script block. For a script block to do that, you
would have to define a `param()` block, at least one parameter, and the `[CmdletBinding]` attribute
would be required. Without those, the script block will be tricky to work with in terms of error and
stream handling.

However, for simple things or where speed is the primary concern, a script block can be _far_ faster
than your usual `ForEach-Object` command. Just mind the rough edges.

Thanks for reading!

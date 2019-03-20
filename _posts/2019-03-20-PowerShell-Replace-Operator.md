---
layout: post
title: "Working with PowerShell's -replace Operator"
date: 2019-03-20
categories: [PowerShell, Regex]
tags: [powershell, regex, operators, replace, match]
---

In case you couldn't already tell, I rather like playing around with regex in PowerShell.
There's something very enjoyable about poking it in _just_ the right way to get it to do exactly what you want.
I've already talked a bit about how we can use it to [create PSCustomObjects](/2018/11/08/Named-Regex-Matches-PSCustomObject/).

# Working with `-replace`

`-replace` is a very handy operator to have quick access to in PowerShell.
In its most basic usage, it allows you to swap out bits and pieces of text, or to remove unwanted pieces from a string.

```powershell
PS> $string = 'Glass half empty, glass half full.'
PS> $string -replace 'glass','cup'
cup half empty, cup half full.
PS> $string -replace '[^a-z]'
Glasshalfemptyglasshalffull
```

# Using Match Groups

With the use of parentheses to create a match group, `-replace` becomes even more powerful.
Stripping out everything from a string _except_ the one or two things we want is extremely simple.

```powershell
PS> $string = 'You lost your mind in the sound.'
PS> $string -replace '.*(\w+)\.','$1'
sound
```

There are two things to note in the above example.
First of all, that pattern would match the _entire_ string, so it would normally just remove the string.
Second, we _don't_ get the characters `$1` back in our result.

While that syntax might _look_ familiar to you from PowerShell's variables, don't be fooled.
This isn't PowerShell, at least not where it counts here.
PowerShell isn't processing that `$` symbol, and we don't want it to; that's why I used single quotes to create a literal string.

Instead, this string is given to the underlying regex method, which _does_ recognise it as a variable.
In this context, that variable refers to "the first match group".
Why is it 1-indexed, you might ask, when _literally everything else_ in PowerShell is 0-indexed?
Because `$0` is quietly _already taken_.

You might recall from my previous post on regex that PowerShell has a `$matches` variable, where `$matches[0]` refers to "the complete matched string".
It's the same thing here.

```powershell
PS> 'hello world' -replace '(\w+) \w+','$1 $0'
hello hello world
```

Note that the match group is respected, pulling the first word, and then the entire match is retrieved again and reinserted.
As you can imagine, this can be made incredibly complex and strange very quickly.
With a bit of tinkering and a careful eye, you can do some wonderful stuff with `-replace`!

# Named Match Groups

Bit of a theme with me, isn't it?
I love anything that can lend a little extra verbosity to a complicated regex pattern, a bit of self-documentation, if you will.

I was tinkering around with the above syntaxes for `-replace` (not `$0`, though, I hadn't realised that part until I started writing this post!) the other week, and got to wondering.
_Is_ there a syntax for inserting named match groups in a replace string?
It stands to reason that there _ought_ to be, doesn't it?
Nobody I asked knew a way, but then again, nobody could say for sure that it **couldn't** be done, either.

So, I got to tinkering.
My first attempt looked a bit like this:

```powershell
PS> $string = 'Hello darkness, my old friend.'
PS> $string -replace '(hello) (?<Item>Darkness)','$Item says $1'
$Item says Hello, my old friend.
```

Hmm. Okay, not quite there.
As expected, the unnamed group is noticed, but the named group is ignored.
A little bit more fiddling with the syntax, and I landed on the correct way to do it quite by accident.

```powershell
PS> $string -replace '(hello) (?<Item>Darkness)','${Item} says $1'
darkness says Hello, my old friend.
```

Yep.
That worked, very nicely.

So just remember: the temptation to obscure your code with regex is always there.
But you _have_ the tools available to make it that crucial bit more self-documenting, provided you name the bits and pieces effectively.
A well-named match string makes it entirely unnecessary to have those _four extra lines_ of comments attempting to explain what the heck is going on.

# Summary

When using `-replace` on a string, the following tokens hold special meaning in the replacement string.

| Symbol      | Meaning                                                                           |
| :---------- | :-------------------------------------------------------------------------------- |
| `$0`        | References the complete matched pattern.                                          |
| `$1` - `$n` | References the _unnamed_ match group from the pattern string, starting from `$1`. |
| `${Name}`   | References the specific _named_ match group from the pattern string.              |

Keep your code clear and clean.
It'll save you a great many headaches, **especially** when dealing with regex!

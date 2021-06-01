---
layout: post
title: Various Definitions of "Refactoring", 2nd ed.
---

> 5-year repost! I reference the [original post](https://jbazuzicode.blogspot.com/2014/03/various-definitions-of-refactoring.html) a lot, so I thought it would be a good candidate for reposting here on the new blog. I'm revising the text, but the core message is the same.

I've noticed that people use the word "Refactoring" to mean several different things. Each has different short- and long-term costs and risks, and each one is the right thing to do in some context. We're going to need to understand these different behaviors to be able to discuss them effectively.

# 0. Making the minimum necessary change (not refactoring).

Introduce a new behavior or fix a defect by _squeezing_ the change into the existing design.

This is often expedient and may feel safest, where "safety" = not breaking existing functionality, and not getting yelled at for introducing a defect. Sounds good in the short term, but if we keep this up then code complexity will grow, leading to more defects, and so less safety.

# 1. Doing more than the minimum necessary change.

You don't want to hack in your bug fix or new feature per #0. 

Maybe the code is already convoluted, making that work difficult, so you might untangle to make your life easier. Or maybe jamming things into the existing design would make the code more convoluted, and you don't want to do that. Maybe you live by the Campsite Motto: "Leave it better than you found it." 

So you clean things up at the same time as the fix or feature.

# 2. Cleaning up code.

You believe that "refactoring" is a different behavior than other coding activities, so you do it by itself.

This makes it easier for code reviewers / future programmers to understand the change, because cleanup and deliberate behavior change are not mixed together.

If you do it in small steps, it's even safer and even easier to understand.

Doing it in large steps sounds like "I've been refactoring all weekend and the code almost compiles again."

# 3. A highly disciplined process of known-safe code transformations.

Every programming language is a well-defined system of rules; within that system there are behavior-preserving transformations according to those rules.

You can learn techniques for doing these transformations by hand, often with the help of a compiler. Here's an example for [Extract Function in C++](https://github.com/InnovatingTeams/provable-refactorings/blob/master/recipes/core-6/extract-function/cpp.md).

# 4. Using mechanized refactoring tools.

For example, select a line of code, RClick, Extract Method in C# code in Visual Studio.

These are basically the recipes of #3, but executed by a computer. That is faster and even safer.

# Using these definitions.

Only #3 and #4 are safe enough that I do them without fear.

Some will say that #1 and #2 aren't "true refactoring". I understand why, but I find that arguing about definitions to be counterproductive and off-putting. I just want us to agree on our terms.

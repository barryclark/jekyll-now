A tale as old as XP...

> We think this unit testing thing is a great idea! We took at TDD class and we loved it. We wish we could do it on all of our code. Unfortunately we have legacy code, so there's no good way to write tests in many parts of the system. We'd like to refactor to make our code more testable, but the last time we tried that, we introduced some bugs and now the business thinks refactoring is dangerous and doesn't want us to do it any more. 
>
> We can't refactor safely without tests; we can't test without refactoring.
>
> We hope one day we can rewrite from scratch so we can do it right, test-first from the beginning. Until then, we'll just have to use integration tests and manual tests to find bugs, and hopefully we'll find enough that our customers don't abandon us.

I assert that tests are neither necessary nor sufficient to refactor safely.

You desperately want my first claim (not necessary)  to be true. Because you want to refactor, and you don't have tests, and adding tests is hard. This is why you want to read the article.

My second claim (not sufficient) is why this article matters. Because if tests are not sufficient to refactor safely, then we need a different strategy than relying on tests. Even with all the tests you wish you had, I'm asserting that you still need something else. Refactoring without this something else is dangerous, perhaps irresponsible, so we better figure it out. I'll start here, and then work my way back to the "necessary"  claim.

# We'll need some definitions.

To "refactor" is to change the internal structure of code without changing its external behavior. 

"Refactor safely" is redundant. I say "refactor safely" to differentiate from "I made a bunch of changes to the structure of the code, and the code is much cleaner now, and if I introduced any bugs, they'll be much easier to fix in this new structure." Introducing a bug a a change in external behavior, so it's not refactoring. This is "editing". "Refactor safely" means that you can be certain that you haven't changed the behavior.

When people talk about the "tests" they want in place for refactoring, they usually mean automated tests, often unit tests. That's fine. You can include manual testing in there if you want. No matter.

# An API parable.

Suppose you're writing a customer-facing API. Maybe you work on Windows at Microsoft, and the new API is for augmented reality. Or maybe the API lets enterprises more closely monitor the desktops deployed throughout their organization. Whatever.

Have you noticed how programmers learn APIs? We're pragmatic. We give documentation a quick glance and then dive in. We write some code to call the API and see what happens. Then we call it a different way. We keep trying things until we see the behavior we want. Then we build a business on top of it.

You, the author of the API, have written great tests and you feel confident that you can refactor safely. You clean up gunk. You eliminate duplication. You implement a design pattern you learned. Each step of the way you run your comprehensive unit test suite, and confidently check in under a green bar.

In that duplicate code there was a bug. 9 out of 10 instances had been updated at some point, but the 10th got missed. Blame [Shalloway](http://www.netobjectives.com/blogs/shalloways-law-and-shalloways-principle). There's a bug in there that you didn't know about, and when you DRY'd out the code you eliminated the bug, and reduced the likelihood of introducing future bugs when this needs to be edited again. That is awesome!

Unfortunately, a customer has a program that depends on that bug, and they've built their whole business around that program, and deployed to many computers and you've broken them. Their business is harmed. The reputation of your software is harmed, as is your reputation as a programmer. People start frowning every time you say you're refactoring. They don't want that hassle again.

Why didn't your tests catch this? You were so diligent in writing them. You carefully applied the [3 Rules of TDD](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd), never writing a line of code that was not required to make a unit test pass. You had extensive conversations with your domain expert or product owner and carefully enumerated all the acceptance tests that are needed. Where's the hole that let a bug slip through?

Here's the thing: we don't write tests for our bugs we don't know about. (We write them for our bug _fixes_, but not for the bugs themselves.)

# Any software

I used APIs in my example, but this can happen in any software where backwards compatibilty matters. Which is almost all software.

As programmers, we need a strategy for safely refactoring code that is bug-for-bug compatible, including bugs we don't know about and don't have tests for. Thorough tests don't make refactoring fully safe. 

# Necessary

Tests are not necessary to refactor safely because there's another way that is actually safe. 

Computer programming languages are rigorously defined, and usually have great specs that spell out the rules of the language in great detail. Within that system there exist known-safe, behavior-preserving transformations. 

Here's an example transformation, for Rename Local Variable in C#:

1. Build an AST for the function. Record what each identifier resolves to (a symbol table).
2. Replace the old variable name with the new variable name.
3. Build an AST for the function. Record what each identifier resolves to.
4. Compare the before and after symbol tables for the function.

Why do we build the AST twice and compare? Because there are cases where a rename might change how symbols resolve, which would change the meaning of a program. For example, a renaming a local variable `A` -> `B`, when the containing class has a field named `B` will change references to that field into references to the local variable. In some cases, these edge cases are quite subtle, but if we're going to maintain bug-for-bug compatibility, we're going to need to be thorough.

This is a recipe. You can follow it by hand, or you can automate it. These two approaches (tools and recipes) are really the same approach: a provably-correct, behavior-preserving transformation according to the rules of the language as defined in the language spec. A refactoring tool is a recipe written in software.

When we first wrote refactorings in Visual C# in the early 2000s, we assumed our users didn't have unit tests (because we didn't), and the only way they would trust our refactorings is if they were held to this standard of correctness.

There are no automated tools that will extract a method in C++ with complete reliability. Visual C++, ReSharper C++, Visual Assist - they all get it wrong some of the time, and sometimes in very pretty simple cases. That's why [this recipe](http://jay.bazuzi.com/Safely-extract-a-method-in-any-C++-code/) is so important. It will work even in the most dire situations, when the code is so terribly gnarly that no human brain can make sense of it. 


# What if tools aren't perfect?

It happens. Tools don't always get it right, either because they have a bug or because they weren't designed to that standard of correctness. Tools still have an advantage over conventional, undisciplined editing of code. 

- Tools are consistent. I make different mistakes every time I do something, but software makes the same mistakes each time. We can learn those limitations and learn techniques to compensate for them. For example, the C# Extract Method gets it wrong in [this one corner case](https://jbazuzicode.blogspot.com/2016/05/extract-method-introduces-bug-in-this.html). It's the only case I've found, and now you know about it.

- Tools can be fixed. We can open bug reports and they can be fixed. Humans are much harder to fix.

# Should we only ever refactor this way?

No.

You're a programmer, and you edit code all the time, with the risks that entails, and you don't have to give that up. But as I've developed my skills at refactoring over the years, I've found that I can quickly transform code with disciplined refactoring, so I'll use it whenever I can.When the tools are insufficient, I'll edit by hand, and call it out so my pair/mob/reviewer pays careful attention to the change.

#TL;DR:

Tests don't guarantee bug-for-bug compatibility of bugs you don't know about; disciplined refactoring does offer that guarantee.

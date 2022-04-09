---
layout: post
title: If you can't TDD, your code needs TLC
---

You have just completed Test-Driven Development Training with an excellent instructor.
The class was great and you feel like you really "get" TDD and how awesome it is.
You are ready to put it to work.
You are ready to preceed every behavior change with a test, and to refactor mercilessly under a green bar.
You try to apply your new TDD skills to real work and you run in to trouble.
Why is that?

# What is TDD?

Like many terms in our field, "TDD" means different things to different people.
In order to have a conversation about it with any chance of being useful, we need to know what we mean by "TDD".
For the sake of this article, we'll use the widely understood and documented red/green/refactor cycle:

**Red**: Write a test that describes the smallest new desired behavior that gets us closer to our goal, and watch it fail.

**Green**: Write just enough code to make the test pass. 

**Refactor**: Clean up the code, using the tests to ensure that behavior is preserved.

# Hyrum's Law and Test Incompleteness

Part of the power of TDD comes from the idea that it gives you comprehensive tests.
Because you always write a failing test before writing any code, and you only write enough code to make the test pass, you should always have comprehensive tests.
Those tests give you the confidence to refactor mercilessly, keeping the code as clean as possible.
The tests will verify that your refactorings are safe and correct.

That makes sense for new code, but it doesn't typically hold for existing code.
[Hyrum's Law](https://www.hyrumslaw.com/) says:

> With a sufficient number of users of an API,
> it does not matter what you promise in the contract:
> all observable behaviors of your system
> will be depended on by somebody.

Even if you have been diligent about writing tests for every case that matters, it's unlikely that you write tests for every *possible* case.
Once the code is in production, some of those cases might be important to some caller that you don't know about.
If your refactoring changes a behavior that someone cares about, it's not a refactoring.

Once code has shipped, we can't count on tests to make refactoring safe. We need a higher bar than "passes the tests".

# Gnarly Code

With gnarly code it's often hard to write a good test and then make it pass, and to do that in a short time window.
This breaks the TDD cycle.

For example, suppose I want to test a behavior that is the result of a dozen parts of the system working together.
It would be very difficult to write a small, targeted, independent test for that behavior.

I could write a test for each change in isolation:
Class `A` does the new thing, and I have a test for that.
Class `B` does the new thing and I have a test for that, too.
But this does not tell me if I missed the all-important class `J`.

Or suppose I want to change a few lines of code in a god class, or in a function that takes a god class as a parameter.
My test will need a lot of setup for the god class.
The test will take a lot of work to write, won't be readable, and will execute too much code, making it sensitive to unrelated changes.

In both of these cases, the approach we would take in Red/Green/Refactor TDD would be to write a test that takes a smaller step to get to green faster.
But in gnarly code we would take so much work to go from Red to Green that TDD stops being viable.

# TDD's Legacy Cousins

The challenges described by Hyrum's Law and the challenges of gnarly code make it difficult to apply TDD in legacy systems.
Developers working in these systems need a different set of tools to give them confidence in the changes they're making and express the same underlying values as TDD such as:

- working in tiny, safe increments
- fast feedback
- design feedback
- code cleanliness
- ending up with a comprehensive set of tests

We could call these tools "TDD's Legacy Counsins".

# TLC: Safe refactoring

Hyrum's Law and test incompleteness says we need a way to refactor that doesn't rely on tests to catch problems.
Yes, we love tests, but in this context tests aren't sufficient.
We need a higher bar of correctness than tests can offer, which won't allow behavior changes even in untested, unknown scenarios.

For that we use [Provable Refactorings](https://github.com/digdeeproots/provable-refactorings), Pair- and Ensemble Programming, and working in [tiny steps](https://wiki.c2.com/?RefactoringInVerySmallSteps).
We also use [Arlo's Commit Notation](https://github.com/RefactoringCombos/ArlosCommitNotation) to bring discipline and risk transparency to our work.

# TLC: Refactoring to testability

Just about any refactoring can make gnarly code more testable, but a few approaches stand out:

- Carving up a method for testability with [Peel and Slice refactorings](https://www.youtube.com/watch?v=sXqRWXWiXYo)
- Carving out good modules that a team can own and maintain independently.
With clean module and ownership boundaries, a team can be more aggressive about cleaning up code within those boundaries, and will reap the rewards of their investment.
- [Refactor for extensibility](https://jay.bazuzi.com/LOSOCS/) then add your new feature in a new module, where you are free to use TDD.
- Many of the refactorings in [Deep Roots' Legacy Code Book](http://learn.digdeeproots.com/cookbook/), especially [Enable Unit Testing](https://learn.digdeeproots.com/cookbook/enable-unit-tests/).

By [Jacqueline Bilston](https://twitter.com/jmasonlee) and Jay Bazuzi



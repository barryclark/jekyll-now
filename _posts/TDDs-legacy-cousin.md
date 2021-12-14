---
layout: post
title: TDDs Legacy Cousins
---
By [Jay Bazuzi]()  and  [Jacqueline Bilston](https://twitter.com/jmasonlee)


### This article is about TDD, and where it isn't useful. 

Like many terms in our field, "TDD" means different things to different people. In order to have a 
conversation about it with any chance of being useful, we need to know what we mean by "TDD".  For the
sake of this article, we'll use the widely understood and documented red-green-refactor cycle.

**Red**: Write a test that describes the smallest new desired behavior that gets us closer to our goal, and watch it fail.

**Green**: Write just enough code to make the test pass. 

**Refactor**: Make small, safe changes to the code to clean it up and help prepare for the next test

Each test should be easily readable by a human familiar with the problem domain, even if they're not a programmer. 
Tests should not execute a lot of code that is not relevant to the thing being tested, and only demand a small increase 
in capability of the system under test.

We love TDD, but there are certain contexts where it's not the right fit. 

## _Does this sound familiar?_

A company sends its engineers to Test-Driven Development training, but when they try to apply it 
to their real product code, they get stuck. This could be because of organizational or team-based issues, 
but even if the entire organization and team is dedicated to using TDD on their code, the code itself could be the blocker.

We know of two reasons that this might happen:

1. If the code is already being used, [Hyrum's law](https://www.hyrumslaw.com/) applies, and everything is a breaking change
2. If the code is too gnarly, it's difficult to take small steps.

## Hyrum's Law

![](https://imgs.xkcd.com/comics/workflow.png)

A story we sometimes tell with TDD is "because you diligently follow Red/Green, you are always free to Refactor to your heart's 
content. The tests will verify that your refactorings are safe/correct." Because you have tests for every intent you put in the
 code, as long as the tests still pass, the refactoring is legit.

### But that isn't true when callers of the code might do things you haven't thought of.

## Gnarly code

With gnarly code it's hard to write a good test and then make it pass with a small change.

Suppose I want to add a new feature which involves a dozen of changes all over the place. (This is the "Shotgun Surgery" code smell). 
There's no easy way to write a test for the new behavior. I could write a test for each change in isolation: Class `A` does the new 
thing, Class `B` does the new thing... but this test does not tell me if I missed the all-important Class `J`.

Or suppose I want to change a few lines of code in a god class, or in a function that takes a god class as a parameter. My test will
need a lot of setup for the god class, which menas it won't be readable, and will execute too much code. 

In both of these cases, the approach we would take in red-green-refactor TDD would be to write a test that takes a smaller step 
to get to green faster. On each cycle, the refactoring would move us a little closer to the design or feature that is too
complicated to implement in a single step.  This approach requires keeping track of the end goal, while writing code and somehow 
finding small steps that are smaller than the smallest one you can think of. 

### This is *very* hard.

## TDD's Legacy Cousins

Although Hyrum's Law and Gnarly Code can cause issues with TDD in any codebase, they are particulary prevalent in legacy systems. 
Developers working in these systems need a differents set of tools to give them confidence in the changes they're making, and to 
help make those changes easy. The tools we use in these cases don't precisely fit the red-green-refactor cycle, though they fit the
spirit of TDD. Because of this, we call them TDD's Legacy Cousins. We've collected

### Cousins for Gnarly code

| Pulling out hard-to-test code | [Peel & Slice refactoring](https://youtu.be/sXqRWXWiXYo) |
| Not sure what code does | Read by Refactoring & naming as a process |


### Cousins for Hyrum's Law


=== Pretty Sentences for blog ideas below ===

I need to refactor to bring related-but-dispersed behaviors together, and then I can write tests for my newly-cohesive code entity.

Or suppose I want to change a few lines of code in a god class, or in a function that takes a god class as a parameter. My test will need a lot of setup for the god class, which menas it won't be readable and will execute too much code. Same if the code I want to test has unwanted dependencies and I supply a bunch of mocks.

When we teach TDD, we write a few tests, get them to pass, and then when we are ready to refactor, we are counting on the tests that we have to tell us the refactoring is correct. 

TDD is not applicable for code that is already being used.
1. Code already being used
2. Code is too gnarly

I know a test I want to write and the test *really* doesn't fit with the existing code. What do you do: 
1. Write the test the wrong way with the current code, get it to pass and then refactor
2. Write a test that takes a smaller step to get to green faster. On each cycle, the refactoring moves you a little closer to having that feature
3. Refactor first so that the test you want to write is a small step

1. is common - hard & pins bad design in place by relying on nasty interfaces
2. is TDD - Requires keeping track of the end goal, while somehow finding small steps that are smaller than the smallest one you can think of. This is *very* hard.
3. is a legacy cousin - it's easier to do because following a string of small refactorings to make the desired behaviour easier to add relies on the developer's subconscious pattern recognition, reducing cognitive load.???? we aren't sure about this.

Everyone has a different definition of TDD, but a common one relies on the red-green-refactor cycle. Using a common definition through this art

Code is already being used.

insert xkcd comic here

```
FizzBuzzOf(1).Should().Be("1");

String FizzBuzzOf(int input)
{
	return "1";
}

---------- red

FizzBuzzOf(2).Should().Be("2");

--------- green

String FizzBuzzOf(int input)
{
    if input==2 return "2";
	return "1";
}

------- refactor

String FizzBuzzOf(int input)
{
    return input.ToString();
}

``` 

The refactor step doesn't preserve the behaviour of the existing code in the "real" world, 
but it is acceptable because in the universe where it is still being developed, we know all of the callers.

# Gnarly code

With gnarly code it's hard to write a good test and then make it pass with a small change.

Suppose I want to add a new feature which involves a dozen of changes all over the place. (This is the "Shotgun Surgery" code smell). There's no good way to write a test for the new behavior. I could write a test for each change in isolation: Class `A` does the new thing, Class `B` does the new thing... but this test does not tell me if I missed the all-important Class `J`. What's missing is cohesion. I need to refactor to bring related-but-dispersed behaviors together, and then I can write tests for my newly-cohesive code entity.

Or suppose I want to change a few lines of code in a god class, or in a function that takes a god class as a parameter. My test will need a lot of setup for the god class, which menas it won't be readable and will execute too much code. Same if the code I want to test has unwanted dependencies and I supply a bunch of mocks.

<link to Arlo's articles here>

# Code already in production

Hyrum's Law

![](https://imgs.xkcd.com/comics/workflow.png)

TDD promises that as long as you strictly follow the Red/Green/Refactor cycle, you can safely modify code and be sure that you're not breaking any existing behaviors, thanks to the excellent code coverage. For example, if you want to fix a bug, first write a test for the bug, then make the test pass, and then you're ready to ship.

Once code is being used by someone else (whether it's an API or a product feature or whatever), people might use the code in ways you didn't anticipate, and therefore don't have tests for. People don't usually read documentation, they just push buttons / call an API until they get a result they like.

Any behavior change you make might inadvertently break someone.

Therefore we need safe refactoring, to get to the point where new features can be added without modifying existing code. (Open/Closed Principle).

              
              
A story we sometimes tell with TDD is "because you diligently follow Red/Green, you are always free to Refactor to your heart's content. The tests will verify that your refactorings are safe/correct."

This story doesn't talk about language, tooling, recipes. Because you have tests for every intent you put in the code, as long as the tests still pass, the refactoring is legit.

But that isn't true when callers of the code might do things you haven't thought of.

This is why I say that TDD applies to New/Uncalled code.

One aspect of "TDD's Legacy Cousin" is that you can safely refactor in a way that won't break even callers you don't know about, until you get to a point where the new feature you're trying to write can be TDD'd as new code, without risk to existing callers. 

Suppose we use TDD to develop some new code from scratch. If we are diligent (only write code to satisfy a failing test) then the next time we change code, as long as the tests still pass, we know that we haven't broken anything by mistake. The tests describe the exact set of behaviors we intend to support.

But once that code gets used somewhere, the system or person that uses the code may use it in a way that we didn't anticipate. We won't have tests for those uses. 

If we then Red/Green/Refactor to add a new behavior (or fix a bug), our tests can pass but we may have broken the that user.

Even if we've been super-diligent with our TDD, we can still ship a bug.

In this situation we need a different tool.

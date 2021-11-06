A company sends its engineers to Test-Driven Development training, but when they try to apply it to their real product code it doesn't go well. I love TDD, but there are certain contexts it's not the right fit. Here are the ones I'm aware of, with better solutions.

The first step in TDD is "Red". Write a test that describes the new desired behavior. This test should be easily readable by a human familiar with the problem domain, even if they're not a programmer. This test should not execute a lot of code that is not relevant to the thing being tested. Each test should only demand a small increase in capability of the system under test.

# Gnarly code

With gnarly code it's hard to write a good test and then make it pass with a small change.

Suppose I want to add a new feature which involves a dozen of changes all over the place. (This is the "Shotgun Surgery" code smell). There's no good way to write a test for the new behavior. I could write a test for each change in isolation: Class `A` does the new thing, Class `B` does the new thing... but this test does not tell me if I missed the all-important Class `J`. What's missing is cohesion. I need to refactor to bring related-but-dispersed behaviors together, and then I can write tests for my newly-cohesive code entity.

Or suppose I want to change a few lines of code in a god class, or in a function that takes a god class as a parameter. My test will need a lot of setup for the god class, which menas it won't be readable and will execute too much code. Same if the code I want to test has unwanted dependencies and I supply a bunch of mocks.

<link to Arlo's articles here>

# Code already in production

Hyrum's Law

TDD promises that as long as you strictly follow the Red/Green/Refactor cycle, you can safely modify code and be sure that you're not breaking any existing behaviors, thanks to the excellent code coverage. For example, if you want to fix a bug, first write a test for the bug, then make the test pass, and then you're ready to ship.

Once code is being used by someone else (whether it's an API or a product feature or whatever), people might use the code in ways you didn't anticipate, and therefore don't have tests for. People don't usually read documentation, they just push buttons / call an API until they get a result they like.

Any behavior change you make might inadvertently break someone.

Therefore we need safe refactoring, to get to the point where new features can be added without modifying existing code. (Open/Closed Principle).


# Missing Modularity

Missing modularity is an important class of technical debt that has a big impact on an organization's ability to deliver. By "Missing modularity" I mean the situation where multiple teams need to work in the same code. If it's seen as "shared code" then typically no one will tend to it, allowing it to get steadily worse. If it's seen as "owned code", then the owning team must be vigilant to changes by other folks, and anyone changing this code must navigate the gauntlet of the owning team's approval. 

To keep code quality and productivity high, we need good modularity: I can build my feature without touching code that belongs to other teams, and other teams can build their feature without needing my permission.

<Diamond module picture>

<link to Arlo's articles here>




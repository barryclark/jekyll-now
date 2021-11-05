I love Test-Driven Development, but there are certain contexts it's not the right fit. Here are the ones I'm aware of, with better solutions.

The first step in TDD is "Red". Write a test that describes the new desired behavior. This test should be easily readable by a human familiar with the problem domain, even if they're not a programmer. This test should not execute a lot of code that is not relevant to the thing being tested. Each test should only demand a small increase in capability of the system under test.

# Gnarly code

Suppose I want to add a new feature. To do so involves a dozen of changes all over the place. (This is the "Shotgun Surgery" code smell). There's no good way to write a test for the new behavior. I could write a test for each change in isolation: Class `A` does the new thing, Class `B` does the new thing... but this test does not tell me if I missed the all-important Class `J`. 

Or suppose I want to change a few lines of code in a god class, or in a function that takes a god class as a parameter. My test will need a lot of setup for the god class, which menas it won't be readable and won't 



# Code already in production.

# Missing Modularity


---
layout: post
title: A Scala Functional Conway's Game of Life
---

A couple weekends ago, I participated in a Global Day of Coderetreat event in Boulder, CO. 
[Coderetreat](http://coderetreat.org/) is an all-day event where developers can practice techniques like pair 
programming, Test Driven Development, and [simple design](http://c2.com/cgi/wiki?XpSimplicityRules), while working
with peers on a common problem. The canonical problem for Coderetreat events is 
[Conway’s Game of Life](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), which has a nice size – not too 
simple and not too complex.

The participants in Boulder this year skewed towards Ruby and Javascript, but were very interested to try out 
Scala, so I did most of the day’s sessions (4 out of 5) in Scala. Most of these approaches skewed towards the 
object-oriented side of Scala, usually using algebraic data types with polymorphism to represent the possible 
states of cells in the simulation. With the final session of the day, my partner and I were able to tackle a more 
purely functional approach.

We started from a high-level test, using some well-known shapes – the block and the blinker, and then dove into 
lower-level tests for the individual steps in the algorithm. We knew we wanted to be based on transformation of 
a list of live cells, and that each cell would keep its own position but not directly track its neighbors, and 
that we would not have a direct notion of a “board” or “grid”, just keeping that information discoverable from 
the positions and the live list. We made pretty good progress generating the list of neighbors and augmenting 
the live list with this information.

I redid this approach and put the [results up on github](https://github.com/chrisphelps/funConway/blob/master/src/test/scala/FunConway.scala). It took me more than the allotted 45 minutes, 
but not more than about double that. The basic algorithm I used is:

1. Start with a list of live cells. Each cell is basically just a position, because we know they are all alive
2. Generate the list of all surrounding cells. These are the cells that may come to live due to the reproduction rule.
3. Combine the two lists, removing duplicates
4. For each cell in this list of candidate cells, determine if it is alive (it was in the list of live cells) and count its neighbors
5. For each cell in the list, apply the rules (based on current state and neighbor count) to decide if it should live or die
6. Filter the list to just the ones that live

Step two is a ```flatMap```, applying a function to generate neighbors. Step 4 is a ```map``` of the neighbor count and 
liveness check. Step 5 becomes the predicate used to filter in step 6. This whole sequence then becomes a 
function from one generation to the next generation, both expressed as lists of live cells.

While I found this interesting from a functional purity perspective, I didn’t feel like this was so successful 
from the TDD perspective. I never really felt like the tests were driving this approach. Nothing in the high-level 
tests encouraged us to use this algorithm, apart from the initial decision to represent the shapes as lists of 
live cells. These high level tests also didn’t really guide us in what to do first to make this work, so we very 
quickly moved to using lower-level tests. These tests helped us to make sure the result of a transformation were 
right, but we didn’t feel any particular guidance or pressure to tell us whether a transformation was inherently 
a map, filter, fold, or some other combinator. These tests were useful to help us make sure our solution worked 
in small pieces, but didn’t give us much vision of how the pieces would go together.

To be fair, we did start with an algorithm approach in mind, so trying to write tests to drive us in that direction 
was different from starting with less bias. We definitely did refactor much in this approach. Perhaps if we had 
started with something more like an “evil implementor” approach, where we direcly recognized shapes and returned 
canned responses, we might have arrived at a solution more organically.

Almost all my TDD experience has been in a more object-oriented context, so I’m more accustomed to thinking in 
those terms when seeing where a test drives the implementation. Perhaps as I gain more experience using tests to 
drive to functional solutions, I will understand better how tests guide a functional approach. As with other aspects 
of functional programming, there is a different way of thinking and approaching problems, that will likely play out 
in TDD as well.

---
layout: post
title: Learning Journal for September 23th
---
### Homework: Quality Analysis

## Quadrant of the matrix

 horizontal: Business Fancing: describing to a business expert.   
 
│Q1   Q2│
│Q3   Q4│   

horizontal: technology facing: talking to a product ***check detectors***

vertical left: Supporting programming-***integrate part of the act of programming***, preparing and reassuring, checked/coaching examples
vertical right: critique product-***finding inadequencies of a finished product***, 

## What is Quality?
1. value to some people
2. it can be political and emotional

## Quality in Business Fancing
1. Programmers need context, background, and tacit knowledge
2. To create story
   1. about the pacing of examples
   2. about the conversations around examples
   3. about the interaction between business-facing and technology-facing
   4. about how business-facing affects the architecture and design of the code
   5. about FIT (framework for integrated tests)
   6. about balancing examples and push the code forward
   7. about the distinction between checked detectors and checked examples
 
## business-facing product critiques
1. should be heavy on manipulation or approach the actual experience of different types of users
2. trying five kinds of exploratory testing
   1. one explaratory tester
   2. Pairs of exploratory testers
   3. Pairing an exploratory tester with a programmer on the project
   4. Pairing an exploratory tester with the on-project business expert
   5. Pairing an exploratory tester with interested non-participants ("chickens", in Scrum terminology) like executives, nearby users,   
      and so forth.
 3. explarotory testing: finding bugs & revealing bold new ideas

## technology-facing product critiques
1. finding security problems, performance problems, bugs that occur under load, usability problems
2. if necessary, finding specialists in these fields

### Java: Game
I have been asking about the structure questions of our Jag project, so I think it is time to iterate it.

We have two main packages: main and test, main for the commands, and the test for testing (following the Red-Green-Refactor loop).

In ***Main***
We have a folder Commands and other files under org.improving.tag > java.

To follow DIP(Dependencies Inversion Principle:depending upon abstractions, not concretions), the abstract class BaseEmoteCommand ***implements*** the interface Command and ***takes care of*** the conditions for the input and displaytext.



---
layout: post
title: Shapeless Generics
---

Just started reading the rather excellent [guide to shapeless](https://github.com/underscoreio/shapeless-guide). It is
a fantastic tutorial, with some great examples. For me to really understand something though I need to work
through an example myself, and I know many other people are the same, so, if you want to learn a bit about Shapeless
here is my challenge to you...

## The challenge
Write an encoder that takes a case class and returns a json string. It should work for Ints, Strings, Booleans, and
nested Case Classes.

## Tips
While a solution is provided I strongly recommend attempting this yourself - it is the best way to learn.

Some resources that will be helpful:
- Download the [shapeless guide](https://github.com/underscoreio/shapeless-guide)
  - Section 2 and 3 give a good overview of most of the concepts needed
  - Section 5.3 is helpful and includes tips on using LabelledGeneric, which is required to get the fieldnames from the
  case class

## The solution
You can find the solution in [the examples folder](https://github.com/timgent/timgent.github.io/examples/shapeless/json-encoding-with-shapeless).

Currently it is lacking in that it doesn't work for nested case classes with more than 1 field. I'll be revisiting
this to sort it out!

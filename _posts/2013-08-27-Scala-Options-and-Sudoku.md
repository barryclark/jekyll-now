---
layout: post
title: Scala Options and Sudoku
category: scala
tags: learning
---

Scala Options are a nice alternative to null values. They force us to consider the ```None``` case explicitly, rather than hiding in documentation, for example, the fact that a method can return ```null``` in some circumstances. They also tie in nicely to chained behavior, so that a sequence of operations that produce a ```None``` along the way can collapse to just the ```None```, similar to constructs such as Groovy’s elvis operator ```?:```.

I have been working through a sudoku solver as a Scala learning project. This solution is based on constraint propagation – eliminating possibilities and placing values in a mutually recursive relationship – and search, as described in [Peter Norvig’s article](http://norvig.com/sudoku.html). I wanted to distinguish between valid puzzle states (some or all values placed in the grid, but no conflicts) and contradictory states (trying to place a value in a position where it is not possible), using a construct in the type system, rather than using null as might be done in Java.

I thought an ```Option``` would be a good choice for this:

```scala
def placeConjecture(row:Int, col:Int, conjecture:Int): Option[SudokuGrid]
```

Placing a conjecture returns a new ```SudokuGrid``` with updated values, wrapped in an ```Option```. If the conjecture is possible, ```Some(newgrid)``` is retured, but if the conjecture leads to a contradiction, ```None``` is returned.

To build up a puzzle, for example establishing the starting state or just setting up a scenario for testing, it is necessary to place multiple conjectures. Without ```Option```, we’d use something like:

```scala
emptyGrid.placeConjecture(0,0,5)
  .placeConjecture(3,5,7)
  .placeConjecture(2,6,1)
```

With ```Option```, we have to account for the possibility of one of these ```placeConjecture``` calls returning ```None```. The ```Option``` object of course doesn’t have the placeConjecture method, so we need to extract the contained ```SudokuGrid``` in the case of ```Some(grid)```, or short-circuit and return ```None``` for the whole chain.

Having no idea how to go about this, I started with a simple case for tests:

```scala
emptyGrid.placeConjecture(0,0,5)
  .get
  .placeConjecture(3,5,7)
  .get
  .placeConjecture(2,6,1)
```

This obviously doesn’t handle propagation of the ```None``` value. For setting up some tests when I knew that no contradictions would arise, this sufficed, but was far from ideal.

One nice feature of ```Option```, is that as a monad (not that I completely understand the concept; have no fear that a monad post is coming), it can be used in a for comprehension. In this case, the chain of ```Option```s get passed through, evaluating to the final result when all the ```Option```s are ```Some()``` and short-circuiting to ```None``` if any of them are ```None```. So my attempt to use a for comprehension with this sequence looked something like this:

```scala
for {
    a <- empty.placeConjecture(0,0,5)
    b <- a.placeConjecture(3,5,7)
    c <- b.placeConjecture(2,6,1)
} yield c
```

This works fairly well for small examples like above, but it gets unwieldy quickly. It also doesn’t allow (at least, not that I could figure out) use of a generator to generate some of the values. I wanted to be able to place conjectures (or equivalently, eliminate possibilities) for a number of cells at once, and needed to determine how to make the results from one iteration carry into the next iteration, ideally without using a var.

After banging my head against this for a bit, I realized I was using the wrong approach. Rather than for comprehension, what I was really doing was combining results across a list – folding!

```scala
List((0,0,5),(3,5,7),(2,6,1)).foldLeft(Some(empty))(
    (gridopt,(row,col,conjecture)) => gridopt match {
        case None => None
        case Some(grid) => grid.placeConjecture(row,col,conjecture)
    })
```

The starting list contains the conjectures I want to place. Starting with an empty ```SudokuGrid```, the combination function calls the ```placeConjecture``` method on ```Some```s, passing the result on to the next iteration. When ```None``` is encountered, this gets passed the rest of the way along.

This approach then combines well with generating the list programmatically:

```scala
val thelist = for (i <- 1 to 8) yield i
thelist.foldLeft(Some(Empty))(
    (gridopt,poss) => gridopt match {
        case None => None
        case Some(grid) => grid.eliminatePossibility(0,0,poss)
    }
)
```

In the end, I decided that layering my semantics on top of ```Option``` wasn’t quite as expressive as I would like. Specifically, this approach means that the calling code needs to know that None means a contradictory puzzle state. I instead created an algebraic type with ```LiveSudokuGrid``` subclasses for non-contradictory states and a ```ContradictorySudokuGrid``` object subclass for contradictory states. By implementing ```placeConjecture``` and ```eliminatePossibility``` appropriately for the subtypes I can propagate the contradictory result across further calls. At some point I’ll try to make these monadic as an exercise, but that’s for another post!
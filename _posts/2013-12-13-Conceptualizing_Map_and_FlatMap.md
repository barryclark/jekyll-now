---
layout: post
title: Conceptualizing Map and FlatMap
---

I originally wrote this post for my friend Andrew's learning scala blog [Scala Eye for the Java Guy](http://scalaeyeforthejavaguy.blogspot.com/2013/12/conceptualising-map-and-flatmap.html). Reposting here to have it on my archives as well. A couple very minor edits only, and I've posted this with the same date as the original post.

---

In this guest post, I wanted to address a few thoughts about ```map``` and ```flatMap```. A number of types in the standard Scala libraries (so-called "monads", though there's a little more to monads than this - but this is not a monad post) have these helpful methods. Both ```map``` and ```flatMap``` are higher-order functions, meaning they take functions as arguments and apply these to the type's contents.

The first exposure most developers have to the map operation is in the context of a collection type. The ```map``` operation on a collection applies a mapping function to all the contents of the collection. Given a collection, for example a list, and a function, the function is applied to each element in the collection and a new collection made up of the results is returned. The mapping function takes a single argument, of the same type (or a supertype) of the collection contents, and returns a result, potentially of another type:

```scala
    scala> def myFun(x: Int) = x * x
    myFun: (x: Int)Int

    scala> List(1,2,3) map { myFun }
    res0: List[Int] = List(1, 4, 9)
```

This example shows a named function being passed to ```map```, but of course a lambda could be used as well:

```scala
    scala> List(1,2,3) map { x => x * x }
    res1: List[Int] = List(1, 4, 9)
```

We can also use the ```_``` placeholder, though I personally like to be slightly more explicit with my lambdas to maintain readability. Note that I am also using point-free notation for ```map``` and ```flatMap``` in all these examples, but the dotted calling style is perfectly valid as well.

Before going further, I'd like to comment on the naming of ```map``` and the relationship between the operation and the data type which shares this name. These two uses of “map” are slightly different, but there is a connection. First, the ```Map``` data type, as you likely know, is a type which contains key-value pairs. If you think about this slightly differently, this is a conceptual function which "maps" a relationship - given a key input, it produces a value output. The ```map``` operation applies a mapping function to values in a collection. You could even pass a ```Map``` data type to a map function to convert a collection of keys into a collection of values!:

```scala
    scala> val myMap = Map(1 -> 1, 2 -> 4, 3 -> 9)
    myMap: scala.collection.immutable.Map[Int,Int] = Map(1 -> 1, 2 -> 4, 3 -> 9)

    scala> List(1,2,3) map { myMap }
    res2: List[Int] = List(1, 4, 9)
```

Like ```map```, the first exposure to ```flatMap``` is usually in a collection context. Suppose instead of a squaring function that returns a single value, you have a mapping function that returns a list from a given input:

```scala
    scala> List(1,2,3) map { x => for {
         | y <- 1 to x toList
         | } yield y
         | }
    res3: List[List[Int]] = List(List(1), List(1, 2), List(1, 2, 3))
```

In this case, instead of a simple list ```List[Int]```, we got a nested list ```List[List[Int]]```! This may be what we want, but suppose we wanted to have a simple list. We can "flatten" this nested list, to remove a level of wrapping and give us a single list. ```flatMap``` does that for us in one step. So far so good:

```scala
    scala> List(1,2,3) flatMap { x => for {
         | y <- 1 to x toList
         | } yield y
         | }
    res4: List[Int] = List(1, 1, 2, 1, 2, 3)
```

So thinking about collections, it seems like we will be using the map operation much more frequently than we use the ```flatMap``` operation. After all, we are much more likely to use a function which gives us a single output for an input rather than one that creates nested collections. Again, we will have cases where we DO want that, but they are less common than the straightforward case.

But this isn't the case for other monad types. Let's look at the type ```Try```. The ```Try``` type is a type which represents an operation that can fail. ```Try``` has two values - ```Success(t)``` which contains a successful result ```t```; and ```Failure(ex)``` which contains an exception. In other words, instead of throwing the exception, we've grabbed it and stuffed it in a box. You don't know until you look in the box whether it contains the ```Success``` or the ```Failure``` (and you haven't jumped up the call stack to a catch clause). You can find out what is in the box with pattern matching:

```scala
    scala> def examine(myTry: Try[Int]): Int = {
         | myTry match {
         | case Success(t) => t
         | case Failure(e) => -1
         | }
         | }
    examine: (myTry: scala.util.Try[Int])Int
```

This is where I started to struggle to adapt my intuition of ```List``` ```map``` and ```flatMap```, to the ```Try``` ideas of ```map``` and ```flatMap```. So what would these mean? Map takes a function which takes a value (of type ```T```) and converts it to another value (of type ```U```, which may or may not be the same as type ```T```). Now ```map``` on ```Try``` has a specific behaviour guarantee: for ```Success``` values, it will call the function on the value in the ```Success```, and wrap the result back up in a ```Try```:

```scala
    case Success(t) => Try(f(t)) 
```

For a ```Failure```, it just returns ```this``` - in other words, it skips calling the function, and just returns the original failure:

```scala
    case Failure(e) => this
```

But what if our mapping function wants to be able to represent failures? It's not hard to imagine wanting to have a sequence of operations, each of which could throw some exception. The chain will return a value if all operations in the sequence are successful, or else return the first failure. We can do this by using ```map```. In this case, calling ```map``` on the first ```Try```, will call the mapping function, which itself returns a ```Try``` value, and wrap that in a ```Try``` value:

```scala
    scala> import scala.util.{Try, Success, Failure}
    import scala.util.{Try, Success, Failure}


    scala> def dangerOp1(i: Int): Try[Int] = {
         | if (i != 0) Success(i)
         | else Failure(new IllegalArgumentException)
         | }
    dangerOp1: (i: Int)scala.util.Try[Int]


    scala> val myTry = Success(5)
    myTry: scala.util.Success[Int] = Success(5)


    scala> myTry map { dangerOp1 }
    res5: scala.util.Try[scala.util.Try[Int]] = Success(Success(5))


    scala> val myTry2 = Failure(new NoSuchElementException)
    myTry2: scala.util.Failure[Nothing] = Failure(java.util.NoSuchElementException)


    scala> myTry2 map { dangerOp1 }
    res6: scala.util.Try[scala.util.Try[Int]] = Failure(java.util.NoSuchElementException)
```

So we've gone from ```Try[T]``` to ```Try[Try[T]]```, just because we wanted to be able to have our mapping function return some exception cases. This could easily get out of hand if we want to keep mapping more and more functions which could return exceptional cases with ```Try```! What can we do?

If we look back at our ```List``` example, we see that this is really the same case as when our mapping function itself returned a ```List```. There we went from ```List[T]``` to ```List[List[T]]```, while here we're going from ```Try[T]``` to ```Try[Try[T]]```. Our solution here is the same as it was there: we need to flatten a layer of nesting. We could take our first result, ```map``` our function, and then ```flatten``` the result, or we could do the ```map``` and the ```flatten``` in one step:

```scala
    scala> myTry flatMap { dangerOp1 }
    res7: scala.util.Try[Int] = Success(5)


    scala> myTry2 flatMap { dangerOp1 }
    res8: scala.util.Try[Int] = Failure(java.util.NoSuchElementException)
```

Learning ```map``` on ```List``` gave us this good (or at least, better) intuition for what mapping a higher order function onto that ```List``` means. But this didn't give us quite a rich enough intuition of what ```flatMap``` means. Applying functions that create lists to members of a list is just not a common enough pattern to really feel it in our bones. Other types, though, will give us the nested construction as our default pattern. It's quite easy, maybe even expected, to run a sequence of steps that each produce exceptions wrapped in ```Try```. A sequence of operations where each one may return an error value wrapped in the ```Option``` monad seems pretty likely. When we step up to doing asynchronous coding, we can easily envision combining a sequence of operations that will complete in the future, hooking each up to be run in sequence whenever the previous step completes, by using the ```Future``` monad. In all these cases, ```flatMap``` is a much more natural and basic operation than map, which would keep wrapping each step in another level of nesting. By studying ```map``` and ```flatMap``` in terms of these types, we can get a better intuitve feel for how these operations combine values of these types, rather than falling back to our ```List``` intuition of these operations.

All of this has nice implications for for-comprehensions, which rely heavily on ```flatMap``` internally. But let's leave that for further study, and maybe another post. 
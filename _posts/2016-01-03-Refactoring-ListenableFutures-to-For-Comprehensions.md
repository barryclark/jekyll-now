---
layout: post
title: Refactoring ListenableFutures to For-Comprehensions
category: scala
tags: refactoring, futures, syntax
---
I recently worked through a refactoring from [Guava ```ListenableFuture```](https://github.com/google/guava/wiki/ListenableFutureExplained) to Scala futures and [for-comprehensions](http://docs.scala-lang.org/tutorials/tour/sequence-comprehensions.html). This was an interesting example of how syntactic support in a language can drastically simplify code. Scala sometimes has a reputation of aiming for terseness over clarity, but there is a middle ground where boilerplate can be eliminated and essential logic can shine through.

#Context

I have an application which makes heavy use of ```ListenableFuture``` to orchestrate calls to collaborating microservices. I'm using [finagle](http://twitter.github.io/finagle/), though instead of using [Twitter's future](https://twitter.github.io/util/docs/#com.twitter.util.Future) we wrapped these with Guava ```ListenableFuture``` for various legacy reasons. The app is primarily Java, though a few bits are being rewritten in Scala. A simplified version of this app is presented here.

The app makes a call to a ```User``` service, and gets back a ```ListenableFuture<User>```. It then makes a call to an ```Item``` service to look up items for the user. This is accomplished by ```Futures.transform```, which takes a ```ListenableFuture``` and a function which will be called when the future succeeds.

<script src="https://gist.github.com/chrisphelps/2143a32b1bfbeb842143.js"></script>

The boilerplate for the transform is already getting significant. Out of 7 lines of code, only one expresses the actual work to be performed when the future succeeds. In my real app, I have places with 5 or more transformations, as I look up configuration information, pull data from various services, perform calculations to combine the information and provide other business value, and filter and otherwise prepare the results. This got out of hand quickly, and is always challenging code to debug or add to.

#Method

The first step of taking advantage of Scala, is of course to use Scala. I used IntelliJ's automated refactoring to convert my Java class to Scala. This does a reasonable 70% job of conversion, though a little more work is necessary to complete the translation. At this point I had basic Scala syntax but not much more benefit - we still have ```ListenableFuture``` and are calling the same transform API, requiring the creation of the same anonymous ```AsyncFunction``` classes.

To leverage Scala syntax we are going to need to use a class Scala can work with better than ```ListenableFuture```. The transform operations provided by Guava already seem to match pretty closely to the semantics of map and flatMap, so if we have a class which supplies those, we can use the for-comprehension syntax. Ideally we can just convert to using Scala (or Twitter) futures, but our supporting libraries are still returning ```ListenableFuture```.

In order to approach this in a top-down fashion, I used an implicit conversion. This allowed me to use ```ListenableFuture``` at lower levels, and just do the conversion where I'm working. By working outside-in I can get immediate benefit without needing to overhaul everthing. I can simplify in steps, eventually pushing the conversions down, perhaps even into the supporting libraries.

<script src="https://gist.github.com/chrisphelps/43fb1b2bd5d958728167.js"></script>

This conversion uses the standard trick of setting up a [```Promise```](http://docs.scala-lang.org/overviews/core/futures.html#promises), and wiring up callbacks to resolve that ```Promise```. When the ```ListenableFuture``` resolves, its success or failure callback will execute, resolving the ```Promise``` either as a success or failure. Further future operations can be done on the ```Future``` generated from this promise.

With this conversion in place, I can convert the ```ListenableFuture``` to Scala futures once needed. I did not make this a two-way conversion, so I can only convert to Scala, but this is acceptable as I can just use Scala idioms, including the final callbacks, instead of the ```ListenableFuture``` ones.

Finally comes the payoff: using for-comprehensions instead of transforms.

<script src="https://gist.github.com/chrisphelps/fa589d047ec550f13363.js"></script>

#Lessons

During this refactoring, I learned a few things.

## Nested vs sequential transformations

Inside every transformation, a single ```ListenableFuture``` is operated on. In the body of the apply method, the contents of that future are available as non-future values (as the future has resolved at the point the contents are executed), but if we have multiple futures we need them all to resolve before we can execute our business logic with all the values of those resolutions. That means if we have multiple futures, we need to nest the transformations. In our codebase, we hid most of those away in helper functions:

<script src="https://gist.github.com/chrisphelps/c7051ceddea09b0f45b0.js"></script>

This left us with a top-level algorithm specified in a sequence of non-nested transformations, with the details of nested transformations hidden away in functions. However, it had several downsides. First and most obviously, the creation of many functions to handle this chainging, and the corresponding loss of clarity. Secondly, the addition of boilerplate such as the final keyword. Third, and less obviously, is that we had many parts of the algorithm which relied on the same future value, like the ```Config``` in the example above. So we had many extra transformations as we continued to pass ```ListenableFuture<Config>``` instead of simply ```Config```.

Due to the way Scala for-comprehensions [desugar](https://gist.github.com/loicdescotte/4044169), all the steps in the comprehension are already nested. This allowed us to clean up a lot of these intermediate helper functions.

## Map vs FlatMap

As another effect of the nested for-comprehension, several of these steps lost their "future-ness" and no longer needed to be separate transform steps. Guava ```ListenableFuture``` allow transformations which either introduce more future operations (equivalent to ```flatMap```) or transformations which are "immediate" without adding more future (equivalent to ```map```). For-comprehensions, on the other hand are intrinsically based around ```flatMap``` (apart from the yield). 

As I did this refactoring, some steps simplified from returning ```ListenableFuture``` (because they were transforming on something like a ```ListenableFuture<Config>```) to just taking and returning plain values. These became ```map``` calls, rather than separate generators in the for-comprehension:

<script src="https://gist.github.com/chrisphelps/98ecd5fe4fc6887d07e2.js"></script>

## Sequential and parallel computing

I had known this before the refactoring, but I would be remiss in not mentioning that future-based generators in a for-comprehension do not run in parallel. Because of the way that ```flatMap``` works for ```Future```, each step does not run until the previous future is resolved successfully. This is great when steps in a for-comprehension are dependent on previous steps, but do not allow for parallelism. In order to parallelize, you need to start those steps before the comprehension.

## Testing

For this refactoring, unit tests did not help me very much. Because I had helper functions spread about, highly dependent on ```ListenableFuture```, there were few unit tests which exercised many of these helpers, and many of the ones that did used mocks to isolate steps. During this refactoring I had some units which helped make sure I didn't break the general flow, but not to give me confidence that the refactored logic still flowed correctly through all the steps.

However, I did have extensive integration tests, based in [Cucumber/Gerkhin](https://cucumber.io/) BDD format, which were helpful to ensure continued functioning of the final service. These tests, while slow and more manual to run during development (more on that another time), exercise the assembled service calling to collaborating services in our development environment, and do a sufficient job of ensuring that the refactored logic is correct.

# Final thoughts

This refactoring was rewarding and well worth the effort. I've been wanting to do this refactoring for quite a while, and am pleased with the outcome. The syntax support Scala provides for dealing with futures (and similar monadic types) is much easier to read, understand, and hopefully maintain. In total, the refactoring removed 25% more code than it added. This sets us up for subsequent rounds of refactoring and cleaning up a very involved aggregation service.





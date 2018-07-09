---
layout: post
title: To Lambda or Not to Lambda
---

Few months ago I worked on a project where one significant part was synchronizing the customer data. For the sake of simplicity and respecting my NDA, imagine we were updating menus of the restaurants that are using our platform.

## The problem

This synchronization task was configured to run every couple of hours and was about processing various events we get as an input (item added, item removed, item changed, price changed, etc.). Events we received were not grouped by restaurant, but by the zip code the restaurant was located at.

Now, I was investigating the issue where some event processing job of our system got stuck from time to time, causing menus for lot of restaurants were not updated properly. Digging for the root cause I noticed a lot of unchecked exceptions being logged during this process.

Simplified piece of code looked like this:
``` Java
if (shouldProcessEvents) {
    events.stream().parallel().foreach(this::processEvent);
}
notifyJobFinished(areaId);
```

The problem was this runtime exception happened in processEvent, more precisely it was a Feign error thrown since it was unable to get a valid response from another service. Since this error was unhandled, the sync job for the particular zip code was never marked as finished and seemed to be running forever. It might not have been that big deal if our logic for triggering the job wasn’t considering this flag whether to run the sync for that restaurant or not.

## It’s not about a solution

And we had a couple of ideas on how to fix this, but this post is not about the solution for this problem. It’s more like some kind of retrospective from my point of view: what led us to this problem, what have we learned and what should we do to prevent this happen again.

### On Lambdas

Lambda expressions brought a lot of freshness when they were introduced in Java 8. The biggest benefit I had from them is simplifying the code where I used to have anonymous classes defined for a more or less simple things. If you worked with Futures and synchronization, you know what I mean.

On the other hand, every time the new cool language feature is out developers seem eager to try it out (which is great) but often without really understanding it (really really bad). It’s just because it’s new, it’s cool and hyped.

The code snippet from above could be written with simple old for loop:
``` Java
if (shouldProcessEvents) {
    for (Event event : events) {
        this.processEvent(event);
    }
}
notifyJobFinished(areaId);
```

The benefit of going with lambda expression could be a more expressive and readable code. With simple `parallel()` from Stream API, we can split the whole process to be executed on multiple cores. But the downside is we can’t throw checked expression from `processEvent` without handling it in Lambda block.

``` Java
if (shouldProcessEvents) {
    events.stream().foreach(event -> {
      try {
        this.processEvent(event);
      } catch (EventException ex) {
        log.error("An error occurred while processing an event", ex);
        // recover from error
      }
    });
}
notifyJobFinished(areaId);
```
Now this piece of code doesn't look that fancy, right?

As you might already know, we have 2 types of exceptions in Java:
- checked, that need to be explicitly declared in method signature making the caller aware that a particular exception can be thrown
- unchecked (extended from Error and RuntimeException) are not checked at compile time

The rule from Java documents is:
> If a client can reasonably be expected to recover from an exception, make it a checked exception. If a client cannot do anything to recover from the exception, make it an unchecked exception.

In our case, it made sense to build more resilient and robust system - suspend the job temporarily if some of the services we depended on didn’t work. But being biassed by lambda hype we kind of missed it here and dug ourselves a hole that took us a couple of days to get out from.

## Few simple examples

In all the examples below, consider `condition` is set to `true`. I've put it there just to mimic the `shouldProcessEvents` condition from our case.

### Scenario 1: No exceptions are thrown from lambda expression:

``` Java
@Test
public void listStreamForeachNoExceptionInLambda() {
    if (condition) {
        List<Integer> ints = Arrays.asList(1, 2, 4, 5, 10);
        ints.stream().forEach(i -> print(50 / i));
    }

    log.info("Test finished");
}
```

This one gives us the expected output:
> 50
25
12
10
5
[INFO ] 2018-07-04 16:00:29.436 [main] TestLambdas - Test finished

Note: Here we used `forEach` from Stream API, but we would get the same results using the `forEach` defined in `Iterable` although those two might have different semantics.

### Scenario 2: A runtime exception is thrown from lambda expression:

``` Java
@Test
public void testUncheckedExceptionInLambda() {
    if (condition) {
        List<Integer> ints = Arrays.asList(1, 2, 4, 0, 5, 10);
        ints.stream().forEach(i -> print(50 / i));
    }

    log.info("Test finished");
}
```

Now, we all know that we'll get `ArithmeticException` if we try to perform `0 / 50`. But when developers are hasty to try new things, in their heads this runtime exception is magically handled in the lambda expression. And if not tested properly, it ends up in production.

The output:
> 50
25
java.lang.ArithmeticException: / by zero
at com.neperix.showcase.lambdas.TestLambdas.lambda$testUncheckedExceptionInLambda$2(TestLambdas.java:52)
	at java.util.Spliterators$ArraySpliterator.forEachRemaining(Spliterators.java:948)
	at java.util.stream.ReferencePipeline$Head.forEach(ReferencePipeline.java:580)
	at com.neperix.showcase.lambdas.TestLambdas.testUncheckedExceptionInLambda(TestLambdas.java:52)
	...

### Scenario 3:

``` Java
@Test
public void testUncheckedExceptionInLambdaWithParallelStream() {
    if (condition) {
        List<Integer> ints = Arrays.asList(1, 2, 4, 0, 5, 10);
        ints.stream().parallel().forEach(i -> print(50 / i));
    }

    log.info("Test finished");
}
```
The parallel stream is "better" than the plain stream in a sense that all the elements get processed. But please note that in neither of cases the final `Test finished` line wasn't printed out.

The output:
>25
10
50
5
12
java.lang.ArithmeticException
	at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
	at sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:62)
	at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
	at java.lang.reflect.Constructor.newInstance(Constructor.java:423)
	at java.util.concurrent.ForkJoinTask.getThrowableException(ForkJoinTask.java:598)
	at java.util.concurrent.ForkJoinTask.reportException(ForkJoinTask.java:677)
	at java.util.concurrent.ForkJoinTask.invoke(ForkJoinTask.java:735)
	at java.util.stream.ForEachOps$ForEachOp.evaluateParallel(ForEachOps.java:160)
	at java.util.stream.ForEachOps$ForEachOp$OfRef.evaluateParallel(ForEachOps.java:174)
	at java.util.stream.AbstractPipeline.evaluate(AbstractPipeline.java:233)
	at java.util.stream.ReferencePipeline.forEach(ReferencePipeline.java:418)
	at java.util.stream.ReferencePipeline$Head.forEach(ReferencePipeline.java:583)
	at com.neperix.showcase.lambdas.TestLambdas.testUncheckedExceptionInLambda(TestLambdas.java:52)

## Takeaways
- Don’t hesitate to use new language features, but make sure you understand how they work and if they really fit your need
- Don’t play with those features in production code. Instead, create a small separate project as a showcase.
- Stress test that pilot project with various test scenarios to get the most understanding on how those new features work.

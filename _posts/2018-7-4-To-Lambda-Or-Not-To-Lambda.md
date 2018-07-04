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
    events.stream().foreach(this::processEvent);
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

The benefit of going with lambda expression could be a more expressive and readable code, but the downside is we can’t throw checked expression from processEvent without handling it in Lambda block. which would make that particular code a bit “ugly”.

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

Exceptions in Java
As you might already know, we have 2 types of exceptions in Java:
- checked, that need to be explicitly declared in method signature making the caller aware that a particular exception can be thrown
- unchecked (extended from Error and RuntimeException) are not checked at compile time

The rule from Java documents is:
> If a client can reasonably be expected to recover from an exception, make it a checked exception. If a client cannot do anything to recover from the exception, make it an unchecked exception.

In our case, it made sense to build more resilient and robust system - suspend the job temporarily if some of the services we depended on didn’t work. But being biassed by lambda hype we kind of missed it here and dug ourselves a hole that took us a couple of days to get out from.

## Takeaways
Don’t hesitate to use new language features, but make sure you understand how they work and if they really fit your need
Don’t play with those features in production code. Instead, create a small separate project as a showcase. Stress test that pilot project with various test scenarios to get the most out of it.

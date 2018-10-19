---
title: Punch Complexity In The Face with RXJS
speaker: "@jwcarroll"
links:
  - Talk Link
  - Result Stack
  - "Zoe's Kitchen Web & Mobile?"
---

ReactiveX = Observer + Iterator + ...

### The Problem :

* The world trains us to be procedural...
* Applications are a soup of Dynamic Events
* Data over the web is Asynchronous (if you want an app people can use...)

# Solution 1: Callbacks

Starts simple but evolves into the "Callback Hell"

### Solution 2: Promises

Easy to read, flat callbacks.
* Immediate, no chance to change your mind.
* Single Value not data over time.

# Solution Today: Observe, Iterate, React

* UI events --> Observables --> Subscribe
* Combine Operators to work with a stream (over time)
  * time-series == static collections
* Subscribe to events at the end of the pipe.

RXJS-6 easy to create operators.  Observable --> Observable...

```
function (observer) {
    observer.next(1); //observer next is just a callback
    observer.next(2);  // a synchrous call if you need it.
    //TODO - unsubscribe with function
}
```
Operator takes a source Observable and returns New Observable.

e.g. filter (observable, predicate)  return observable(filterObserver)
returns the next,  that returns the value result from the predicate?

Observable = Contract Producer + Consumer

* next
* err
* complete
*
*

## In RXJS

* next:  gets value.  Required, handles things as long as there is a feed
* err: optional.  For reacting to problems
* complete: Done, Done.
* tap = Pass Through by returning input Observable,  and doing something else with value.
* pipeable : not the most readable.  so recommends to wrap as a Custom Operator to name it.
* take  - skip after a set
* scan - reduce for observables
* switch map - driving down the highway, jumping lanes into a different source of traffic.
  * keypress -> numbers -> lookup the starwars movie title at that index (via network)
* merge map - flat map aka smush map.  observable of observables and flattens to one stream
  * numbers -> merged to episode
  * episode -> list of planet (ids)
  * from (array) returns an observable (of planet ids)
  * planet id -> planet names
  * smushed to one result set...

## Rationale

Data + Events handled separately causes pain.
RXJS means SAME handling regardless.
* retryWhen  (e.g. Pause retry event e.g.) so handles things like keep pinging
until later.  

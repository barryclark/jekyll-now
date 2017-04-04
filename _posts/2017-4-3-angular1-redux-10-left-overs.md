---
layout: post
title: Using Redux to Decouple Angular 1.x - Part 10 Left-overs
---

We've worked through a lot. Redux is very power and nicely constrained. I
think it achieves its goal of transparency and consistency. I'd also add in magic
quadrant goals like "promotes cohesiveness and composition".

Awesome!

Even after all of that there are still a few more topics we never really touched on.

## Middleware
Redux has a vibrant community of middleware. You saw many examples of inspecting output from
[redux-logger](https://github.com/evgenyrodionov/redux-logger){:target="_blank"}
and [redux-perf-middleware](https://github.com/AvraamMavridis/redux-perf-middleware){:target="_blank"} 
tracking middleware. How about not having to implement undo/redo from scratch?!?! 
There is [redux-undo](https://github.com/omnidan/redux-undo){:target="_blank"} for that.
                     
Being able to add or create cross cutting concerns like these is very powerful. 
For example, I can imagine adding custom middleware for analytics tracking. 
Given that our business logic is so cleanly separated from our framework I can imagine this 
being super easy to understand and maintain.

## Smoothing out the Angular rough spots
It seems to me that many of the intricacies of Angular are mitigated. Digest issues nearly disappear.
We avoid `ngModel` and `ngChange`.

What is most appealing to me is how we extract business logic away from our framework into pure
javascript. It seems that this paves the road to migrating to another framework. The real value
in our code remains; clean, easily understood and very testable.

## Performance
But, how does this all perform? Standing on the shoulders of giants

* [An index of articles](http://redux.js.org/docs/faq/Performance.html){:target="_blank"}
* [Part 1](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs/){:target="_blank"}
and [Part 2](http://blog.mgechev.com/2015/04/11/immutability-in-angularjs-immutablejs-part-2/){:target="_blank"} 
of an in depth investigation to understand performance and memory pressure when using immutable.js in Angular 1.

## Resources
* [You Might Not Need Redux - Dan Ambramov](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367){:target="_blank"}
* [Egg Head Redux (FREE)](https://egghead.io/courses/getting-started-with-redux){:target="_blank"}
* [Development workflow with Redux DevTools](https://medium.com/@zalmoxis/improve-your-development-workflow-with-redux-devtools-extension-f0379227ff83#.azpoucmg4){:target="_blank"}
* [Nitty-gritty of Redux DevTools Config](https://github.com/zalmoxisus/redux-devtools-extension/issues/270){:target="_blank"}
* [Record and Replay Your Users In Production](https://logrocket.com/){:target="_blank"}
 
## Steps
* [01 - Setup]({{ site.baseurl }}{% post_url 2017-3-25-angular1-redux-01-introduction %})
* [02 - An action to select a member]({{ site.baseurl }}{% post_url 2017-3-26-angular1-redux-02-select-member %})
* [03 - An action to (un)select all members]({{ site.baseurl }}{% post_url 2017-3-27-angular1-redux-03-select-all %})
* [04 - Asynchronously add team members]({{ site.baseurl }}{% post_url 2017-3-28-angular1-redux-04-async-add-member %})
* [05 - Asynchronously remove team members]({{ site.baseurl }}{% post_url 2017-3-29-angular1-redux-05-async-remove-members %})
* [06 - Confirm removal]({{ site.baseurl }}{% post_url 2017-3-30-angular1-redux-06-confirm-remove %})
* [07 - Guarantee state predictability with Immutable.js]({{ site.baseurl }}{% post_url 2017-3-31-angular1-redux-07-immutablejs %})
* [08 - Pivoting state to match use]({{ site.baseurl }}{% post_url 2017-4-1-angular1-redux-08-pivoted-state %})
* [09 - Developers tools for inspection and replay]({{ site.baseurl }}{% post_url 2017-4-2-angular1-redux-09-devtools-debug-replay %})
* **10 - Left-overs**

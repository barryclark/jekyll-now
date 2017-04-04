---
layout: post
title: Using Redux to Decouple Angular 1.x - Part 01 - What Why How
---

Angular 1 is a widely adopted mess. A huge leap forward with
flexibility to quickly build complex applications. A lack of constraints making it easy to get in trouble. 
Stack Overflow is littered with Service vs Factory explanations. 

React, Polymer and the incompatible Angular 2 have had the luxury of learning from Angular 1's bravado.
They are tightly focused as their communities have reached for saner patterns.
So, if we wished to how could we migrate to one of these? Angular's 
mess is its tentacles. It is easily entrenched. 

Really, this is a question for any technology we adopt. It is inevitable
that we want or need to move on. We start extracting bits as we touch each, creating services and modules.
If we're lucky we just evolve. 

Unfortunately, front end work has some of the toughest challenges.
Its nature is of slowly evolving browsers from federated competitors each with their mutant implementations of standards.
A wide variety of robustness concerns. A history rooted in publishing.

State management, essentially business logic implementation, is consistently a challenge.
It is hard to know how to structure our code for an evolving user interface. Services and events
seem lacking. It is all too easy to tangle our domain with our framework.
 
While looking for options I kept 
stumbling across assertions that Redux, as widely adopted within the React world, 
brought simplification. Its stated goal is transparency and
predictability in context of state mutations. A couple of tutorials later and
I wondered if it could be "the" pattern for clear and "safe" refactoring of a legacy Angular 1 application. 

## But first, what is Redux?
#### It is state management with clear constraints
* Views trigger **actions**. They never directly mutate state.
* Pure, side effect free, **reducer** functions clone and recalculate a global **state**.
* Views render that state.
 
Note that the data flow is uni-directional. CQRS comes to mind.

![_config.yml]({{ site.baseurl }}/images/angular1-redux/flow.png)

The following is my exploration while developing a contrived sports team management page. Team
members can be added, selected and removed. 

![_config.yml]({{ site.baseurl }}/images/angular1-redux/angular1-redux.gif)

As we go along, typical
complexities will be introduced such as faked out asynchronous
ajax calls and confirmation steps so that we can see how they would
be handled in a Redux centric implementation. 

You can examine the presented code samples or follow along with the complete code example by getting setup. 

## Get setup
1. `git clone git@gitlab.com:rcotter-onbyone/angular-1-redux-blog.git`
1. `cd` into the directory
1. `git checkout 9273463e`
1. `npm install`
1. `gulp` to run
1. Open `http://localhost:3004`

You'll notice a minimal team management interface displaying three team members
that we'll build on. No actions yet exist. There are two Angular 1.5 
components: the high-level team page and its contained member table.

![_config.yml]({{ site.baseurl }}/images/angular1-redux/my_team_1.png)

## Supporting files 
* [app.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/blob/9273463eb092707644cc3decd860ae8bda50d99c/client/app/app.js){:target="_blank"} sets up [ngRedux](https://github.com/angular-redux/ng-redux){:target="_blank"} for our Angular application.
* [actions/team.actions.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/blob/9273463eb092707644cc3decd860ae8bda50d99c/client/app/actions/team.actions.js){:target="_blank"}
* [constants/team.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/blob/9273463eb092707644cc3decd860ae8bda50d99c/client/app/constants/team.js){:target="_blank"} linking action dispatches to reducers
* [reducers/index.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/blob/9273463eb092707644cc3decd860ae8bda50d99c/client/app/reducers/index.js){:target="_blank"} root reducer composing all Redux reducers together.
* [reducers/team.reducer.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/blob/9273463eb092707644cc3decd860ae8bda50d99c/client/app/reducers/team.reducer.js){:target="_blank"} reducers for our team management business logic.

## Steps
* **01 - Setup**
* [02 - An action to select a member]({{ site.baseurl }}{% post_url 2017-3-26-angular1-redux-02-select-member %})
* [03 - An action to (un)select all members]({{ site.baseurl }}{% post_url 2017-3-27-angular1-redux-03-select-all %})
* [04 - Asynchronously add team members]({{ site.baseurl }}{% post_url 2017-3-28-angular1-redux-04-async-add-member %})
* [05 - Asynchronously remove team members]({{ site.baseurl }}{% post_url 2017-3-29-angular1-redux-05-async-remove-members %})
* [06 - Confirm removal]({{ site.baseurl }}{% post_url 2017-3-30-angular1-redux-06-confirm-remove %})
* [07 - Guarantee state predictability with Immutable.js]({{ site.baseurl }}{% post_url 2017-3-31-angular1-redux-07-immutablejs %})
* [08 - Pivoting state to match use]({{ site.baseurl }}{% post_url 2017-4-1-angular1-redux-08-pivoted-state %})
* [09 - Developers tools for inspection and replay]({{ site.baseurl }}{% post_url 2017-4-2-angular1-redux-09-devtools-debug-replay %})
* [10 - Left-overs]({{ site.baseurl }}{% post_url 2017-4-3-angular1-redux-10-left-overs %})
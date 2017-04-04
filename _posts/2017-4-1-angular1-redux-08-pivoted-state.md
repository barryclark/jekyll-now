---
layout: post
title: Using Redux to Decouple Angular 1.x - Part 08 - Pivoting state to match use
---

### Follow along: [git diff ac6699aa..4f6fac1c](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/ac6699aa...4f6fac1c){:target="_blank"}
     
Dan Abramov, the creator of Redux presented his idea of state normalization. His insight is
that how data is perfectly stored or transmitted is often not convenient for use. This reminds
me of the juxtaposition between normal formed data as popular in relational data modeling vs 
NOSQL database modeling. The gist is that data can have many perspectives.

Dan takes his idea to an extreme with [normalizr](https://github.com/paularmstrong/normalizr){:target="_blank"}.

For example, our APIs often return a collection of items as an array. This
appeals to our sense of order. Then we often render that array on a web
page. Still an array seem accurate. As soon as we sort
items, the array no longer matters. It is just a container for items. 

Next, we often operate on a single item at a time. We edit an item. We remove an item. Often,
this results repeated look-ups. A hash, keyed on the right detail, makes sense. 

Lets work through an example starting by pivoting our team member's states from
```javascript
members: [
 {id: "1", ...},
 {id: "2", ...},
 {id: "3", ...}
]
```
to
```javascript
members: {
 "1": {id: "1", ...},
 "2": {id: "2", ...},
 "3": {id: "3", ...} 
}
```
This affects our reducers. The member selected reducer starts as
```javascript
case TEAM.MEMBER_SELECTED:
  const selectedIndex = state
                          .get('members')
                          .findIndex(m => m.get('id') == action.member.get('id'));
 
  return state.withMutations(state => {
    state
      .set(
        'selectedCount', 
        state.get('selectedCount') + (action.selected ? 1 : -1)
      )
      .setIn(
        ['members', selectedIndex, 'selected'], 
        action.selected
      )
    });
```
and becomes
```javascript
case TEAM.MEMBER_SELECTED:
  return state.merge({
    selectedCount: state
                     .get('selectedCount') + (action.selected ? 1 : -1),
    members: state
               .get('members')
               .setIn(
                 [action.member.get('id'), 'selected'], 
                 action.selected
               )
  });
```
We no longer have to iterate the array of members to find the one we want to select. 
We just look it up!
     
## Steps
* [01 - Setup]({{ site.baseurl }}{% post_url 2017-3-25-angular1-redux-01-introduction %})
* [02 - An action to select a member]({{ site.baseurl }}{% post_url 2017-3-26-angular1-redux-02-select-member %})
* [03 - An action to (un)select all members]({{ site.baseurl }}{% post_url 2017-3-27-angular1-redux-03-select-all %})
* [04 - Asynchronously add team members]({{ site.baseurl }}{% post_url 2017-3-28-angular1-redux-04-async-add-member %})
* [05 - Asynchronously remove team members]({{ site.baseurl }}{% post_url 2017-3-29-angular1-redux-05-async-remove-members %})
* [06 - Confirm removal]({{ site.baseurl }}{% post_url 2017-3-30-angular1-redux-06-confirm-remove %})
* [07 - Guarantee state predictability with Immutable.js]({{ site.baseurl }}{% post_url 2017-3-31-angular1-redux-07-immutablejs %})
* **08 - Pivoting state to match use**
* [09 - Developers tools for inspection and replay]({{ site.baseurl }}{% post_url 2017-4-2-angular1-redux-09-devtools-debug-replay %})
* [10 - Left-overs]({{ site.baseurl }}{% post_url 2017-4-3-angular1-redux-10-left-overs %})

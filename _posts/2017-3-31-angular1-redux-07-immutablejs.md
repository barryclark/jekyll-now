---
layout: post
title: Using Redux to Decouple Angular 1.x - Part 07 - Guarantee state predictability with Immutable.js
---

### Follow along: [git diff 3b707fd4..ac6699aa](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/3b707fd4...ac6699aa){:target="_blank"}
     
As previously mentioned, Redux is about transparency and predictability. Thus
we implemented our reducers such that we never mutate state. We clone, change and then re-assemble.

Of course we'll write tests. We could use [deep-freeze](https://www.npmjs.com/package/deep-freeze){:target="_blank"}
to prove our intent is respected.

Wouldn't it be nice if it were nearly impossible to accidentally mutate state? Happily Facebook 
created [immutable.js](https://facebook.github.io/immutable-js/){:target="_blank"} to do just that
while being very robust. Let's try it out.

At first glance its API is a little daunting but quickly becomes pleasurable with
all of its useful helpers. Essentially, all of our raw javascript state objects
get wrapped. Any changes generate new objects. 

Let's look at the reducer for member selection to get a sense of immutable.js' impact. 

From:
```javascript
case TEAM.MEMBER_SELECTED:
  const selectedIndex = state.members.indexOf(action.member);

  return Object.assign({}, state,
    {
      selectedCount: state.selectedCount + (action.selected ? 1 : -1),
      members: [
        ...state.members.slice(0, selectedIndex),
        Object.assign({}, action.member, 
          {
            selected: action.selected
          }),
        ...state.members.slice(selectedIndex + 1)
      ]
    }
  );
```
To
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

Notice that immutable.js provides nice helpers like `setIn`. Importantly,
the line `state.withMutations` is like a database transaction scope
so that multiple state changes can be made without the repeated overhead
of generating a whole new state object for each individual change.

Well, this is neat. On one hand we get a lot more safety. On the other we
introduce what seems to be a bit heavy weight of a tool.
 
How does this work with Angular? Some of the articles in [Left-overs]({{ site.baseurl }}{% post_url 2017-4-3-angular1-redux-10-left-overs %})
dive deep into performance. To summarize, it works out pretty good. 

The key is
that as we mutate state using immutable.js the new objects that are generated, by definition,
have new references.
The ones that do not change retain their references. Let's work through an example:

If we start with an array of objects references

```
REF_0 = [REF_1, REF_2, REF_3, REF_4, REF_5]
```

and REF_4 gets mutated the result will be

```
REF_6 = [REF_1, REF_2, REF_3, REF_7, REF_5]
```

Note that not only does `REF_4` become `REF_7` but also the overall array reference `REF_0` becomes
`REF_6`. 

Any Angular binding quickly knows whether it should proceed any further down the state
graph by comparing the reference it currently has with the one it is given. Contents
do not need to be checked unless the parent reference is new. This makes re-rendering
very efficient.


## Steps
* [01 - Setup]({{ site.baseurl }}{% post_url 2017-3-25-angular1-redux-01-introduction %})
* [02 - An action to select a member]({{ site.baseurl }}{% post_url 2017-3-26-angular1-redux-02-select-member %})
* [03 - An action to (un)select all members]({{ site.baseurl }}{% post_url 2017-3-27-angular1-redux-03-select-all %})
* [04 - Asynchronously add team members]({{ site.baseurl }}{% post_url 2017-3-28-angular1-redux-04-async-add-member %})
* [05 - Asynchronously remove team members]({{ site.baseurl }}{% post_url 2017-3-29-angular1-redux-05-async-remove-members %})
* [06 - Confirm removal]({{ site.baseurl }}{% post_url 2017-3-30-angular1-redux-06-confirm-remove %})
* **07 - Guarantee state predictability with Immutable.js**
* [08 - Pivoting state to match use]({{ site.baseurl }}{% post_url 2017-4-1-angular1-redux-08-pivoted-state %})
* [09 - Developers tools for inspection and replay]({{ site.baseurl }}{% post_url 2017-4-2-angular1-redux-09-devtools-debug-replay %})
* [10 - Left-overs]({{ site.baseurl }}{% post_url 2017-4-3-angular1-redux-10-left-overs %})


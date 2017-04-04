---
layout: post
title: Using Redux to Decouple Angular 1.x - Part 02 - An action to select a member
---

### Follow along: [git diff 9273463e..eb2c62fa](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/9273463e...eb2c62fa){:target="_blank"}

Lets start by letting a user select a member. Later we'll use this to choose
which members to remove. 

![_config.yml]({{ site.baseurl }}/images/angular1-redux/angular1-redux-02.gif)

### Add a checkbox for each member
Open `member-table.html` and you'll see new checkbox inputs bound to state and click events:
```javascript
ng-click="$ctrl.checkClicked(member)"
ng-checked="member.selected"
```
Note that we're purposely not using `ngModel` and `ngChange` since those are designed to mutate
state inline. As you'll see, that is not the Redux way. Incidentally, we've also added
a 'select all' checkbox in the table header.

Now of course we must provide state to bind to and handle our `checkClicked` handler.
Open and review [member-table.controller.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/9273463e...eb2c62fa){:target="_blank"}. 
Since this is our first close look there are a few details to note.

First, `ngRedux` is wired up with our team management Redux actions. This binds
our actions to `this` of the component, providing a clean way to access them. 
This also grants access to our calculated Redux state. We'll never
modify it within our component but we'll inspect and render it.
```javascript
import TeamActions from '../../actions/team.actions';

class MemberTableController {
  constructor($ngRedux) {
    this.members = [];
    this.unsubscribe = $ngRedux.connect(
      this.mapStateToThis, 
      TeamActions
    )(this);
  }

  $onDestroy() {
    this.unsubscribe();
  }

  // Map our state for convenience in the HTML template.
  mapStateToThis(state) {
    return {
      members: state.team.members,
      allSelected: state.team.members.length == state.team.selectedCount
    };
  }
}

MemberTableController.$inject = ['$ngRedux'];
```
Now it is time to handle our checkbox click. In Redux, all state mutation
is handled in reducers. We must dispatch an action with any needed context
so that they can do their calculations.
```javascript
checkClicked(member) {
  this.selectMember(member, !member.selected);
}
```
This might feel icky or heavy weight at first but reserve your judgement for now.
Do notice how light this component remains. There is zero business logic. 
Any responsibility is quickly delegated out to Redux.

It is worth pointing out that this is an application level component that has 
intimate knowledge of Redux. We wouldn't write a truly re-usable component like a 
date picker in this manner. It would be written traditionally and its bindings
would be orchestrated by an app specific component like this one.

The action is not Redux magic - we need to write it!

Start with constant. This isn't critical but is a nice safety. The following
is added to [constants/team.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/9273463e...eb2c62fa){:target="_blank"}
```javascript
export const TEAM = {
  MEMBER_SELECTED: 'MEMBER_SELECTED'
};
```
...and our first action is set up in [team.actions.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/9273463e...eb2c62fa){:target="_blank"}. The action
must return `type` and the rest is the context you need in any format you like.
```javascript
import {TEAM} from '../constants/team';

function selectMember(member, selected) {
  return {
    type: TEAM.MEMBER_SELECTED,
    member: member,
    selected: selected
  }
}

export default {
  selectMember
};
```
Now we set up our first reducer to inject this context and mutate the application's
state. We also set up some default state. Of course, this would normally
be retrieved from your server.
```javascript
import randomName from 'node-random-name';
import uuid from 'node-uuid';

import {TEAM} from '../constants/team';

const initialState = {
  name: 'My Team',
  selectedCount: 0,
  members: [
    {
      id: uuid.v4(),
      name: randomName({random: Math.random})
    },
    {
      id: uuid.v4(),
      name: randomName({random: Math.random})
    },
    {
      id: uuid.v4(),
      name: randomName({random: Math.random})
    }
  ]
};

export default function TeamReducer(state = initialState, action) {
  switch (action.type) {

    case TEAM.MEMBER_SELECTED:
      const selectedIndex = state.members.indexOf(action.member);

      return Object.assign({}, state,
        {
          selectedCount: state.selectedCount + (action.selected ? 1 : -1),
          members: [
            ...state.members.slice(0, selectedIndex),
            Object.assign({}, action.member, {selected: action.selected}),
            ...state.members.slice(selectedIndex + 1)
          ]
        }
      );

    default:
      return state;
  }
}
```
The reducer quickly looks up the reduction by it's constant. What is particularly
interesting is that the state mutation is absolutely safe. Any pieces
that are being changed are first cloned. 

Remember that reducers are expected to be
pure, side effect free functions. This concept is borrowed
from functional programming. No observers have to worry about whether state
can change without them polling what they've been given. 

New state is re-assembled with unchanged state. References don't change unless
they need to, acting as a clear indicator to components that a re-render is required.

To pick out a couple of specific details for those new to ES6 the line
`...state.members.slice` expands an existing array which is a really convenient way of 
constructing an array from parts of an old one. The line
```javascript
Object.assign({}, action.member, {selected: action.selected})
```
is a way to merge objects. In this case the first object is empty, thus the
result is a new object with its inherent new reference.

Finally, the mutated state is returned. Thinking back to our component that is
wired up to `ngRedux`, it immediately receives our new state and through object
reference evaluation decides whether render.

It sure seems like a lot of boiler plate. But the pattern is super clean and
consistent.

## Debugging

You may have noticed we installed some [logging](https://www.npmjs.com/package/redux-logger){:target="_blank"}
and [performance](https://www.npmjs.com/package/redux-perf-middleware){:target="_blank"} middleware. Open
your inspector tab as you toggle team member selection.

![_config.yml]({{ site.baseurl }}/images/angular1-redux/inspect-02.gif)

This makes it very easy to understand how our application works even
if it is already very complicated. Exciting! 

## Steps
* [01 - Setup]({{ site.baseurl }}{% post_url 2017-3-25-angular1-redux-01-introduction %})
* **02 - An action to select a member**
* [03 - An action to (un)select all members]({{ site.baseurl }}{% post_url 2017-3-27-angular1-redux-03-select-all %})
* [04 - Asynchronously add team members]({{ site.baseurl }}{% post_url 2017-3-28-angular1-redux-04-async-add-member %})
* [05 - Asynchronously remove team members]({{ site.baseurl }}{% post_url 2017-3-29-angular1-redux-05-async-remove-members %})
* [06 - Confirm removal]({{ site.baseurl }}{% post_url 2017-3-30-angular1-redux-06-confirm-remove %})
* [07 - Guarantee state predictability with Immutable.js]({{ site.baseurl }}{% post_url 2017-3-31-angular1-redux-07-immutablejs %})
* [08 - Pivoting state to match use]({{ site.baseurl }}{% post_url 2017-4-1-angular1-redux-08-pivoted-state %})
* [09 - Developers tools for inspection and replay]({{ site.baseurl }}{% post_url 2017-4-2-angular1-redux-09-devtools-debug-replay %})
* [10 - Left-overs]({{ site.baseurl }}{% post_url 2017-4-3-angular1-redux-10-left-overs %})




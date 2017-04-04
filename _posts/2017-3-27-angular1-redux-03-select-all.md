---
layout: post
title: Using Redux to Decouple Angular 1.x - Part 03 - An action to (un)select all members
---

### Follow along: [git diff eb2c62fa..f27e55a4](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/eb2c62fa...f27e55a4){:target="_blank"}

Remember that header checkbox? Up until now it  has correctly reflected
its current state but clicking it had no effect. That's alright. We were
smart enought to disable it. Let enable it and make it useful.

![_config.yml]({{ site.baseurl }}/images/angular1-redux/angular1-redux-03.gif)

We'll start in the [template](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/eb2c62fa...f27e55a4){:target="_blank"}:
```javascript
ng-click="$ctrl.allSelectedClicked()"
ng-disabled="false"/>
```
and add our handler in the [member-table.controller.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/eb2c62fa...f27e55a4){:target="_blank"}
```javascript
allSelectedClicked() {
  this.selectAllMembers();
}
```
then set up the corresponding action in [team.actions.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/eb2c62fa...f27e55a4){:target="_blank"}. 
This time no extra context is needed.
```javascript
function selectAllMembers() {
  return {
    type: TEAM.MEMBERS_ALL_SELECTED
  }
}
```
hop over add the just used constant in [constants/team.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/eb2c62fa...f27e55a4){:target="_blank"}
```javascript
MEMBERS_ALL_SELECTED: 'MEMBERS_ALL_SELECTED'
```
finally add a reduction in [team.reducer.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/eb2c62fa...f27e55a4){:target="_blank"} 
that toggles the `selected` state for every member and sets the `selectedCount` to zero or the current number of members.
```javascript
export default function TeamReducer(state = initialState, action) {
  switch (action.type) {
    case TEAM.MEMBER_SELECTED:
      ...
      
    case TEAM.MEMBERS_ALL_SELECTED:
      const members = state.members;
      const allSelected = state.selectedCount == members.length;

      return Object.assign({}, state,
        {
          selectedCount: (allSelected ? 0 : members.length),
          members: members.map(m => Object.assign(
                                      {}, 
                                      m, 
                                      {selected: !allSelected}))
        }
      );

    default:
      return state;
  }
}
```
That was simple!

Now our state looks like
```javascript
{
  name: 'My Team',
  selectedCount: 0, // or 3
  members: [
    {
      id: uuid.v4(),
      name: randomName({random: Math.random}),
      selected: false // or true
    },
    {
      id: uuid.v4(),
      name: randomName({random: Math.random}),
      selected: false
    },
    {
      id: uuid.v4(),
      name: randomName({random: Math.random}),
      selected: false
    }
  ]
}
```
Watch it in action

![_config.yml]({{ site.baseurl }}/images/angular1-redux/angular1-redux-03b.gif)

## Steps
* [01 - Setup]({{ site.baseurl }}{% post_url 2017-3-25-angular1-redux-01-introduction %})
* [02 - An action to select a member]({{ site.baseurl }}{% post_url 2017-3-26-angular1-redux-02-select-member %})
* **03 - An action to (un)select all members**
* [04 - Asynchronously add team members]({{ site.baseurl }}{% post_url 2017-3-28-angular1-redux-04-async-add-member %})
* [05 - Asynchronously remove team members]({{ site.baseurl }}{% post_url 2017-3-29-angular1-redux-05-async-remove-members %})
* [06 - Confirm removal]({{ site.baseurl }}{% post_url 2017-3-30-angular1-redux-06-confirm-remove %})
* [07 - Guarantee state predictability with Immutable.js]({{ site.baseurl }}{% post_url 2017-3-31-angular1-redux-07-immutablejs %})
* [08 - Pivoting state to match use]({{ site.baseurl }}{% post_url 2017-4-1-angular1-redux-08-pivoted-state %})
* [09 - Developers tools for inspection and replay]({{ site.baseurl }}{% post_url 2017-4-2-angular1-redux-09-devtools-debug-replay %})
* [10 - Left-overs]({{ site.baseurl }}{% post_url 2017-4-3-angular1-redux-10-left-overs %})



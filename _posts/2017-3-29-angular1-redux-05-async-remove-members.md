---
layout: post
title: Using Redux to Decouple Angular 1.x - Part 05 - Asynchronously remove team members
---

### Follow along: [git diff 38449f6b..c60e6bec](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/38449f6b...c60e6bec){:target="_blank"}

Carrying on, we'll quickly enable removing team members.

![_config.yml]({{ site.baseurl }}/images/angular1-redux/angular1-redux-05.gif)

We add a remove button to [team-page.html]((https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/38449f6b...c60e6bec){:target="_blank"})
```javascript
<div class="action-bar">
  ...
  <button ng-if="1 <= $ctrl.selectedCount && 0 == $ctrl.addingCount"
          ng-click="$ctrl.removeMembersClicked()"
          ng-disabled="$ctrl.inProgress">
    Remove {{$ctrl.selectedCount}} Member(s)
  </button>
</div>
```
And the corresponding handler to the [team-page.controller.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/38449f6b...c60e6bec){:target="_blank"}. 
```javascript
class TeamPageController {
  removeMembersClicked() {
    this.removeMembers();
  }
}
```
The same use of [redux-thunk](https://github.com/gaearon/redux-thunk){:target="_blank"}
middleware as was used for adding gets used for these remove [actions](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/38449f6b...c60e6bec){:target="_blank"}.
```javascript
function removeMembers() {
  return function (dispatch) {
    dispatch(removingMembers());

    setTimeout(
      () => {
        dispatch(membersRemoved())
      },
      3000
    );
  };
}

function removingMembers() {
  return {
    type: TEAM.REMOVING_MEMBERS
  }
}

function membersRemoved() {
  return {
    type: TEAM.MEMBERS_REMOVED
  }
}
```
and [reducers](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/38449f6b...c60e6bec){:target="_blank"} 
to respond to the actions. Removing members is as simple as discarding them when reconstructing the state.
```javascript
case TEAM.REMOVING_MEMBERS:
  return Object.assign({}, state,
    {
      inProgress: true
    });

case TEAM.MEMBERS_REMOVED:
  return Object.assign({}, state,
    {
      inProgress: false,
      selectedCount: 0,
      members: state.members.filter(m => !m.selected)
    });
```

## Steps
* [01 - Setup]({{ site.baseurl }}{% post_url 2017-3-25-angular1-redux-01-introduction %})
* [02 - An action to select a member]({{ site.baseurl }}{% post_url 2017-3-26-angular1-redux-02-select-member %})
* [03 - An action to (un)select all members]({{ site.baseurl }}{% post_url 2017-3-27-angular1-redux-03-select-all %})
* [04 - Asynchronously add team members]({{ site.baseurl }}{% post_url 2017-3-28-angular1-redux-04-async-add-member %})
* **05 - Asynchronously remove team members**
* [06 - Confirm removal]({{ site.baseurl }}{% post_url 2017-3-30-angular1-redux-06-confirm-remove %})
* [07 - Guarantee state predictability with Immutable.js]({{ site.baseurl }}{% post_url 2017-3-31-angular1-redux-07-immutablejs %})
* [08 - Pivoting state to match use]({{ site.baseurl }}{% post_url 2017-4-1-angular1-redux-08-pivoted-state %})
* [09 - Developers tools for inspection and replay]({{ site.baseurl }}{% post_url 2017-4-2-angular1-redux-09-devtools-debug-replay %})
* [10 - Left-overs]({{ site.baseurl }}{% post_url 2017-4-3-angular1-redux-10-left-overs %})



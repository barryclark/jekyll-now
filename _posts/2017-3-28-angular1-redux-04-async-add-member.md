---
layout: post
title: Using Redux to Decouple Angular 1.x - Part 04 - Asynchronously add team members
---

### Follow along: [git diff f27e55a4..38449f6b](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/f27e55a4...38449f6b){:target="_blank"}

This time let's do something a bit more real world. We'll use a button to add a new member using an asynchronous
server call simulated with a timer. While the call is in progress a nice little progress
indicator will be displayed. Multiple requests simultaneously in flight will be counted and shown.

![_config.yml]({{ site.baseurl }}/images/angular1-redux/angular1-redux-04.gif)

Checkout the action bar added to the [team-page.html](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/f27e55a4...38449f6b){:target="_blank"}.
```javascript
<div class="action-bar">
  <button ng-if="0 == $ctrl.selectedCount"
          ng-click="$ctrl.addMemberClicked()">
    Add Member
  </button>

  <div class="adding-count" ng-if="0 < $ctrl.addingCount">
    Adding {{$ctrl.addingCount}}
  </div>

  <div class="waiting" ng-if="0 < $ctrl.addingCount"></div>
</div>
```
We add our button handler to [team-page.controller.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/f27e55a4...38449f6b){:target="_blank"}
and map the resulting state.
```javascript
class TeamPageController {
  addMemberClicked() {
    this.addMember()
  }

  mapStateToThis(state) {
    return {
      teamName: state.team.name,
      addingCount: state.team.addingCount,
      selectedCount: state.team.selectedCount,
      inProgress: state.team.inProgress
    };
  }
}
```
Now the real fun. Async! Open up [team.actions.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/f27e55a4...38449f6b){:target="_blank"}. 
We already added [redux-thunk](https://github.com/gaearon/redux-thunk){:target="_blank"}
middleware to let us use its **dispatch** function, orchestrating asynchronous API calls.

In the following code we first dispatch an action indicating that the
process to begin adding a member has now begun. Once the API call
returns another action is dispatched to indicate that the member is now added.
```javascript
function addMember() {
  return function (dispatch) {
    dispatch(addingMember())

    setTimeout(
      () => {
        dispatch(memberAdded())
      },
      3000
    );
  };
}

function addingMember() {
  return {
    type: TEAM.ADDING_MEMBER
  }
}

function memberAdded() {
  return {
    type: TEAM.MEMBER_ADDED
  }
}
```
The reducers respond to their respective actions. Note how **inProgress**
and **addingCount** will support our progress indicators.
```javascript
case TEAM.ADDING_MEMBER:
  return Object.assign({}, state,
    {
      inProgress: true,
      addingCount: state.addingCount + 1
    });

case TEAM.MEMBER_ADDED:
  const addingCount = state.addingCount - 1;

  return Object.assign({}, state,
    {
      inProgress: 0 < addingCount,
      addingCount: addingCount,
      members: [
        ...state.members,
        createMember()
      ]
    });
```

## Steps
* [01 - Setup]({{ site.baseurl }}{% post_url 2017-3-25-angular1-redux-01-introduction %})
* [02 - An action to select a member]({{ site.baseurl }}{% post_url 2017-3-26-angular1-redux-02-select-member %})
* [03 - An action to (un)select all members]({{ site.baseurl }}{% post_url 2017-3-27-angular1-redux-03-select-all %})
* **04 - Asynchronously add team members**
* [05 - Asynchronously remove team members]({{ site.baseurl }}{% post_url 2017-3-29-angular1-redux-05-async-remove-members %})
* [06 - Confirm removal]({{ site.baseurl }}{% post_url 2017-3-30-angular1-redux-06-confirm-remove %})
* [07 - Guarantee state predictability with Immutable.js]({{ site.baseurl }}{% post_url 2017-3-31-angular1-redux-07-immutablejs %})
* [08 - Pivoting state to match use]({{ site.baseurl }}{% post_url 2017-4-1-angular1-redux-08-pivoted-state %})
* [09 - Developers tools for inspection and replay]({{ site.baseurl }}{% post_url 2017-4-2-angular1-redux-09-devtools-debug-replay %})
* [10 - Left-overs]({{ site.baseurl }}{% post_url 2017-4-3-angular1-redux-10-left-overs %})


---
layout: post
title: Using Redux to Decouple Angular 1.x - Part 06 - Confirm removal
---

### Follow along: [git diff c60e6bec..3b707fd4](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/c60e6bec...3b707fd4){:target="_blank"}

Now we implement our last feature. It would make sense to have the user
confirm any member removals so we'll insert a confirmation dialog.

![_config.yml]({{ site.baseurl }}/images/angular1-redux/angular1-redux-06.gif)

Starting at the remove button we change the [handler](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/c60e6bec...3b707fd4){:target="_blank"}.
```javascript
 removeMembersClicked() {
-    this.removeMembers();
+    this.removeMembersRequiresConfirmation();
}
```
and add this new [action](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/c60e6bec...3b707fd4){:target="_blank"}
```javascript
function removeMembersRequiresConfirmation() {
  return {
    type: TEAM.REMOVE_MEMBERS_REQUIRES_CONFIRMATION
  }
}
```
with the corresponding [reducer](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/c60e6bec...3b707fd4){:target="_blank"}. 
It introduces a new state detail `confirm` that
indicates whether confirmation is currently being presented. 
```javascript
case TEAM.REMOVE_MEMBERS_REQUIRES_CONFIRMATION:
  return Object.assign({}, state, {confirm: true});
```
and [team-page.html](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/c60e6bec...3b707fd4){:target="_blank"} 
then displays a new confirmation component accordingly.
```javascript
<confirm ng-if="$ctrl.confirm"></confirm>
```

This new `confirm` component confusingly just wraps
the standard [confirm](https://www.w3schools.com/jsref/met_win_confirm.asp){:target="_blank"} popup.
Open [confirm.controller.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/c60e6bec...3b707fd4){:target="_blank"}
and view the following. 
```javascript
class ConfirmController {
  $onInit() {
    if (confirm("You sure you want to remove these members?")) {
      this.removeMembers();
    } else {
      this.removeMembersCancelled();
    }
  }
}
```
The action `removeMembers()` that we removed from [team-page.controller.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/c60e6bec...3b707fd4){:target="_blank"} 
is now here and a new action to cancel the removing of members has been added.

Reviewing the [reducers](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/c60e6bec...3b707fd4){:target="_blank"}
again we see how the new state detail `confirm` is 
manipulated and particularly how it was added to `TEAM.REMOVING_MEMBERS`.
```javascript
case TEAM.REMOVE_MEMBERS_REQUIRES_CONFIRMATION:
  return Object.assign({}, state, 
    {
      confirm: true
    });

case TEAM.REMOVE_MEMBERS_CANCELLED:
  return Object.assign({}, state, 
    {
      confirm: false
    });

case TEAM.REMOVING_MEMBERS:
  return Object.assign({}, state,
    {
       confirm: false,
       inProgress: true
    });
```

We are now feature complete!

The next steps iterate over the current application trying out some interesting ideas. 

## Steps
* [01 - Setup]({{ site.baseurl }}{% post_url 2017-3-25-angular1-redux-01-introduction %})
* [02 - An action to select a member]({{ site.baseurl }}{% post_url 2017-3-26-angular1-redux-02-select-member %})
* [03 - An action to (un)select all members]({{ site.baseurl }}{% post_url 2017-3-27-angular1-redux-03-select-all %})
* [04 - Asynchronously add team members]({{ site.baseurl }}{% post_url 2017-3-28-angular1-redux-04-async-add-member %})
* [05 - Asynchronously remove team members]({{ site.baseurl }}{% post_url 2017-3-29-angular1-redux-05-async-remove-members %})
* **06 - Confirm removal**
* [07 - Guarantee state predictability with Immutable.js]({{ site.baseurl }}{% post_url 2017-3-31-angular1-redux-07-immutablejs %})
* [08 - Pivoting state to match use]({{ site.baseurl }}{% post_url 2017-4-1-angular1-redux-08-pivoted-state %})
* [09 - Developers tools for inspection and replay]({{ site.baseurl }}{% post_url 2017-4-2-angular1-redux-09-devtools-debug-replay %})
* [10 - Left-overs]({{ site.baseurl }}{% post_url 2017-4-3-angular1-redux-10-left-overs %})

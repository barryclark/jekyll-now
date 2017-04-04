---
layout: post
title: Using Redux to Decouple Angular 1.x - Part 09 - Developers tools for debugging and replay
---

### Follow along: [git diff 4f6fac1c..6a50e04f](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/4f6fac1c...6a50e04f){:target="_blank"}

...and now it gets really fun. Rewind! Playback!

![_config.yml]({{ site.baseurl }}/images/angular1-redux/angular1-redux-09.gif)

I installed the [Chrome Redux DevTools extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=gmail){:target="_blank"}
and scoured the internet for how to make my Angular app work with with it. 

Looking inside the setup of [app.js](https://gitlab.com/rcotter-onbyone/angular-1-redux-blog/compare/4f6fac1c...6a50e04f){:target="_blank"} 
the third parameter of the store creation
looks for the Chrome extension and sets up a custom monitor I'll explain shortly.
```javascript
angular
  .module('app', [...])
  .config((..., $ngReduxProvider) => {
    $ngReduxProvider.createStoreWith(
      ...,
      ...,
      [
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({
          getMonitor: (monitor) => { DevToolsConfig.devToolsIsPlayingBack = monitor.isMonitorAction; }
        }) : f => f
      ]
    );
  .run(['$ngRedux', '$rootScope', '$timeout', ($ngRedux, $rootScope, $timeout) => {
    //To reflect state changes when disabling/enabling actions via the monitor
    //there is probably a smarter way to achieve that
    $ngRedux.subscribe(() => {
      $timeout(() => {$rootScope.$apply(() => {})}, 100);
    });
  }])
  .component('app', AppComponent);
```
Maybe it is not production ready but I finally got it!

Now just open the `Redux` tab in `Chrome DevTools` and view your state changes as you 
use your app. Even more fun, your state changes get recorded and you can play them 
back!

Your state is being used to drive the app. No button clicks or user actions
are being triggered. ...but ajax will be re-triggered. However, it will be ignored.
It's results will not modify the recorded state. I imagined it would make 
a mess backend data. Thus, I introduced a couple of discrete workarounds to detect 
when the code is being exercised by state playback and in those case skip over ajax calls.

This is a pretty powerful tool. For a great debugging demo [watch this video](https://www.youtube.com/watch?v=xsSnOQynTHs){:target="_blank"}

There are even third party tools that let you capture your user's state, serialize it and play it back locally.

## Steps
* [01 - Setup]({{ site.baseurl }}{% post_url 2017-3-25-angular1-redux-01-introduction %})
* [02 - An action to select a member]({{ site.baseurl }}{% post_url 2017-3-26-angular1-redux-02-select-member %})
* [03 - An action to (un)select all members]({{ site.baseurl }}{% post_url 2017-3-27-angular1-redux-03-select-all %})
* [04 - Asynchronously add team members]({{ site.baseurl }}{% post_url 2017-3-28-angular1-redux-04-async-add-member %})
* [05 - Asynchronously remove team members]({{ site.baseurl }}{% post_url 2017-3-29-angular1-redux-05-async-remove-members %})
* [06 - Confirm removal]({{ site.baseurl }}{% post_url 2017-3-30-angular1-redux-06-confirm-remove %})
* [07 - Guarantee state predictability with Immutable.js]({{ site.baseurl }}{% post_url 2017-3-31-angular1-redux-07-immutablejs %})
* [08 - Pivoting state to match use]({{ site.baseurl }}{% post_url 2017-4-1-angular1-redux-08-pivoted-state %})
* **09 - Developers tools for inspection and replay**
* [10 - Left-overs]({{ site.baseurl }}{% post_url 2017-4-3-angular1-redux-10-left-overs %})

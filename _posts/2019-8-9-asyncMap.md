---
layout: post
title: asyncMap
date: 2019-08-09
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Implement the function asyncMap. AsyncMap has two parameters, an array of asynchronous functions (tasks) and a callback.
---

### 문제

Implement the function asyncMap:

asyncMap has two parameters, an array of asynchronous functions (tasks) and a callback.
Each of the tasks takes a separate callback and invokes that callback when complete.

The callback passed to asyncMap is then performed on the results of the callbacks of the tasks.

The order of these results should be the same as the order of the tasks.
It is important to note that this is not the order in which the tasks return, but the order in which they are passed to asyncMap.
Once all the callbacks of the tasks are returned, asyncMap should invoke the callback on the results array.

### 풀이

```javascript
var asyncMap = function(tasks, callback) {
  let promises = [];
  for (let i = 0; i < tasks.length; i++) {
    let promise = new Promise(tasks[i]);
    promises.push(promise);
  }
  Promise.all(promises).then(value => callback(value));
};
```

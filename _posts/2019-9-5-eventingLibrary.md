---
layout: post
title: eventingLibrary
date: 2019-09-05
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation,
---

### 문제

Make an eventing system mix-in that adds .trigger() and .on() to any input object.

Example usage:

```javascript
var obj = mixEvents({ name: "Alice", age: 30 });
obj.on("ageChange", function() {
  // On takes an event name and a callback function
  console.log("Age changed");
});
obj.age++;
obj.trigger("ageChange"); // This should call our callback! Should log 'age changed'.
```

Caveats:

- mixEvents should return the original object it was passed after extending it.
- If we repeatedly call .on with the same event name, it should continue to call the old function as well. That is to say, we can have multiple listeners for an event.
- If `obj.trigger` is called with additional arguments, pass those to the listeners.
- It is not necessary to write a way to remove listeners.

### 풀이

```javascript
var mixEvents = function(obj) {
  obj.on = (name, cb) => {
    if (obj[name]) {
      obj[name] = obj[name].concat([cb.bind(obj)]);
    } else {
      obj[name] = [].concat([cb.bind(obj)]);
    }
  };
  obj.trigger = (name, ...args) => {
    if (obj[name]) {
      obj[name].forEach(func => func(...args));
    }
  };
  return obj;
};
```

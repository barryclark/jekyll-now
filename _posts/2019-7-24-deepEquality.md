---
layout: post
title: deepEquality
date: 2019-07-24
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Write a function that, given two objects, returns whether or not the two are deeply equivalent
---

### 문제

Write a function that, given two objects, returns whether or not the two are deeply equivalent--meaning the structure of the two objects is the same, and so is the structure of each of their corresponding descendants.

### 풀이

```javascript
var deepEquals = function(apple, orange) {
  let isDeepEequals = true;
  function compare(obj1, obj2) {
    if (typeof obj1 === "object" && typeof obj2 === "object") {
      let keysOfObj1 = Object.keys(obj1);
      let keysOfObj2 = Object.keys(obj2);
      if (keysOfObj1.length !== keysOfObj2.length) {
        isDeepEequals = false;
        return;
      } else {
        if (keysOfObj1.length === 0) {
          return;
        }
        for (let i = 0; i < keysOfObj1.length; i++) {
          if (obj2[keysOfObj1[i]]) {
            compare(obj1[keysOfObj1[i]], obj2[keysOfObj1[i]]);
          } else {
            isDeepEequals = false;
            return;
          }
        }
      }
    } else {
      if (obj1 !== obj2) {
        isDeepEequals = false;
        return;
      } else {
        return;
      }
    }
  }
  compare(apple, orange);
  return isDeepEequals;
};
```

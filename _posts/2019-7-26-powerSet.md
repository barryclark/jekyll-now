---
layout: post
title: powerSet
date: 2019-07-26
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Return an array with the power set of a given string. Definition of power set. The set of all possible subsets including the empty set.
---

### 문제

Return an array with the power set of a given string. Definition of power set: The set of all possible subsets including the empty set.

### 풀이

```javascript
var powerSet = function(str) {
  let arr = str.split("");
  let setArr = [""];
  const isIncluded = str => {
    let reversed = str
      .split("")
      .reverse()
      .join();
    if (setArr.includes(str) || setArr.includes(reversed)) {
      return true;
    }
    return false;
  };
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < setArr.length; j++) {
      if (!setArr[j].includes(arr[i])) {
        temp = arr[i] + setArr[j];
        if (!isIncluded(temp)) {
          setArr.push(temp);
        }
      }
    }
  }
  return setArr;
};
```

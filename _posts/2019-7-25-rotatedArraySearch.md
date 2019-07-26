---
layout: post
title: rotatedArraySearch
date: 2019-07-25
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Given a sorted array that has been rotated some number of items right or left, i.e. [0, 1, 2, 3, 4, 5, 6, 7] might become [4, 5, 6, 7, 0, 1, 2, 3]
---

### 문제

Given a sorted array that has been rotated some number of items right or left, i.e. [0, 1, 2, 3, 4, 5, 6, 7] might become [4, 5, 6, 7, 0, 1, 2, 3] how can you efficiently find an element? For simplicity, you can assume that there are no duplicate elements in the array.

rotatedArraySearch should return the index of the element if it is in the array and should return null otherwise.

### 풀이

```javascript
var rotatedArraySearch = function(rotated, target) {
  if (rotated[0] === target) {
    return 0;
  }
  if (rotated.length - Math.abs(target - rotated[0]) > 0) {
    if (rotated[0] < target) {
      return target - rotated[0];
    }
    if (rotated[0] > target) {
      return rotated.length - Math.abs(target - rotated[0]);
    }
  }
  return null;
};
```

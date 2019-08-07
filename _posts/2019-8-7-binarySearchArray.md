---
layout: post
title: binarySearchArray
date: 2019-08-07
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Given a sorted array, find the index of an element using a binary search algorithm.
---

### 문제

Given a sorted array, find the index of an element using a binary search algorithm.

### 풀이

```javascript
var binarySearch = function(array, target) {
  let index = 0;
  const bs = (min, max) => {
    let center = Math.floor((max + min) / 2);

    if (array[center] === target) {
      index = center;
      return;
    } else if (center === 0 || center === array.length - 1) {
      index = null;
      return;
    } else if (array[center] < target) {
      if (max - center === 1) {
        bs(max, max);
      } else {
        bs(center, max);
      }
    } else {
      if (center - min === 1) {
        bs(min, min);
      } else {
        bs(min, center);
      }
    }
  };
  bs(0, array.length - 1);
  return index;
};
```

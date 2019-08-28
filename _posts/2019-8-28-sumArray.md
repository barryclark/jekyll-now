---
layout: post
title: sumArray
date: 2019-08-28
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Given an array of numbers, calculate the greatest contiguous(not be off) sum of elements in array. A single array item will count as a contiguous sum.
---

### 문제

Given an array of numbers, calculate the greatest contiguous(not be off) sum of elements in array.
A single array item will count as a contiguous sum.

### 풀이

```javascript
var sumArray = function(array) {
  let sums = [];
  const greatestSum = index => {
    let sum = 0;
    for (let i = index; i < array.length; i++) {
      sum += array[i];
      if (!sums[index] || sums[index] < sum) {
        sums[index] = sum;
      }
    }
    if (index === array.length - 1) {
      return;
    }
    greatestSum(index + 1);
  };
  greatestSum(0);
  return Math.max.apply(null, sums);
};
```

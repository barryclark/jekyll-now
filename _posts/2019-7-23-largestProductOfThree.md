---
layout: post
title: largestProductOfThree
date: 2019-07-23
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Write a function that finds the largest possible product of any three numbers from an array.
---

### 문제

Write a function that finds the largest possible product of any three numbers from an array.

### 풀이

```javascript
var largestProductOfThree = function(array) {
  producOfThree = function(array_three) {
    let largestProduct = array_three.reduce((accu, curr) => {
      return accu * curr;
    }, 1);
    return largestProduct;
  };
  let sortedArr = array.sort(function(a, b) {
    return Math.abs(b) - Math.abs(a);
  });
  let negative = sortedArr.filter(e => e < 0);
  let positive = sortedArr.filter(e => e >= 0);
  if (negative.length === 0) {
    return producOfThree(positive.slice(0, 3));
  } else if (positive.length === 0) {
    return producOfThree(negative.slice(-3));
  } else {
    absNegative = negative.filter(
      e => Math.abs(e) >= positive[0] || positive[1]
    );
    if (absNegative.length >= 2) {
      let array_three = [absNegative[0], absNegative[1], positive[0]];
      return producOfThree(array_three);
    } else {
      return producOfThree(positive.slice(0, 3));
    }
  }
};
```

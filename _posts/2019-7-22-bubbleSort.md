---
layout: post
title: bubbleSort
date: 2019-07-22
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Bubble sort is the most basic sorting algorithm in all of Computer Sciencedom.
---

### 문제

Bubble sort is the most basic sorting algorithm in all of Computer
Sciencedom. It works by starting at the first element of an array and comparing it to the second element; if the first element is greater than the second element, it swaps the two. It then compares the second to the third, and the third to the fourth, and so on; in this way, the largest values "bubble" to the end of the array. Once it gets to the end of the array, it starts over and repeats the process until the array is sorted numerically.

### 풀이

```javascript
var bubbleSort = function(array) {
  let sortedArr = [...array];
  function compare(bubbleIndex, count) {
    if (count > array.length - 1) {
      return;
    }
    if (bubbleIndex > array.length - 2) {
      compare(0, count + 1);
    } else {
      if (sortedArr[bubbleIndex] > sortedArr[bubbleIndex + 1]) {
        let temp = sortedArr[bubbleIndex];
        sortedArr[bubbleIndex] = sortedArr[bubbleIndex + 1];
        sortedArr[bubbleIndex + 1] = temp;
      }
      compare(bubbleIndex + 1, count);
    }
  }
  compare(0, 0);
  return sortedArr;
};
```

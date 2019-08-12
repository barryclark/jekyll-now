---
layout: post
title: mergeSort
date: 2019-08-12
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Mergesort uses a divide-and-conquer strategy. It begins by treating the input list of length N as a set of N "sublists" of length 1, which are considered to be sorted. Adjacent sublists are then "merged" into sorted sublists of length 2, which are merged into sorted sublists of length 4, and so on, until only a single sorted list remains.
---

### 문제

Mergesort uses a divide-and-conquer strategy. It begins by treating the input list of length N as a set of N "sublists" of length 1, which are considered to be sorted. Adjacent sublists are then "merged" into sorted sublists of length 2, which are merged into sorted sublists of length 4, and so on, until only a single sorted list remains. (Note, if N is odd, an extra sublist of length 1 will be left after the first merge, and so on.)

### 풀이

```javascript
var mergeSort = function(array) {
  let splitedArr = array.map(e => [e]);
  const sortAndMerge = arr => {
    if (arr.length < 2) {
      return arr[0];
    }
    let mergedArr = [];
    for (let i = 0; i < arr.length; i += 2) {
      let temp = [];
      if (i + 1 < arr.length) {
        if (arr[i][0] > arr[i + 1][-1]) {
          temp = arr[i + 1].concat(arr[i]);
        } else if (arr[i][-1] < arr[i + 1][0]) {
          temp = arr[i].concat(arr[i + 1]);
        } else {
          while (arr[i].length > 0 || arr[i + 1].length > 0) {
            if (arr[i].length === 0) {
              temp.push(arr[i + 1].shift());
            } else if (arr[i + 1].length === 0) {
              temp.push(arr[i].shift());
            } else if (arr[i + 1][0] > arr[i][0]) {
              temp.push(arr[i].shift());
            } else {
              temp.push(arr[i + 1].shift());
            }
          }
        }
      } else {
        temp = [arr[i][0]];
      }
      mergedArr.push(temp);
    }
    return sortAndMerge(mergedArr);
  };
  return sortAndMerge(splitedArr);
};
```

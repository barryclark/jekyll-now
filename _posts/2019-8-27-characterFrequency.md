---
layout: post
title: characterFrequency
date: 2019-08-27
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Write a function that takes as its input a string and returns an array of arrays as shown below sorted in descending order by frequency and then by ascending order by character.
---

### 문제

Write a function that takes as its input a string and returns an array of arrays as shown below sorted in descending order by frequency and then by ascending order by character.

### 풀이

```javascript
var characterFrequency = function(string) {
  let arr = string.split("").sort();
  let result = [];
  let temp = [arr[0], 1];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      temp[1] += 1;
    } else {
      result.push(temp);
      temp = [arr[i + 1], 1];
    }
  }
  result.sort((a, b) => {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
  });
  return result;
};
```

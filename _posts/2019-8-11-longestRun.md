---
layout: post
title: longestRun
date: 2019-08-11
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Write a function that, given a string, Finds the longest run of identical characters and returns an array containing the start and end indices of that run. If there are two runs of equal length, return the first one.
---

### 문제

Write a function that, given a string, Finds the longest run of identical characters and returns an array containing the start and end indices of that run. If there are two runs of equal length, return the first one.

For example:

- longestRun("abbbcc") // [1, 3]
- longestRun("aabbc") // [0, 1]
- longestRun("abcd") // [0, 0]

Try your function with long, random strings to make sure it handles large inputs well.

### 풀이

```javascript
var longestRun = function(string) {
  let result = [0, 0];
  let temp = [0, 0];
  for (let i = 1; i < string.length; i++) {
    if (string[i] !== string[i - 1]) {
      if (temp[1] - temp[0] > result[1] - result[0]) {
        result = temp;
      }
      temp = [i, i];
    } else {
      temp[1] = i;
    }
  }
  return result;
};
```

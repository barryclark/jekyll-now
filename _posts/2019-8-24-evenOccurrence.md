---
layout: post
title: evenOccurrence
date: 2019-08-24
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Find the first item that occurs an even number of times in an array. Remember to handle multiple even-occurrence items and return the first one. Return null if there are no even-occurrence items.
---

### 문제

Find the first item that occurs an even number of times in an array.
Remember to handle multiple even-occurrence items and return the first one.
Return null if there are no even-occurrence items.

### 풀이

```javascript
var evenOccurrence = function(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr.filter(e => e === arr[i]).length % 2 === 0) {
      return arr[i];
    }
  }
};
```

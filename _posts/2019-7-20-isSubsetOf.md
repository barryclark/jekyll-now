---
layout: post
title: isSubsetOf
date: 2019-07-20
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Make an array method that can return whether or not a context array is a subset of an input array.
---

### 문제

Make an array method that can return whether or not a context array is a subset of an input array. To simplify the problem, you can assume that both arrays will contain only strings.

var a = ['commit','push']
a.isSubsetOf(['commit','rebase','push','blame']) // true

### 풀이

```javascript
Array.prototype.isSubsetOf = function(array) {
  for (let i = 0; i < this.length; i++) {
    if (!array.includes(this[i])) {
      return false;
    }
  }
  return true;
};
```

---
layout: post
title: nthFibonacci
date: 2019-07-21
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: A Fibonacci sequence is a list of numbers that begins with 0 and 1, and each subsequent number is the sum of the previous two.
---

### 문제

A Fibonacci sequence is a list of numbers that begins with 0 and 1, and each subsequent number is the sum of the previous two.

For example, the first five Fibonacci numbers are:
0 1 1 2 3

If n were 4, your function should return 3; for 5, it should return 5.

Write a function that accepts a number, n, and returns the nth Fibonacci number. Use a recursive solution to this problem; if you finish with time left over, implement an iterative solution.

### 풀이

```javascript
var nthFibonacci = function(n) {
  let begins = [0, 1];
  let nthNum = 0;
  if (n < 2) {
    return begins[n];
  }
  function fibonacci(nth) {
    temp = begins[nth - 2] + begins[nth - 1];
    if (nth === n) {
      nthNum = temp;
      return;
    }
    begins.push(temp);
    fibonacci(nth + 1);
  }
  fibonacci(2);
  return nthNum;
};
```

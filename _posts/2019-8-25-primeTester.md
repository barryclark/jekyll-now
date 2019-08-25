---
layout: post
title: primeTester
date: 2019-08-25
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: A prime number is a whole number that has no other divisors other than itself and 1. Write a function that accepts a number and returns true if it's a prime number, false if it's not.
---

### 문제

A prime number is a whole number that has no other divisors other than itself and 1. Write a function that accepts a number and returns true if it's a prime number, false if it's not.

### 풀이

```javascript
const isMultiple = (arr, number) => {
  for (let i = 0; i < arr.length; i++) {
    if (number % arr[i] === 0) {
      return true;
    }
  }
  return false;
};
var primeTester = function(n) {
  if (typeof n !== "number" || n < 1 || n % 1 !== 0) {
    // n isn't a number or n is less than 1 or n is not an integer
    return false;
  }
  let primeNums = primeSieve(2, n);
  if (primeNums[primeNums.length - 1] === n) {
    return true;
  }
  return false;
};
var primeSieve = function(start, end) {
  let primeNums = [2, 3, 5, 7];
  let newStart = start;
  if (start > 10) {
    newStart = 11;
    for (let i = newStart; i <= end; i++) {
      if (i % 10 === 1 || i % 10 === 3 || i % 10 === 7 || i % 10 === 9) {
        // console.log(primeNums);
        if (!isMultiple(primeNums, i)) {
          primeNums.push(i);
        }
      }
    }
  }
  return primeNums.filter(e => start <= e && end >= e);
};
```

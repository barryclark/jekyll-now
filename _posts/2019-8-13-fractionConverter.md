---
layout: post
title: fractionConverter
date: 2019-08-13
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Write a function that takes a number as its argument and returns a string that represents that number's simplified fraction.
---

### 문제

Write a function that takes a number as its argument and returns a string that represents that number's simplified fraction.

Example: toFraction(0.5) === '1/2'

Whole numbers and mixed fractions should be returned as irregular fractions

Example: toFraction(3.0) === '3/1'

Example: toFraction(2.5) === '5/2'

### 풀이

```javascript
var toFraction = function(number) {
  let simplifiedFraction = "/";
  let splited = number.toString().split(".");
  if (splited.length < 2) {
    simplifiedFraction = number + simplifiedFraction + 1;
    return simplifiedFraction;
  }
  let bottom = Math.pow(10, splited[1].length);
  let upper = Math.floor(number * bottom);
  const areDividable = (number1, number2, factor) => {
    if (number1 % factor === 0 && number2 % factor === 0) {
      return true;
    } else {
      return false;
    }
  };
  const simplify = (upper, bottom) => {
    let factors = [2, 5];
    let count = 0;
    factors.forEach(f => {
      if (areDividable(upper, bottom, f)) {
        upper = upper / f;
        bottom = bottom / f;
      } else {
        count += 1;
      }
    });
    if (count === factors.length) {
      return upper + simplifiedFraction + bottom;
    } else {
      return simplify(upper, bottom);
    }
  };
  return simplify(upper, bottom);
};
```

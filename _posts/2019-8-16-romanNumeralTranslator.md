---
layout: post
title: romanNumeralTranslator
date: 2019-08-16
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Given an array containing a deck of cards, implement a function that shuffles the deck.
---

### 문제

Given a roman numeral as input, write a function that converts the roman numeral to a number and outputs it.

Ex:

```javascript
translateRomanNumeral("LX"); // 60
```

When a smaller numeral appears before a larger one, it becomes a subtractive operation. You can assume only one smaller numeral may appear in front of larger one.

Ex:

```javascript
translateRomanNumeral("IV"); // 4
```

You should return `null` on invalid input.

### 풀이

```javascript
var DIGIT_VALUES = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

var translateRomanNumeral = function(romanNumeral) {
  if (typeof romanNumeral !== "string") {
    return null;
  }
  let number = 0;
  let splited = romanNumeral.split("");
  for (let i = 0; i < splited.length; i++) {
    if (
      i < splited.length - 1 &&
      DIGIT_VALUES[splited[i]] < DIGIT_VALUES[splited[i + 1]]
    ) {
      number -= DIGIT_VALUES[splited[i]];
    } else {
      number += DIGIT_VALUES[splited[i]];
    }
  }
  return number;
};
```

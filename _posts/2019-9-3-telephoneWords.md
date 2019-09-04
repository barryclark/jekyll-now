---
layout: post
title: telephoneWords
date: 2019-09-03
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Extend the Number prototype with a new method called `toEnglish`.
---

### 문제

Each number key on a standard phone keypad has a set of Latin letters written on it as well: http://en.wikipedia.org/wiki/File:Telephone-keypad2.svg

Businesses often try to come up with clever ways to spell out their phone number in advertisements to make it more memorable. But there are a lot of combinations!
Write a function that takes up to four digits of a phone number, and
returns a list of all of the words that can be written on the phone with that number. (You should return all permutations, not only English words.)

**Example**

```javascript
telephoneWords('2745');
=> ['APGJ','APGK', 'APGL', ..., // many many more of these 'CSIL']
```

**Tips**

- Phone numbers are strings! (A phone number can start with a zero.)
- The digits 0 and 1 do not have letters associated with them, so they should be left as numbers.
- Don't return every combination of those digits in any order, just the order given.

### 풀이

```javascript
var phoneDigitsToLetters = {
  0: "0",
  1: "1",
  2: "ABC",
  3: "DEF",
  4: "GHI",
  5: "JKL",
  6: "MNO",
  7: "PQRS",
  8: "TUV",
  9: "WXYZ"
};

var telephoneWords = function(digitString) {
  let wordsArr = [];
  const addDigitLetter = (letter, digit) => {
    if (letter.length === digitString.length) {
      wordsArr.push(letter);
      return;
    }
    let digitLetter = phoneDigitsToLetters[digitString[digit]];
    for (let i = 0; i < digitLetter.length; i++) {
      addDigitLetter(letter + digitLetter[i], digit + 1);
    }
  };
  addDigitLetter("", 0);
  return wordsArr;
};
```

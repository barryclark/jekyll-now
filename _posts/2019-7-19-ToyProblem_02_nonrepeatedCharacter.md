---
layout: post
title: ToyProblem_02_nonrepeatedCharacter
date: 2019-07-19
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Given an arbitrary input string, return the first nonrepeated character in the string.
---

### 문제

Given an arbitrary input string, return the first nonrepeated character in the string. For example:

firstNonRepeatedCharacter('ABA'); // => 'B'
firstNonRepeatedCharacter('AACBDB'); // => 'C'

### 풀이

```javascript
var firstNonRepeatedCharacter = function(string) {
  for (let i = 1; i < string.length; i++) {
    if (string[i] !== string[i - 1]) {
      if (!string.slice(i + 1).includes(string[i])) {
        return string[i];
      }
    }
  }
};
```

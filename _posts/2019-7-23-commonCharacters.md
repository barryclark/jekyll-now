---
layout: post
title: commonCharacters
date: 2019-07-23
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Write a function f(a, b) which takes two strings as arguments and returns a string containing the characters found in both strings (without duplication), in the order that they appeared in a.
---

### 문제

Write a function `f(a, b)` which takes two strings as arguments and returns a string containing the characters found in both strings (without duplication), in the order that they appeared in `a`. Remember to skip spaces and characters you have already encountered!

Example: commonCharacters('acexivou', 'aegihobu')
Returns: 'aeiou'

Extra credit: Extend your function to handle more than two input strings.

### 풀이

```javascript
var commonCharacters = function(string1, string2) {
  let args = Array.from(arguments);
  let commonCharacterString = "";
  const isIncluded = str => {
    for (let i = 1; i < args.length; i++) {
      if (!args[i].includes(str)) {
        return false;
      }
    }
    return true;
  };
  for (let i = 0; i < args[0].length; i++) {
    if (isIncluded(args[0][i]) && !commonCharacterString.includes(args[0][i])) {
      commonCharacterString += args[0][i];
    }
  }
  return commonCharacterString;
};
```

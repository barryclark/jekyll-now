---
layout: post
title: balancedParens
date: 2019-08-08
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Write a function that takes a string of text and returns true if the parentheses are balanced and false otherwise.
---

### 문제

Write a function that takes a string of text and returns true if the parentheses are balanced and false otherwise.

Example:

- balancedParens('('); // false
- balancedParens('()'); // true
- balancedParens(')('); // false
- balancedParens('(())'); // true

<br>
Step 2:
make your solution work for all types of brackets

Example:

- balancedParens('[](){}'); // true
- balancedParens('[({})]'); // true
- balancedParens('[(]{)}'); // false

<br>
Step 3:
ignore non-bracket characters

- balancedParens(' var wow = { yo: thisIsAwesome() }'); // true
- balancedParens(' var hubble = function() { telescopes.awesome();'); // false

### 풀이

```javascript
var balancedParens = function(input) {
  let parens = ["(", ")", "[", "]", "{", "}"];
  let parensOnly = input
    .split("")
    .filter(char => parens.includes(char))
    .join("");
  let isBalanced = true;
  const parensFiler = str => {
    if (str.includes("()")) {
      let filteredStr = str.split("()").join("");
      parensFiler(filteredStr);
    } else if (str.includes("[]")) {
      let filteredStr = str.split("[]").join("");
      parensFiler(filteredStr);
    } else if (str.includes("{}")) {
      let filteredStr = str.split("{}").join("");
      parensFiler(filteredStr);
    } else if (str.length > 0) {
      isBalanced = false;
      return;
    } else {
      return;
    }
  };
  parensFiler(parensOnly);
  return isBalanced;
};
```

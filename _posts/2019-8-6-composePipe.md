---
layout: post
title: composePipe
date: 2019-08-06
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Write Compose and Pipe functions. Compose should return a function that is the composition of a list of functions of arbitrary length. Each function is called on the return value of the function that follows.
---

### 문제

Write Compose and Pipe functions.

Step 1: Implement the function Compose:

Compose should return a function that is the composition of a list of functions of arbitrary length.
Each function is called on the return value of the function that follows.
You can view compose as moving right to left through its arguments.

Compose Example:

```javascript
var greet = function(name) {
  return "hi: " + name;
};
var exclaim = function(statement) {
  return statement.toUpperCase() + "!";
};
var welcome = compose(
  greet,
  exclaim
);
welcome("phillip"); // 'hi: PHILLIP!'
```

Step 2: Implement the function Pipe:

Pipe composes a series of functions and returns the resulting function.
Each function is called on the return value of the preceding function.
You can view pipe as moving left to right through its arguments.

Pipe Example:

```javascript

var add2 = function(number){ return number + 2; }
var multiplyBy3 = function(number){ return number \* 3; }
pipe(add2, multiplyBy3)(5) // 21
pipe(add2, multiplyBy3, multiplyBy3)(5) // 63
```

### 풀이

```javascript
var compose = function() {
  let args = Array.from(arguments).reverse();
  return value => {
    return args.reduce((accu, curr) => curr(accu), value);
  };
};

var pipe = function() {
  let args = Array.from(arguments);
  return value => {
    return args.reduce((accu, curr) => curr(accu), value);
  };
};
```

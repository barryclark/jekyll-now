---
layout: post
title: coinSums
date: 2019-09-04
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation,
---

### 문제

In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:

1p piece
2p piece
5p piece
10p piece
20p piece
50p piece
£1 (100p)
£2 (200p)

It is possible to make £2 in the following way:

1 _ £1 + 1 _ 50p + 2 _ 20p + 1 _ 5p + 1 _ 2p + 3 _ 1p
How many different ways can £2 be made using any number of coins?

example usage of `makeChange`:

```javascript
// aka, there's only one way to make 1p. that's with a single 1p piece
makeChange(1) === 1;
// aka, there's only two ways to make 2p. that's with two, 1p pieces or with a single 2p piece
makeChange(2) === 2;
```

### 풀이

```javascript
const coins = [1, 2, 5, 10, 20, 50, 100, 200];
var makeChange = function(total) {
  let count = 0;
  const makeSum = (leftSum, index) => {
    if (index === 0) {
      if (leftSum >= 0) {
        count++;
      }
      return;
    }
    while (leftSum >= 0) {
      makeSum(leftSum, index - 1);
      leftSum -= coins[index];
    }
  };
  makeSum(total, coins.length - 1);
  return count;
};
```

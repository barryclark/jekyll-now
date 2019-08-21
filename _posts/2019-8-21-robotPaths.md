---
layout: post
title: robotPaths
date: 2019-08-21
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: A robot located at the top left corner of a 5x5 grid is trying to reach the bottom right corner. The robot can move either up, down, left, or right, but cannot visit the same spot twice.
---

### 문제

A robot located at the top left corner of a 5x5 grid is trying to reach the bottom right corner. The robot can move either up, down, left, or right, but cannot visit the same spot twice. How many possible unique paths are there to the bottom right corner?

Make your solution work for a grid of any size.

### 풀이

```javascript
var makeBoard = function(n) {
  var board = [];
  for (var i = 0; i < n; i++) {
    board.push([]);
    for (var j = 0; j < n; j++) {
      board[i].push(false);
    }
  }
  board.togglePiece = function(i, j) {
    this[i][j] = !this[i][j];
  };
  board.hasBeenVisited = function(i, j) {
    return !!this[i][j];
  };
  board.isInBoard = function(i, j) {
    if (i < 0 || j < 0 || i > n - 1 || j > n - 1) {
      return false;
    }
    return true;
  };
  return board;
};

var robotPaths = function(n, board, i, j) {
  board = new makeBoard(n);
  let count = 0;
  const findPossiblePath = (board, i, j) => {
    if (i === n - 1 && j === n - 1) {
      count++;
      return;
    }
    if (board.isInBoard(i, j)) {
      if (!board[i][j]) {
        board.togglePiece(i, j);
        findPossiblePath(board, i + 1, j);
        findPossiblePath(board, i - 1, j);
        findPossiblePath(board, i, j + 1);
        findPossiblePath(board, i, j - 1);
        board.togglePiece(i, j);
      }
    }
  };
  findPossiblePath(board, 0, 0);
  return count;
};
```

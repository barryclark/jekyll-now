---
layout: post
title: rotateMatrix
date: 2019-08-14
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Write a function that rotates a NxN matrix 90 degrees. A matrix, also called a 2-D array, is simply an array of arrays of values.
---

### 문제

Write a function that rotates a NxN matrix 90 degrees.

A matrix, also called a 2-D array, is simply an array of arrays of values.

Example 1x1 matrix:

```javascript
[[1]];
```

Example 2x2 matrix:

```javascript
[[1, 2], [3, 4]];
```

Important note:
In mathematics, and generally in CS, matrices are identified as m-by-n, where m is the number of _rows_ and n is the number of _columns_. So an [i][j] address in a matrix will be i places down, and j places over. This usually matches the way arrays are addressed in code, but keep in mind that it differs from use in geometry and computer graphics, where coordinates of the form (x,y) are usually x units over, and y units down.

Example rotation of a 4x4 matrix:

```javascript
var matrix = [
[1,2,3,4],
[5,6,7,8],
[9,'A','B','C'],
['D','E','F','G']
];
matrix[0][0]; // 1
matrix[3][2]; // 'F'

var rotatedMatrix = rotateMatrix(matrix); // Rotate 90 degrees clockwise
rotatedMatrix is:
[ ['D',9,5,1],
['E','A',6,2],
['F','B',7,3],
['G','C',8,4]
]
rotatedMatrix[0][0]; // 'D'
rotatedMatrix[3][2]; // 8
```

Extra credit:

- Make your function operate on rectangular matrices (MxN rather than NxN).
- Make your function accept a parameter for the direction of rotation (1 = clockwise, -1 = counterclockwise)

### 풀이

```javascript
var rotateMatrix = function(matrix) {
  let args = Array.from(arguments);
  let originHeight = matrix.length;
  if ((!matrix[0] || !matrix[0].length) && originHeight < 2) {
    return matrix;
  }
  let originWidth = matrix[0].length;

  let rotated = new Array(originWidth);
  for (let i = 0; i < originWidth; i++) {
    rotated[i] = new Array(originHeight);
  }
  for (let i = 0; i < originHeight; i++) {
    for (let j = 0; j < originWidth; j++) {
      let firstIndex, secondIndex;
      if (args[1] == -1) {
        firstIndex = originHeight - 1 - j;
        secondIndex = i;
      } else {
        firstIndex = j;
        secondIndex = originHeight - 1 - i;
      }
      rotated[firstIndex][secondIndex] = matrix[i][j];
    }
  }
  return rotated;
};
```

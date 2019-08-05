---
layout: post
title: treeBFSelect
date: 2019-08-05
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Implement a `BFSelect` method on this Tree class. BFSelect accepts a filter function, calls that function on each of the nodes in Breadth First order, and returns a flat array of node values of the tree for which the filter returns true.
---

### 문제

Implement a `BFSelect` method on this Tree class.

BFSelect accepts a filter function, calls that function on each of the nodes in Breadth First order, and returns a flat array of node values of the tree for which the filter returns true.

### 풀이

```javascript
var Tree = function(value) {
  this.value = value;
  this.children = [];
};

Tree.prototype.BFSelect = function(filter) {
  let filteredResult = [];
  const search = (node, depth) => {
    if (filter(node.value, depth)) {
      filteredResult.push(node.value);
    }
    if (node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        search(node.children[i], depth + 1);
      }
    } else {
      return;
    }
  };
  search(this, 0);
  return filteredResult;
};
```

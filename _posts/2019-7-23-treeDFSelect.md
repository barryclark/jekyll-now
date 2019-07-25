---
layout: post
title: treeDFSelect
date: 2019-07-23
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Implement a DFSelect method on this Tree class.
---

### 문제

Implement a `DFSelect` method on this Tree class.

DFSelect accepts a filter function, calls that function on each of the nodes in Depth First order, and returns a flat array of node values of the tree for which the filter returns true.

### 풀이

```javascript
var Tree = function(value) {
  this.value = value;
  this.children = [];
};

Tree.prototype.DFSelect = function(filter) {
  let filtered = [];
  function traversing(node, depth) {
    if (filter(node.value, depth)) {
      filtered.push(node.value);
    }
    if (node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        traversing(node.children[i], depth + 1);
      }
    } else {
      return;
    }
  }
  traversing(this, 0);
  return filtered;
};
```

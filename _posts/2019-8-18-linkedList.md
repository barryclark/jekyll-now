---
layout: post
title: linkedList
date: 2019-08-18
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Implement a linked list using the pseudoclassical instantiation pattern. Your linked list should have methods called "addToTail", "removeHead", and "contains."
---

### 문제

Implement a linked list using the pseudoclassical instantiation pattern.
Your linked list should have methods called `addToTail`, `removeHead`, and `contains`.

EXAMPLE USAGE:

```javascript
var list = new LinkedList();
list.tail; //yields 'null'
list.addToTail(4);
list.addToTail(5);
list.head.value; //yields '4';
list.contains(5); //yields 'true';
list.contains(6); //yields 'false';
list.removeHead(); //yields '4'
list.tail.value; //yields '5';
```

### 풀이

```javascript
var LinkedList = function(value) {
  this.storage = {};
  this.head = null;
  this.tail = null;
};

LinkedList.prototype.addToTail = function(value) {
  let newTail = this.makeNode(value);
  const addTail = node => {
    if (node.next) {
      addTail(node.next);
    } else {
      node.next = newTail;
    }
  };
  if (this.tail) {
    addTail(this.storage);
    this.tail = newTail;
  } else {
    this.storage = newTail;
    this.head = newTail;
    this.tail = newTail;
  }
};

LinkedList.prototype.removeHead = function() {
  if (!this.storage.next) {
    this.sotrage = {};
    this.head = null;
    this.tail = null;
  } else {
    let newHead = this.storage.next;
    this.head = newHead;
    this.storage = newHead;
  }
};

LinkedList.prototype.contains = function(target) {
  let isContain = false;
  const retrieve = node => {
    if (node.value === target) {
      isContain = true;
      return;
    } else if (!node.next) {
      return;
    } else {
      retrieve(node.next);
    }
  };
  retrieve(this.storage);
  return isContain;
};

LinkedList.prototype.makeNode = function(value) {
  let node = {
    value: value,
    next: null
  };
  return node;
};
```

---
layout: post
title: queueStack
date: 2019-08-19
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: Write a stack using your preferred instantiation pattern. Avoid using native array methods i.e., push, pop, and length.
---

### 문제

Write a stack using your preferred instantiation pattern.
Avoid using native array methods i.e., push, pop, and length.
Once you're done, implement a queue using two stacks.

### 풀이

**Stack Class**

```javascript
var Stack = function() {
  this.storage = [];
  this.front = 0;
  this.rear = 0;
  this.push = function(value) {
    this.storage[this.rear] = value;
    this.rear++;
  };

  // remove an item from the top of the stack
  this.pop = function() {
    if (Array.from(arguments)[0] === -1) {
      this.front++;
      return this.storage[this.front - 1];
    }
    this.rear--;
    return this.storage[this.rear + 1];
  };

  // return the number of items in the stack
  this.size = function() {
    return this.rear - this.front;
  };
};
```

<br>
**Queue Class**

```javascript
var Queue = function() {
  // Use two `stack` instances to implement your `queue` Class
  var inbox = new Stack();
  var outbox = new Stack();
  // called to add an item to the `queue`
  this.enqueue = function(value) {
    inbox.push(value);
  };

  // called to remove an item from the `queue`
  this.dequeue = function() {
    let item = inbox.pop(-1);
    outbox.push(item);
    return item;
  };

  // should return the number of items in the queue
  this.size = function() {
    return inbox.size();
  };
};
```

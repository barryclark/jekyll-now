---
layout: post
title: Week 7R - Asynchronous JS and fetch()
categories: cpnt262
---
## Housekeeping
- [Install Postman](https://www.postman.com/downloads/)

## Homework
1. Asynchronous JS
    - Read:
        - [Asynchronous Javascript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
            - [General asynchronous programming concepts](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts)
            - [Introducing asynchronous Javascript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)
            - [Cooperative asynchronous Javascript: Timeouts and intervals](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals)
            - [Graceful asynchronous programming with Promises](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)
    - Watch: [Asynchronous Callbacks](https://youtu.be/Bv_5Zv5c-Ts) by Tony Alicea
2. JSON
    - Read: [Working with JSON data](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)
    - Tool: [JSON Placeholder](https://jsonplaceholder.typicode.com/)
3. `fetch()`
    - Read: [Fetching data from the server](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)
    - Read: [How to use Fetch API for CRUD operations](https://dev.to/duhbhavesh/how-to-use-fetch-api-for-crud-operations-57a0) on dev.to
    - Reference: [Create, read, update and delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) on Wikipedia
4. Reference
    - [List of Public APIs](https://github.com/public-apis/public-apis)

---

## Terminology
<dl>
  <dt>Single Threaded</dt>
  <dd>One process handles all requests, one command at a time. The Jacascript run-time environment is single threaded. In other languages, such as PHP, the server is multi-threaded: a new process is created for each individual server request.</dd>
  <dt>Synchronous</dt>
  <dd>One at a time (and in order)</dd>
  <dd>Execution Stack</dd>
  <dt>The environment where currently running code is executed. When Javascript runs one of your scripts, it will run the commands in the current execution stack. When it's finished running your code, the current execution stack will be empty.</dt>
  <dt>The Heap</dt>
  <dd>A dark, mysterous place deep in the Javascript engine. This is where Javascript connects to outside systems like memory, graphics, network services, etc.</dd>
  <dt>Event Queue</dt>
  <dd>Javascript's "to do" list. The Event Queue is where asynchronous events, such as `fetch()` responses and `click`/`submit` events, get added for later processing. When the current execution stack is empty, Javascript will take the next job in the Event Queue and start a new execution stack.</dd>
</dl>

---

## 1. Introduction to asynchronous operations

**Sample Code**: [asynchronous callbacks with `setTimeout()`](https://github.com/sait-wbdv/sample-code/tree/master/js-base/async)

### Discussion: The Execution Stack, Heap and Event Queue
See definitions above.

---

## 2. Postman Tour
[Postman Learning Centre](https://learning.postman.com/docs/getting-started/introduction/)

Demonstration: Sending a GET request to a public JSON API.

---

## 3. Introduction to `fetch()` and Promises

**Starter Code**: [Retreiving data asynchronously with `fetch()`](https://github.com/sait-wbdv/sample-code/tree/master/frontend/ahttps://github.com/sait-wbdv/sample-code/tree/master/frontend/fetchsync)

### Key Takeaways
- Asynchronous functions execute long after your original script has finished.
- There's an initial (asynchronous) step for JSON data because it has to be converted to a javascript object.
- In order to act on data that is received from a network request, your code must be in a `.then()` block.

---

## Activities
1. See [Starter Code](https://github.com/sait-wbdv/sample-code/tree/master/frontend/fetch)

---

## Clean-up Time!
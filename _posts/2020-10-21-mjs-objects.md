---
layout: post
title: Week 7W - Importing mjs files and Looping Objects
categories: cpnt262
---
## Housekeeping
- For Friday: Confirm Node and NPM are installed
    ```shell
    $ node --version
    $ npm --version
    ```

## Homework
1. Review
    - [Dot notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors)
    - [Manipulating documents](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
2. Objects
    - [Introducing objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects)
    - [Object basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics)
    - [Looping through objects with `for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
3. ES Modules
    - Read: [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
    - Read: [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
    - Reference: [`import` statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
    - Reference: [`export` statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
4. Advanced
    - [`<template>`: The Content Template element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)

---

## 1. Importing javascript modules

**Sample Code**: [Module Starter Code](https://github.com/sait-wbdv/sample-code/blob/master/frontend/import-module)

### ES Module Takeaways
- The `.mjs` file extension is not required but recommended. If you encounter a JavaScript MIME type error, try using `.js`
- When linking to a module with `type="module"` you need to add a `./` to relative paths in `src`.
- Because particular MIME types are required for ES Modules to function, a server is required to serve the files. In other words, you need to be running Live Server or a node server; you cannot just open the html file from your file system.

---

## 2. Objects: Creating a random-array-item method

**Starter Code**: [Random Integer Utility](https://github.com/sait-wbdv/sample-code/blob/master/js-base/objects/random.js)

---

## 3. Advanced DOM manipulation?

---

## Activities
1. MDN: Test your skills
    - [Objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Test_your_skills:_Object_basics)
2. Free Code Camp - [Basic Javascript](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/):
    - Objects - Lessons 81-93:
        - Start: [Build JavaScript Objects](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/build-javascript-objects)
        - Stop: [Record Collection](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/record-collection)

---

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-10-22-async-fetch.md %})
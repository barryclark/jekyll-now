---
layout: post
title: Week 8W - Custom Modules
categories: cpnt262
---
## Housekeeping
- Updated [`argv` activities](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/argv)
- Nominations for six devops leads.

## Homework
1. Review
    - W7M: [Functions]({% link _posts/2020-10-19-functions-scope.md %})
    - MDN: 
        - [Introducing objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects)
        - [Object basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics)
        - [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
2. Nerd Drama
    - Skim: [Node Modules at War: Why CommonJS and ES Modules Can’t Get Along](https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1)
3. CommonJS Modules in Node.js
    - Read: [Export a Module in Node.js](https://www.tutorialsteacher.com/nodejs/nodejs-module-exports) by Tutorials Teacher
    - Watch: 15:22 - 33:00 of [Node.js Tutorial for Beginners](https://www.youtube.com/watch?v=TlB_eWDSMt4&t=922s) by Mosh Hamedani
    - Watch: [Creating a Module in Node.js](https://youtu.be/Cxo4UKpHv5s) by Mosh Hamedani

---

## Terminology
<dl>
  <dt>Module</dt>
  <dd>A reusable block of code whose existence does not accidentally impact other code (Javascript didn't have this before).</dd>
  <dt>CommonJS Module</dt>
  <dd>An agreed upon standard for how code modules should be structured. Because modules are a relatively new feature of Javascript, there are competing standards: ES Modules are used in the browser but CommonJS Modules are most common in Node.js (which supports both standards)</dd>
  <dt>Expression</dt>
  <dd>A line of code that returns a value.</dd>
  <dt>First-class Function</dt>
  <dd>When a function is treated like any other variable. All functions in Javascript are considered first-class and can be passed as arguments to other functions.</dd>
  <dt>Callback Function</dt>
  <dd>A function passed to another function, presumably to be invoked later.</dd>
  <dt>Variable Environment</dt>
  <dd>Where variables live, and how they relate to each other in memory.</dd>
  <dt>Scope</dt>
  <dd>Where a variable is available in your code, and if it's truly the same variable or a new copy.</dd>
  <dt>Global Scope</dt>
  <dd>Any code that runs outside of a function.</dd>
  <dt>Name/Value Pair</dt>
  <dd>Terms that are used to describe a variable. A "name" is a string that identifies a "value" that is stored in memory.</dd>
</dl>

---

## 1. Why do we need modules?
Modules allow us, as developers, to create code that is:
- **Reusable**: In general, code is reusable if it's located in it's own file or set of files. IT shouldn't be located in the same file as other code.
- **Maintainable**: Related to the above point, code that is in its own file (or set of files) can have it's own version, GH repo, etc.
- **Safe**: It's a coder's duty to write code that doesn't accidentally interfere with other code.

### Review
1. Functions in Javascript are first-class: they can be passed as a value like any other variable type. When we pass a function as an argument (i.e. a value) to another function, we call it a callback function.
2. Functions are the only way Javascript provides for creating a new variable scope (or execution context).

### Key Takeaways
1. Modules use functions behind the scenes to create protected environments for our code.
2. The `require()` is a function that you pass a path to. It supports three types of modules:
    - **Built-in modules**: code that Node has built into its core functionality such as the `http` module:

        ```js
        const http = require('http');
        ```
    
    - **Custom modules**: your own code that your write yourself. For these modules to work correctly, **you must `require` them with a `./` at the beginning of your file path**.

        ```js
        const tipCalulator = require('./tip-calculator');
        ```

    - **Third-party modules**: code that must be installed using `npm`. The `require` path will look much like built-in modules, but **you will receive a "Module not found" error if you haven't installed the module using `npm`**.

        ```js
        const express = require('express');
        ```

3. `module.exports` is what the `require` function _returns_. It starts as an empty object and we can add to it or reassign it entirely.

---

## 2. Creating a custom module

**Sample Code**: [Three stages of `greet`](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/modules)

---

## 3. Nested modules: Dictionary data

Live code: Definitions module

---

## Acitivites
1. Create eight new Node modules. Each one should export a different value type that we've covered in this course:
    - `undefined`
    - `boolean`
    - `string`
    - `number`
    - `null`
    - `array`
    - `function`
    - `object`
2. See: [Module Activities](https://github.com/sait-wbdv/sample-code/tree/master/backend/node/modules)

---

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-10-29-builtin-modules-http.md %})
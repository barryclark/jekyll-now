---
layout: post
title: Week 7M - Functions, Events and Scope
categories: cpnt262
---
## Homework
1. Functions
    - Read: [Functions - reusable blocks of code](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions)
    - Read: [Build your own function](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Build_your_own_function)
    - Read: [Function return values](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Return_values)
    - Read: [Function expression](https://developer.mozilla.org/en-US/docs/web/JavaScript/Reference/Operators/function)
    - Reference: [MDN Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
    - Watch (by Steve Griffith):
        - [Introduction to Functions in JavaScript](https://youtu.be/W6QaDqud66Y)
        - [JavaScript Function Parameters](https://youtu.be/dxbsN6_C5PI)
        - [JavaScript Function Return Statements](https://youtu.be/qed2cjdF-30)
2. Events
    - Read: [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
    - Watch: [Introduction to JavaScript Event Listeners](https://youtu.be/EaRrmOtPYTM) by Steve Griffith
3. Scope
    - Watch: [Variable Scope](https://youtu.be/FyWdrCZZavQ)

---

## Terminology
Many definitions from Tony Alicea's [Javascript: Understanding the Weird Parts](https://youtu.be/Bv_5Zv5c-Ts).
<dl>
  <dt>Function Declaration</dt>
  <dd>A function statement that declares a function. Example:   <code>function greeting() {// code here}</code></dd>
  <dt>Function Expression</dt>
  <dd>A function assigned with an expression using the assignment operator <code>=</code>. Example: <code>const greeting = function() {// code here}</code></dd>
  <dt>Anonymous Function</dt>
  <dd>A function returned as a value with no name. This is how callback functions are often created.</dd>
  <dt>Immediately Invoked Function Expression (IIFE)</dt>
  <dd>An advanced method of invoking an anonymous function at the time of its creation.</dd>
  <dt>Function Invocation</dt>
  <dd>Calling or running a function, using trailing parentheses <code>()</code>.</dd>
  <dt>Function Parameter</dt>
  <dd>A named variable passed into a function. Parameters are defined when the function is created.</dd>
  <dt>Function Argument</dt>
  <dd>The actual variable passed to a function when it is invoked.</dd>
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
</dl>

---

## 1. Writing functions
**Sample Code**: [Functions](https://github.com/sait-wbdv/sample-code/tree/master/js-base/functions)

---

## 2. Variable scope
**Sample Code**: [`variable-scope.js`](https://github.com/sait-wbdv/sample-code/tree/master/js-base/functions/finished/4-variable-scope.js)

---

## 3. Initializing our code with an init() function
1. Refactor the [Simple `greet()` function](https://github.com/sait-wbdv/sample-code/tree/master/js-base/functions/examples/greet-1.js) so that it adds a greeting to a web page using the DOM.
2. Try two different ways of adding the code to a web page:
    1. In a `script` element at the bottom of the page just before the closing `</body>` tag.
    2. In a `script` element in the `head` of the document. Problem: this code will run before the DOM has loaded so you will be unable to update the page. Solution: put your code in a function and invoke it using the `onLoad` event.
        1. Declare an `init()` function inside `js/client.js` and place your `greet` code inside it.
        2. Add this `init` function  to the `onLoad` event so it will run after the browser has loaded the DOM.

---

## Activities
1. Test your skills on MDN
    - [Functions](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Test_your_skills:_Functions)
    - [Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Test_your_skills:_Events)
2. Free Code Camp - [Basic Javascript](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/):
    - Functions - Lessons 47-55: 
        - Starting at [Write Reusable JavaScript with Functions](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/write-reusable-javascript-with-functions) 
        - Stop (optional) at [Understanding Boolean Values](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/understanding-boolean-values)

---

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-10-20-loops-objects-json.md %})
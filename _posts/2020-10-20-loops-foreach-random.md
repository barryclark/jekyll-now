---
layout: post
title: Week 7T - Loops, Array.forEach and Random indexes
categories: cpnt262
---
## Homework
1. Review
    - [Arrays](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays)
2. Loops
    - Read: [Looping code](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code)
    - Watch: [`for` Loop](https://www.youtube.com/watch?v=s9wW2PpJsmQ) by Mosh Hamedani
    - Read: [`Array.prototype.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
    - Watch: [JavaScript Array forEach Method](https://youtu.be/159EAISAxwg) by Steve Griffith
3. DOM Manipulation
    - Read: [Client-side web APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs)
    - Read: [Introduction to Web APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)
    - Read: [Manipulating documents](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
    - Reference: [Element.innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
    - Reference: [`innerText` vs `innerHTML`](https://stackoverflow.com/questions/19030742/difference-between-innertext-innerhtml-and-childnodes-value) on Stack Overflow

---

## 1. Classic interview question: FizzBuzz
Using a `for` loop, print a series of numbers from 1 to 100 such that:
- if the number is divisible by 3, print 'Fizz';
- if the number is divisible by 5, print 'Buzz';
- if the number is divisible by both 3 and 5, print 'FizzBuzz';
- otherwise, print the number.

---

## 2. Higher order loops: `Array.forEach()`
The `for` loop is a classic method of repeating code but it's very "unjavascript". In javascript, the `array` value type has a `forEach()` method that allows us to run a function for each item in an array.

Build a web page that dynamically creates a list of Lorem Picsum images based on an array of image IDs.

**Starter Code**: [Lorem Picsum Animals](https://github.com/sait-wbdv/sample-code/blob/master/frontend/loop-gallery/basic-starter/index.html)

---

## 3. Randomly selecting array elements
Enough about loops. Sometimes you just want a random item from an array. For example, maybe you want to display a random image from an array of Lorem Picsum IDs.

**Starter Code**: [Random Lorem Picsum Animal](https://github.com/sait-wbdv/sample-code/blob/master/frontend/array-random-index/animals-starter/index.html)

---

## Activities
1. MDN: Test your skills
    - [Loops](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Test_your_skills:_Loops)
    - [JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Test_your_skills:_JSON)
    
---

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-10-21-mjs-objects.md %})
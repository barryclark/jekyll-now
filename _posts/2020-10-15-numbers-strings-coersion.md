---
layout: post
title: Week 6R - Strings, Numbers and Coersion
categories: cpnt262
---
## Housekeeping
- [260 Assignment 3 Feeback Key](https://github.com/sait-wbdv/assessments/blob/master/cpnt260/assignment-3/feedback-key.md) (so far)

## Homework
1. Numbers and Strings:
    - Read: [Basic math in JavaScript — numbers and operators](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math)
    - Read: [Handling text - strings in Javascript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings)
    - Read: [Useful string methods](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods)
    - Watch: [JavaScript Strings](https://youtu.be/09BwruU4kiY) by Mosh
    - Watch: [20 String Methods in 7 Minutes](https://youtu.be/VRz0nbax0uI) by Free Code Camp
    - Read: [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) on MDN
2. Coersion and Sameness
    - Read: [Boolean values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) on MDN
    - Read: [Type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) on MDN
    - Read: [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
    - Watch: [JS Type Casting, Converting, and Coercion](https://youtu.be/mat1O5JI2fg) by Steve Griffith

---

## Terminology
<dl>
  <dt>Dynamic Types</dt>
  <dd>You don't tell the engine what type of data a variable holds. It figures it out while your code is running.</dd>
  <dt>Coercion</dt>
  <dd>Converting a value from one type to another.</dd>
  <dt>Expression</dt>
  <dd>A line of code that returns a value.</dd>
  <dt>Operator</dt>
  <dd>A special function that usually takes two arguments (operands) from either side of the operator (infix notation).
    <dl>
      <dt>Comparison Operator</dt>
      <dd>Compares its operands and returns a boolean value based on whether the comparison is true or false.</dd>
      <dt>Arithmetic Operator</dt>
      <dd>Takes numerical values (either literals or variables) as their operands and returns a single numerical value.</dd>
    </dl>
  </dd>
  <dt>Equal</dt>
  <dd>Where two values are "equal" but the value types are not compared.</dd>
  <dt>Identical</dt>
  <dd>Where two values are equal AND the value types are also identical.</dd>
  <dt>Concatenation</dt>
  <dd>Joining two or more strings into one.</dd>
  <dt>Template Literal</dt>
  <dd>The ES6 method of concatenation, replacing the need for using the `+` operator on strings.</dd>
</dl>

---

## 1. Coersion and Sameness
Live Demo: Comparison operators and coersion

See: [Casting Sample Code](https://gist.github.com/prof3ssorSt3v3/253a945ce2bed2b92805d4e43b5a7614) by Steve Griffith in [JS Type Casting, Converting, and Coercion](https://youtu.be/mat1O5JI2fg)

### Key Takeaways
- Use `===` instead of `==` whenever possible (or until you understand the difference). 
- Avoid chaining comparison operators for 3 or more operands.
- `NaN` and another `NaN` are never equal.

---

## 2. String methods
**Sample Code**: [String methods](https://github.com/sait-wbdv/sample-code/tree/master/js-base/strings/string-methods.js), copied from [20 String Methods in 7 Minutes](https://youtu.be/VRz0nbax0uI) by Free Code Camp

---

## 3. Arithmetic operators and concatenation
Live Demo: Adding text content to a page using the DOM.

See: [Food form starter code](https://github.com/sait-wbdv/sample-code/tree/master/frontend/form-name-food/)

---

## Activities
1. MDN: Test your skills:
    - [Strings](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Test_your_skills:_Strings)
    - [Math](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Test_your_skills:_Math)
2. You Don't Know JS Exercises: [Types and Grammar](https://ydkjs-exercises.com/types-grammar/ch4/q1)
3. Free Code Camp: Starting at [Adding two numbers](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/add-two-numbers-with-javascript) complete lessons 8-36 of the Free Code Camp [Basic Javascript](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/) course. You can stop at [Store Multiple Values in one Variable using JavaScript Arrays](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/store-multiple-values-in-one-variable-using-javascript-arrays).

---

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-10-16-forms-expressions-conditionals.md %})
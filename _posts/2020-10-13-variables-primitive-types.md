---
layout: post
title: Week 6T - Variables and Primitive Value Types
categories: cpnt262
---
## Housekeeping
- Schedule request for Wednesday: no lunch break, early dismissal at 12:20pm.
- CPNT Assignment 2, 3 and the Final
- Push assignment schedule to Fridays and Mondays @ midnight?

## Homework
- Javascript Fundamentals
  - MDN Textbook
    - Read: [Javascript - Dynamic client-side scripting](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)
      - Read: [Javascript first steps](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps)
        - Read: [What is Javascript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript)
        - Read: [A first splash into Javascript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash)
        - Read: [What went wrong? Troubleshooting JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong)
        - Read: [Storing the information you need - variables](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables)
        - Skim: [Basic math in JavaScript — numbers and operators](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math)
        - Skim: [Handling text - strings in Javascript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings)
  - Watch: [JavaScript Tutorial for Beginners](https://youtu.be/W6NZfCO5SIk) by [Mosh Hamedani](https://codewithmosh.com/)
    - This is an excellent overview of the starter JS concepts you'll need for the rest of this course.
    - There is a handy Table of Contents in the video description.

---

## 1. Variable Assignment
### Terminology
<dl>
  <dt>Name/Value Pair</dt>
  <dd>Terms that are used to describe a variable. A "name" is a string that identifies a "value" that is stored in memory.</dd>
  <dt>Variable Declaration</dt>
  <dd>Creating a variable name in memory (with or without a value). In Jascript ES6, this is accomplished with the `const` and `let` declaration keywords.</dd>
  <dt>Variable Assignment</dt>
  <dd>When we give a variable name a value using the `=` asignment operator. We say we've "assigned a variable". If a variable hasn't been assigned, it's value will be `undefined`.</dd>
  <dt>Primitive Value Types</dt>
  <dd>Data types that exist at the lowest level of the Javascript implmentation. There are seven primitive values in JS; this course will cover these five: `undefined`, `null`, `boolean`,`string`, `number`:
    <dl>
      <dt>undefined</dt>
      <dd>The value given to a variable that has been declared in memory but not assigned a value. This is a special keyword specific to JS. **Warning**: you should never set a variable to `undefined`; use `null` (below) instead.</dd>
      <dt>null</dt>
      <dd>The intentional absence of a value. In other words, a `null` value means "nothing".</dd>
      <dt>Boolean</dt>
      <dd>`true` or `false`</dd>
      <dt>String</dt>
      <dd>A sequence of characters signified by either single or double quotes.</dd>
      <dt>Number</dt>
      <dd>A floating point number (a number with lots of decimal places). This was the only number type in Javascript until `BigInt` ws introduced with ES6 (which we aren't covering). Note that JS does not have a special value for integers.</dd>
    </dl>  
  </dd>
  <dt>Complex Value Types</dt>
  <dd>These values are also called Structural Value Types.
    <dl>
      <dt>Object</dt>
      <dd>A collection of name/value pairs.</dd>
      <dt>Function</dt>
      <dd>Special objects that also contain saved code that can be "invoked" (or "called") after declaration.</dd>
      <dt>Array</dt>
      <dd>Also called a list. Arrays are special objects whose keys are sequential, starting at 0.</dd>
    </dl>
  </dd>
</dl>

## `const` vs `let` vs `var`
Variables should be intially declared (a name created in memory) with a declaration keyword. This is only needed when the variable is first created. Of the three keywords available, it is recommended you try them in this order
1. `const`: The value of a constant can't be changed through reassignment, and it can't be redeclared. This is the safest way to declare a variable.
2. `let`: If you need to reassign/redeclare a variable later (see common errors below), you should use `let`.
3. `var`: This keyword is the classic method of declaring a variable and should be avoided.

---

## 2. Common assignment syntax errors
- Calling a variable that hasn't been declared:

  ```
  Uncaught ReferenceError: 'whatever' is not defined
  ```

  Probably the most common syntax error: trying to use a variable that doesn't exist. Best solution: declare the variable so it exists!

- Re-assigning a `const` variable:

  ```
  Uncaught TypeError: invalid assignment to const 'whatever'
  ```

  You tried to reassign a constant. Try declaring with `let` if you need to reassign.

- Missing assignment on `const` variable:

  ```
  Uncaught SyntaxError: missing = in const declaration
  ```

  The `const` keyword requires that you assign the variable with a value at the time of creation. If you need to create a variable without assigning it, use `let`.

---

## 3. "hoisting" and `undefined`
Every javascript application starts it's life in two phases:
1. Creation phase - The js engine "skims" the code (called "hoisting") and it:
    - Creates a memory space for each variable and sets their value to `undefined`. Important: this means that all variables start their lives as `undefined` and will continue to be so until they are assigned another value.
    - Function statements (which we haven't covered yet) are saved into memory but not invoked.
2. Execution phase - The js engine then executes the code line-by-line as you'd expect. Things to consider:
    - Never set a variable to `undefined`. Javascript allows you to do it but please, don't. Set it to `null` instead.
    - If a variable is not assigned (using the `=` assignment operator) a variable will continue to be `undefined`. Note: this does not apply to `const` variables since they are assigned when they are declared.

---

## Activities
- Beginners: Complete the first 7 challenges of the Free Code Camp [Basic Javascript](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/) course. You can stop at "Adding Two Numbers" but keep going if you're in the groove!
- Everyone: 
  - Try building the [Number guessing game](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash) (you read the homework, right?).
  - Read [Storing the information you need - variables](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables) and try completing Variables 1-3 of the [companion variables exercises](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Test_your_skills:_variables).

If you find any fun or engaging exercises, let your instructor know!

## Clean-up Time!
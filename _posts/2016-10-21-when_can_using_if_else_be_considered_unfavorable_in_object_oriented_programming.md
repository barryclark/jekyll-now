---
layout: post
title: When Can Using If/Else Be Considered Unfavorable in Object Oriented Programming?
tags: [java, quora]
keywords: [programming, if, else, oop, object oriented, object oriented programming]
image: /images/Java_logo.jpg
thumbnail: true
excerpt: One way using if/else would be bad design, from an OOP standpoint, is if you’re using a chain of instanceof checks instead of polymorphism.
---

This is my answer to [this question](https://www.quora.com/Why-is-it-a-bad-programming-practice-to-use-if-else-I-am-asking-this-question-from-the-point-of-view-of-good-OO-design) on [Quora](https://www.quora.com).

One way using if/else would be bad design, from and [OOP](https://en.wikipedia.org/wiki/Object-oriented_programming) standpoint, is if you’re using a chain of instanceof checks instead of [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_%28computer_science%29).

For instance:

```
if(myObject instanceof Object1) {
  // do the thing
} else if(myObject instanceof Object2) {
  // do the thing
} else if(myObject instanceof Object3) {
 // do the thing
}
```

Instead, you could have a ```doTheThing``` [method](https://en.wikipedia.org/wiki/Method_%28computer_programming%29) for each of the three object types:

```
myObject.doTheThing();
```

Of course, that means each of those objects would have to [inherit](https://en.wikipedia.org/wiki/Inheritance_%28object-oriented_programming%29) (and possibly [override](https://en.wikipedia.org/wiki/Method_overriding)) ```doTheThing``` from some sort of ```SuperObject```.

However, if you’re comparing values, it’s not necessarily a bad design. Grades would be an example:

```
if(score >= 90) {
  grade = A;
} else if(score >= 80) {
  grade = B;
} else if(score >= 70) {
  grade = C;
} else if(score >= 60) {
  grade = D;
} else {
  grade = F;
}
```

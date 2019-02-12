---
layout: post
title: Better if Statements
---

In my own coding I've often ended up with functions like this:

```python
def some_function(a, b, c):
	if a == 'foo':
		if b == 'bar':
			if c != 'foobar':
				return "success!"
			return "c not foobar"
		return "b not bar"
	return "a not foo"
```
These sort of nested if statements are common practice, and seem the easiest way to go for the programmer.

```python
if a is True:
	if b is True:
		do z
	do y
do x
```
Seems so intuative, but it's not always the best practice.

For example, what if you needed 4 different checks, all with their own return statements (to return descriptive errors)? 5? 10?

A method I saw used recently and instantly began integrating into my code base is the following idea: 

**Return the desired value as the default.**

```python
if a is not True:
	do x
if b is not True:
	do y
do z
```
I think it's clear to see how this is much easier to read, and requires fewer comments. The checks guide the reader through the decision making, giving an immediate response to any checks which don't pass. Rather than scrolling down past the entire 'true' block of the `if` statement to see the `else` behaviour, it is directly below. It also brings the code back down to a friendlier indentation level, preventing it from straying off screen due as the complexity of any checks increases.

With this style our example function becomes:

```python
def some_function(a, b, c):
	if a != 'foo':
		return "a not foo"
	if b != 'bar':
		return "b not bar"
	if c == 'foobar':
		return "c not foobar"
	return "success!"
```
I'd recommend that anyone reading go through their existing code bases and looks for the kind of `if` nesting shown above, and think to themselves if it could be refactored to take up less space, be easier to read, and require less explicit documentation if they simply moved around their return statements, and negated their conditions.

I'd argue that in any case, the second option is cleaner. 
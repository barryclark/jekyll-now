---
layout: post
title: Replace Supplier with Supplies and friends
---

Here are three very specific uses of Extract Method on a function that takes an unwieldy object as an input, to help make code cleaner and easier to test. I learned these from Arlo Belshee.

# Leave Loaders Behind

## Context

The first lines of the function pull some values out of the large passed-in object. The rest of the function does not access the large object again.

This context isn't very common but this refactoring is the easist of the trio.

## How to do it

Extract Method, for all of the method except for the lines that extract those bits off data.

The new function gets the same name as the old function (it's an overload), since it does the same thing.

## Advanced

Sometimes at the end of the method, the result of a method gets packaged into a large object to be returned. Sometimes you can leave that result-packing behind in the same way.

Inspect callers; some will be happier calling the new overload.

Consider whether a subset of parameters relate to each other in a way that would make sense as a new object (Extract Parameter Object) and whether this new method actually belongs on that new object.

# Replace Supplier with Supplies

## Context

Similar to Leave Loaders Behind, the function only uses a subset of the values in an object that is passed in, but not all at the top of the function. 

## How to do it

First incrementally refactor to bring all the object reads to the top of the function, then apply Leave Loaders Behind in the same way.

Be sure to verify that reordering these statements doesn't change behavior, for example if the retrieved value changes as the function executes.

# Replace Suppliers with Thunks

## Context

Similar to Replace Supplier with Supplies, but you can't be sure that retrieved values aren't changing, or the function is calling a setter or other state-modifying code.

## How to do it

Wrap each troublesome statement/expression in an immediately-executed lambda. For example in C++ `some_expression()` becomes `[&]{ return some_expression() }()`. Then Extract Local Variable on this lambda. Then reorder statements and Extract Method.

It's OK to name the new function with an `_Impl` suffix and keep it `private`, if you don't think it's a natural API to be exposing from this object. Consider both options.

## Advanced

A subset of these lambdas might become methods on a new object, possibly a facade.

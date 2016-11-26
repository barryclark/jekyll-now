---
layout: post
title: Products of Array Elements 
---
This is my take on the problem posed [on InterviewCake](https://www.interviewcake.com/question/java/product-of-other-numbers). The problem asks you to write a function `getProductsOfAllIntsExceptAtIndex()` that takes in an array and returns an array where each element of the returned array contains the product of all the elements of the array, except the element at that particular index. 

For example, given an input `{1, 7, 3, 4}` we want to return `{84, 12, 28, 21}`. A constraint given is that we are not allowed to use division in our solution. This would trivialize the problem as we'd only need to compute the entire array's product and divide by the value at our particular index. 

## Brute-Force Solution

The brute-force solution here is not too hard, we just iterate through our indices and calculate the product each time, discounting the value at that particular index. We store our elements in a new array and return that. Here's a C++ implementation of the brute-force solution: 

<script src="https://gist.github.com/rohan-varma/e7240fb0a85432a7cca49d420677a869.js"></script>

And the implementation of the `getProduct` function, that skips over the passed in index when computing the product:

<script src="https://gist.github.com/rohan-varma/e85ba84b1287be8a7f6b58a5e98816c6.js"></script>

This solution has quadratic time complexity and linear space complexity with respect to its input size. We can do better - this problem can be solved in linear time!

## A Faster Approach

Consider the *ith* element in our array that contains the products we desire. The *ith* element is the product of all elements in our input array, besides the element at index *i*. Equivalently, we can think of the ith element being the product of all elements *before* the element at index *i*, and all elements *after* the element at index *i*. Do you see a way to use this alternate approach to avoid having a nested loop approach that computes the adjusted product each time?

## The Linear Time Solution

By thinking of this problem in terms of the products that come before and after the element at the relevant index, we're on track to solving the problem efficiently. First, we need to keep track of the product of the array's elements before a particular index. For our example input of `{1, 7, 3, 4}`, this would be `{1, 1, 7, 21}`. For example, at index `i=3`, our new array should contain the product of all elements from indices `i=0` to `i=2`, which is 21. Here's an implementation that creates such an array: 

<script src="https://gist.github.com/rohan-varma/b1002da9173735040c34f76626121380.js"></script>

We can take a similar approach to keep track of the product of our array's elements *after* a particular index. For example, our input of `{1, 7, 3, 4}` should yield an array `{84, 12, 4, 1}`. Here's an implementation that creates such an array: 

<script src="https://gist.github.com/rohan-varma/b56a4eea81327acd9869a8e876b1f028.js"></script>

Now, all that's left to do is return an array whose elements are the products of the elements in these two arrays. This satisfies the problem because our resulting product is the product of all elements before the index, and all elements after the index. Here's the complete implementation: 

<script src="https://gist.github.com/rohan-varma/e1a4fda8239a5a3ca85e07e7ed8eeb5f.js"></script>

This solution has linear time and space complexity with respect to its input size. 

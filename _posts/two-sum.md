---
layout: post
title: Two sum!
published: true
tags: two-sum, leetcode
---

# Two sum
Level: Easy

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

<hr />

#### Example 1:
<pre>
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
</pre>

#### Example 2:
<pre>
Input: nums = [3,2,4], target = 6
Output: [1,2]
</pre>

#### Example 3:
<pre>
Input: nums = [3,3], target = 6
Output: [0,1]
</pre>

## Solution

```js
const twoSum = function(nums, target) {
  let hash = {};
  for(let i = 0; i < nums.length; i++){
    const j = target - nums[i];
    if(typeof(hash[j]) !== 'undefined'){
      return [hash[j], i];
    }
    hash[nums[i]] = i;
  }
   return [];
};
```

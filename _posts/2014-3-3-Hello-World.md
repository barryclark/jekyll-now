---
layout: post
title: Neetcode Challenge Day 1
---

## Contains Duplicate

#### Arrays & Hashing

> Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
>
> > Input: nums = [1,2,3,1]
> > Output: true

[Contains Duplicate](https://leetcode.com/submissions/detail/1208353109/) was a pretty easy algorithm to take on as the first one.

For this problem, the first thing that came to mind was brute forcing it. I quickly discarded this solution because of the time complexity O(n^2), I would have to iterate through the whole array n^2 of times with two nested for loops.

Then, I thought of a faster way of doing things. I could iterate only once while checking at another list if that number had already appeared. So I created another array called _viewed_ that would entail all the numbers that appeared on the original nums array. So I basically was saying _is this number from the nums array on my \*\*\_viewed_\*\* array?_ if so, there's a duplicate and I would return True. If not, I would append that number to \_viewed_.

The solution worked, but I was faced with another challenge.

On lists with huge number of numbers and no duplicates, the computational times of searching through the python list was too long. The problem arises when you use a list (array) instead of a set. The reason why a set is a better data structure in our case is because of two reasons. First, the set can't contain duplicates, so we ensure there can be no errors. Secondly, a set is implemented using a hash function. Basically, whenever we add an item to a set, it is placed in a specific location. The hash function takes the item I want to add to the set, converts it to a unique number, and that unique number determines where the item should go in the set. So when we want to find if the item exists, we just use the hash function to know where the item should be and we check if its there or not. A list on the other hand has to look through each item one by one until you find (or don't find) the item you are looking for.

So after this small research detour, I implemented a set and all test cases passed with no trouble.
My final solution was:

```python
def containsDuplicate(self, nums: List[int]) -> bool:
        viewed = set()
        for n in nums:
            if n in viewed:
                return True
            viewed.add(n)
        return False
```

![_config.yml]({{ site.baseurl }}/images/config.png)

The easiest way to make your first post is to edit this one. Go into /\_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.

---
layout: post
title: Neetcode Challenge Day 2
---

## Valid Anagram
Arrays & Hashing

![problem description from leetcode]({{ site.baseurl }}/images/alg2/description.png)

[Valid Anagram](https://leetcode.com/problems/valid-anagram/description/) was a pretty simple problem.


For this problem, the first thing that came to mind was the easiest solution of all. Sort the two strings and compare them. If they are equal, t is an anagram of s. Simple. This is obviously not the intended way of solving this.

I started to look for another way of seeing the problem. What is the problem really asking me to do? If **t** is an anagram of **s**, it would mean that **t** and **s** have the exact same kind of characters and the exact same count of those chars. If I could find a way to compare those two and check for equivalence, the problem would be solved.

My initial solution was:
1. Create a hash map for **s** in which I would store the characters and the number of times they appeared.
2. Create a hash map for **t** in which I would store the characters and the number of times they appeared.
3. Loop through hash map of s and compare it to hash map of t.
4. If they are the same, return True. Else, return False.

![first solution diagram]({{ site.baseurl }}/images/alg2/sol1.png)

This would have a time complexity of O(n + m) which would equal O(2n) since in an anagram the two maps would be of the same size, which would then equal to O(n). The space complexity would be of O(2n) as well.

As I was thinking about this solution, a great idea came to me. We are getting the characters of a string and counting the number of times they appear twice, one for **s** and one for **t**. Instead of having two seperate maps, we can, in one map, add to the count while looping through **s** and subtract when looping through **t**! This way, if all the values on the final state of our map are set to 0, that means that **t** is an anagram of **s**. We can save some space as we only use one hash map to solve this problem.

![optimal solution diagram]({{ site.baseurl }}/images/alg2/optimal.png)

I knew this solution would work but I was facing another language-related issue. I was trying to use the `dict = {}` from python which, when running the code, gave me a 'KeyError' because I was trying to do things to my dictionary with a key that didn't exist yet. I could initialize all keys to 0 and then check if that `map[key]` exists, etc. But I wanted it simpler. I researched for a bit and found out that I could use a `defaultdict()`. A defaultdict creates the key on the fly and initializes it with a default value. I want to initialize my key values with an int of 0, so I set my dictionary's default value to int: `defaultdict(int)`.

Finally, something that flew over my head initially was checking if the two strings are of equal length! I overlooked this edge case which actually saves a ton of time. If the strings are not of the same length they can't be an anagram, so why go through all the trouble of creating, adding, and subtracting, if we know beforehand that it won't be an anagram. 

After that, I submitted the code and all the tests passed!

My final solution was:

```python
def isAnagram(self, s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
        
    hMap = defaultdict(int)

    for c in s:
        hMap[c] += 1
    for c in t:
        hMap[c] -= 1

    for x in hMap:
        if hMap[x] != 0:
            return False

    return True
```

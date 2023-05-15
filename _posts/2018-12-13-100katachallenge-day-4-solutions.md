---
title: 100KataChallenge — Day 4 Solutions
date: 2018-12-13
---

# \#100KataChallenge — Day 4 Solutions

![Mathematics Challenge Flyer](https://miro.medium.com/max/1100/0*1LLAomfWm9zj5kTe.png)

Hi again guys!

Today’s challenges are interesting ones. I hope you were able to find your way around them. Let’s take the first one:

#### Problem 1 — Total Amount of Points
This is definitely one for the football fans.

Our football team finished the championship.
The result of each match look like “x:y”. Results of all matches are recorded in the array.

For example:
```
["3:1", "2:2", "0:1", ...]
```

Write a function that takes such a list and counts the points of our team in the championship.Rules for counting points for each match:

Write a function that takes such a list and counts the points of our team in the championship.Rules for counting points for each match:
- if x>y — 3 points
- if x<y — 0 point
- if x=y — 1 point

Notes:
- there are 10 matches in the championship
- 0 <= x <= 4
- 0 <= y <= 4

_These notes indirectly tell us to expect 10 strings in our array of scores, and it also tells us that no team ever scored more than 4 goals in a single game. Hence `0 <= x <= 4` and `0 <= y <= 4`_

Let’s start coding out our steps.

#### Solution
We know we will be calculating points, and at the start we will have zero points.
```
def points(games):
    our_points = 0
```

A good first step is to loop through our array so that we can work on each string individually. That looks like this:
```
def points(games):
    our_points = 0
    for game in games:
```

But what do we want to check from each string game?

We want to compare the values on either side of the colon, typically `x:y`.

Here’s what we know, neither x nor y is greater than 4 (which is a single digit), and the format will always be the same. This is a good time to remember that a string is an array of characters, meaning in the string `“x:y”`, `‘x’` is at index 0, `‘:’` is at index 1, and `‘y’` is at index 2. We can take advantage of this to target x and y.

Let’s write some pseudo-code (false code) and then convert our logic to Python. _(You can check out [this article](https://medium.com/@ngunyimacharia/how-to-write-pseudocode-a-beginners-guide-29956242698) on writing pseudo-code)_
```
IF x > y THEN
    increase our points by 3
ELSE IF x=y THEN
    increase our points by 1
ELSE
    leave our points the same
```

This translates very easily into python, especially since we now know how to target x and y using their indices/indexes.
```
if game[0] > game[2]:
    our_points = our_points + 3
elif game[0] == game[2]:
    our_points = our_points + 1
else:
    pass
```

Our full code (complete with a return statement) now looks like this
```
def points(games):
    our_points = 0
    for game in games:
        if game[0] > game[2]:
            our_points = our_points + 3
        elif game[0] == game[2]:
            our_points = our_points + 1
        else: #it is okay to ignore the else case here
            pass
    return our_points
```

Logically, we should convert the values of game[0] and game[1] to integers before comparing them, but remember that Python already knows how to compare characters. This code will run, and we can submit it as it is.

Let’s move on to our next problem.

#### Problem 2 — Removing Elements

Take an array and remove every
second element out of that array. Always keep the first element and
start removing with the next element.

Example:
```
my_list = ['Keep', 'Remove', 'Keep', 'Remove', 'Keep', ...]
```

None of the arrays will be empty, so you don’t have to worry about that!

Concretely, calling `remove_every_other(['a', 'b', 'c', 'd', 'e'])` should return `['a', 'c', 'e']`

#### Solution
A logical sequence of steps is as follows:

1. Loop through the list
2. Remove every element at an odd index

Since lists/arrays in Python start at index zero, every other index will be odd. This makes sense, right?

Let’s convert it to code (we will use the **del** keyword to delete a list element at a given index):
```
def remove_every_other(my_list):
    for i in range(len(my_list)):
        if i%2 == 1: #check if index is odd
            del my_list[i] #del is used to 
    return my_list
```

_We used an index-based for-loop so that we can check if an index i is odd. We use the modulus operator, %, to check if an index is odd. From basic math, we know that every odd number, when divided by 2 leaves a remainder of 1._

However, when we try to run our code the first test passes, and then we are faced with an error:
![error screenshot](https://miro.medium.com/max/720/0*GkB3AuJYJibqD1_I.png)
*IndexError: list assignment index out of range*

The last line tells us what we need to know, we exceeded the boundaries of our list’s indices. But how?

This is the problem: say our list has 5 items. We end up deleting 2: indexes 1 and 3. What this means is that by the time we reach index 4, there is nothing there, since our array of (now) 3 items ends at index 2. You can take the time to try this with a pen and paper. You’ll see that it is true.

To fix this, instead of deleting every other item from the list, we will instead create a new list to contain the items we want to keep.

Our steps now look like this:

1. Create a new empty list: new_list
2. Loop through the list
3. Copy every element at an even index into new_list
4. After exiting the loop, return new_list

Our code takes on a new look after a few modifications:
```
def remove_every_other(my_list):
    new_list = []
    for i in range(len(my_list)):
        if i%2 == 0:
            new_list.append(my_list[i])
    return new_list
```

Notice that our if condition now checks for an even index: `i%2 == 0`

Your code should now run perfectly! Congratulations!

KayO
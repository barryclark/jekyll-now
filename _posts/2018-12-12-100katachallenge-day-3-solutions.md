---
title: 100KataChallenge — Day 3 Solutions
date: 2018-12-12
---

# \#100KataChallenge — Day 3 Solutions

![Algorithmss Challenge Flyer](https://miro.medium.com/max/1100/0*o7PVSeWlmAAwHvBO.png)

Hi guys! I hope today’s challenges are going well. Today we deal with algorithms… steps taken to solve a problem.

Admittedly, today’s challenges required a tad more mental work, but once you get the hang of it, its a piece of cake. So don’t give up! You’ll soon be crushing code like a pro.

Let’s take a look at today’s seemingly challenging challenges, shall we?

#### Problem 1 — noobCode 01: SUPERSIZE ME…. or rather, this integer!
Write a function that rearranges an integer into its largest possible value.
```
super_size(123456) # 654321
super_size(105)    # 510
super_size(12)     # 21
```

If the argument passed through is single digit or is already the
maximum possible integer, your function should simply return it.

Hopefully this makes sense to you. For example, if we had 123 as an input, we would want 321 returned. The idea is to push the larger numbers to the left, and the the smaller numbers to the right.

Let’s jump in:

#### Solution
Our first inclination should be to split the number we’re given into its individual digits, and then we can work on shifting the number to their appropriate positions.

Ideally, we want to store the digits individually in a list/array. A common trick to do this in Python is to “Stringify” our integer, i.e. convert it into a string. Remember what we said yesterday? **A string is an array of characters**. So let us take that first step in our code:
```
def super_size(n):
    n_str = str(n)
```

Assuming `n` to be `123`, `n_str` will now be `“123”`.

Since a string is in itself a kind of array, we can sort this string in ascending order using the `sorted()` function, and set the reverse parameter to `True` to get an array of characters in descending order.

(Every character has an associated numerical value to Python, so python knows how to sort numbers even as strings.)

Our code now looks like this:
```
def super_size(n):
    n_str = str(n)
    n_sorted = sorted(n_str, reverse=True)
```

`n_sorted` is currently the sorted list: `[‘3’, ‘2’, ‘1’]`

We now need to recombine these digits into an integer. Advanced functions like `reduce()` can help us do this in one line, but this might be a bit tricky for early-stage Python programmers. Let us use a for-loop.

We want to loop through the array n_sorted, combine all the characters into one string, and convert that string back into an integer. This is what that looks like:
```
output_str = "" #empty string
for num in n_sorted:
    output_str = output_str + num
```

Our entire code now looks like this:
```
def super_size(n):
    n_str = str(n)
    n_sorted = sorted(n_str, reverse=True)
    output_str = "" #empty string
    for num in n_sorted:
        output_str = output_str + num
```

`output_str` now contains `“321”`

We will step out of the for-loop and return the integer version of output_str

Our final code looks like this:
```
def super_size(n):
    n_str = str(n)
    n_sorted = sorted(n_str, reverse=True)
    output_str = "" #empty string
    for num in n_sorted:
        output_str = output_str + num
    return int(output_str)
```

Congratulations! That wasn’t so bad, was it?

Let’s move on to our second problem.

#### Problem 2 — Add Length
What if we need the length of
the words separated by a space to be added at the end of that same word
and have it returned as an array?
```
add_length('apple ban') => ["apple 5", "ban 3"]
add_length('you will win') => ["you 3", "will 4", "win 3"]
```

Your task is to write a function that takes a String and returns an
Array/list with the length of each word added to each element.

**\*Note**: A string will have at least one element; words will always be separated by a space.

#### Solution

Yesterday, we had to find a space within a string and use it to locate a letter in our second challenge. We used the find() method, which finds the first character passed in. Today, we need to find more than one space. Find won’t help us much. Allow me to introduce you to split(), a Python string method. This is how split works:
```
"This is a sentence".split() #["This","is","a","sentence"]
```
You can read more on `split()` [here](https://www.w3schools.com/python/ref_string_split.asp). There are a few extra things to note about the method.

For our purposes now though, we know enough. Let’s jump into the code:
```
def add_length(str_):
    #your code here
```

Let us split our string to get the individual words:
```
def add_length(str_):
    words = str_.split()
```

Now, let us loop through words, our array of words. For each word in words, we want to count the number of letters and append that figure to the word. The code looks like this:
```
for word in words:
    num_letters = len(word)
    word = word + " " + str(num_letters)
```

Take a few minutes to make sure that this piece of code makes sense to you. _(If you notice a possible mistake here, don’t worry, just follow till the end)_

Our code now looks like this:
```
def add_length(str_):
    words = str_.split()
    for word in words:
        num_letters = len(word)
        word = word + " " + str(num_letters)
```

Let us step out of the for-loop and return words:
```
def add_length(str_):
    words = str_.split()
    for word in words:
        num_letters = len(word)
        word = word + " " + str(num_letters)
    return words
```

If we run the code above we should get a problem:
```
Test Results:
['apple', 'ban'] should equal ['apple 5', 'ban 3']
['you', 'will', 'win'] should equal ['you 3', 'will 4', 'win 3']
['you'] should equal ['you 3']
['y'] should equal ['y 1']
```

The numbers are not being appended, and here’s why: word is an entirely new variable that has no actual effect on the content of words. As such, changes to word are not reflected in words. When we return words, we are merely returning the same old array without appending any words.

We will need to modify the code above to an index-based approach. Here’s what our for-loop will now look like:
```
for i in range(len(words)):
        num_letters = len(words[i])
        words[i] = words[i] + " "+ str(num_letters)
```

We use the indices/indexes of the actual words to modify the strings in our words array.

Take some time to make sure that this makes sense to you.

Our new code looks like this now:
```
def add_length(str_):
    words = str_.split()
    for i in range(len(words)):
        num_chars = len(words[i])
        words[i] = words[i] + " "+ str(num_chars)
    return words
```

Congratulations! You may now submit your work.

KayO
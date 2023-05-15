---
title: 100KataChallenge — Day 2 Solutions
date: 2018-12-11
---

# \#100KataChallenge — Day 2 Solutions

![Data Types Challenge Flyer](https://miro.medium.com/max/1100/1*9NDi8OIw7d6DJ4FgjIXJpw.png)

Hi there!

We have noticed during this #100KataChallenge that some of our beginners are having a tough time with some of the challenges. This is nothing to be ashamed of, as we’ve all been beginner programmers at some point in time. In an effort to help, every day, at 6 PM we will release a suggested solution for the Katas in our beginner tracks. I’m pretty sure the more experienced coders can tough it out a bit. We believe in you. 
Notice that I said “suggested solution”. As you will come to realize, almost every problem has multiple possible solutions. Provided you can think through to the end, and based on your knowledge and ability to Google effectively your solution will look different from mine. We do not claim to have the best solution for each challenge, but we will definitely try to break down our solutions so that everyone can understand.
Let’s jump right in.

#### Problem 1 — Regex Count Lowercase Letters
Your task is simply to count the total number of lowercase letters in a string.

#### Examples
```
lowercaseCount("abc"); ===> 3

lowercaseCount("abcABC123"); ===> 3

lowercaseCount("abcABC123!@€£#$%^&*()_-+=}{[]|\':;?/>.<,~"); ===> 3

lowercaseCount(""); ===> 0;

lowercaseCount("ABC123!@€£#$%^&*()_-+=}{[]|\':;?/>.<,~"); ===> 0

lowercaseCount("abcdefghijklmnopqrstuvwxyz"); ===> 26
```

The instructions are pretty clear, we want to count all lowercase letters in a given string. Note that a string, by definition, is simply an array (ordered list) of characters. We will take advantage of this definition in our solution:

#### Solution
We start out from here:
```
def lowercase_count(strng):
    #your code here
```

We know we will have to count the number of lowercase variables, and before we start, that variable will be equal to zero
```
def lowercase_count(strng):
    count = 0
```

Next, we need to go through each character in the string and check if it is a lowercase character. Python allows us to loop through lists/arrays using the ‘in’ keyword. Remember a String is fundamentally an array of characters. So we can loop through strings! Let us use a for-loop
```
def lowercase_count(strng):
    count = 0
    for character in strng:
```

Our next dilemma is how to actually check whether or not a character is lowercase. A quick Google search reveals the islower() string method. Yes, Google is your friend.

```
def lowercase_count(strng):
    count = 0
    for character in strng:
        if character.islower():
            count = count + 1
```

Finally, come out of the for-loop and return your count variable. Remember to be careful about your indentations!

The final code looks like what we have below.
```
def lowercase_count(strng):
    count = 0
    for character in strng:
        if character.islower():
            count = count + 1
    return count
```

#### Problem 2 — Abbreviate a Two Word Name

Write a function to convert a name into initials. This kata strictly takes two words with one space in between them.

The output should be two capital letters with a dot separating them.

It should look like this:
```
Sam Harris => S.H
Patrick Feeney => P.F
```

This question hints on the things we need to do to identify the letters that need capitalization. Note “two words with one space in between them”

Let’s jump in:
```
def abbrevName(name):
    #code away!
```
We need to do two main things:

1. Identify the letters for the abbreviation
2. Concatenate (join) the letters with a full stop

Remember a string is an array of characters. Our first letter is obviously at index 0, since arrays in python are indexed from zero.
```
def abbrevName(name):
    firstLetter = name[0]
```

Our second letter is at the index after the space. For example, **Kwadwo Agyapon-Ntra** should give us **K.A**, because the ‘A’ comes after the space in the name. The question then is, “How do we find the space?”

I’ve hinted the answer in the question. We use the find string method. This method returns the first index of the character we are searching for in a string. For example:
```
"Kwadwo".find('w') #This returns 1
```

Of course there are 2 w’s, but it returns the first index. Likewise we look for the first space character, and shift to the right (+1) to find the next letter. We write the code as:
```
def abbrevName(name):
    firstLetter = name[0]
    secondIndex = name.find(' ') + 1 #This is just the index
    secondLetter = name[secondIndex] #This is the actual character at that index
```

Let us ensure that these letters are in uppercase using upper()
```
def abbrevName(name):
    firstLetter = name[0].upper()
    secondIndex = name.find(' ') + 1 
    secondLetter = name[secondIndex].upper()
```
We can now concatenate (join) the letters with a full stop and return them. Let’s do this in one line:
```
def abbrevName(name):
    firstLetter = name[0].upper()
    secondIndex = name.find(' ') + 1 
    secondLetter = name[secondIndex].upper()
    return firstLetter + "." + secondLetter
```

The above code is a good working version, and you can stop here.

But there are better ways of concatenating, and we would like our code to look a lot leaner. Let’s see how to do this in one line using the string format() method:
```
def abbrevName(name):
    return '{}.{}'.format(name[0].upper(), name[name.find(' ')+1].upper())
```

---
layout: post
title: Advent of Code 2020
---

My thoughts as I have progressed through the 2020 Advent of Code challenge at
https://adventofcode.com/

I've attempted to lay out my thought processes, which may provide some clues on
ways to approach the problem without giving you solution code.

# What is Advent of Code

This is a yearly coding challenge in which the problem is stated each day
starting on December 1st.  Each challenge is in two parts, the second
progressing from the first, and each has a single value to input as the "answer".

To prevent abuse, if you input a wrong answer there is a delay imposed before
you can submit a new attempt.

There is a leaderboard for the first 100 correct answers each day, but I'm
not up that early!   I believe some companies will run a private leaderboard
so you can compete against your coworkers if you like.

Because of the nature of the challenge, you can get to the answer using
any language you like.

If you enjoy the advent of code challenges, I recommend progressing on to
http://projecteuler.net/ - where the challenges are much more difficult.

# Setting up

First of all.  Choose your language.  I've chosen nodejs; I'm not
wanting to learn a new language right now and I have nodejs all set up already.
Also, I'm currently working mainly in yaml and bash - so doing some js is
quite refreshing.
Modern JS also provides a number of really helpful processing methods - I expect
I will be making extensive use of map, filter, and reduce.

## Code structure

Each day's challenge includes some sample data that illustrates the problem,
and a data file to download and process to get the answer.

I put together a little framework that I can start with each day, since every
solution requires loading a file and processing the lines.

```js
const fs = require('fs')
fs.readFile('filename', (err,data) => {
  if (err) throw err
  console.log("Answers\n=======\n")
  let lines = data.toString().split("\n")
  calculate(lines)
})
const calculate = (lines) => {
  // WRITE SOLUTION HERE
}
```

So that gives me a good starter - I also decided to paste the testdata into
an array of lines, and run the algorithm against that first to help to drive
out any bugs.

# Day 1

Okay - first day's puzzle, find 2 numbers in a list that sum to 2020 - then multiply those
numbers to get an answer.

The numbers aren't in order, so my first instinct was to sort them.  Whilst this is easy in
nodejs, by default the sorting is in ASCII order, so 200 will sort before 30 - you have to pass
a comparison function to sort to make it numeric.

Then if the sum of
the smallest and largest number is bigger than 2020 I can discard the largest, and if smaller
discard the smallest until I reach the solution.

Part 2 gets a bit harder, there are now 3 numbers that sum to 2020.

Now it's not as simple as discarding numbers until I reach the solution - but I'm still going
to start with the sorted list.

I can still discard the largest when I add it to the smallest and they are greater than 2020,
since the largest cannot possibly be part of the answer.   I cannot discard the smallest until
I've checked greater pair for the answer - which is not hard to implement and the data set
is not large enough that I'm concerned about performance.

# Day 2

Today's puzzle is string validation with a simple set of rules.

The first task is to process each line to extract the fields, I'm expecting this quite a lot.

For part one the "password" field needs to have a character count of the key character in the
stated range.  As a simple trick, splitting a string into an array then lets me use the
filter method and get there quite quickly.

Since I have to count the valid lines, using the filter method on the lines with a validation function
to do the work then give me the answer as the remaining line count.

Part two modifies the validation rule a little - now the key character must be at certain positions,
only a minor modification to the algorithm for part one required here, with the caveat that arrays
in nodejs are zero-indexed (i.e. The first element is array[0], not array[1]).

# Day 3

This puzzle is both simple, and rather fun.

Starting at the first character of the first line, you just need to count whether the character
at the appropriate offset of each line is a tree or not.

So it's a simple case of working out the offset for each line, overflowing back to zero when the
line isn't long enough.

The modulo operator ```%``` is useful here.

For part two we have multiple paths to calculate, but that's just some minor modifications to the
offset calculation.  Watch out for the steep path, where some lines don't count at all.

# Day 4

Eurgh, form validation.  Not my favourite task to be honest.

This is the first puzzle where each group of data is delineated by a blank line - just be careful
here to process the final group as well, it would be easy to fail to count it if the input file
doesn't have a blank line at the end.

Checking the presence of the fields for part one is pretty straightforward.

With part two, checking the values, I went for the easy option in JS and apply regular expressions to match only correct values.
The only expression that is really challenging is the height one.

# Day 5

The phrasing of this puzzle is a bit odd, but when you think about it a little it's easy to
translate the boarding code into a binary representation of the seat id.  Getting from a binary
string to the number is a job for JS parsing functions using a different base.

Again, a numeric sort does a bunch of heavy lifting to get us to the answer for part one.

For part two, we're looking for the gap in the numbers.  My approach was to check the difference between
the index and value of each seat id in my array - where this offset changes it the location of the gap.

# Day 6

Back to groupings of data again for this day.

Part 1 has us counting the distinct letters in each group - a clear usage of a Set of some kind.

The second part is more interesting - here we're looking for letters that are present in every line within the group.
Since I'd done the work with the set construction for the first part, it made sense for me to implement some
kind of intersection function.

# Day 7

Hmm, this puzzle is interesting - in that there are a set of rules, and we are hunting for any rule which
allows for a particular bag colour to be included.

So my approach to this is somewhat iterative - first I'll find the rules that contain the target colour,
adding them to my solution set.
Then for each element of the solution set, find the rules that contain that colour.
And so on, until I add no more to the solution set.

There will be a more efficient way to do this, but this will get there.

The trickiest part is probably parsing the rules into some kind of structure that enables you to process them.

For part two we're going the other way - we need to find out how many subsidiary bags are in a target colour.
So we can recursively follow the trail here.  In a real solution you'd want to check that you didn't have a
loop, but that wouldn't have a solution so I'll ignore that.

I can just follow the rules down from my starting colour, returning 1 if the bag contains no other bags, and
the sum of the contents plus 1 otherwise.   Remembering at the end to subtract the target bag, which this method
includes in the total.

# Final words

This week has been a bit of a mixed bag of problems, some more difficult than others.

I hope that this has been a useful examination of my thought process for the first week of Advent of code -
maybe it even helped someone who got a bit stuck.   If you're lucky I'll do another retrospective next week.

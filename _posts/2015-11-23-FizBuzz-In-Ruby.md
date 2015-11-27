---
layout: post
title: FizzBuzz - Why Should You Care If You Are a Jr. Developer
excerpt_separator: <!--more-->
img_file: fizzbuzz.jpg
---
FizzBuzz is a very simple programming task, used in software developer job interviews, to determine whether the job candidate can actually write code. It was invented by <a href="http://imranontech.com/2007/01/24/using-fizzbuzz-to-find-developers-who-grok-coding/">Imran Ghory</a>, and popularized by Jeff Atwood. 
<!--more-->
Here is a description of the task:

```
Write a program that prints the numbers from 1 to 100. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".
```

It's very well known in software development circles. There are multiple implementations in every language, joke implementations, and plenty of articles discussing its usefulness during the hiring process.

As a to be Jr. Ruby Developer here is my personal take on this challenge. 

<xmp>
1.upto(100) {
    |i| 
    if i %  3 == 0 && i % 5 == 0
        print "FizzBuzz "
    elsif i % 3 == 0
        print "Fizz "
    elsif i % 5 == 0
        print "Buzz "
    else
        print i.to_s + " "
    end 
}
</xmp>
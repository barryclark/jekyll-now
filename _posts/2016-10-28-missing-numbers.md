---
layout: post
comments: true
title: Missing Numbers and Algorithm's Analysis
---

One of these days I run into Hacker Rank. If you don't know what is, it's a really cool web site where you can solve some programming problems. You can find more information on [Hacker Rank](www.hackerrank.com).

After solving some problems, I've find an interesting one, which made me think some stuffs abouts algorithms.
The problem is really simple. There are two lists, A and B, and you have to show all the numbers in list B that are not in list A.
So, for example, if you get:

```
A = [1,2,3,4]
B = [1,1,2,3,4,5]
result = [1,5]
```

My first thought was that this problem actually is asking for the difference between two Sets, then I created a small program to solve it:

```python
for i in arr:
  if i in arr2:
    arr2.remove(i)
```

The idea here is quite straighforward. There are two arrays. For each element within array A, you take the same element(if it exists) out of array B.
At the end of this iteration, you'll have the difference between the arrays on array B.

Even though this algorithm is correct, I got a timeout error in the test case for real big values(precisely n=1000000).

I think that it's a great opportunity to explain some notions about algorithm's analysis, to realise why this simple solution is a terrible one.

## Algorithm's Analysis:

Firstly, it's important to understand what exactly Analysis of algorithms is. Basically, it's a way to estimate the resources needed for an algorithm. These resources can be both time or memory and we can use this estimation to compare different algorithms for the same problem and then choose which one would be the better choice, for example.

The analysis of algorithms must be done regardless of the machines used for the implementation. The reason for that is really simple: the main goal here is to compare algorithms, not programs. Imagine if we try to take all the differences among different processors into account in our analysis? It will be really complex! 

A way to do it is comparing the number of operations using a **hypothetical computer**. This computer is made to turn the analysis easier, so it's considered that each simple operation, such as +, \*, -, =, if, takes one time step. This computer is called *RAM(Random Access Machine)*. If you want more information about it, check The Art of Computer Programming by Donald Knuth.

So, basically, an analysis could be made by counting the number of steps used by this machine. Let's do it.

```python
for i in arr:
```
Alright, this for command is a loop. Everything within this for will be executed n+1 times, where n is the length of arr.

```python
    if i in arr2:
```

This part here is a little bit tricky. This is a search operation, where the value of *i* will be searched in arr2. If there is at least one member of arr2 with the same value of i, it will return true. However, the number of steps here will depends on the members of **arr2**. If the first element in arr2 is *i*, then the search will be made in just one step. If there is no i within arr2, then the computer will search in **all elements** of arr2 and the number of steps will be exactly the length of arr2.

How can we analyse a situation like that??

Usually we define three functions:

* The worst case scenario - We assume that the worst thing will happen. And the worst thing here is that there will be no i within arr2.
* Best Case scenario - The i is located in the first position of arr2, so, there will be only one step.
* Average case - This is what will happen usually. It can be really hard to calculate it, as it requires a notion of an average input. We can devise a probability distribution over inputs.

The best case scenario is not really useful, as it doesn't happen often.
The average case is really useful, but it can be really hard to calculate, so, usually it's used the worst case scenario to evaluate an algorithm. 

So, backing to the algorithm, the last part is:

```python
    arr2.remove(i)
```

This is another operation that requires a search to be made, which means that in the worst case, it will be made m steps, where m is the length of arr2.
So, the number of steps will be:

$$ T = \sum_{i=1}^{n} \sum_{j=1}^{m} \sum_{k=1}^{m}1 = mn^2 $$

Considering the case that both arr2 and arr have almost the same size, we will have:

$$ 
m \cong n \Longrightarrow T(n) = n^3 $$

So, what does it mean? It means that the number of steps in this algorithm is a function that **depends on the input's size**. So, the bigger the input's size, the bigger is the number of steps to solve it. The main point of this function is not showing how much time a computer takes to solve the problem. But **showing how the algorithm behaves according with the input size**. 
We can see that as the input size grows, the number of steps grows as a cubic function.

Therefore, if we get an array of size 5, it will take 125 steps to solve it. If we get an array of size 100, there will be 1000000 stes to solve it. If we get an array of size 1000000, there will be:

$$ 10 ^{18} steps $$

A modern processor can process 100 bilions structions per second(it is quite fast, isn't?). However, let's calculate how much time would a modern computer take to process this problem

$$ Time = 10^{18} / 10^{11} = 10^7 seconds \cong 116 $$ days

Wow!! Almost 116 days to process it! It's not a surprise I got a timeout error!!
Using basic algorithm's analysis I could understand why my first algorithm was a really bad idea to solve the problem. On next post I'll show my final answer, how I solve this problem in a much faster way.

ps: Another really important tool to deal with algorithm's analysis is the Big Oh Notation, I didn't explain it on this post, as this post is suppose to be an introduction to this field.
I recommend [This Post](https://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/) to learn more about it.

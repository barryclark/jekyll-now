---
layout: post
title: Big O Complexity and Notation
excerpt_separator: <!--more-->
img_file: big-o.png
---
Let's say you want to travel from City A to City B. Your options are:
<!--more-->

###Why do we want to analyze an algorithm?###

Let's say you want to travel from City A to City B. Your options are:

1. Walk
2. Ride a bike
3. Take a city
4. Drive a car
5. Fly

Some of these makes sense over others. But if you literally lived couple of blocks away from City B then most likely you will walk there. Conversely, if the city B is across the country, then flying makes more sense.

In computing algorithms are the same way. Our ultimate goal in designing an algorithm is to complete the task as efficiently as possible. And efficiency means: Time and Space Used (memory etc.)

###Running Time Analysis###

The running time of an algorithm increases related to the size of the input.

Input = n values

In order to calculate the worst case scenario, we need to assume that n is a large number. And in a function like this:

f(n) = n&sup3; + n

The second `n` becomes **a Lower Order Term** meaning that it can easily be ignored. If you are having trouble understanding what this means, simply assign 1 million to `n` and do both calculations.

We analyze algorithms in 3 ways. 

1. Worst Case: Longest time it takes. Notation is O(n) and denoted as Big Oh.
2. Best Case: Least time it takes. Notation is &Omega;(n)	and denoted as Omega
3. Average Case: Average time it takes. Notation is &theta;(n)	and denoted as Theta

Most of the time we use Big Oh notation to plan for the worst.


###Some Examples###

<xmp>
for (int i = 0; i < n; i++) {
	m = m + 2;
}
</xmp>

In the above function the loop happens `i` times and the constant is `m = m + 2`

So our function is `f(n) = c * n` - Typically the leading constant is ignored so the Big Oh event of our function becomes.

`f(n) = O(n)`


<xmp>
for (int i = 0; i < n/2; i++) {
	m = m + 2;
}
</xmp>


The constant operation in this function is still the same `m = m + 2`. However the loop now goes `n/2` times.

So the function will be:

`f(n) = c * 1/2 * n` When we get rid of the constanst `c * 1/2` we get:

`f(n) = O(n)`


<xmp>
for (int i = 0; i < n; i++) {
	for (int j = 0; j < n; j++) {
		k = k + 2;
	}
}
</xmp>


Above function is a nested loop. Our constant operation of `k = k + 2` is run n times. And the inner loop is executed another n times. So the function is

`f(n) = c * n * n` and the Big Oh is = O(n) = n&sup2;

That is it for this post. YouTube and Google has tons of informational videos and posts about the topic. 








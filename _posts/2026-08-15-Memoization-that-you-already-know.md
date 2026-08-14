---
title: Memoization application that you already have used but might not know !
excerpt: Memoization
---

### Memoization
    
In the Computer Science, there is a concept of [Memoization](https://en.wikipedia.org/wiki/Memoization), where the idea is to "remember" something which is kind of expensive to compute and can later be useful, if you already knew the result, as the Wikipedia article already describes, to calculate $10!$ , you would need to multiple all the numbers from 10 to 1, which is kind of computationally expensive. If a program (process) in a later part of an execution, may need to calculate $15!$ , and it might already have saved computed result of $10!$ in a memory, it then doesn't have to calculate $15!$ all the way up to 1, but only till 11 and then we can use $10!$ result that program already knew, so in another word 

$$15!=15 \times 14 \times 13 \times 12 \times 11 \times 10!$$

and then in this process once also save values of $14$ up till $11!$ , as we are calculating that values too in process , like $n!=n*(n-1)!$

### Have we already be using such technique?
    
To answer this question, let us iterate briefly, how do we multiply 2 digits number. Let's call this function $M$.

Function M takes 2 argument which are numbers and maps it to the product.
$$M(n_{1},n_{2}) = n_{1} \times n_{2}$$

Now for sake of simplicity we would assume following but that can be proven and known anyways, 

1. any number which is multiplied by 10 can be calculated very easily, we just add $0$ after that number, kind of shifting entire number left with one place. for multiple of 10s, we shift the number that many times. so, something like $$M(\overline{ab}, 10) = \overline{ab0}$$ 
2. This function is commutative, so $$M(n_{1}, n_{2}) = M(n_{2}, n_{1})$$
3. And with a distributive nature of multiplication, we know that $$M(a, b + c) = M(a,b) + M(a,c)$$

### So what?

Let's now see how we would multiple two double digit numbers the old school way.

Say for instance we are multiplying 34 and 12

$$\begin{aligned}
34 \times 89\\
= (30 + 4) \times (80 + 9)\\
= (30 \times 80 ) + (30 \times 9) +  (4 \times 80) + ( 4 \times 9 )
\end{aligned}$$

Before we go further, let's generalise this with the above noted assumptions.


$$\begin{aligned}
M(\overline{ab},\overline{cd}) \\
= M(\overline{ab},\overline{c0} + \overline{d}) \\
= M(\overline{ab},\overline{c0} + \overline{d}) \\
= M(\overline{ab},\overline{c0}) + M(\overline{ab},\overline{d}) \\
= M(\overline{a0} + \overline{b},\overline{c0}) + M(\overline{a0} + \overline{b},\overline{d})\\
= M(\overline{a0},\overline{c0})  + M(\overline{b},\overline{c0}) + M(\overline{a0},\overline{d})  + M(\overline{b},\overline{d})\\
= M(M(\overline{a},\overline{c}),100)  + M(M(\overline{b},\overline{c}),10) + M(M(\overline{a},\overline{d}),10)  + M(\overline{b},\overline{d})\\
\end{aligned}$$

## How do we actually calculate 2 single digit numbers ?
so, we were able to successfully reduced a multiplication of a two double digit numbers into sum of several single digit multiplication and multiplication with power of 10.
but say for instance, how would we ever calculate 

$$4 \times 9$$ ?  

it seems the only way to do that is to sum up 4 9 times, so we would need to manually do a calculation and derive that value.

like 4 * 9 = 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 
so  in general, 
$$a \times b = \sum_{i=1}^{b} a $$

Now comes the interesting part, we would need such multiplication in our life daily, so probably those ancient wise people realise that and calculated
multiplications of those all single digit combinations to make daily life easier, which we also know as tables and we all have **Memorised** those tables probably for the very same reason. 

We have been using calculated look ups for single digit multiplication to speed up multiplication of multi digit numbers, kind of Memoization, since our early childhood ! 

### Memoization vs Precalculated tables.
It is worth noting that remembering tables also be treated as a precalculated look up tables, but the core idea remains same.

Thanks for reading!

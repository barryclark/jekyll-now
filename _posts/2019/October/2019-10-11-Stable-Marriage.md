---
layout: post
title: ACM@USC Codeathon Stable Marriage Problem
date: Oct 19, 2019
time: 22:04 UTC-4
---

Note: even though this was written October 11 2019, it will not be made public until October 19 2019.

So it should be obvious I love graph problems. Considering the other problem I wrote was a simple minimum spanning tree problem, [Mirp's Minimalist Highway](https://github.com/justinba1010/USCCodeathon-F19-Upper/blob/master/city-building/), it should be obvious my next one was going to be another. The second problem,[Buell's Pair Project](https://github.com/justinba1010/USCCodeathon-F19-Upper/tree/master/marriage), named after a professor at the University of South Carolina, was a stable marriage problem.

I originally got the algorithm from MIT's great open course, [MIT Introductory Graph Theory for CS](https://www.youtube.com/watch?v=h9wxtqoa1jY&list=PL6MpDZWD2gTF3mz26HSufmsIO-COKKb5j) back in Freshman year. It's a fun problem.

So it starts with a bipartite graph, and you have the weights of directed edges indicating the "happiness" one would receive if matched with another. And here's the trick, technically the Gale-Shapley Algorithm would only find a stable matching, and not necessarily optimize for maximum matching. However, if one disjoint set is bachelorred out by their first choices first, you are optimizing for that set's preferences. So originally the problem was written for complete maximum, but that's actually a very hard problem.

![]({{ site.url}}/images/marriage/wikipedia-bipartite.png)
Credits to Wikipedia for the image.

After trying to figure the solution myself with pen and paper, I kept reading. I realized the algorithm I was familiar with, the Gale-Shapley, actually optimizes for the group that is making the first choice. This worked great, I rewrote the problem, with this in mind.

As far as the following solution goes, it uses a lot of tricks. First I use two adjacency matrices. And lastly, I use a list for engagements. I skip the proposals, as the algorithm does not need double steps if we're starting with no one engaged. 

```python
# Copyright 2019
# Justin Baum
n = int(input())
group1 = [list(map(int, input().split(" ")[:n])) for _ in range(n)]
group2 = [list(map(int, input().split(" ")[:n])) for _ in range(n)]
group1choice = [-1 for _ in range(n)]
while -1 in group1choice:
    g1 = group1choice.index(-1) # Get unmatched group 1
    g2 = group1[g1].index(max(group1[g1])) # Get highest ranking
    if g2 in group1choice:
        g1_other = group1choice.index(g2)
        if group2[g2][g1] > group2[g2][g1_other]: # Group 2 person likes this person more
            group1choice[g1_other] = -1
            group1[g1_other][g2] = -1
            group1choice[g1] = g2
        else:
            group1[g1][g2] = -1
        continue
    group1choice[g1] = g2
summy = 0
for (g1, g2) in enumerate(group1choice):
    summy += group1[g1][g2] + group2[g2][g1]
print(summy)
```

## Below is the Problem Statement:

# Buell's Pair Project

Dr. Buell has announced an assignment where students may work in pairs. However he has split the class into two groups so that people who worked together already are in the same group. No pair in the same group can work together. Luckily this year, he has an even number of students, and so there will be no groups of 3. Every student has their own preferences to be matched with each student, in fact Dr. Buell has implemented an algorithm that returns the total happiness from 0-100 of how happy a person would be matched with another.

Your goal is to maximize the total happiness for group 1 and make sure that there exists no time where people will leave their partner for person who would be happier in the new match. This would lead to instability.

Note: It is guaranteed every person will have an unambiguous preference order, and there will be no two people in group 1 with the same preference for the same person in group 2.

## Description

Given everyone's happiness rating to everyone in the other groups, calculate the total happiness where no one is willing to leave with someone else who is also willing to leave.

## Input

The first line will give the number $$n$$ of people in each group. The following n lines will contain each person's in group 1 happiness rating with each other person in group 2, in order. The following n lines will also contain each person's, this time in group 2, happiness rating with the people in group 1.

$$g_ip_jpp_k$$ will designate group i's person j's happiness rating with the opposite group's person k.

```
n
g_1-p_1-pp_1 g_1-p_1-pp_2 ... g_1-p_1-pp_n
g_1-p_2-pp_1 g_1-p_1-pp_2 ... g_1-p_2-pp_n
...
g_1-p_n-pp_1 g_1-p_n-pp_2 ... g_1-p_n-pp_n
g_2-p_1-pp_1 g_2-p_1-pp_2 ... g_2-p_1-pp_n
g_2-p_2-pp_1 g_2-p_1-pp_2 ... g_2-p_2-pp_n
...
g_2-p_n-pp_1 g_2-p_n-pp_2 ... g_2-p_n-pp_n
```

## Constraints
$$0 \leq n \leq 1000$$  
$$0 \leq g_ip_jpp_k \leq 100$$  

## Output

Print the total maximum happiness that can be attained without "unstable" pairings, while maximizing group 1's happiness.

## Sample Input 1

```
2
90 17
40 95
35 75
90 19
```

### Explanation

In this example, let group 1 consist of James and Brady, with James being group 1 person 1, and Brady being group 1 person 2. Likewise in group 2, there are Charles and Noemi, Charles being group 2 person 1, and Noemi being group 2 person 2.

In this example James is happiest with Charles, with a happiness of 90, but only 17 if he is paired with Noemi. Brady has a 40 happiness with Charles, but he prefers to be paired with Noemi, with a 95 happiness. For group 2, Charles prefers Brady with a 75, and has a corresponding happiness with James at 35. And Noemi prefers James at 90, and less so for Brady at 19.

So the 2 pairs in the end should be, James + Charles, and Brady + Noemi. The reason being that Charles will not leave for Brady, as Brady does not want to leave, and Noemi will not leave for James, as James does not want to leave. The total happiness is 239.

## Sample Output 1

```
239
```

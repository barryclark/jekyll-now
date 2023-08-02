---
published: true
tags: technical
---
## Genetic Algorithms Part 3 - Constraint Satisfaction Problems

### Part 3
In part 3, I will demonstrate how to apply a genetic algorithm to solve constraint satisfaction problems by implementing a solution for the n-queens problem. Additionally, I will show how these problems can be solved using traditional methods and compare/contrast the relative utility of the different implementations.


## Genetic Algorithms Part 3 - Constraint Satisfaction Problems

### Part 3

In part 3, I will demonstrate how to apply a genetic algorithm to solve constraint satisfaction problems by implementing a solution for the n-queens problem. Additionally, I will show how these problems can be solved using traditional methods and compare/contrast the relative utility of the different implementations.



### Constraint Satisfaction Problems(CSPs)

From Wikipedia: "CSPs are mathematical questions defined as a set of objects whose state must satisfy a number of constraints or limitations. CSPs represent the entitiies in the problem as a homogenous collection of finite constraints over variables, which is solved by constraint satisfaction methods". The most well known CSPs display similar characteristics to the previously seen combinatorial search problems encountered in part two and because of this often exhibit factorial or higher complexity when solved with brute-forced based solutions.

The tried and true method for facing down search problems with high computational overhead is to introduce heuristics that reduce the search space. As we have seen, combinatorial search problems are also well suited for genetic algorithms. In this post, I will show examples of heuristics for the n-queens problem and the well known game of sudoku that will greatly improve the solve times. I will compare the achieved results with that of a brute force solution and a genetic algorithm solution. 


All code for this post and series, including for the following animations, is included in the repository https://github.com/ColeStrickler/DarwinWasWrong.

### Brute Force Solution
Both the n-queens problem can be solved by the backtrack search algorithm. Pseudocode for this algorithm in these contexts would look like

> def Backtrack(state):
	for v in state.variables.not_set:
    	for p in possible_values:
        	if p == v does not violate constraint:
            	old_v = v
            	v = p
                if Backtrack(state):
                	return True
                else:
                	v = old_v
   		return False
                	
                

This algorithm will explore every possible state that does not violate the initial constraint. It is likely, however, that because it operates in a DFS manner that the algorithm will wade deep into the search space before realizing that it made an error that results in many wasted CPU cycles.

![]({{site.baseurl}}/images/sudoku_backtrack.gif)

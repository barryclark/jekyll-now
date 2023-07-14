---
published: true
---
## Genetic Algorithms Part 2 - Combinatorics

### Part 2
In part one of this blog series we covered the basics of genetic algorithms and a visual demonstration was provided to drive home the key ideas. In this blog post we will use the same basic toolkit to solve two of the most notorious problems in computer science: the traveling salesman problem and the vehicle routing problem. 

These problems belong to a set of problems known in theoretical computer science as NP hard and significant resources have been levied to find reasonable solutions for solving these problems. Depending on the size of the target problem, it may take more computational power than can be realistically garnered to find the global optima. Because of this trait, most methodologies for solving problems in the NP hard class rely on heuristics and find a "good enough" solution. An example of an algorithm that does this for the traveling salesman problem is the Christofides algorithm https://en.wikipedia.org/wiki/Christofides_algorithm.

If you could not tell by the title of this blog post we will not be using heuristics, but will rather be using a genetic algorithm to find a solution. As you read this post, keep in mind that this method is not guaranteed to find the global optima and that you may get different results due to the nondeterministic nature of the system. Adjacently, NP problems are considered such if they are solvable in polynomial time by a nondeterministic Turing machine https://mathworld.wolfram.com/NP-Problem.html.

Full code for this blog post is located here: https://github.com/ColeStrickler/DarwinWasWrong.

## The Traveling Salesman Problem (TSP)
"Given a list of cities and the distances between each of them, determine the shortest path that visits each of the cities and then returns to the starting city". Additionally, assume we can travel as the crow flies

The TSP has many real world applications. Think scheduling, logistics, microchip manufacturing, and even DNA sequencing. The genetic algorithm implementation for the TSP is the same as any other, the only major hurdle is devising a suitable genotype to phenotype mapping and then all other considerations will follow relatively easily. 

We will use the following map in our problem example. This specific problem is from here: https://developers.google.com/optimization/routing/tsp. Having a problem that has been previously solved will allow us validate the convergence of our implementation since we already know the global optima, which is 7293.

![]({{site.baseurl}}/images/us.PNG)

The distances between cities are held in a dictionary. 
A = New York, B = Los Angeles, C = Chicago, D = Minneapolis, E = Denver, F = Dallas, G = Seattle, H = Boston, I = San Franscisco, J = St. Louis, K = Houston, L = Phoenix, M = Salt Lake City

### Representation

We can represent DNA as a list of cities in the order that we will visit them. A trip from New York to Chicago to Dallas and then back to New York would be represented as the string "ACFA". We will initialize the starting population with the following function.

![popinit_tsp.PNG]({{site.baseurl}}/images/popinit_tsp.PNG)

Calculating the fitness of an individual will use a data structure under the variable name graph. This data structure holds the distances between cities.

![calcFitness_tsp.PNG]({{site.baseurl}}/images/calcFitness_tsp.PNG)


We will see the previously used operators make an appearance as well:

**Selection**

![selection_tsp.PNG]({{site.baseurl}}/images/selection_tsp.PNG)

**Mutation**

![mutate_tsp.PNG]({{site.baseurl}}/images/mutate_tsp.PNG)

**Reproduction**

![repr_tsp.PNG]({{site.baseurl}}/images/repr_tsp.PNG)

With hyperparameter values of mutation_rate=0.12 and population_number=10000 we converge to the global optima in just 20 generations!

Solution: "IGMEDCHAJFKLBI"

![fullpath_tsp.png]({{site.baseurl}}/images/fullpath_tsp.png)


![tsp_solved.PNG]({{site.baseurl}}/images/tsp_solved.PNG)


## The Vehicle Routing Problem (VRP)
For this problem, imagine that you are charged with designing a distribution network for a company. The company has a budget for three distribution centers, and the routes will need to visit all the same cities used in the previous problem. Assume again we can travel as the crow flies. How can we select locations for the distribution centers such that every city will be delivered to in the least amount of total miles? 

So you don't have to scroll up, here is the orginal map and the letter-city mappings: 

![]({{site.baseurl}}/images/us.PNG)

The distances between cities are held in a dictionary. 
A = New York, B = Los Angeles, C = Chicago, D = Minneapolis, E = Denver, F = Dallas, G = Seattle, H = Boston, I = San Franscisco, J = St. Louis, K = Houston, L = Phoenix, M = Salt Lake City

### Representation

This problem requires a slightly different approach due to the unique constraints of the problem. We cannot go about genotype to phenotype mapping in the same way as the previous problem because the DNA does not represent a single course of actions, but rather three separate action sequences. For this problem we will model the genotype/DNA as a list of three lists, while placing certain constraints on the construction of these lists to make sure that their make up does not violate the nature of the problem. 

The constraints are as follows:
- If a location exists in one internal list, it should not exist in the other internal lists(No city will be visited by drivers headquarted in two different distribution centers)
- An internal list must start and end with the same location(The delivery drivers must return back to their warehouses after they have delivered their payloads)

The starting population will be initialized with the following function: 

![]({{site.baseurl}}/images/init_pop_vrp.PNG)![init_pop_vrp.PNG]({{site.baseurl}}/images/init_pop_vrp.PNG)


I will also introduce two different ways to calculate fitness.

The first way will try to optimize the solution such that drivers from each distribution center will travel the minimum average distance.

![vrp_similar_dist_calcfitness.PNG]({{site.baseurl}}/images/vrp_similar_dist_calcfitness.PNG)

The second way way will try to optimize for the least amount of total distance in order to save the company the maximum amount of money.

![vrp_maxSaved_calcFitness.PNG]({{site.baseurl}}/images/vrp_maxSaved_calcFitness.PNG)

Here are the implementations of the other operators:

**Selection**

![vrp_selection.PNG]({{site.baseurl}}/images/vrp_selection.PNG)


**Mutation**

![vrp_mutate.PNG]({{site.baseurl}}/images/vrp_mutate.PNG)

**Reproduction**

This ones a doozy - embrace my glue code.

![vrp_repr1.PNG]({{site.baseurl}}/images/vrp_repr1.PNG)
![vrp_repr2.PNG]({{site.baseurl}}/images/vrp_repr2.PNG)


With hyperparameter values of mutation_rate=0.22 and population_number=10000 we converge to the following solutions:


**Optimizing for minimal average delivery driver distance**

Achieved Solution: [['D', 'J', 'C', 'A', 'H', 'D'], ['E', 'M', 'F', 'K', 'E'], ['L', 'B', 'I', 'G', 'L']],
Longest Drive: 1,654 miles

![vrp_solution.png]({{site.baseurl}}/images/vrp_solution.png)


**Optimizing for minimal total driver distance**

Achieved Solution: [['A', 'H', 'A'], ['I', 'B', 'L', 'M', 'E', 'D', 'C', 'J', 'F', 'K', 'I'], ['G', 'G']], Total Route Length: 3,971 miles

![vrp_solution2.png]({{site.baseurl}}/images/vrp_solution2.png)


I will let the reader decide which one makes the most sense in the real world.


In the next post of this series I will describe how genetic algorithms can be applied to constraint satisfaction problems and give an implementation that leads to a solution for the n-queens problem.

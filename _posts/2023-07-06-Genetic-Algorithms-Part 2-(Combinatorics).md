---
published: true
---
## Genetic Algorithms Part 2

### Part 2
In part one of this blog series we covered the basics of genetic algorithms and a visual example of was provided to drive home the key ideas. In this blog post we will use the same basic toolkit to solve two of the most notorious problems in computer science: the travelling salesman problem and the vehicle routing problem. 

These problems belong to a set of problems known in theoretical computer science as NP hard and significant resources have been levied to find reasonable solutions for solving these problems. Depending on the size of the target problem, it may take more computational power than can be realistically garnered to find the global optima. Because of this trait, most methodologies for solving problems in the NP hard class rely on heuristics and find a "good enough" solution. An example of algorithm that does this for the travelling salesman problem is the Christofides algorithm https://en.wikipedia.org/wiki/Christofides_algorithm.

If you could no tell by the title of this blog post we will not be using heuristics, but will rather using a genetic algorithm to find a solution. As you read this post, keep in mind that this method is not guaranteed to find the global optima and that you may get different results due to the nondeterministic nature of the system. Adjacently, NP problems are considered such if they are solvable in polynomial time by a nondeterministic Turing machine https://mathworld.wolfram.com/NP-Problem.html.

Full code for this blog post is located here: https://github.com/ColeStrickler/DarwinWasWrong.

## The Travelling Salesman Problem (TSP)
"Given a list of cities and the distances between each of them, determine the shortest path that visits each of the cities and then returns to the starting city"

The TSP has many real world applications. Think scheduling, logistics, microchip manufacturing, and even DNA sequencing. The genetic algorithm solution to the TSP is the same as any other, the only major hurdle is devising a suitable genotype to phenotype mapping and then all other considerations will follow relatively easily. 

We will use the following map in our problem example. This specific problem is from here: https://developers.google.com/optimization/routing/tsp. Having a predefined problems is good because it lets us validate the convergence of our algorithms since we already know the global optima, which is 7293.

![]({{site.baseurl}}/images/us.PNG)

The distances between cities are held in a dictionary. 
A = New York, B = Los Angeles, C = Chicago, D = Minneapolis, E = Denver, F = Dallas, G = Seattle, H = Boston, I = San Franscisco, J = St. Louis, K = Houston, L = Phoenix, M = Salt Lake City

### Representation

We can represent DNA as a list of cities in the order that we will visit them. A trip from New York to Chicago to Dallas and then back to New York would be represented as the string "ACFA". We will init the starting population with the following function.

![popinit_tsp.PNG]({{site.baseurl}}/images/popinit_tsp.PNG)

Calculating the fitness of an individual will use a data structure under the variable name graph. This data structure holds the distances between cities.

![calcFitness_tsp.PNG]({{site.baseurl}}/images/calcFitness_tsp.PNG)


We also will see the expected characters make another appearance as well.

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







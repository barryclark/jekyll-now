---
published: true
---
## Genetic Algorithm Part 1

### What are genetic algorithms?

Genetic programming is a a programming paradigm that is motivated by the concept of natural selection. Selection is both a cyclic and stochastic process where the individuals who are most "fit" are used to generate the offspring of the next generation. Due to the self organizing behavior of the system, the results are often beautiful and surprising.


### Modeling

Darwin's theory of natural selection described how beneficial traits are selected for through natural processes. Later in the 19th century, Gregor Mendel formulated a probabilistic model that showed how these traits are passed on from parents to offspring. The structure of DNA was not discovered until much later in 1953. In carbon based life forms, DNA is the fundamental "code" that gives rise to structure and complexity. DNA is composed of 4 major components often abbreviated as ACTG(adenine, guanine, thymine, and cytosine). We can take note of the self organizing behavior of DNA use similar methods to model a computer program.

For example, let letters a-z model function n1-n26. We can compose a string of arbitray length with the letters a-z which will represent a series of function calls. To make this concrete let a = Snap(), b = Crackle(), and c = Pop(). The string "aaabcccb" when parsed will result in the following series of calls:

Snap(), Snap(), Snap(), Crackle(), Pop(), Pop(), Pop(), Crackle()

That was easy. Now let's think about reproduction. 

### Evaluating Fitness

To choose which entities from the current generation will be passed onto the next generation, we must rank the individuals based on a fitness function that we will call f(). Depending on what we are trying to optimize, we will either prefer the maximum or the minimum output.

Now we can choose which individuals from the current population will reproduce. There are many ways this can be done but the most popular way is to select individuals based on a probability proportional to their fitness score. Another option is to select a cutoff point where individuals are not picked from beyond, such as a maximimum rank or some f().


### Reproduction

Now that we have decided which individuals will be used to produce the next generation, we are ready for reproduction. To simulate a reproductive process, we will split the DNA string from _p_ parents and recombine it into _p_ offspring. Here are few key parameters that affect this process:

- Crossover Point -> the point in which the DNA of two parents is split for recombination into two children
- Mutation Rate -> this a probability value that determines how often a value in the DNA will be randomly flipped to a different value
- Elitism -> The practice of always including some number of individuals with the best f() value. This ensures that results will never get worse over time.

There is room for endless play in how reproduction is carried out and some variations will perform much better than others. Taking another note from the real world, series of useful actions could be grouped together into "genes". Depending on the structure of the problem, a useful series of actions can be helpful in reaching many different solutions. 

Once a base implementation has been formulated, there is often a need to greatly tune a number of parameters so that the model will converge to an acceptable solution. 


### Overview

Here is a graphical overview of everything that was just covered.

![gaflowchart.png]({{site.baseurl}}/images/gaflowchart.jpg)


## Implementation

The following is a simple toy implementation that allows for visualizing the self organizing behavior of genetic algorithms. The scenario will model three entities: prey, predators, and a fur trapper. Additonally food objects will be spread around the map.


### Modeling

We model the DNA of our entities in the following way:
- 0 -> move right
- 1 -> move left
- 2 -> move down
- 3 -> move up
- 4 -> lay trap (trapper only)

When predator consumes prey, or when prey consumes food they will grow larger by a parameterized factor.

### Evaluation Functions - f()

- The prey entity f() function will count how many food objects that the prey has consumed. 
- The predator entity f() function will count how many prey objects that the predator has consumed
- The trapper entity f() function will count how many predator or prey that were snared by traps laid by the entity. 

### Reproduction

Reproduction is done with the following functions.


**Evolutionary Process**

![evolvprey.PNG]({{site.baseurl}}/images/evolvprey.PNG)


**DNA Combination**

![reproduce.PNG]({{site.baseurl}}/images/reproduce.PNG)


**Fitness Function f()**

![fitness.PNG]({{site.baseurl}}/images/fitness.PNG)

        
**Mutation**

![mutate.PNG]({{site.baseurl}}/images/mutate.PNG)

          
Reproduction of the trapper and predator entities was done in a similar fashion but with their own parameters. 
Full code for this blog post is located at https://github.com/ColeStrickler/DarwinWasWrong.

### Visualization

Here we can see a mostly randomized process going on in the first generation

![]({{site.baseurl}}/images/g1.gif)

After 20 generation the magic can be seen in action. The prey are going out of their way to avoid the predators, while the predators are attempting to spread out and hunt the prey in a pack-like fashion. The small number of trappers and a corresponding lack of genetic diversity have caused the offspring to become nearly identical. This would be a case where we would want to modify the parameters of the trapper's evolutionary process. 

![]({{site.baseurl}}/images/g2.gif)


In the next part of this blog series I plan to cover a less trivial implementation of a genetic algorithm.

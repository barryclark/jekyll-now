---
layout: post
title: Neuroevolution - The Introduction
comments: true
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>


Of late I came across a really mind blowing video which is shown below. 

<iframe width="660" height="300" src="https://www.youtube.com/embed/27PYlj-qNb0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

This made me go right to the crux of the concept field behind it – **Neuroevolution**. Maybe you haven't heard of neuroevolution in the midst of all the excitement over deep learning, but it has been the subject of study for a small, enthusiastic research community for decades. Lately this topic has been gathering a lot of attention as people have begun realizing its potential.

Put simply, neuroevolution is a subfield of artificial intelligence (AI) and machine learning (ML) . The concept of neuroevolution consists of triggering an evolutionary process similar to the one that led to the development of our brain inside a computer. In other words, neuroevolution seeks to develop neural networks through evolutionary algorithms.

<img title="Human Evolution" src="https://igennus.com/wp-content/uploads/2014/02/bigstock-Human-Evolution-1105152-Copy.jpg" style="width: 700px; height:300px">

The architecture of our brain is exceedingly powerful. After all, that is the basis of human intelligence,which means, that the evolution of the human brain is the only known natural process in the universe producing a highly intelligent system. The goal of neuroevolution is to trigger a similar evolutionary process inside a computer. In this manner, neuroevolution is the only branch of AI with an actual proof of concept: the brain did evolve, so we know that is one way to produce intelligence.

The core idea of neuroevolution is simple: it's essentially just breeding by utilizing the concepts of biological evolution. But beyond that, things get a lot more interesting. I'm talking about an algorithm called NeuroEvolution of Augmenting Topologies (NEAT) which is a widely used algorithm in neuroevolution and has become popular within a very short span of time.

This algorithm went viral in a video called MarI/O where a network was developed that was capable of completing the first level of super mario (refer to the video below).

<iframe width="660" height="300" src="https://www.youtube.com/embed/qv6UVOQ0F44" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

**NeuroEvolution of Augmenting Topologies (NEAT)** is a genetic algorithm (GA) for the generation of evolving artificial neural networks a neuroevolution technique developed by Ken Stanley in 2002 while at The University of Texas at Austin.

A thorough treatment of the algorithm can be found in the paper [Evolving Neural Networks through Augmenting Topologies](http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf) by **Kenneth O. Stanley** and **Risto Miikkulainen**.

Before we delve deeper into NEAT it is very important that we get the basics right, ie Genetic algorithm. Genetic algorithm is an algorithm that helps in achieving genetic optimization, inspired by the process of natural selection that belongs to the larger class of evolutionary algorithms (EA). Genetic algorithms are commonly used to generate high-quality solutions to optimization and search problems by relying on bio-inspired operators such as selection, cross over (exchange of genetic information) and mutation to improve guesses.

Although they have no experience in the problem domain, they try things a human would never imagine trying. Thus, a person using a genetic algorithm may learn more about the problem space and potential solutions. This gives them the ability to make improvements to the algorithm in a virtuous cycle, hence giving them the ability to survive in the environments confronting them.

There is no doubt that the researchers posit that genetic algorithms are an effective method of  training deep neural networks for reinforcement learning problems and that they outperform traditional RL based approaches in some domains.

The basic structure of a GA is as follows −

We start with an initial population (which may be generated at random or seeded by other heuristics) and select parents from this population for mating. Then we apply crossover and mutation operators on the parents to generate new off-springs in order to get nearer to the optimal result. Finally these off-springs replace the existing individuals in the population and this process repeats until the optimal target has been achieved. In this way genetic algorithms try to mimic the human evolution to some extent.

<img title="Genetic Algorithm Flowchart" align= "middle" src="https://www.researchgate.net/profile/Puran_Tewari/publication/257885838/figure/fig1/AS:267387412938810@1440761535926/Flow-chart-for-typical-genetic-algorithm-technique.png" style="width: 700px; height:400px" >


Keeping all the beginner audience in mind, I've shown a very simple implementation of genetic algorithm below. In the code below, the aim is to guess a password by using the concept of genetic algorithm. We'll start by randomly generating an initial sequence of letters as we don't have any idea from where to start guessing and then mutate/change one random letter at a time until the sequence of letters is our target password "ActiveAI123".

    import random

    import datetime

    geneSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!1234567890"

    target = "ActiveAI123"

In the beginning of the code we define variables geneSet (generic set of letters to create genes from) and target (the password we wish the program to guess).

    def generate_parent(length):

    	genes = []

    	while len(genes)< length:

        	   sampleSize = min(length - len(genes), len(geneSet))

        	   genes.extend(random.sample(geneSet, sampleSize))

            return ''.join(genes)

Next we create a function – generate_parent that generates a random string of letters from the variable geneSet. Here random.sample will return sampleSize length of unique elements chosen from the population sequence. It ensures there will be no duplicates in the generated parent unless geneSet contains duplicate or length is greater than length of geneSet.

    def get_fitness(guess):

        return sum(1 for expected, actual in zip(target, guess) if expected == actual)

Next we define get_fitness function which will return the fitness value of the genetic algorithm. This provides the feedback to the engine to guide it toward a solution. In this problem our fitness value is the total number of letters in the guess that match the letter in the same position of the password.

We also need a way to produce a new guess by mutating the current one. The following implementation converts the parent string to an array with list(parent) then replaces 1 letter in the array with a randomly selected one from geneSet. Then it recombines the result into a string with ''.join(genes).

    def mutate(parent):

        index = random.randrange(0, len(parent))

        childGenes = list(parent)

        newGene, alternate = random.sample(geneSet, 2)

        childGenes[index] = alternate

        return ''.join(childGenes)

    def display(guess):

        timeDiff = datetime.datetime.now() - startTime

        fitness = get_fitness(guess)

        print("{0}\t{1}\t{2}".format("Generation "+ str(fitness), guess,  str(timeDiff))) 

Display function will show the gene sequence, its fitness value and how much time has elapsed. This helps us to keep a track of the algorithm.

    startTime = datetime.datetime.now()

    bestParent = generate_parent(len(target))

    bestFitness = get_fitness(bestParent)

    display(bestParent)

    while True:

        child = mutate(bestParent)

        childFitness = get_fitness(child)

        if bestFitness >= childFitness:

            continue

        display(child)

        if childFitness >= len(bestParent):

            break

        bestFitness = childFitness

        bestParent = child

In the above implementation, startTime variable will return the current local date and time when the program starts to look for the very first parent of generation 1. In the while loop, Generation 1 is mutated and fitness is measured until the mutant's fitness is greater than or equal to len(bestParent). This while loop goes on until all letters match with the target password. The output of the above implementation looks like this:

<img title= "Output" align= "middle" src="https://mail.google.com/mail/u/1/?ui=2&ik=2708e0fb32&view=att&th=161cb9fdfabc2399&attid=0.1&disp=safe&realattid=1593352865703414201-local0&zw
" style="width: 600px; height:250px" >


The above code gives a gist of how genetic algorithms uses the concepts of biological operators of evolution – selection, mutation etc. However it is a really small application. The one shown in the very beginning of this article is one of the incredible applications of the genetic algorithm which attempts to draw a faithful representation of Mona Lisa. That is Roger Alsing's Mona Lisa problem, where the mentioned image has to be reproduced as faithfully as possible using only 50 triangles.

Another amazing implementation is:

<iframe width="660" height="300" src="https://www.youtube.com/embed/XcinBPhgT7M" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

In the above implementation, genetic algorithm is used to find out the appropriate path for snakes to reach their food. With each generation the probability of finding the optimal path increases. And finally they are able to find their way!

Here are few reference links that might help you gain more insights on the topic:

- [NEAT Algorithm](http://neat-python.readthedocs.io/en/latest/neat_overview.html)
- [NEAT Users Page](https://www.cs.ucf.edu/~kstanley/ne)
- [Genetic Algorithm](https://www.cse.unsw.edu.au/~billw/cs9414/notes/ml/05ga/05ga.html)


Written by [Yashika Badaya](https://www.linkedin.com/in/yashika-badaya-7a63a214b) for ActiveAI.
---
layout: post
tags: bayesian-probability-theorie math games
#categories: []
date: 2020-04-25
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Baysian Analysis of a Game for Children - Part 2: The Results Are In'
#comments_id: 3
---

These are the results of my foray into Baysian data analysis applied to a childrens game. This post ties the previous posts concerning simple games, probability theory and functional programming together. After recapping the rules of the game I studied I will present winningest strategy, which will surprise nobody, but I will finish with a plot twist.

# Orchard: The Rules of the Game
 <img width="256" alt="Orchard Game" src="/blog/images/orchard/orchard-box.png">

 The game I am playing over and over again with my kids is a cooperative game named [Orchard](https://www.haba.de/en_GB/orchard--003103) by HABA. The players try to pick fruit from a number of trees before a raven gets to the fruit. The main pieces of the game are:

 * 10 pieces each of differently colored fruit: blue plums, green apples, yellow pears, red cherries. The fruits are placed on trees on the board.
 * 9 raven cards
 * and a six sided die.

Four sides of the die correspond to the colored fruit. One side depicts a raven, the last side depicts a fruit basket. The rules are simple: The players take turns in throwing the die. Depending on the result the players take the following actions:

| Dice Result | Player Action                                                           |
|-------------|-------------------------------------------------------------------------|
| Fruit Color | Pick fruit from respective tree. If tree is empty, do nothing.          |
| Fruit Basket| Pick two pieces of fuit from any (one or two) trees the player chooses. |
|  Raven      | Add a raven card to the middle of the board                             |

The game starts with 40 pieces of fruit and 0 raven cards in the middle. The players lose collectively if all 9 raven cards were placed in the middle. If the players pick all fruit before the 9<sup>th</sup> raven card is placed in the middle, they win. The only time the players have agency is when they roll a fruit basket, because they can choose any two fruit from any trees to pick.

It is an exercise in patience watching my kid perpetually ignore the obvious optimal strategy in favor of *having fun*. That is not how it works! Games should not be fun, they should be rigorously analysed and simulated using overly complex functional programming techniques! Oh... anyways, since the work is done lets see what I did.

## The Question
The strategical element of the game is which fruit the player picks when a fruit basket is rolled. So the obvious question becomes: what is the *best* strategy? For now, let's say the best strategy is the one that wins the most. So the question becomes: what is the strategy that produces the highest chance of winning?

# Simulating Strategies
I can see four basic strategies from which other strategies could be mixed:

| Strategy      | Player Action                                                                                      |
|---------------|----------------------------------------------------------------------------------------------------|
| Pick Greedy   | Player picks from the empties nonzero tree(s). Try to emty the trees as fast as possible.          |
| Pick Favorite | Player first picks the favorite fruit until it is empty. Then the second favorite fruit and so on. |
| Pick Random   | Player picks from a (truly) random tree.                                                           |
| Pick Fullest  | Player picks consecutively from the fullest tree(s).                                               |


I [wrote a simulation](https://github.com/geo-ant/orchard) to test the strategies. I made a very simplifying assumptions to get to the purest results: All players play the same strategy consistently for the whole duration of the game. The last thing a kid does is play consistent, but I am interested in seeing how the strategies compare concerning their chance of winning.

# Results
For a simulated number of $$N=10^7$$ games, the results are as follows. Since the result is binary win/loss, I just need to give the number of wins:

| Strategy      | Number of Wins $$N_W$$ | Win Ratio    |
|---------------|------------------------|--------------|
| Pick Greedy   | $$5324756$$            | $$53.2\%$$   |
| Pick Favorite | $$5685967$$            | $$56.9\%$$   |
| Pick Random   | $$6320775$$            | $$63.2\%$$   |
| Pick Fullest  | $$6842964$$            | $$68.4\%$$   |

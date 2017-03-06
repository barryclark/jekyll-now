---
layout: post
title: How to Use Math to Win at Fantasy Football With a Lineup Optimizer
tags:
- Math
- Sports
- Practical
summary: All the math in the world won't guarantee a win, but it could help.
---

Fantasy football can be tough. When I started playing, I lost 15 dollars *instantly*. I realized I didn't know much about fantasy sports, and I had no business trying to pick players. To stop my tinkering, I decided to wash my hands of the roster and let math decide my lineup for me-- and I quickly won back my 15 dollars. I'm going to explain how an NFL Lineup Optimizer works and provide some code to get you going.

To make an NFL Lineup Optimizer for fantasy sports, you first need point projections for each Player / Defense. That part is actually the harder part, which I'll leave to you. The next thing you need is your optimization algorithm. The easiest way would be to sample teams at random, calculate their score (throwing them out if they breach the salary cap) and saving a team when it outscores your previous best team. However, if you have your projections set, you can solve the problem via **integer programming**.

Integer programming is just a fancy word for a class of optimization problems-- an optimization problem where the solution consists only of integers. There's many different solvers already written for such a problem. I'm going to use Gurobi, which you can get a free license for [here](http://www.gurobi.com/academia/for-online-courses) when you sign up for an online course (even a free one).

We will set up a problem to optimize a Draft Kings lineup (because that's what I use). It would not be hard to modify the code for other leagues. 

# Framing the problem as an IP

Let's go through how we can write this problem as an integer program. First, let's define the following sets
  
  |---
  |Set | Definition|
  |-|-
  |P | Set of all players
  |Q | Set of all quarterbacks
  |W | Set of all wide receivers
  |R | Set of all running backs
  |T | Set of all tight ends
  |D | Set of all defenses
  |---

and variables

  Variable | Definition
  --- | ---
  $$p_i$$ | Points for player i
  $$s_i$$ | Salary for player i.

With that out of the way, we can introduce the decision variables (lingo for the variables whose values we aim to find) for our problem: $$\beta_i$$ which will be defined as 1 if we select player i and 0 otherwise. We will also let $$\beta = (\beta_1, \dots, \beta_n)$$. 

Now, the optimal NFL fantasy lineup can be found by finding $$\beta$$ such that we maximize our projected score (the "objective function" in IP jargon):
\begin{equation}
 \sum_{i\in P} p_i \beta_i
\end{equation}

Subject to the constraints:

  Name | Formula|
  ----- | --------------
  Salary Cap | $$ \sum_{i \in P} s_i \beta_i  \leq 50000$$ 
  Quarterback Limit | $$\sum_{i\in Q} \beta_i = 1$$
  Wide Receiver Limit | $$ 3 \leq \sum_{i\in W} \beta_i\leq 4$$
  Running Back Limit |  $$ 2 \leq \sum_{i\in R} \beta_i\leq 3$$
  Tight End Limit | $$ 1 \leq \sum_{i\in T} \beta_i \leq 2$$
  Defense Limit |$$ \sum_{i\in D} \beta_i = 1$$
  Binary Choice |$$ \beta_i \in \{0,1\}$$

This is a lot of words and notation to say "find the best team that's valid". On that note, we'll clarify notation and then look at how the constraints work. When I write $$\sum_{i\in P}$$ that means the sum of all elements in the set $$P$$. If I had a set $$M = \{ 1,2,3\}$$ then $$\sum_{i\in M} i = 1 + 2 + 3$$.

With that out of the way-- on to the constraints! When a team is chosen (a $$\beta$$), then the terms from the players who you have selected remain, while the other terms disappear. Here's a few example: The quarterback limit-- say you select Ryan Fitzpatrick as your quarterback. Then his indicator, $$\beta_{\text{Ryan Fitzpatrick}} = 1$$ where everyone else's would = 0. For example, $$\beta_{\text{Tom Brady}} = \beta_{\text{Peyton Manning}}  = \dots = \beta_{\text{Joe Flacco}} = 0$$. The final constraint would look like this:
\begin{equation}
 \sum_{i \in Q } \beta_i = \beta_{\text{Ryan Fitzpatrick}} + \beta_{\text{Cam Newton}} + \dots+ \beta_{\text{Sam Bradford}} = 1 + 0 + \dots + 0 = 1.
\end{equation}
We therefore say this constraint is satisfied and so far this solution (with Fitzpatrick selected) is "feasible". 
If your solution has 5 wide receivers, then the Wide Receiver Limit constraint would similarly become
\begin{equation}
2 \leq 5 \leq 4
\end{equation}
which is nonsense, and thus that solution would not be feasible (called "infeasible"). The limit constraints together ensure you don't have too many or two few of any position (and it takes care of a WR/RB/TE flex). The other constraints are probably clear now.

# Running the Code

Once you download the code and input file [(link)](http://www.github.com/srome/srome.github.io/files/nfl_optimizer) and install Gurobi [(link)](http://www.gurobi.com/academia/for-online-courses) , you can run update the projects in the player_input.csv. This is a csv with 4 columns and information on each player. For example, it could look like

Name | Position | Salary | Points
--- | --- | --- | ---
Brandon Marshall | WR | 7200 | 15.4
Odell Beckham | WE | 9000 | 21.2
Llamar Miller | RB | 6000 | 13.2
Broncos | DST | 4000 | 10.1

I would suggest updating the player_input.csv with your own projections.

Now, place the code and the csv in the same folder and run from the command line
    python nfl_optimizer.py

This should give you both the Gurobi ouput and the selected team. For example, it will look something like the following with the optimal team appearing at the bottom.

    Optimize a model with 10 rows, 138 columns and 521 nonzeros
    Coefficient statistics:
      Matrix range    [1e+00, 1e+04]
      Objective range [1e-02, 2e+01]
      Bounds range    [1e+00, 1e+00]
      RHS range       [1e+00, 5e+04]
    Found heuristic solution: objective 33.0971
    Presolve removed 0 rows and 33 columns
    Presolve time: 0.00s
    Presolved: 10 rows, 105 columns, 383 nonzeros
    Variable types: 0 continuous, 105 integer (103 binary)

    Root relaxation: objective 1.022066e+02, 8 iterations, 0.00 seconds

        Nodes    |    Current Node    |     Objective Bounds      |     Work
     Expl Unexpl |  Obj  Depth IntInf | Incumbent    BestBd   Gap | It/Node Time

         0     0  102.20664    0    2   33.09710  102.20664   209%     -    0s
    H    0     0                     101.9766016  102.20664  0.23%     -    0s
         0     0  102.19746    0    2  101.97660  102.19746  0.22%     -    0s

    Cutting planes:
      Cover: 1

    Explored 0 nodes (9 simplex iterations) in 0.01 seconds
    Thread count was 4 (of 4 available processors)

    Optimal solution found (tolerance 1.00e-04)
    Best objective 1.019766016006e+02, best bound 1.019766016006e+02, gap 0.0%
    A.J. Green 12.334 WR
    Chiefs 12.89 DST
    DeSean Jackson 9.0235 WR
    Doug Baldwin 11.5845 WR
    Eddie Lacy 9.015 RB
    James Jones 8.327 WR
    Marshawn Lynch 11.0793 RB
    Russell Wilson 19.7401 QB
    Tyler Eifert 7.9832 TE
    Salary leftover: 200
    Obj: 101.977

The output lists each player selected, their projection, and their position. At the bottom, it tells you how much money is left over and "Obj" is the value of the "objective function", which in this case is the same as the total projected points.

# Extentions


## Controlling for uncertainty

There's a lot more to talk about on the subject of fanasy sports, and I'm sure there will be another post eventually. As I mentioned, finding the optimal is the easy part when compared to getting the right projections. A simple extension to this process would be to assume each player's projection is actually normally distributed around a given mean. Then, you can perform a Monte Carlo simulation where you sample each players projection, followed by solving the IP. This would give you a distribution of the best teams and you'd select the one that either (a) appears the most times or (b) has the highest average score from the simulations. You could even sample their points from a joint normal distribution (or something even more exotic) and define a covariance matrix and... you can see you can do a lot of things here which would be a nightmare to model.

## Adding strategy

Right now the strategy is simply "pick the best team", but many fantasy players like to use strategies. One such strategy is "stacking", which is when you select a quarterback and wide receiver from the same team in hopes they have an explosive game. It makes your lineup more risky (i.e. more variance), but this is a standard practice in tournament style games. If you're playing a 50-50 or double up, you may want a more conservative team since you only have to beat 50% of the players to be in the money. So, if you have access to a confidence interval for each player (which some sites do give you), you could use the lower end of the interval.

# Disclaimer

**This post is for educational purposes only**. No matter how great the math involved is, you're *not* guaranteed or even necessarily more likely to win. 

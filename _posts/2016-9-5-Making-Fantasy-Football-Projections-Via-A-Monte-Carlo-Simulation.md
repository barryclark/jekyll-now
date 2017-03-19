---
layout: post
title: Making Fantasy Football Projections Via A Monte Carlo Simulation
tags:
- Statistics
- Math
- Sports
- Practical
summary: How to make fantasy football projections with historic data and Monte Carlo techniques.
---


In this post, we are going to use historic data from the nflgame package in Python to make projections on total points for a fantasy football team using a Monte Carlo simulation. We'll also discuss a statistical technique to shrink the standard deviation of our projection. As opposed to typical fantasy football projections, our simulation focuses on projecting the score of the team accurately rather than the players, which could give you an edge for selecting your roster.

In our simulation, a fantasy team can be thought of as a sum of random variables, one for each member of a team. An example might be:
$$ X_{team} = X_{qb} + X_{wr1} + X_{rb1} + \dots$$

Each player level random variable outputs a fantasy score, which is sampled from historic games. However, the historic games we consider only come from 2013-2015 to keep the scores relevant. We also will give different sampling weights to different years using a heuristic. This method will not work for first year players.
 
	Important Point: We are choosing the simulate in this fashion. 
	We could extend this approach to simulate the games themselves 
	and estimate each player's outcome in each game. 

 
By defining our fantasy team in such a way, we are able to directly see how we can use a Monte Carlo simulation to project the score of our team. For $N$ experiments, we will sample a score for each player and sum the scores to find a team projection. It is important that we are doing team level projections, and here's why: the team is a sum of random variables. The Central Limit Theorem implies that such sums are approximately normally distributed, especially with a large number of variables being summed together. We can check that in fact, most team projections from this method are approximately normal, even though teams are smaller than the typical 30.

Because the team variable is approximately normal, the sample variance estimator is (approximately) independent from the sample mean estimator. This allows us to have more confidence that any biases in our projections won't be found in both the estimate and the standard deviation.

The next important point is that we will use the expectation of the sample mean as our projection, not the random variable itself. Why? The expectation of the sample mean is the same as the expectation of the original random variable, but it has a smaller standard deviation. Viewing the problem this way allows us to have a tighter confidence interval on the projection. The standard standard in this case is estimated by
$$ S = s / \sqrt{ n }$$
where $$s$$ is the sample standard deviation and $$n$$ is the team size. Luckily, the expectation of the sample mean can be estimated simply by the expectation of the random variable, and so we can just take the average value of the team scores from our experiments.

## Selecting The Team

The first thing we have to do is get the Player objects from nflgame for our team. I wrote a simple function to grab the objects and print them to verify that I have the correct members:


{% highlight python linenos %}
import nflgame
team = ['Drew Brees', 
        'Antonio Brown', 
        'Allen Robinson', 
        'Adrian Peterson',
        'Doug Martin',
         'Gary Barnidge',
         'Keenan Allen']

def make_team(team):
    tm = []
    for p in team:
        for plr in nflgame.find(p):
            if plr.position not in set(['QB','WR','TE','RB']) or plr.status == '':
                continue
            tm.append(plr)
    return tm

def validate_team(team):
    for t in team:
        print(t.full_name, t.team)

tm = make_team(team)
validate_team(tm)
{% endhighlight %}

    Drew Brees NO
    Antonio Brown PIT
    Allen Robinson JAC
    Adrian Peterson MIN
    Doug Martin TB
    Gary Barnidge CLE
    Keenan Allen SD


## Scoring nflgame's output

In order to write a simulation, we're going to need fantasy points for each player. The nflgame package does not provide fantasy points, so I wrote a simple scoring function below.

Essentially, nflgame's methods can return a list of players and they have a "_stats" attribute which contains game level stats, for example "rushing_yrds" which is self explanatory. I collected the important stats into a dict that maps the attribute to a scoring function (given by a lambda) which takes as its input the game stat and outputs the fantasy score.

From this point, the scoring function becomes very simple as you can see below. The scoring is roughly the same as DraftKings.


{% highlight python linenos %}
scoring = {
    'passing_yds' : lambda x : x*.04 +
                        (3. if x >= 300 else 0),
    'passing_tds' : lambda x : x*4., 
    'passing_ints' : lambda x : -1.*x,
    'rushing_yds' : lambda x : x*.1 + (3 if x >= 100 else 0),
    'rushing_tds' : lambda x : x*6.,
    'kickret_tds' : lambda x : x*6.,
    'receiving_tds' : lambda x : x*6.,
    'receiving_yds' : lambda x : x*.1,
    'receiving_rec' : lambda x : x,
    'fumbles_lost' : lambda x : -1*x,
    'passing_twoptm'  : lambda x : 2*x,
    'rushing_twoptm' : lambda x : 2*x,
    'receiving_twoptm' : lambda x : 2*x
}

def score_player(player):
    score = 0
    for stat in player._stats:
        if stat in scoring:
            score += scoring[stat](getattr(player,stat))    
    return score
{% endhighlight %}

## Simulatig the score for a single player

Now that we can score the output from nflgame, we need to select a game for a player and score it. We're going to implement this below. It will take games from 2013-2015 and a random week, and then it will score the game. If for any reason the player has no stats, it will try again (as you can see by the return on the last line of the function).


{% highlight python linenos %}
import numpy as np
def get_score_for_player(player):
    
    # Sample the year and week
    year = np.random.choice([2013,2014,2015],
                            p=[.2,.3,.5])
    week = np.random.randint(1,18)
    
    # Find the player and score them for the given week/year   
    for p in get_games(year,week):
        if p.player is None:
            continue
        if player == p.player:
            return score_player(p)
        
    return get_score_for_player(player) # Retry due to bye weeks / failure for any other reason
{% endhighlight %}

### Defining the get_games function and using the LRU Cache decorator for performance


The get_game function is a wrapper for nflgame which I define below. It can be a costly function because nflgame stores data in zipped files on disk (if it is not pinging the NFL servers).

The get_game function called is defined below. I use the lru_cache decorator to set up a cache for games returned so the code won't have to ping nflgame for the data if it's already been accessed before. This is a simple approach to more efficiently dealing with a library which may have costly function or data access calls.

The inputs and the output of the function must be hashable for this to work Under the covers, the lru_cache will create a dict which stores inputs to outputs. If you call the function with the same inputs as a previous call in the cache, it will automatically return to you the output without actually calling the function.


{% highlight python linenos %}
from functools import lru_cache
@lru_cache(200) # Define a cache with 200 empty slots
def get_games(year,week):
    g = nflgame.games(year,week=week)
    return nflgame.combine_game_stats(g)
{% endhighlight %}

## Simulation and Results

Now, we'll look at the final simulation function. This function will create a pandas data frame of all the player scores for each experiment. This way, if you would like to swap out players for any reason you'll have access to their data. The simulation is straightforward from our building blocks defined above:


{% highlight python linenos %}
import pandas as pd
def simulate(team, exps=10):
    scores = pd.DataFrame(data=np.zeros((exps,len(team))),
                          columns = [p.name for p in team])
    for n in range(exps):
        for player in team:
            scores.loc[n,player.name] += get_score_for_player(player)
    return scores


outcome = simulate(tm, exps=100)
outcome.head()
{% endhighlight %}


<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Drew Brees</th>
      <th>Antonio Brown</th>
      <th>Allen Robinson</th>
      <th>Adrian Peterson</th>
      <th>Doug Martin</th>
      <th>Gary Barnidge</th>
      <th>Keenan Allen</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>13.10</td>
      <td>31.0</td>
      <td>16.3</td>
      <td>6.4</td>
      <td>4.1</td>
      <td>19.4</td>
      <td>23.5</td>
    </tr>
    <tr>
      <th>1</th>
      <td>14.50</td>
      <td>12.5</td>
      <td>14.8</td>
      <td>23.2</td>
      <td>2.6</td>
      <td>19.5</td>
      <td>35.1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>24.20</td>
      <td>36.7</td>
      <td>16.3</td>
      <td>25.3</td>
      <td>12.8</td>
      <td>22.5</td>
      <td>29.7</td>
    </tr>
    <tr>
      <th>3</th>
      <td>14.36</td>
      <td>40.6</td>
      <td>3.7</td>
      <td>6.7</td>
      <td>10.7</td>
      <td>1.9</td>
      <td>23.5</td>
    </tr>
    <tr>
      <th>4</th>
      <td>19.68</td>
      <td>35.8</td>
      <td>16.0</td>
      <td>29.0</td>
      <td>8.8</td>
      <td>11.9</td>
      <td>17.2</td>
    </tr>
  </tbody>
</table>
</div>



## Projecting Fantasy Points

We can calculate some projections easily from our simulation data. Again, we are defining our simulator's projection to be the expected value of the sample mean of the team random variable. Therefore, the standard deviation of our projection is the standard error of the team random variable.


{% highlight python linenos %}
game_points = outcome.sum(axis=1, skipna=True) # Sum the player scores together

print('Team projection: %s' % game_points.mean())
print('Standard Deviations: %s' % (game_points.std()/np.sqrt(len(outcome.columns))))
{% endhighlight %}

    Team projection: 119.5094
    Standard Deviations: 8.61532541363


As mentioned, you may also look at player level stats.


{% highlight python linenos %}
outcome.mean() # Point projections for each player
{% endhighlight %}




    Drew Brees         23.1486
    Antonio Brown      23.2828
    Allen Robinson     17.1940
    Adrian Peterson    17.1430
    Doug Martin        13.0310
    Gary Barnidge      12.1940
    Keenan Allen       13.5160
    dtype: float64


{% highlight python linenos %}
outcome.std()  # Standard deviation in point projections for each player
{% endhighlight %}


    Drew Brees          8.768458
    Antonio Brown      11.413678
    Allen Robinson      8.935615
    Adrian Peterson     8.293532
    Doug Martin         9.705395
    Gary Barnidge       7.577823
    Keenan Allen        8.965317
    dtype: float64

# What's Next?

Obviously, this is a very basic simulator and could be extended in a variety of ways to improve the projections. However, it's a good baseline for creating your own projections for your own team which is usually not the focus on fantasy football websites, as they prefer to make projections at the player level.

## Some Caveats

#### Scoring

In this tutorial, I do a PPR scoring and I do not include special teams. This could certainly be extended to handle those cases.

#### nflgame version

The nflgame package is written for python 2.7. I typically prefer 3.4+, and so I cloned a repo that had futurized the package to python 3.5. You can find this in the pull requests of the main repo on github.

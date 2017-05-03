---
layout: post
title: **Weeks 2 and 3 @ Metis, SF**

* Effectiveness can be learned. * 
* Effectiveness must be learned. *

*     Peter F. Drucker
---

Key words of week 2 & 3 are "effective" and "execution."

Drawing effective predictions from messy data is at the heart of
nearly everything. Whether it’s in economy, sports, politics, or
business - it's always exciting, mostly scary at the same time, but
predicting the future always excited me. It’s both an art and a
science, I believe. And, last two weeks at Metis reinforced my
beliefs!

I am a fan of Golden State Warriors. I absolutely enjoy watching the
game, especially  when Stephen Curry and team rule the floor. But,
when the Cavaliers defeat the Warriors in an epic game thriller, It
was LeBron’s genius that delivered title to Cleveland. Did any one
predict Cleveland’s victory? Or, at least, what would it take to
predict similar outcomes in real-life? Even though I don’t
understand NBA rules and how the game is played, I decided to do my
first “hello world” of predictive modeling on NBA data.

My humble goal was to attempt to model team’s win/loss % in a given
season through modeling common statistics of individual players.
Even though some advanced statistics are available online, my focus
was to develop a most fundamental model, based on publicly available
data (http://www.basketball-reference.com/), which could be feature
engineered in successive iterations, to predict the desired outcome.
Scraping 16 seasons NBA data was not that difficult as expected. But
when I tried to build a liner regression model, several structural
complications undermined my model.

The summary statistics the linear model yielded a poor adjusted
R-square of 0.3. Many of the key player statistics I used to model
the prediction was statistically significant, and strongly
correlated to win/loss %, but they are not sufficient enough to
yield a strong adjusted R-square. Some of the major complications
are (1) Not taking into account team’s roaster changes during the
season - which can erroneously dilute high performing player’s
contribution team (2) Not taking into account  the number of minutes
played by key players, and  (3) Weightage on team’s and individual
player’s performance statistics when two teams with equal strength
are played. Few sample analysis have done in those directions, and
they all seems valid, and require effective feature selection and
execution using the right model.

It’s a great journey so far, and we are headed in the right direction!

Stay tuned. I will be back next week...

Best!

Sathish

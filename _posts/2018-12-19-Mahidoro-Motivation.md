---
layout: post
title: Mahidoro Motivation
---

Mahidoro is a Pomodoro timer that uses an aquarium to create a feedback loop for the user. 

### Why another Pomodoro timer? 

There’s plenty of Pomodoro timers in the app store and on the web. If we take a look at one of the more popular ones, say _Forest_, we see a simple (and unfortunately negative) feedback loop.

Forest works by “locking in” the user to the Forest app. When you start a timer in Forest, the user grows a tree by staying within the app — if they continue using timers the entire day without leaving the app, they end up with an eponymous forest. Naturally, users want to see the trees grow, and this is their incentive for staying in the app. 

However, when users leave during a timer, this cuts down the forest. Users must begin anew. 

This seems harsh to me — users who come to a Pomodoro timer understand they have a problem, and getting rid of their efforts is cruel. Rather than punishment, I believe the best way to guide someone into focus is to incentivize success. 

Rather than trees, which presents no lasting meaningfulness to the user aside from looking at their history of forestry, I wanted to build an ecosystem someone would want to come back to. 

This is the premise of Mahidoro. There’s no punishment for not using a timer — admittedly, this is a naïve dependence on the honor system — but the incentive should be interesting enough to draw the user back in. Therefore, the aquarium does not advance until a timer is finished; there’s no way to see what happens next in your tank until you get some work done. And while work is done, nothing happens. The site should not be a distraction from real work (the funny little graphical aquarium you can visit actually kills your timer — you shouldn’t be watching the fish, after all, you should be doing work/chores).

### Demo mode

Normally, Pomodoro timers are set for 25 minutes of work, followed by 5 minutes of anything else. For the sake of this demo, Mahidoro uses five and two second timers for work and play respectively.

Also, the chances for all events are cranked way up so that you’ll get to see everything in a matter of maybe 30 to 45 seconds. That includes things like seeing fish born with mutated colors (be on the lookout for blue clownfish whose parents are orange!). Just make an account and click around!

### Features and future plans

I’d like to continue expanding on Mahidoro. Fish currently have two stats, speed and hunger, which influence the events in the system. Of those events, there are: 

- arriving (at random; additionally, several fish are guaranteed to arrive in your tank if there are none living within it)
- eating (based on hunger)
- starving (fish’s hunger is over hunger limit, which is currently 40)
- mating 
- death from related events

I’d like to add stats like happiness, so that fish only get busy and have a kid when they’re joyful; and age, so that a particularly hungry shark doesn’t demolish everything in your tank forever. 

There’s random colors, which children are likely to have when born, again due to demo mode. Species and colors could benefit from a kind of “rareness” stat. 

In essence, I’d like to make the events of the system increasingly complex and interesting, because at its core, Mahidoro’s goal is to be an optimist: people want to focus, they just need a reason. Therefore, anything added to it should serve as a catalyst for self-improvement rather than getting in the way of a user’s objective.

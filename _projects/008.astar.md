---
layout: project
title: A* Search
date: September 24, 2014
image: astar.png
---

## Background
Path planning is an essential characteristic in mobile robotics.  In certain applications, an A* (pronounced A Star) search serves as a very robust and quick method for determining a path of least cost, where the metric of cost could be exampled as distance, energy, time, effort, and more.  In the context of this description, we'll refer to cost as distance traveled.

## Technical Description
The A* search algorithm continually evaluates two important metrics: the true cost of a candidate node, as well as the heuristic cost of a candidate node.  A true cost reflects the distance traversed from an origin.  The heuristic cost represents the best-absolute case scenario cost from the candidate node to the goal.  An important factor as that the heuristic must ALWAYS be optimistic - that is, it will never underestimate the cost that would be needed to traverse to the goal.  The heuristic is often evaluate as the Euclidian distance between two points, but could also be expressed in terms such as a Manhatten distance (4 directions), the Diagonal distance (8 directions) and more.

## Code Repo
This implementation generates a random set of obstacles, a random set of nodes, and a random start/finish location.

The code repo can be found (here)[https://github.com/ablarry91/A-star/tree/master].

## Sources
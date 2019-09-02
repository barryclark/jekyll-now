---
layout: post
title: A brief desciption on Q-Learning and how it is implemented
categories: [AI, ML, Q-Learning, Reinforcement learning]
datetime: 04-09-2019
author: Amin R.
readingtime: 7m
---

Are you trying to develop a simple AI agent to win a game? Maybe Q-Learning is a good choice for you. Your system will learn based on its previous experiences, which means in order to reach a good decision to choose between its possible actions, it should have experienced a similar situation. Base on the environment, that may end up the situation when we leave two of our agents to play against each other and learn from it, or just put agent in the world to learn from its experiences!

## Q-Learning Principles
The learning process in Q-Learning is based on scoring the next possible actions. These are called Q-values. It means looking at the environment during the learning process, the agent scores each of its actions based on its experience. For example, in a maze game, such as PacMan, if some actions lead the agent to win the game, the scores of those actions are increased to increase their chance to be selected later. On the other hand, if some actions lead to fail, for example running into a ghost, the scores are decreased to avoid selecting them in the future.

## How to set up the Q-Learning process?
The learning environment includes several world states. The agent moves from one state of the world to another by selecting an action. The states can be represented by tables, each contains several cells. For example, in a PacMan game, a ghost stands at a certain cell. For each cell, adjacent cells are available for the agent to choose for its next action. This is where the scores (Q-values) are required. Therefore, there is a score for each next action, say the next cell. These scores are set to a fix value, say zero, at the beginning, because agent has yet no idea of the outcome of its actions. However, there is a reward/punishment system in Q-Learning method, which effects the scores during the learning process. These rewards and punishments are certain cells, with known scores. For example, the score for the exit cells and ghost cells can be +1 and -1 respectively. The run between the start of the game and when it is finished (or we consider it enough for learning) is called an _episode_. A process of Q-Learning may consist of thousands of episodes or more.

These definitions presented in this step are:
 - state of the world (state): a representation of what happen in the world, where the agent is able to see the situation and select its next action. For the agent, the state may be desirable, undesirable or something between these two.
 - actions of the agent: actions change the status of the world, and may lead to an desirable/undesirable state. These must be selected *intelligently*, and the learning process make it possible.
 - score or Q-values: The intelligence behind Q-Learning is based on the score it assigns to the pairs of states and actions. In other words, when the agent is in a _state_, and it selects an _action_, how much score it gains. This make it possible for the agent to select the best action for the current state of the world.
 - reward and punishment: although at the beginning there is no meaningful score for the most of the world states, if the agent reaches some world states, it is rawarded or punished. Those states are not necessarily the end of the game.
 - episode: The run between the start of the game and when it is finished, or when it is decided to apply the scores.
 - learning: ending the game (either by loosing or winning, or even falling into a loop which may interpreted as a fail) gives the oppurtunity to see which states and actions lead the agent to reach the current state. Q-Learning changes the Q-values for all of the path. However, this is a weighted change, which is dependent to both the times the state, action pair is updated and the distance of it to the end of the episode. For example, the tenth update has more effect that the fifteenth, and the adjacent decision to the end of the game is more effected than the first decision the agent made in the game.
 - state, action pair: it is shown by `(s, a)`. In Q-Learning, a score is assigned to each pair, which is written `Q(s, a)` and read Q-values of that pair.

## Exploration vs Exploitation
Put the agent at the start cell, and let it takes its first action! At the beginning, because of the unknown scores, its actions are taken randomely. However, when it reaches its first win/lose cell (reward or punishment cell), the cells in the path will be updated. In order not to take similar actions on first positive responce, or avoid a good path if it is failed somewhere at the end, an exploration mechanism is embeded into the learning phase of the Q-Learning. It means during the game, there is a probability that the agent select an action except the current best action. This is called the exploration probability. This is decreased during the learning process. It helps the agent to explore the environment at the beginning of the learning, and to focus on improving its final steps at the end.

## Formulate everything!

Before coding, let's look at the formulas. They help to implement what everyone knows as Q-Learning. This is the learning formula, based on Wikipedia:

$$Q^{new}(s_t, a_t) \leftarrow (1-\alpha).Q(s_t, a_t)+\alpha . (r_t + \gamma . max_aQ(s_{t+1}, a))$$

In this calculation:

- $$Q^{new}(s_t, a_t)$$ is the new Q-value (score) for this state, action pair
- $$\alpha$$ is the learning rate, between 0 and 1 (0 means no learning and 1 means dismiss old learnings
- $$\gamma$$ is the discount value. This is between 0 and 1, and shows how much the score is important. For 0, even final state, actions are considered worthless. For something in between, the calculated score becomes less important as it goes away from the final score, say end of an episode.
- $$max_aQ(s_{t+1}, a)$$ is the Q-value for best available action in state _s_.

## Developing the Q-Learning environment

I am not going to write the code in this post, though there is a semi code:

* To develop Q-Learning, I make a big loop over all of the episodes I want to have, which could be unlimited.
* Inside that loop, I put the agent in the starting state, and let it react to the environment based on its Q-values.
* When the agent reaches to the end of the current episode (either by reaching a final state or the end of its permitted action numbers), I make a list out of its state, action pairs.
* Starting from the end of the list, I apply the learning formula to all of the state, action pairs it traversed.

## What to search/read next?

These topics maybe interesting:

* Q-Learning variations and alternatives
* Different policies for learning
* Deep Q-Learning

## Next post

In the next post, I will implement a Q-Learning powered agent playing a game. I like it to be snake, since I have created the environment [here](https://github.com/ralthor/Snake).

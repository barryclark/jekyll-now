---
layout: post
title: Train a Neural Network to Play Black Jack with Q Learning
tags:
- Machine Learning
- Practical
- Theory
- Math
summary: It turns out the traditional "stay at 15" is almost the best strategy.
---

Q Learning is a standard algorithm that's used in Reinforcement Learning. The idea of the $$Q$$ function is a utility function, which when given a situation and an action, outputs the expected reward that will happen when you perform the action. Today, we will develop and extend this idea in order to train a Machine Learning model to approximate the $$Q$$ function. The [full code](https://github.com/srome/blackjacklearner) can be found on GitHub.

Say we would like to learn the optimal policy for a game. This means, at any state $$s\in S$$ ($$S$$ the collection of all possible states of the game), we want to know the optimal action $$a$$ out of a set of actions $$A$$. The game is typically called the "environment", whereas the "agent" is our learner. The agent must be able to accept states from the environment and select an action which is then input back into the environment. If we would like our agent to learn, the environment must also be able to provide a reward for each action.  Any Reinforcement Learning algorithm follows the same basic steps:

1. Agent is given a state $$s\in S$$
2. Agent chooses $$\hat a$$ such that $$\hat a:= \text{argmax}_{a\in A} Q(s,a)$$.
3. Input $$\hat a$$ into environment and receive reward $$r$$ and move to a new state $$\hat s$$.
4. Update agent via $$(s,\hat a, \hat s, r)$$.
5. Repeat

One of the standard Reinforcement Learning algorithms is the Q Learner which aimed to find the $$Q$$ function iteratively. This algorithm is not tractible for large state spaces, and due to this limitation, the idea to approximate $$Q$$ with a Neural Network arose. This technique has been successful to learn many types of games, including how to play Atari games after defining a reward function [(see this paper)](https://www.cs.toronto.edu/~vmnih/docs/dqn.pdf).

In the sequel, we will discuss the differences between the standard Q Learning algorithm and how to use a Neural Network for reinforcement learning. We will then build a basic Black Jack implementation on which to apply a Neural Network and the standard Q-learning algorithm to compare the outcomes. 
 
# The Basic Algorithm

The $$Q$$ learning algorithm is basically identical whether you use the standard Q Learner or a neural network. We are going to outline an $$\epsilon$$-greedy strategy for learning. Let $$Q$$ represent our (approximate) $$Q$$ function, which is a function from $$S\times A \to \mathbb{R}$$.

1. Given a state $$s$$, find the optimal action $$a:= \text{argmax}_{a\in A} Q(s,a)$$.
2. With probability $$1-\epsilon$$, perform $$a$$, otherwise perform a $$\hat a \in A$$ chosen at random. Call the performed action $$\alpha$$.
3. Receive a reward $$r$$. Update $$Q$$ with the triplet of information $$(s,\alpha, \hat s, r)$$.

Step 3 is where we update our learner either by an online update to a Neural Network or an iterative step in the Q Learning algorithm. The choice of $$\epsilon$$ allows us to explore the environment rather than only choosing the optimal policy that we have learned up to that moment. When one wants to see how well our learner plays, one should set $$\epsilon$$ to 0.

## A Basic Q Learner

Our basic Q-Learner implements the typical Q-Learning algorithm as defined [here](https://en.wikipedia.org/wiki/Q-learning). At the start, we initialize an empty dictionary where we will store the states and the current iterations' reward value for that state.

{% highlight python linenos %}
    # Q Learner will inherit a Player class from our Black Jack game
    # We will get back to that later
    class Learner(Player):
        def __init__(self):
            super().__init__()
            self._Q = {}
{% endhighlight %}

Assume we are at state $$s_t$$, our agent must decide what action to perform. We can do this via

{% highlight python linenos %}
    def get_action(self, state):
        # Notice here epsilon is the same as 1-epsilon from our previous discussion
        if state in self._Q and np.random.uniform(0,1) < self._epsilon:
            action = max(self._Q[state], key = self._Q[state].get)
        else:
            action = np.random.choice([Constants.hit, Constants.stay])
            if state not in self._Q:
                self._Q[state] = {}
            self._Q[state][action] = 0
    
        self._last_state = state
        self._last_action = action
    
        return action
{% endhighlight %}

Now, we perform action $$a$$ receiving reward $$r_t$$. Then, we may update the approximate $$Q$$ function at time $$t$$, denoted $$Q_t$$ with a value update at $$(s,a)$$ via

$$Q_{t+1}(s,a) \leftarrow Q_t(s,a)  + \alpha[r_t + \gamma \max_{a\in A} Q_t(s_{t+1},a) - Q(s_t,a)]$$

Here, $$\alpha$$ is called the learning rate and $$\gamma$$ is the discounting factor applied to future rewards. The code is

{% highlight python linenos %}
    def update(self,new_state,reward):
        if self._learning:
            old = self._Q[self._last_state][self._last_action]
    
            if new_state in self._Q:
                new = self._discount * \
                        self._Q[new_state][max(self._Q[new_state], key=self._Q[new_state].get)]
            else:
                new = 0
    
            self._Q[self._last_state][self._last_action] = \
                    (1-self._learning_rate)*old + self._learning_rate*(reward+new)
{% endhighlight %}

## Neural Network Algorithm

As is typical in Machine Learning problems, we want to train a model to "predict" the value of some function given data. This situation is no different-- approximating the $$Q$$ function is the same as training a model to predict the value of the reward function. So to approximate our $$Q$$ function, we must train the network on the rewards at each observed state.

### Redefining the Q function

Usually, the $$Q$$ function is defined as a function $$Q: S\times A \to \mathbb{R}$$, and the original Q Learner algorithm is written with this definition. When using a Neural Network, we can apply a trick to reduce training time: It is easier to model the $$Q$$ function as $$S \to \mathbb{R}^{n}$$ where $$n$$ is the number of elements in $$A$$, i.e. the output is a vector of rewards where each value corresponds to an action in $$A$$. This way, we will be able to train a single Neural Network to approximate $$Q$$. 

To determine an optimal policy, we input our state $$s$$ into the network, and choose the action corresponding to the entry in the reward vector with the largest reward. 

### Implementation

First, we initialize a basic Neural Network (with Keras 0.3.3)

{% highlight python linenos %}
    class DQNLearner(Learner):
        def __init__(self):
            super().__init__()
            self._learning = True
            self._learning_rate = .1
            self._discount = .1
            self._epsilon = .9
    
            # Create Model
            model = Sequential()
    
            model.add(Dense(2, init='lecun_uniform', input_shape=(2,)))
            model.add(Activation('relu'))
    
            model.add(Dense(10, init='lecun_uniform'))
            model.add(Activation('relu'))
    
            model.add(Dense(4, init='lecun_uniform'))
            model.add(Activation('linear'))
    
            rms = RMSprop()
            model.compile(loss='mse', optimizer=rms)
    
            self._model = model
{% endhighlight %}

Next, when we obtain a state $$s_t$$ we have to return our action. This is implemented via

{% highlight python linenos %}
    def get_action(self, state):
        rewards = self._model.predict([np.array([state])], batch_size=1)
    
        if np.random.uniform(0,1) < self._epsilon:
            if rewards[0][0] > rewards[0][1]:
                action = Constants.hit
            else:
                action = Constants.stay
        else:
            action = np.random.choice([Constants.hit, Constants.stay])
    
        return action
{% endhighlight %}

After receiving a reward $$r$$ and the new state $$s_{t+1}$$, we may update the Neural Network. This is done by training the model in an online fashion on a single new data point. The data point is the current state $$s_t$$ and the target is the expected reward vector with the entry for the action performed updated to be $$r + \gamma \max_{a} Q_{t}(s_{t+1},a)$$, which is defined as the reward we received plus a discounted future reward. The code for such an update is given by

{% highlight python linenos %}
    def update(self,new_state,reward):
        if self._learning:
            rewards = self._model.predict([np.array([new_state])], batch_size=1)
            maxQ = rewards[0][0] if rewards[0][0] > rewards[0][1] else rewards[0][1]
            new = self._discount * maxQ
    
            if self._last_action == Constants.hit:
                self._last_target[0][0] = reward+new
            else:
                self._last_target[0][1] = reward+new
    
            # Update model
            self._model.fit(np.array([self._last_state]), 
                            self._last_target, 
                            batch_size=1, 
                            nb_epoch=1, 
                            verbose=0)
{% endhighlight %}

# Black Jack implementation

To test our learners, we must build a (simple) implementation of Black Jack where it will output a reward. The goal is to have the highest hand value, but your hand cannot sum to more than 21 or you lose automatically. This logic is stored in two functions.

{% highlight python linenos %}
    def determine_winner(self,player1,player2):
        if player1.get_hand_value() == 21 or \
            (player1.get_hand_value() > player2.get_hand_value() \          
             and player1.get_hand_value() <= 21):
            return Constants.player1
        else:
            return Constants.player2
    
    def determine_if_bust(self,player):
        if player.get_hand_value() > 21:
            return True
        else:
            return False
{% endhighlight %}

This implementation contains "cards" with values of 1 to 10-- there are no suits. The game uses 3 "decks" at a time for its pool of cards. Each deck contains 4 cards of each value (1 up to 10). 

{% highlight python linenos %}
    class Deck:
        def __init__(self):
            self.shuffle()
    
        def shuffle(self):
            cards = (np.arange(0,10) + 1)
            cards = np.repeat(cards,4*3) #4 suits x 3 decks
            np.random.shuffle(cards)
            self._cards = cards.tolist()
{% endhighlight %}

The player plays against the dealer. The dealer will hit unless the dealer's hand is greater than or equal to 15. Otherwise, the dealer will stay. This is seen in the get_action() function.

{% highlight python linenos %}
    # The dealer is an initialization of the player class
    class Player:
        def __init__(self):
            self._hand = []
            self._original_showing_value = 0
    
        def get_action(self, state = None):
            if self.get_hand_value() < 15:
                return Constants.hit
            else:
                return Constants.stay
{% endhighlight %}

To save time, the main game loop plays both the player and the dealer simultaneously, and every iteraton of the while loop corresponds to a single "hit/stay" for each player. However, the player does not have access to any information about the dealer besides the dealer's first showing card. In fact, we have chosen to train our learner on the state space consisting of tuples of the player's hands' value and the dealer's showing value.

This simultaneous play slightly modifies the rules of the game. The loop breaks when both players stay or either busts. The only new outcome is that the player could still be hitting when the dealer busts, ending the game in a new fashion. This is not necessarily very common considering the dealer stays at 15 and above, but can happen. Since we're only trying to demonstrate the concept and not build a model to beat a casino, we'll let this slide.

{% highlight python linenos %}
    state = self.get_starting_state(p,p2) #p is the player, p2 is the dealer
    
    while True:
        # Determine hit/stay
        p1_action = p.get_action(state)
        p2_action = p2.get_action(state)
    
        # Apply the action if hit
        if p1_action == Constants.hit:
            p.hit(d)
        if p2_action == Constants.hit:
            p2.hit(d)
    
        # Check if anyone has busted
        if self.determine_if_bust(p):
            winner = Constants.player2
            break
        elif self.determine_if_bust(p2):
            winner = Constants.player1
            break
    
        # If both players stayed the round is over
        if p1_action == p2_action and p1_action == Constants.stay:
            break
    
        state = self.get_state(p, p1_action, p2)
        p.update(state,0) # Update the learner with a reward of 0 (No change)
{% endhighlight %}

Once we are out of this loop, it's time to determine the winner and apply the correct reward to update our learner.

{% highlight python linenos %}
    if winner is None:
        winner = self.determine_winner(p,p2)
    
    if winner == Constants.player1:
        self.win += 1
        p.update(self.get_ending_state(p,p1_action,p2),1) # Win +1
    else:
        self.loss += 1
        p.update(self.get_ending_state(p,p1_action,p2),-1) # Loss -1
{% endhighlight %}

At this point, we rinse and repeat to train either learner in an online fashion from its interactions with the game.

# Outcomes

During training, the code outputs a running tally of the win percentage of the learner. Over time you will see this value improving as the learner becomes better. Once training has completed, the learner will continue to play to calculate a win percentage. How long each of these period are can be set in main().

{% highlight python linenos %}
    def main():
        # Set number of rounds
        num_learning_rounds = 20000
        number_of_test_rounds = 1000
        
        # Choose your learner
        # DQNLearner is the "Deep Q Network" neural network
        learner = DQNLearner() #or Learner() for Q Learner
        
        game = Game(num_learning_rounds, learner) 
        
        # Training and Testing
        for k in range(0,num_learning_rounds + number_of_test_rounds):
            game.run()
{% endhighlight %}

At the end of a run, a CSV is output in the directory containing the reward for hit/stay and the optimal strategy for that state. After 20000 training rounds, the Neural Net would hit anytime the hand value was $$<=15$$ or when its hand value is 16 and the dealer is showing 8,9 or 10. Otherwise, it would stay. This strategy resulted in a win percentage of ~47. After the same number of training rounds, the Q Learner had a win percentage of ~33. By looking at the optimal policy CSV, it seems from the neurotic strategy that it would have benefitted from additional training rounds. In this case, the Neural Network version is able to learn a winning strategy far quicker than the Q Learning algorithm alone. 

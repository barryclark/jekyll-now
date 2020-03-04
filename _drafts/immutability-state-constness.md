---
layout: post
tags: functional-programming immutability c++11
#categories: []
date: 2020-03-07
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Immutability in C++: Immutable Members'
#comments_id: 2
---

In an attempt to increase my functional programming skills in C++, I went full functional when writing a simulation for a childrens game. Trying to implement a game state using the paradigms of functional programming presents some interesting challenges. In this post I will explore the concept of *immutability* and how we can implement it in C++ for all kinds of stateful objects.

# Immutability in Functional Programming

The state of an immutable object cannot be changed after creation. Immutability is a big deal in functional programming for many reasons. I took a liking to it because of two reasons:

First it forces me to learn something that is completely counterintuitive to my usual, imperative style of programming. So it forces me to think about solving problems in a different way than I am used to. That is always a good thing. Secondly, it is more in line with the mathematical foundations of functional programming. If I have a variable $$x$$ and pass it to a function $$f(x)$$ then I expect two things:

1. $$f(x)$$ has a value, say $$f(x)=y$$,
2. $$x$$ does not change by applying $$f(x)$$.

There is more than one thing hidden here (e.g. [pure functions](https://en.wikipedia.org/wiki/Pure_function) and [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency)) but the main point today is that $$x$$ is immutable.

# The Dangers of Mutability in C++

While it is so fundamental in mathematics that the value of $$x$$ does not change when evaluating $$f(x)$$, this is not so in C++. Consider

```c++
int f(int & x)
{
  return ++x;
}
```

Invoking `f(x)` on an integer `x` will return the value of `x+1`, but it will change the value of `x` in the process. To make matters worse: lets assume we only knew the signature of the function from a header and the documentation for `f` states: "*calculates the next integer value for x*". Depending on the implementation it could change the value of `x` or not. A signature `T f(T&)` should always make us suspicious and most programmers would hopefully use `T f(const T &)` or `T f(T)`. In other languages however, [like Java](https://stackoverflow.com/questions/41361252/const-function-arguments-in-java), objects are always passed by a non-const reference.

So although this example is silly and contrived, it illustrates some of the danger of mutability: it makes code harder to reason about.

# Immutability through Immutable Members
Immutability in C++ is realized by the `const` keyword. Let's see how that helps us in implementing an immutable object. Assume we want to describe a super simple game where exactly 2 players (red and blue) have to traverse a path of 20 fields by rolling a die and moving a token using the number of a dice roll. The game is won, when one player has moved exactly 20 fields. Sounds dumb but believe me: those games do exist. Also this is just a toy example to illustrate a point. We can create a class for the game state like this:

```c++
class game_state
{
public:
  static constexpr int MAX_STEPS = 20;

  game_state(std::array<int,2> _steps = {0,0});

  game_state add_steps(int player_index, int steps) const;

  std::optional<int> get_winner_index() const;

  const std::array<int,2> steps;

};
```
Not crazy, but there is a few things that are different from the usual object oriented way.

## The Constructor
The state of the object is initialized at construction. After that it cannot be changed. That means the constructor of this immutable class is the central place that has to enforce the invariants of the class. Here we could for example throw an exception if the number of steps for any player is negative or exceeds `MAX_STEPS`.

## Member Variables and Functions
All member variables and member functions are public. The member variables are constants, the functions are `const` qualified. That makes it uneccessary to encapsulate members because they cannot be changed from the outside. Thus we have no getter and setter functions. We just access the steps of the two players by directly accessing the array:

```c++
game_state game;
std::cout
  << "Player 0 is at position "
  << game.steps.at(0) << std::endl;
```

## Changing State
The usual object-oriented signature of the `add_steps` function would be  `void add_steps(int, int)`. The method would manipulate a private member variable. Here we cannot do that, so we have to return a new object.

```c++
game_state game_state::add_steps(int player_index, int steps) const
{
  //add some guards against illegal input
  //e.g. negative steps

  auto new_steps = steps;
  new_steps.at(player_index) += steps;

  return game_state(new_steps);
}
```

This function creates a new game object from its own state. A keen observer will notice that I have created a mutable copy of the state before using that as the input for the constructor. That is were my dogmatism ends.

# Final Thoughts
The main problem any programmer will notice with the code above is that data gets copied at every step. To a certain extent, we cannot avoid that if we want to have immutable objects. But C++ offers us move semantics which can lead to optimized code. However, for const members we lose the move constructors because we cannot move from const objects. For the example above that is *no problem at all*, because there is no use in move semantics for `int` and thus for an `std::array` of `int`.

In the next article we will have a look at immutable interfaces and how to take advantage of move semantics.

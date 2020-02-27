---
layout: post
tags: functional-programming immutability c++
#categories: []
date: 2020-02-19
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Immutability in C++: Two Ways to Constness'
#comments_id: 2
---

In an attempt to increase my functional programming skills in C++, I went full functional when writing a simulation for a childrens game. Trying to implement a game state using the paradigms of functional programming presents some interesting challenges. In this post I will explore the concept of *immutability* and how we can implement it in C++ for all kinds of stateful objects.

# Immutability and Functional Programming

The value of an immutable object cannot be changed after creation. Immutability is a big deal in functional programming for many reasons. I took a liking to it because of two reasons:

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

Invoking `f(x)` on an integer `x` will return the value of `x+1`, but it will change the value of `x` in the process. To make matters worse: lets assume we only knew the signature of the function from a header and the documentation for `f` states: "*calculates the next integer value for x*". Depending on the implementation it could change the value of `x` or not (`return x+1`). A signature `T f(T&)` should always make us suspicious and most programmers would hopefully use `T f(const T &)` or `T f(T)`. In other languages however, [like Java](https://stackoverflow.com/questions/41361252/const-function-arguments-in-java), objects are always passed by a non-const reference.

So although this example is silly and contrived, it illustrates some of the danger of mutability: it makes code harder to reason about.

# Immutability in C++: The First Way
Immutability in C++ is realized by the `const` keyword. Let's see how that helps us in implementing an immutable object. Assume we want to describe a super simple game where exactly 2 players (red and blue) have to traverse a path of 20 fields by rolling a die and moving a token by the number on the die. The game is won, when one player has moved exactly 20 fields. Sounds dumb, but believe those games do exist. Also this is just a toy example to illustrate a point. This is how a game state definition could look if implemented as immutable (using C++17):

```c++
class game_state
{
public:
  static const int MAX_STEPS;

  game_state(std::array<int,2> _steps = {0,0});

  game_state add_steps(int player_index, int steps) const;

  //returns index of the winning player or nullopt if there is no winner yet
  std::optional<int> get_winner() const;

  const std::array<int,2> steps;

}
const int game_state::MAX_STEPS = 20;
```
Not crazy, but there is a few things that are different from the usual object oriented ways of implementing a game state for this problem:

#### The Constructor
The state of the object is initialized at construction. After that it cannot be changed. That means the constructors of an immutable object are the central place that has to enforce the invariants of the class. Here we could for example throw an exception if the number of steps for any player is negative or exceeds `MAX_STEPS`.

#### Member Variables and Functions
All member variables and member functions are public and `const`. The member variables are constants. That makes it uneccessary to encapsulate them because they cannot be changed at all from the outside. Thus we have no getter and setter functions. We just access the steps of the two players by directly accessing the array:

```c++
game_state g;
std::cout << "Player 0 is at position " << g.steps.at(0) << std::endl;
```

#### Changing State
The usual object-oriented way of implementing the `add_steps` function would be  `void add_steps(int, int)`. The method would manipulate a private member variable. For immutable objects we cannot do that, so we have to return a new object. We could implement the method as follows:

```c++
game_state add_steps(int player_index, int steps) const
{
  //add some guards against illegal input
  //e.g. negative steps

  auto new_steps = steps;
  new_steps.at(player_index) += steps;

  return game_state(new_steps);
}
```
The important this is that this function creates a new game object from its own state. A keen observer will notice that I have created a mutable copy of the state before using that as the input for the constructor. That is were my dogmatism ends. Mutable temporaries inside functions are a neccessary evil.

# A Second Way to Immutability
The main problem any programmer will notice with the code above is that data gets copied at every step. To a certain extent, we cannot avoid that if we want to have immutable objects. But C++ offers us move semantics which can lead to optimized code. However, for const members we lose the move constructors because we cannot move from const objects. For the example above that is *no problem at all*, because there is no use in move semantics for `int` and even for an array of `int`.

Now assume that we had a movable data structure inside the class. Maybe we replaced the array with a vector to set the number of players dynamically.

```c++
class game_state
{
public:
  static const int MAX_STEPS;

  //creates new game state for n players
  //with all players at zero steps
  game_state(int n);

  //NEW: create new game from vector of steps
  //note that _steps is taken by rvalue and moved;
  game_state(std::vector<int> && _steps) : steps(std::move(_steps))
  {/*check that steps has legal values*/}

  //NEW: l-value ref qualifier
  game_state add_steps(int player_index, int steps) const &;

  //NEW: r-value ref qualifier
  game_state add_steps(int player_index, int steps) &&;

  std::optional<int> get_winner() const;

  //NEW: getter method
  get_steps(int player_index) const {return steps.at(player_index);};

private:
  //NEW: mutable member
  std::vector<int> steps;

}
const int game_state::MAX_STEPS = 20;
```
Let's have a look at what has changed. The constructors are self explanatory, so let's focus on the interesting bits.

#### Member Variables and Getters
The member variable is mutable and has a `const`-qualified getter method now. There is still no setter method.

#### L-Value and R-Value Overloads for State Transitions
HIER WEITER: erst lvalue overload which works on lvalues (and lvalue references) nud erklären, dass analog wie oben ein neuer vector angelegt werden kann und dann IN DIE KLASSE GEMOVED wird. Das ist aber konzeptionell nicht anders als oben.

DANN den RVALUE OVERLOAD WELCHER DEN VECTOR SELBST IN DIE NEUE KLASSE MOVED UND DANN verändert und die neue klasse zurückgibt. ODER SOLLTE MAN DEN VECTOR DER KLASSE SELBER VERÄNDERN UND *this zurückgeben?? -> stackoverflow

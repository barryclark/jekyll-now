---
layout: post
tags: functional-programming immutability c++11
#categories: []
date: 2020-03-31
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Immutability in C++ (2/2): Immutability through Interfaces'
comments_id: 4
---
In the last article we looked at creating immutable objects in C++ using immutable member variables. Here we will look at immutability through interfaces that let us take advantage of move semantics.

# Immutable interfaces
Assume we had a movable data structure inside our game state class. Maybe we replaced the array with a `std::vector` to set the number of players dynamically. Now that we have a `std::vector` instead of an array, we could take advantage of move semantics. As explained at the end of the previous article that means that we cannot make this data member `const` because that prevents us from moving from it. So we have to take a different approach and implement an interface that provides immutability to an outside user of the class:

```c++
class game_state
{
public:
  static constexpr int MAX_STEPS = 20;

  //creates new game state for n players
  //with all players at zero steps
  game_state(int n);

  //NEW: l-value ref qualifier
  game_state add_steps(int player, int amount) const &;

  //NEW: r-value ref qualifier
  game_state add_steps(int player, int amount) &&;

  std::optional<int> get_winner_index() const;

  //NEW: getter method
  int get_steps(int player_index) const
  {return steps.at(player_index);};

private:
  //NEW: mutable & private member
  std::vector<int> steps;

};
```
Let's have a look at what has changed compared to the previous implementation. The constructor is self explanatory, so let's focus on the interesting bits.

## Member Variables and Getters
The member variable is mutable and has a `const`-qualified getter method now. There is still no setter method. So from the *outside* this member behaves as if immutable.

## L-Value and R-Value Overloads for State Transitions
I have declared two overloads of the `add_steps` function, which differ by their [ref-qualifiers](https://en.cppreference.com/w/cpp/language/member_functions#ref-qualified_member_functions). You can read more on ref-qualifiers [here](https://akrzemi1.wordpress.com/2014/06/02/ref-qualifiers/). In short, the `&`-qualified function works on lvalues and the `&&`-qualified method on rvalue instances of the class.

### Lvalue and Rvalue Semantics
As a quick recap that helps us to differentiate rvalues and lvalues we follow Scott Meyers advice in [Effective Modern C++](https://www.oreilly.com/library/view/effective-modern-c/9781491908419/):

> A useful heuristic to determine whether an expression is an lvalue is to ask if you can take its address. If you can, it typically is. If you can't it's usually an rvalue.

So let's say we have the following code:

```c++
game_state game;
game_state game2 = game.add_steps(0,6);
```
Here we know `game` is an lvalue because we can take its adress. So the call to `add_steps` operates on an lvalue. The temporary object returned from this function call is an rvalue. We cannot take its address. Although we initialize the lvalue `game2` with the result of the function call, it is important to note that the right hand side of the `=` sign is an rvalue. Now consider this:

```c++
game_state game;
game_state game2 = game.add_steps(0,6).add_steps(1,4);
```
So we know now that the second call of `add_steps` operates on an rvalue. To the user of the class it looks all the same, but not to us implementors. We can take advantage of the call to the rvalue qualified method by avoiding unneccessary copies.

### Implementations
The implementation for lvalues should not look suprising:

```c++
game_state game_state::add_steps(int player_index, int amount) const &
{
  //do some sanity checks here

  game_state next_game(*this);
  next_game.steps.at(player_index) += amount;
  return next_game;
}
```

So we create a copy of the game by calling the copy constructor, which is implicitly defined for this class. Then we mutate the data of the copy and return the mutated copy. Only we as implementors can mutate the data of this instance because the fields are declared private. Now for the rvalue overload.

```c++
game_state game_state::add_steps(int player_index, int amount) &&
{
  //do some sanity checks here

  steps.at(player_index) += amount;
  return std::move(*this);
}
```
Here we mutate the objects own data and return a copy of the object which is *move constructed*. This is why we need the call to `std::move` before returning `*this`. The move constructor is implicitly defined for us. The move constructor avoids an unneccessary copy of a vector for temporary objects. If we had declared the member vector `const` then we could not have moved from it.

# Conclusions and Further Reading
We have seen how to implement immutability in C++ two different ways. The first way of using public `const` members has the advantage of simplicity. One caveat is that we have to implement a constructor taking all member fields for initialization. The second way is to provide an interface that enforces immutability and takes advantage of move semantics. The added complexity might lead to a performance increase. However, not all types have cheap move operations. For further reading I heartily recommend [Functional Programming in C++](https://www.manning.com/books/functional-programming-in-c-plus-plus) where the author presents immutable data structures for more sophisticated use cases.

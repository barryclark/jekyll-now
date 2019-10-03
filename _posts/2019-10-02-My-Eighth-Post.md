---
layout: post
title: Learning Journal for October 2nd
---
# Homework: GRASP Principles
## Creator
 ### Factory, Builder, Object Mother
 It is good to use creators while necessary. For example, we can have a factory that can build up many worlds with buildtheWorld(). For Builder, Alex gave us an example about making a pizza class:
  > \public static clas Builder{\
  >\private String cheese= " ",
  >///more codes///
  >}
  
  > public Pizza build(){
  > Pizza pizza = new pizza();
  > pizza.cheeze = cheeze...\
  >///more codes///
  > public Builder withCheese(String  cheese) {\
  > this.cheese = cheese;\
  > return this}\
  > void Temp(){\
  > Pizza cheesePizza = newPizza.Builder();\
  > pizza cheese = cheese;
  > return pizza;}\
 Basically, builder is like putting all components together to make a similar projects, like making cars that come with different functions.
## Information Expert
It corresponds to the single responsible principle. A code block should only do one thing.
## Low Coupling
It corresponds to the dependencies inversion.
## High Cohesion
Similar to avoiding Spaghetti codes, High Cohesion means the code bricks should be related without being coupled.
## Controller
Usually used in UI level, Controller works like a traffic police that delegates the flow.
## Indirection
It is the process of breaing chunks of work. In the tag project, Game redirects the jos of making command to the interface command.
## Polymorphism
Here it means avoid making conditions on one type. For example, instead of using "If" for returning nothing in treasureChest, Alex created a const called "nothing.
## Protected Variation
It is the same as imutability.
## Pure Fabrication
It mocks some components to follow "high cohesion" and "information expert"




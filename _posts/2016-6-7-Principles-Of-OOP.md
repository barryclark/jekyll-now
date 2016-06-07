---
layout: post
title: Principles Object Oriented Programming
published: true
---

#Principles Of Object Oriented Programming

The four major principles that make the language object oriented are _Encapsulation, Data Abstraction,
Polymorphism and Inheritence._

##Encapsulation

This is also known as data hidding.Its the mechanism whereby the inner workings of the class are kept hidden from the rest of the program.
This is accomplished by limiting access to *accessors* and *mutators*:

####Accessors

This are methods used to ask an object about itself.They have a _get_ method.

####Mutators

This are public methods used to modify an object while hidding the inner workings(implementation) of how the data is modified.
The _set_ method allows the user  modify the member data behind the scenes.

##Data Abstraction

*Abstraction* is the process of focussing on important aspects of an object while filtering out the unwanted aspects.

*Data abstraction* is the development of classes,objects, types in terms of their interfaces and functionality, instead
of their implementation details.
The process of abstraction is called _modelling_.
Developers use abstraction to decompose complex into smmaller components and this gives them the ability to foresee the expected functionality of the undeveloped system.

##inheritance

Object oriented programming is designed using object that interact with each other and by using the concept of inheritance,new objects are able to take properties of existing objects hence a class used in the basis inheritance is called a _super class_ and the one inheriting its properties known as a _subclass_. Because of this,oop programs requres less code to complete tasks.

##Polymorphism

Its the ability to process objects differently depending on _data types or class_. This allows for creation of one function that can apply to all subclasses of the super class.
There are two types of polymophism :*overriding(run-time)* and *overloading(compile-time)* polymophism.

####Overriding

The compiler determines the method to be used and the decision is made when the code gets compiled.

####overloading

Method to be used is determined at runtime based on the dynamic type of an object.




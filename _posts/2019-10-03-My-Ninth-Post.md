---
layout: post
title: Learning Journal for October 3rd
---
# Homework: Functional Interfaces for Lambda
## What is Functional Interface?  

A functional interface refers to a interface that only has ***one abstract method***   

## What is Lambda?  
Lambda expressions basically are ***functional programming***, which means they do not create any objects. Lambda requires a functional interface to work with.

## The functional interfaces for Lambda

There are a few of methods for functional interfaces:
1. run


@FunctionalInterface 

public interface Runnable  

{

   public abstract void run();
}

2. Create new thread

class Test 
{ 
  public static void main(String args[]) 
  { 
  
    // lambda expression to create the object 
    new Thread(()-> 
       {System.out.println("New thread created");}).start(); 
  } 
} 

3. predicate

public Predicate
{
   public boolean test(T  t);
 }
 
 
 4.  Binary Operator
 
 public interface BinaryOperator 
{
     public T apply(T x, T y);
}    

5. function 

public interface Function 
{
   public R apply(T t);
}

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

(The following is copied from Zach's blog. Thanks Zach!)

BiPredicate<T,U>
Represents a predicate (boolean-valued function) of two arguments.

BooleanSupplier
Represents a supplier of boolean-valued results.

Consumer
Represents an operation that accepts a single input argument and returns no result.

DoubleBinaryOperator
Represents an operation upon two double-valued operands and producing a double-valued result.

DoubleConsumer
Represents an operation that accepts a single double-valued argument and returns no result.

DoubleFunction
Represents a function that accepts a double-valued argument and produces a result.

DoublePredicate
Represents a predicate (boolean-valued function) of one double-valued argument.

DoubleSupplier
Represents a supplier of double-valued results.

DoubleToIntFunction
Represents a function that accepts a double-valued argument and produces an int-valued result.

DoubleToLongFunction
Represents a function that accepts a double-valued argument and produces a long-valued result.

DoubleUnaryOperator
Represents an operation on a single double-valued operand that produces a double-valued result.

Function<T,R>
Represents a function that accepts one argument and produces a result.

IntBinaryOperator
Represents an operation upon two int-valued operands and producing an int-valued result.

IntConsumer
Represents an operation that accepts a single int-valued argument and returns no result.

IntFunction
Represents a function that accepts an int-valued argument and produces a result.

IntPredicate
Represents a predicate (boolean-valued function) of one int-valued argument.

IntSupplier
Represents a supplier of int-valued results.

IntToDoubleFunction
Represents a function that accepts an int-valued argument and produces a double-valued result.

IntToLongFunction
Represents a function that accepts an int-valued argument and produces a long-valued result.

IntUnaryOperator
Represents an operation on a single int-valued operand that produces an int-valued result.

LongBinaryOperator
Represents an operation upon two long-valued operands and producing a long-valued result.

LongConsumer
Represents an operation that accepts a single long-valued argument and returns no result.

LongFunction
Represents a function that accepts a long-valued argument and produces a result.

LongPredicate
Represents a predicate (boolean-valued function) of one long-valued argument.

LongSupplier
Represents a supplier of long-valued results.

LongToDoubleFunction
Represents a function that accepts a long-valued argument and produces a double-valued result.

LongToIntFunction
Represents a function that accepts a long-valued argument and produces an int-valued result.

LongUnaryOperator
Represents an operation on a single long-valued operand that produces a long-valued result.

ObjDoubleConsumer
Represents an operation that accepts an object-valued and a double-valued argument, and returns no result.

ObjIntConsumer
Represents an operation that accepts an object-valued and a int-valued argument, and returns no result.

ObjLongConsumer
Represents an operation that accepts an object-valued and a long-valued argument, and returns no result.

Predicate
Represents a predicate (boolean-valued function) of one argument.

Supplier
Represents a supplier of results.

ToDoubleBiFunction<T,U>
Represents a function that accepts two arguments and produces a double-valued result.

ToDoubleFunction
Represents a function that produces a double-valued result.

ToIntBiFunction<T,U>
Represents a function that accepts two arguments and produces an int-valued result.

ToIntFunction
Represents a function that produces an int-valued result.

ToLongBiFunction<T,U>
Represents a function that accepts two arguments and produces a long-valued result.

ToLongFunction
Represents a function that produces a long-valued result.

UnaryOperator
Represents an operation on a single operand that produces a result of the same type as its operand.

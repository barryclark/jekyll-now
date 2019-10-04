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

6.  BiPredicate<T,U>
Represents a predicate (boolean-valued function) of two arguments.

7. BooleanSupplier
Represents a supplier of boolean-valued results.

8. Consumer
Represents an operation that accepts a single input argument and returns no result.

9. DoubleBinaryOperator
Represents an operation upon two double-valued operands and producing a double-valued result.

10. DoubleConsumer
Represents an operation that accepts a single double-valued argument and returns no result.

11. DoubleFunction
Represents a function that accepts a double-valued argument and produces a result.

12. DoublePredicate
Represents a predicate (boolean-valued function) of one double-valued argument.

13. DoubleSupplier
Represents a supplier of double-valued results.

14. DoubleToIntFunction
Represents a function that accepts a double-valued argument and produces an int-valued result.

15. DoubleToLongFunction
Represents a function that accepts a double-valued argument and produces a long-valued result.

16. DoubleUnaryOperator
Represents an operation on a single double-valued operand that produces a double-valued result.

17. Function<T,R>
Represents a function that accepts one argument and produces a result.

18. IntBinaryOperator
Represents an operation upon two int-valued operands and producing an int-valued result.

19. IntConsumer
Represents an operation that accepts a single int-valued argument and returns no result.

20. IntFunction
Represents a function that accepts an int-valued argument and produces a result.

21. IntPredicate
Represents a predicate (boolean-valued function) of one int-valued argument.

22.IntSupplier
Represents a supplier of int-valued results.

23. IntToDoubleFunction
Represents a function that accepts an int-valued argument and produces a double-valued result.

24. IntToLongFunction
Represents a function that accepts an int-valued argument and produces a long-valued result.

25 IntUnaryOperator
Represents an operation on a single int-valued operand that produces an int-valued result.

26. LongBinaryOperator
Represents an operation upon two long-valued operands and producing a long-valued result.

27. LongConsumer
Represents an operation that accepts a single long-valued argument and returns no result.

28. LongFunction
Represents a function that accepts a long-valued argument and produces a result.

29. LongPredicate
Represents a predicate (boolean-valued function) of one long-valued argument.

30. LongSupplier
Represents a supplier of long-valued results.

31. LongToDoubleFunction
Represents a function that accepts a long-valued argument and produces a double-valued result.

32. LongToIntFunction
Represents a function that accepts a long-valued argument and produces an int-valued result.

1 LongUnaryOperator
Represents an operation on a single long-valued operand that produces a long-valued result.

1 ObjDoubleConsumer
Represents an operation that accepts an object-valued and a double-valued argument, and returns no result.

1 ObjIntConsumer
Represents an operation that accepts an object-valued and a int-valued argument, and returns no result.

1 ObjLongConsumer
Represents an operation that accepts an object-valued and a long-valued argument, and returns no result.

1 Predicate
Represents a predicate (boolean-valued function) of one argument.

1 Supplier
Represents a supplier of results.

1 ToDoubleBiFunction<T,U>
Represents a function that accepts two arguments and produces a double-valued result.

1 ToDoubleFunction
Represents a function that produces a double-valued result.

1 ToIntBiFunction<T,U>
Represents a function that accepts two arguments and produces an int-valued result.

1 ToIntFunction
Represents a function that produces an int-valued result.

1 ToLongBiFunction<T,U>
Represents a function that accepts two arguments and produces a long-valued result.

1 ToLongFunction
Represents a function that produces a long-valued result.

1 UnaryOperator
Represents an operation on a single operand that produces a result of the same type as its operand.

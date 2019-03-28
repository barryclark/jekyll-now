---
layout: post
title: What Happens in Java If You Implement Two Interfaces with The Same Default Method?
tags: [java]
keywords: [interface, default, default method, duplicate default method]
hashtags: [java, programming]
image: /images/Java_logo.jpg
thumbnail: true
---

Java 8 introduced the ability for interfaces to have default methods. Default methods are methods with an implementation. This is in stark contrast to the notion that interfaces should only have unimplemented, abstract methods.

The idea behind default methods is to be able to add methods to interfaces without affecting classes that implement the interface. However, this might lead to a problem: what happens if a class implements two or more interfaces that have default methods with identical method names and method signatures?

The simple answer is that the implementing class must override the method.

However, this must be done explicitly. I was curious about what would happen if it wasn't done. Would the program compile? Or would there be a runtime error? Or would something else unexpected happen?

So I created two interfaces with duplicate methods, and a class that implements both of these interfaces:

## Super1.java

```java
public interface Super1 {
   default void method() {
      System.out.println("Super1 interface");
   }
}
```

## Super2.java

```java
public interface Super2 {
   default void method() {
      System.out.println("Super2 interface");
   }
}
```

## SubClass.java

```java
public class SubClass implements Super1, Super2 {
   public static void main(final String... args) {
      new SubClass().method();
   }
}
```

The results are rather anticlimactic - the program simply will not compile. Eclipse gives me the following message:

![Duplicate default methods named method with the parameters () and () are inherited from the types Super2 and Super1](/images/eclipse-error.png)
*Duplicate default methods named method with the parameters () and () are inherited from the types Super2 and Super1*

Attempting to compile with the `javac` command gives me an error as well:

```
javac *
SubClass.java:4: error: class SubClass inherits unrelated defaults for method()
from types Super1 and Super2
public class SubClass implements Super1, Super2 {
       ^
1 error
```

By the way, if you want to explicitly call one interface's method, you only need to preface the interface name before the `super` keyword:

```java
   @Override
   public void method() {
      Super1.super.method();
      Super2.super.method();
   }
```

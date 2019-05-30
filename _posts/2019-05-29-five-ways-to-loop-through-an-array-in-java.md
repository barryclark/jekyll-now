---
layout: post
title: Five Ways to Loop Through An Array in Java
tags: [java]
keywords: [loop, array, iterate, iterating, loop through an array, iterate though an array, iterate over an array]
hashtags: [java, programming]
image: /images/Java_logo.jpg
thumbnail: true
---

It's been a little while since I wrote something Java-related ([March 28, 2019](https://hendrixjoseph.github.io/what-happens-in-java-if-you-implement-two-interfaces-with-the-same-default-method/) was the last time, to be exact) so I figured I write something simple.

Hence *Five Ways to Loop Through An Array in Java*.

An array is one of the most basic data structures in programming. It's essentially a fixed-length list of similar items (referred to as *elements*) that are often accessed via their *index*. The index is simply their position in the array, starting with position zero.

One of the benefits of an array is the ability to loop through each element and process some sort of work on the element.

Looping through an array is often called iterating through or iterating over the array. 

Since I'm a Java developer, I present to the world *Five Ways to Loop Through An Array in Java*.

For the purpose of this exercise, I'll loop through the following String array:

```java
String[] strings = {"one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"};
```

And, because I actually want to do some work, each iteration of the loop will call the following method:

```java
private void doTheThing(final String string) {
    System.out.println(string);
}
```

## While loop

Using a while loop to iterate over an array isn't the cleanest way to do so, but it is possible:

```java
int i = 0;

while(wi < strings.length) {
    doTheThing(strings[wi]);
    i++;
}
```

## For Loop

```java
for(int i = 0; i < strings.length; i++) {
    doTheThing(strings[i]);
}
```

## Enhanced For Loop

The *Enhanced For Loop* (sometimes also called a *foreach loop*) was introduced in Java 5. With the enhanced for loop, you no longer have to keep track of the index (the `int i` in the previous two examples). This improves readability.

The Enhanced For Loop's strength is also its weakness. With no access to the index, you can't peak at the next item (e.g. `strings[i+1]`) or look at the previous item (e.g. `strings[i-1]`). Thankfully this isn't always needed.

```java
for(final String string : strings) {
    doTheThing(string);
}
```

## Stream

Java 8 introduced functional programming aided by lamdas and streams.

Arrays by themselves are not streams, but they can be easily used by streams by calling `Arrays.stream`:

```java
Arrays.stream(strings).forEach(this::doTheThing);
```

You can also use `Stream.of`, but it immediately calls `Arrays.stream`:

```java
Stream.of(strings).forEach(this::doTheThing);
```

Here's the Java code for `Stream.of`, showing that it just calls `Arrays.stream`:

```java
    /**
     * Returns a sequential ordered stream whose elements are the specified values.
     *
     * @param <T> the type of stream elements
     * @param values the elements of the new stream
     * @return the new stream
     */
    @SafeVarargs
    @SuppressWarnings("varargs") // Creating a stream from an array is safe
    public static<T> Stream<T> of(T... values) {
        return Arrays.stream(values);
    }
```

## Recursively

For fun, here's a recursive way to loop through arrays. Don't do this except as an intellectual exercise:

```java
private void loop(final String[] strings, final int i) {
    if(i < strings.length) {
        doTheThing(strings[i]);
        loop(strings, i + 1);
    }
}
```

Start the recursive loop by calling the method with the array and the number zero:

```java
loop(strings, 0);
```

## The End
---
layout: post
title: Turn a Stream of Arrays to Single Stream in Java
tags: [java]
keywords: [stream, array]
hashtags: [java, programming]
image: /images/Java_logo.jpg
thumbnail: true
---

Recently I was working with an array of objects where each object itself held an array of different objects. I wanted to go through each of the second items via a Java 8 Stream.

Essentially I had a class that looked something like the following:

```java
public class ArrayHolder {
   public Object[] getArray() {
      return new Object[5];
   }
}
```

Of course, I had an array of instances of that class:

```java
final ArrayHolder[] holders = {new ArrayHolder(), new ArrayHolder(), new ArrayHolder(), new ArrayHolder()};
```

I wanted to go through all the items in the second array. Prior to [Java 8 and streams](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html), I'd do it with two nested for loops:

```java
for (ArrayHolder holder : holders) {
    for (Object object : holder.getArray()) {
        // do the thing
    }
}
```

But now, with Java 8, I wanted to do it with streams.

Going through an array via streams is easy enough:

```java
Arrays.stream(holders)
```

And I can map that stream to the `getArray` method:

```java
Arrays.stream(holders)
      .map(ArrayHolder::getArray)
```

But when I go to do something, say, with the [`forEach`](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#forEach-java.util.function.Consumer-) method, it wants to do things to the array, not the individual objects:

```java
Arrays.stream(holders)
      .map(ArrayHolder::getArray)
      .forEach(thisIsAnArray -> thisIsAnArray.length);
```

Initially, I tried to call `[flatMap](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#flatMap-java.util.function.Function-)`, but that didn't work:

```java
Arrays.stream(holders)
      .flatMap(ArrayHolder::getArray)
```

This just gives me the following compiler errors:

```
The method flatMap(Function<? super ArrayHolder,? extends Stream<? extends R>>)
in the type Stream<ArrayHolder> is not applicable for the arguments (ArrayHolder::getArray)

The type of getArray() from the type Main is Object[],
this is incompatible with the descriptor's return type: Stream<? extends R>
```

It does turn out that `flatMap` is what I wanted, I just needed to call it after the initial `[map](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#map-java.util.function.Function-)` call. `flatMap` takes a `Stream`, so I need to convert the array to a stream... Which I already know how to do, being that's what I started with:

```java
Arrays.stream(holders)
      .map(ArrayHolder::getArray)
      .flatMap(Arrays::stream);
```

Now I can totally do things on the individual objects:

```java
Arrays.stream(holders)
      .map(ArrayHolder::getArray)
      .flatMap(Arrays::stream)
      .forEach(thisIsAnObject -> thisIsAnObject.toString());
```

Fun fact: this works on 2D arrays as well:

```java
Arrays.stream(new Object[2][2])
      .flatMap(Arrays::stream);
```

Here's a [GitHub Gist](https://gist.github.com/hendrixjoseph/4390fbec51965f3d7815717be153935d) I created that demonstrates how to turn the stream of arrays into a single string:

<script src="https://gist.github.com/hendrixjoseph/4390fbec51965f3d7815717be153935d.js"></script>

Happy coding!
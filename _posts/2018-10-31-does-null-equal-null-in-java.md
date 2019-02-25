---
layout: post
title: Does Null Equal Null in Java?
tags: [java]
keywords: [programming, null, null equal null, null equality]
hashtags: [java, programming]
image: /images/Java_logo.jpg
thumbnail: true
---

I'm a Java programmer by trade, and, for whatever reason, I tend to think about edge-cases I might (or might not) encounter while programming (see my article *[Four Java Limitations You May Never Encounter](https://hendrixjoseph.github.io/four_java_limitations_you_may_never_encounter/)*). One particular example I've been contemplating recently is if one null object equals another null object in Java.

In other words, does null equal null in Java?

Now, I could probably open up Java documentation online or [read the latest Java book](https://www.abebooks.com/products/isbn/9780134685991/30093839020) available. Instead, I'd rather take a more direct approach and get my hands dirty.

Well, it's programming, so "hands dirty" is only a figure of speech. I simply wrote a short Java program to show me how Java handles null equality. Since I'm dealing with null objects, the normal [Object.equals(Object other)](https://docs.oracle.com/javase/7/docs/api/java/lang/Object.html#equals%28java.lang.Object%29) is unavailable to me. I can only use the simple equality operator (the double-equals "==") or some helper methods, such as [Objects.equals(Object, Object)](https://docs.oracle.com/javase/7/docs/api/java/util/Objects.html#equals%28java.lang.Object,%20java.lang.Object%29).

Which is what I did. Below is the short but beautiful Java program I wrote:

```java
import java.util.Objects;

public class Main {
   public static void main(final String[] args) {
      System.out.println("true: " + true);
      System.out.println("false: " + false);

      System.out.println();

      final String string = null;
      final Number number = null;

      System.out.println("null == null: " + (null == null));
      System.out.println("string == null: " + (string == null));
      System.out.println("number == null: " + (number == null));
      // Exception in thread "main" java.lang.Error: Unresolved compilation problem:
      // Incompatible operand types String and Number
      // System.out.println("string == number: " + (string == number));

      System.out.println();

      System.out.println("Objects.equals(null, null): " + (Objects.equals(null, null)));
      System.out.println("Objects.equals(string, null): " + (Objects.equals(string, null)));
      System.out.println("Objects.equals(number, null): " + (Objects.equals(number, null)));
      System.out.println("Objects.equals(string, number): " + (Objects.equals(string, number)));
   }
}
```

And below this the output:

```
true:    true
false:    false

null == null:    true
string == null:    true
number == null:    true

Objects.equals(null, null):    true
Objects.equals(string, null):    true
Objects.equals(number, null):    true
Objects.equals(string, number):    true
```

The first two outputted lines were just to get a feel as to how Java outputs the raw boolean values `true` and `false`.

Everything here pretty much is as expected; the only lines that I find interesting is the output I commented out:

```java
// Exception in thread "main" java.lang.Error: Unresolved compilation problem:
// Incompatible operand types String and Number
// System.out.println("string == number: " + (string == number));
```

and the final comparison:

```java
Objects.equals(string, number):    true
```

Java doesn't allow a direct equality check between two dissimilar objects; however, I found that if I typecast one of the objects to Object, then Java states that the two objects are equal:

```java
// Output: (Object)string == number: true
System.out.println("(Object)string == number: " + ((Object)string == number));
```

To conclude this post and answer the titular question *Does null equal null in Java?* the answer is a simple *yes*. Which makes sense, otherwise there'd have to be another way to check if an object is not null then the standard `object != null`. Furthermore, two null objects are equal even if they don't exist in the same class hierarchy (as our Number and String objects in the above tests).

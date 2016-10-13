---
layout: post
title: The Difference Between a JavaBean and a POJO
tags: [java]
keywords: [programming, javabean, bean, pojo, definition, plain old java object, javabean vs pojo, pojo vs javabean]
image: /images/Java_logo.jpg
thumbnail: true
---

If you've programmed in Java for any amount of time, you'll inevitably come across the terms bean, JavaBean, and POJO. What are they and how do they differ? Let's start with some definitions:

## JavaBean

According to [Wikipedia](https://en.wikipedia.org/wiki/JavaBeans), "JavaBeans are classes that encapsulate many objects into a single object (the bean)." Essentially, it’s a class with three characteristics:

1. it’s serializable (i.e. implements [java.io.Serializable](https://docs.oracle.com/javase/8/docs/api/java/io/Serializable.html))
2. it has a no-argument constructor
3. it allows access to its properties through the standard getters and setters.

## Bean

A bean is a JavaBeans component, which is a reusable software component for Java. While I’m not 100% sure, it seems that "JavaBean" and "bean" are interchangeable.

## POJO

POJO stands for Plain Old Java Object. Essentially, it’s the one of the simplest types of objects possible. There are no annotations, it extends no other classes, and implements no interfaces except perhaps a marker interface, such as [java.io.Serializable](https://docs.oracle.com/javase/8/docs/api/java/io/Serializable.html). Finally, just like a JavaBean, it has a no-argument constructor, and allows access to its properties through the standard getters and setters.

## Comparison

I like the following statement from [StackOverflow](http://stackoverflow.com/questions/1394265/what-is-the-difference-between-a-javabean-and-a-pojo/24886660#24886660):

> All JavaBeans are POJOs but not all POJOs are JavaBeans.

Some people say a POJOs can’t implement [java.io.Serializable](https://docs.oracle.com/javase/8/docs/api/java/io/Serializable.html), which would mean a JavaBean is not a POJO. I would argue that a POJO can implement [java.io.Serializable](https://docs.oracle.com/javase/8/docs/api/java/io/Serializable.html), since implementing marker interfaces do not corrupt the "plainness" of a POJO.

Oh, and why is it called a bean? I have no source for this, but I believe it’s because [beans](https://en.wikipedia.org/wiki/Coffee_bean) are used to make [coffee](https://en.wikipedia.org/wiki/Coffee), and [java](https://en.wikipedia.org/wiki/Java_coffee) is a type of coffee, so…

Further reading:

* [JavaBeans vs Spring beans vs POJOs](http://www.shaunabram.com/beans-vs-pojos/)
* [JavaBeans FAQ: General Questions](http://www.oracle.com/technetwork/java/javase/faq-135947.html)
* [Plain Old Java Object, Wikipedia](https://en.wikipedia.org/wiki/Plain_Old_Java_Object)
* [JavaBeans, Wikipedia](https://en.wikipedia.org/wiki/JavaBeans)
* [What is the difference between a JavaBean and a POJO?, StackOverflow discussion](http://stackoverflow.com/questions/1394265/what-is-the-difference-between-a-javabean-and-a-pojo)

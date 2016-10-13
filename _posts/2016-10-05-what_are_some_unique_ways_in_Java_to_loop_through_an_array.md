---
layout: post
title: What are some unique ways in Java to loop through an array?
tags: [java, quora]
keywords: [programming, list, array, loop, iterable, recursion, foreach]
image: /images/Java_logo.jpg
thumbnail: true
excerpt: "Kenny Yu mentioned the standard ways to loop through an array. A unique way, I suppose, is to use recursion."
---

This is my answer to [this question](https://www.quora.com/What-are-some-unique-ways-in-Java-to-loop-through-an-array) on [Quora](https://www.quora.com).

[Kenny Yu](https://www.quora.com/profile/Kenny-Yu-4) mentioned the standard ways to loop through an array. A unique way, I suppose, is to use [recursion](https://www.google.com/search?q=recursion):

{% highlight java linenos %}
public static void main(String[] args) {
    int[] array = {4,65,2,34,25,25,43,63,654,635,6};
    loopRecursively(array,0);
}

public static void loopRecursively(int[] array, int i) {
    System.out.println(array[i]);

    i++;

    if(i < array.length) {
        loopRecursively(array, i);
    }
}
{% endhighlight %}

However, recursion is well understood. It’s unique in the sense you shouldn’t use it (at least in this case).

Also, although not an array, you can use the [forEach](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html#forEach-java.util.function.Consumer-) method in that is new for Java 8 [Lists](https://docs.oracle.com/javase/8/docs/api/java/util/List.html) / [Iterables](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html):

{% highlight java linenos %}
List list = Arrays.asList(4,65,2,34,25,25,43,63,654,635,6);

list.forEach(element -> System.out.println(element));
{% endhighlight %}

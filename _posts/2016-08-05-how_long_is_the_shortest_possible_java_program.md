---
layout: post
title: How long is the shortest possible Java program?
tags: [java, quora]
keywords: [program, programming, class, shortest]
image: /images/Java_logo.jpg
thumbnail: true
excerpt: "You can even do a little shorter than Garry Taylor’s solution, by giving main’s argument a shorter name:"
---

This is my answer to [this question](https://www.quora.com/How-long-is-the-shortest-possible-Java-program) on [Quora](https://www.quora.com).

You can even do a little shorter than [Garry Taylor](https://www.quora.com/profile/Garry-Taylor-5)’s solution, by giving main’s argument a shorter name:

{% highlight java %}
public class A{public static void main(String[] a){}}
{% endhighlight %}

The class doesn’t even need to be public, it can be default as well:

{% highlight java %}
class A{public static void main(String[] a){}}
{% endhighlight %}

You can verify that it works by running this slightly longer Java program:

{% highlight java %}
class A{public static void main(String[] a){System.out.println("hi");}}
{% endhighlight %}

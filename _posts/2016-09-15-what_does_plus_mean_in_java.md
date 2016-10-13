---
layout: post
title: What does "+" mean in Java?
tags: [java, quora]
keywords: [programming, plus, concatenate, string]
image: /images/Java_logo.jpg
thumbnail: true
excerpt: When dealing with numbers, it adds them like you’d expect. When dealing with string, it concatenates them. That is, puts one after another into another string.
---

This is my answer to [this question](https://www.quora.com/What-does-+-mean-in-Java) on [Quora](https://www.quora.com).

When dealing with numbers, it adds them like you’d expect.

When dealing with string, it concatenates them. That is, puts one after another into another string.

For example:

{% highlight java linenos %}
int x = 5 + 5;
String s = "Me" + "you";
String s2 = "Me" + x + "you";
 
System.out.println(x);
System.out.println(s);
System.out.println(s2);
{% endhighlight %}

This outputs the following:

```
10
Meyou
Me10you
```

Now try to figure what this outputs:

{% highlight java linenos %}
String s3 = "Me" + x + 5 + "you";
System.out.println(s3);
{% endhighlight %}

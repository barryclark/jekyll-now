---
layout: post
title: What is the meaning of the "default access specifier" in Java?
tags: [java, quora]
keywords: [programming, access specifier, default]
image: /images/Java_logo.jpg
thumbnail: true
excerpt: "There are four access specifiers in Java: public, private, protected, and default. Three of them use their associated word, while default uses none."
---

This is my answer to [this question](https://www.quora.com/What-is-the-meaning-of-the-default-access-specifier-in-Java) on [Quora](https://www.quora.com).

There are four access specifiers in Java: public, private, protected, and default. Three of them use their associated word, while default uses none. They appear as follows:

{% highlight java linenos %}
public class JavaApplication {
    Object object1;
    public Object object2;
    private Object object3;
    protected Object object4;
}
{% endhighlight %}

"object1" has default access. As others have said, that means that you can only access that feature (be it class, variable, method, etc.) from classes within the same package.

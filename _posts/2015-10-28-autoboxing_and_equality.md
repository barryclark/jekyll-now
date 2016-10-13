---
layout: linkedin_post
title: Autoboxing & Equality
tags: [java, linkedin]
keywords: [programming, autoboxing, equality]
image: /images/Java_logo.jpg
thumbnail: true
linkedin_post: groups/70526/70526-6065138086264786948
---

I was curious as to the effects of autoboxing on equality, so I wrote this short class:

{% highlight java linenos %}
public class Main {
    public static void main(String[] args) {
        int int1 = 5;
        int int2 = 5;
        Integer autobox1 = 5;
        Integer autobox2 = 5;
        Integer autobox3 = int1;
        Integer integer1 = new Integer(5);
        Integer integer2 = new Integer(5);

        System.out.println("int1 == int2 -> " + (int1 == int2));
        System.out.println("int1 == autobox1 -> " + (int1 == autobox1));
        System.out.println("autobox1 == autobox2 -> " + (autobox1 == autobox2));
        System.out.println("int1 == autobox3 -> " + (int1 == autobox3));
        System.out.println("int1 == integer1 -> " + (int1 == integer1));
        System.out.println("integer1 == autobox1 -> " + (integer1 == autobox1));
        System.out.println("integer1 == integer2 -> " + (integer1 == integer2));
    }
}
{% endhighlight %}

The output is as follows:

```
int1 == int2 -> true
int1 == autobox1 -> true
autobox1 == autobox2 -> true
int1 == autobox3 -> true
int1 == integer1 -> true
integer1 == autobox1 -> false
integer1 == integer2 -> false
```

As expected, the two `int`s are equal and the two `Integer`s are not. I didn't know what to expect for the rest.

The moral of the story is to (almost) always use `.equals()` when available, since it will have consistent results.

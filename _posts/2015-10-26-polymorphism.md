---
layout: linkedin_post
title: Polymorphism
tags: [java, linkedin]
linkedin_post: groups/70526/70526-6064416840703111169
---

Interesting problem / assumption I had with polymorphism recently. Take this code:

{% highlight java linenos %}
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Main {
  public static void main(String[] args) {
    List<Object> objects = new ArrayList<>();
    
    objects.add(new Object());
    objects.add(new String());
    objects.add(new Date());
    
    for(Object object : objects) {
      method(object);
    }
  }
  
  public static void method(Object o) {
    System.out.println("Object method!");
  }
  
  public static void method(String s) {
    System.out.println("String method!");
  }
}
{% endhighlight %}

I thought when the list iterates to the String object, it would go to the method with the String signature. Nope, it goes to the method with the Object signature.

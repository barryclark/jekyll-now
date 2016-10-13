---
layout: linkedin_post
title: Polymorphism
tags: [java, linkedin]
keywords: [programming, polymorphism]
image: /images/Java_logo.jpg
thumbnail: true
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

<h2>Note:</h2>

So it goes by declaration (i.e. variable type) not object type. I tried a few more method calls:

{% highlight java %}
method(new String());
Object object = new String();
method(object);
method((String)object);
{% endhighlight %}

The first and last method calls are to the String method, while the middle one is to the Object method.

Technically, it is polymorphism. Polymorphism "refers to a programming language's ability to process objects differently depending on their data type or class" (http://www.webopedia.com/TERM/P/polymorphism.html), although the source continues to say "More specifically, it is the ability to redefine methods for derived classes" so I get where you're coming from.

Wikipedia calls the type of polymorphism I'm trying to use ad hoc polymorphism, which "is also known as function overloading or operator overloading" (https://en.wikipedia.org/wiki/Ad_hoc_polymorphism). The main polymorphism entry on Wikipedia says that "subtype polymorphism [is] when a name denotes instances of many different classes related by some common superclass. In the object-oriented programming community, this is often simply referred to as polymorphism" (https://en.wikipedia.org/wiki/Polymorphism_%28computer_science%29)

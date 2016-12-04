---
layout: post
title: Think pure and make functions great again
---

!["Pipes" Chris Smart by ]({{ site.baseurl }}/images/5865519128_224430423c_o.jpg)

There has been something of a functional programming renaissance happening recently, in a variety of languages. I've been delving into F# and Elm, and regardless of whether or not I ever use either in my work, I've discovered that there's a lot that I can take back to C#-land to improve the quality of my code. These are concepts that have been known for awhile by those who work primarily in the functional world, but they are a breath of fresh air for me as a functional newbie.

<!--more-->

[Kris Jenkins has a good presentation](https://www.youtube.com/watch?v=tQRtTSIpye4) where he outlines his definition of functional programming is, and I think it's a good one: eliminating side effects in your code wherever possible, and controlling side effects where they are required. Essentially, most of us in the object-oriented world have become numb to the fact that when you see a function signature like this:

```
public int CalculateTotal(int x, int y)
```

then it has a very real possibility to be a lie. If CalculateTotal has a requirement that some other dependency be in a certain state, then you have no way of knowing about it from the method. As Kris describes it, you have "hidden causes", or a necessary state the world has to be in before the method can be called, but you would only know that by having intimate knowledge of the implementation of the method.

There are also hidden outputs to the method. There's the return type, the visible result of calling the function, but there can also be side effects to the state of the world that are hidden from the view of the caller but may nonetheless affect it. Can the method be called again, or has some dependency been put in a bad state? Are we guaranteed to get the same result?

Also not mentioned in the video but relevant in many OO languages are the "ejector seats" that are exceptions. As [Vladimir Khorikov discusses in an article on his blog](http://enterprisecraftsmanship.com/2015/02/26/exceptions-for-flow-control-in-c/), exceptions are used far too often. We've all heard "exceptions should be used for exceptional situations", but what does that mean exactly? Routine validation of a string property is not a case to throw an exception, and yet we do it so often. Exceptions should be used in an "I can't understand how the system would ever get in this state, but just in case" situation, not "liable to happen two out of three times the user submits a form" cases.

If all required information is passed into a function and all results are specified in the return type, giving us what is called a "pure" function, then what are the benefits? Quite a few, including:

* Less information you need to juggle in your head. If a function is called "CalculateTax" and it takes in an amount and a tax rate, you can be reasonably sure what will happen if you call it. No "CalculatorService" null reference exception, no weird error the second time you call it.
* Greater re-usability. If the function says it does what you need, and you have the right arguments, then you can call it. You don't need to call things in the right order or during the correct phase of the moon.
* Easier unit testing. This follows along with the "[No Mocks](http://enterprisecraftsmanship.com/2016/07/05/growing-object-oriented-software-guided-by-tests-without-mocks/)" movement and makes unit tests easier to read and write as the entire test can usually be written in a few lines. How many times have you had to follow this test process: 1. Set up your system under test. 2. Call it. 3. See what blows up, write a mock to fix it. 4. Go to step 4

Not all of your program can be these "pure" functions with no side causes or effects, since presumably your program needs to have an effect upon the state of the world (updating a UI, writing to a database, calling a webservice, etc.). Still, making the majority of your business logic into pure functions can provide a lot of benefits. C# gives you a lot of OO tools to make things complicated, but if you can resist then you can reap a lot of benefits. F# offers more of a "pit of success" to fall into than C#, and increasingly developers are seeing the upsides to an approach like this.

(image credit: [Chris Smart](https://www.flickr.com/photos/sigma/5865519128/in/photolist-9Wjju9-4GGNw-dPt3Es-4FK9FF-JFJ2V-nJctby-4AcveW-q4dC-e3Wnpx-2orSZ-6kX5zR-dL7ju-5hXXtJ-5Gy3U7-5GtKZg-efe3rw-6duF23-sctvY-rRhdJH-9N7QJb-aVwpk2-bZsHy-dhT4jm-ekPqW4-7JPE33-5GtL4H-qDxXYJ-6GCsM1-9keruF-5Gy42Y-9QcDmT-6LRfEm-a1VXqK-2K5BQX-7wKmWC-4HigwE-7wKmVu-uWcea-9YQLjT-A8Bi1-5BC5h-4V5QX-tMcEL-p1gS4g-kcyKu7-oFH5FZ-nTAGcw-CAPeb-8APL6N-ENLhb))

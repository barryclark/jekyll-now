---
layout: post
title: Understanding the Basics of JavaScript
---

In his book - Javascript, The Good Parts - author Douglas Crockford opens with a very solid point:

> "JavaScript is the only language that I’m aware of that people feel they don’t need to learn before they start using it" - Douglas Crockford

How silly some people are! Popular frameworks (I'm looking at you jQuery) tend to perpetuate this problem by lowering the barrier of entry and allowing developers to work with Javascript without necessarily knowing what is being done behind the scenes.

**Disclaimer**: I am no expert on Javascript. Up until about two weeks ago, the majority of my JS experience was - like most - through jQuery. I've recently begun to shift my attention to learning the ins-and-outs of what is arguably one of the most powerful programming languages out there today. Note that this article is being written from my perspective, which will assume that you have at least an intermediate level of programming knowledge.

First and foremost, Javascript is a loosely typed language. This is one of the more difficult hurdles to overcome if you have a strongly-typed background like myself. Jeremy Martin has a good article on [understanding loose typing in Javascript](http://blog.jeremymartin.name/2008/03/understanding-loose-typing-in.html) that I would highly recommend if you are having a hard time following. 

Put simply, loose typing means that variables are declared _without a type_. This does not mean that variables do not have types, rather that they are determined internally. For example:

{% highlight javascript linenos %}
//Javascript
var i = 5; //Number
var j = "Jordan"; //String

// Java
int i = 5; //Integer
String j = "Jordan"; //String
{% endhighlight %}

While this takes away compile-time error checking, it does provide us with a bunch of flexibility, which is arguably worth the tradeoff.

Second, functions in Javascript are _[First Class Citizens](http://en.wikipedia.org/wiki/First-class_function)._ This is an important concept to grasp as it encompasses many of the ideas you will learn going forward in regards to Javascript structure and variable scoping. Again, there are a number of books written on the subject of Javascript as a loosely typed language, and I highly suggest following up by reading some of them.

**Global Space / Var Scope**

Variable scope is something that we as developers don't often consider. Most languages implement scope similarly, and so we often make assumptions about the visibility of our variables. Because Javascript does not have a linker, it throws all top-level declarations into what is known as the _Global Space_. This is one of the many things that Douglas Crockford refers to as one of the language's _bad parts_. Anything in the global space is executed immediately once the script is loaded.

Making declarations in the global space has the potential to create naming conflicts with other scripts whose code may be out of your control. This is easily circumnavigated however, and will be discussed in more depth in the next section. There are other reasons to avoid making declarations in the global space, but they are outside the _scope_ of this article.

Javascript also hoists all declarations to the top of their respective contexts. Hoisting is the process of taking a scopes declarations and moving them up to the beginning of the context at compile-time. Jeremy Keith has a much better explanation on [JS Hoisting](http://net.tutsplus.com/tutorials/javascript-ajax/quick-tip-javascript-hoisting-explained/). This becomes increasingly significant when authoring JS code, because JavaScript's scopes are function-level, not block-level. What this means is that any declarations are hoisted to the beginning of the _function_ in which they are declared - not the block. This is best explained with an example:

{% highlight javascript linenos %}
function doSomething() {
var x = 5;
for(var y = 0; y < x; y++){
    var z = x * y;
}
}
{% endhighlight %}

In most languages, understanding the scoping that is going on here would be simple: x would be scoped to the function doSomething, while y and z would be scoped to the for-loop that creates them. This isn't the case in Javascript however, as blocks (such as for-loops) do not create a new scoping context. `y` and `z` are hoisted up to the top of doSomething and are scoped at the function level, causing multiple declarations when the code is compiled. The best thing to do here is to declare the variables where you know they will be scoped:

{% highlight javascript linenos %}
function doSomething() {
var x,
    y,
    z;
x = 5;
for(y = 0; y < x; y++){
    z = x * y;
}
}
{% endhighlight %}

Colin Ramsay has a pretty great writeup on Smashing Coding about [Variable Scope in Javascript](http://coding.smashingmagazine.com/2009/08/01/what-you-need-to-know-about-javascript-scope/) that I would also recommend, as it discusses this topic in a much better way than I can.

**Javascript Modules**

Now the fun part! Using what we have learned so far, we are able to utilize some pretty nifty code patterns in Javascript that will ultimately make our code more concise and readable. I've found that a good habit to get into is to wrap all of my scripts into anonymous immediately-called closures. This creates a new private scope just for my code while avoiding any global scope issues. Here is how to do that:

{% highlight javascript linenos %}
(function(){
//Function Body
}());
{% endhighlight %}

Seems simple enough. By adding the two parentheses _after_ the anonymous function declaration, we are immediately calling the body of this function (similar to how a script would function immediately, but in the global space!). In this closure, we can declare all of our code without worry.

We'll use a closure again, but this time assigning it to a var that will behave as our _module_.

{% highlight javascript linenos %}
var Module = (function(){

var data = [],
	privateVar = 1;

function moduleMethod(){
	privateMethod();
}

function privateMethod(){
	//...
}

return {
	myModuleMethod: moduleMethod,
	myOtherModuleMethod: function(variable){
		//...
	}
};

}());

var result = Module.myModuleMethod();
var result2 = Module.myOtherModuleMethod(result);
{% endhighlight %}

As you can see, there are a lot of different ideas going on here, and a lot of them are up to the personal discretion of the developer. In our module, we are creating two functions - one of which we would like to expose via `Module.myModuleMethod` and another, `Module.myOtherModuleMethod` that is created in the return statement. Neither of these methods are wrong, but keeping your style consistent will save many headaches are you continue down the path to enlightenment.

The way our module is set up now gives us a private scope to work in, and the ability to refer to our Module and its methods freely. These patterns are super flexible, so I would definitely suggest playing with them in your projects to see what suits you best in different scenarios.

And thats it for today! In Part 2 I'll start discussing topics such as more design patterns, how Javascript handles inheritance, and the dreaded DOM API! If you have any suggestions or corrections, please do not hesitate to comment, and while you wait patiently for part 2, feel free to take a look at the following resources:

[Javascript, The Good Parts](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) - Douglas Crockford

[Javascript Playground](http://javascriptplayground.com/)

[Javascript Jabber](http://javascriptjabber.com/)

[JavaScript Module Pattern: In-Depth](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html) - Adequately Good
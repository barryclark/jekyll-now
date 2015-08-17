---
layout: post
title: Working toward Bret Victor's "Learnable Programming"
---

Bret Victor is singlehandedly responsible for popularizing the ideas behind live programming amongst today's programmers. In his famous essay [Learnable Programming](http://worrydream.com/LearnableProgramming/) he outlines a set of design principles that should guide the creation of a modern programming environment.

To my knowledge, [Alive](http://comealive.io) is one of only two serious attempts to build a tool based these principles (the other being [Light Table](http://lighttable.com/)). This gives us a unique opportunity to explore the ideas behind Learnable Programming from the vantage point of practicality.

Bret lays out two requirements for a modern programming system. He says the goals of the system should be:

  * To support and encourage powerful ways of thinking
  * To enable programmers to see and understand the execution of their programs
  

The first is enabled by the second. Visualizing program execution and showing programmers the data they're working with enables new, powerful ways of thinking. 

A few of my favorite examples of this:

###### Relate code directly to the final result it's responsible for

<video autoplay loop width="640" height="110" preload>
		<source src="https://codeconnectcdn.blob.core.windows.net/cdn/blog/Vocab13.mp4" type="video/mp4">
		<source src="https://codeconnectcdn.blob.core.windows.net/cdn/blog/Vocab13.webm" type="video/webm">
</video>

###### Map time to space

<video autoplay loop width="792" height="232" preload>
		<source src="https://codeconnectcdn.blob.core.windows.net/cdn/blog/Flow9.mp4" type="video/mp4">
		<source src="https://codeconnectcdn.blob.core.windows.net/cdn/blog/Flow9.webm" type="video/webm">
</video>

###### Show state directly

<video autoplay loop width="808" height="216" preload>
		<source src="https://codeconnectcdn.blob.core.windows.net/cdn/blog/State13.mp4" type="video/mp4">
		<source src="https://codeconnectcdn.blob.core.windows.net/cdn/blog/State13.webm" type="video/webm">
</video>

These ideas and the approaches Bret demonstrates are nothing short of incredible. Bret's work has given us a destination for what a modern programming environment might look like, but not much is said on how we should get there. 

### What "Learnable Programming" gets right

Our experience building and using Alive daily has shown us that Bret gets the fundamental points right. I'll defer to [the original essay](http://worrydream.com/LearnableProgramming/) for complete explanations of these ideas, but we can take a look at Alive's interpretation of them.

**People understand what they can see.** So show them internal state. Allow them to understand what their program is doing the moment they change it.

![Instant response is neat](https://i.gyazo.com/124b21a9ac1e22316b5fa4301b52eca4.gif)

**Allow programmers to navigate through time.** We can enable powerful new ways of thinking by allowing developers to easily navigate forward and backward through time.

![Time Travel Is Neat](https://i.gyazo.com/0dd097c6689b4955a98601b0ea537da8.gif)

These are powerful ideas of which we have only scratched the surface. Bret's research in Learnable Programming and Designing by Principle have served as an anchor for our research in this area. 

### Problems getting to "Learnable Programming"

There are a number of problems that make it prohibitively difficult to fully realize Bret's vision. Some are artifacts of the way programming languages work today, and others are fundamental flaws in the ideas and features put forward. 

Bret explicity notes:

>This essay will present many features! The trick is to see through them -- to see the underlying design principles that they represent, and understand how these principles enable the programmer to think.

However, at some level we have to critique the features. It doesn't matter how compelling the underlying ideas are if the features are impossible to build.

#### 2D Considered Harmful

The first major issue is the huge focus on working with a two-dimensional output. In Bret's defense, his essay is a response to Khan Academy's new programming environment which teaches programming via Javascript and Processing. That said, it's important to point this problem out as two-dimensional examples have permeated nearly all live programming research and it does the research a huge disservice.

So why is it a mistake to focus on 2D? **It's too easy.**

It's too easy to create awesome visuals that portray live programming as a panacea. Take a look:

<video autoplay loop width="640" height="110" preload>
		<source src="https://codeconnectcdn.blob.core.windows.net/cdn/blog/Vocab13.mp4" type="video/mp4">
		<source src="https://codeconnectcdn.blob.core.windows.net/cdn/blog/Vocab13.webm" type="video/webm">
</video>

It's easy to see this and be overcome by how incredibly useful such a tool would be. How awesome would it be to see exactly what every line of code did to our program's output?

However, we need to stop and think deeply about how this system would handle typical code. How do we generalize this solution such that it helps programmers building compiler platforms like LLVM and Roslyn? How will it help programmers researching neural networks? How will it help programmers writing line of business applications? Databases? Apps? Financial backends?

The vast majority of functions in today's codebases do not map nicely to a 2D output.

Bret is not the only dreamer to fall victim to the temptations of 2D. Apple's [Swift Playgrounds](https://developer.apple.com/swift/blog/?id=24), [IPython Notebook](http://ipython.org/notebook.html), [Xamarin Sketches](http://developer.xamarin.com/guides/cross-platform/sketches/introduction/) and [research done at Microsoft](http://research.microsoft.com/apps/pubs/?id=179365) all focus on 2D. 

Two dimensional examples are harmful to live programming research. They oversell live programming and the connection between a line of code and an output. Live programming research should focus on making "boring" code easier to read and understand. This is the only way a live programming environment can make the transition from **toy** to **tool**.

#### RealWorld™ Code

An area left unexplored by "Learnable Programming" is running functions that accept complex parameters. This is problematic as most functions take parameters so they can manipulate them or do something interesting with them. Yet almost every single piece of literature we've encountered on live programming decided to ignore this.

There's a huge difference between be able to provide a compelling visualization for:

```Javascript
function myFunction() {
	var person = Person();
	person.Name = "Josh Varty"
	person.Address = "123 Code Connect Street, Waterloo ON"
	
	var result = DoTaxes(person);
}
```

and:

```Javascript
function myFunction(person) {
	var result = DoTaxes(person); //Oh God, what is this 'person' thing?
}
```

In the second example how does a live programming system synthesize a "Person" object? What if there are multiple constructors? What if it depends on ten other objects when being created? What if this object only originates from a database? Should the user constantly create these objects by hand when they want to edit *any* function in their program?

These are the questions that live programming research has ignored. They're uncomfortable to ask and they're boring to answer. And while they're not fun to think about, answering them is the only way a foundation for a live programming system can be laid. Bret notes:

> Recently, some people have mistakenly attributed the "live coding" concept to me, but it's not a new idea, it's certainly not "my idea", and it's not a particularly interesting idea in itself. *Immediate-update is merely a prerequisite for doing anything interesting -- it enables other features which require a tight feedback loop.*

In order to do anything interesting, we must first answer boring questions and enable immediate update.

[Alive](http://comealiveio) tackles this problem by running a user's unit tests. This ensure all state is taken care of and that all parameters are valid. 

![Unit tests are neat!](https://i.gyazo.com/4dc7ac656863cbd02a8e213598f85a4f.gif)

But this is by no means the only solution, and we're not deep enough into our research to know if it's truly the *best solution*. Other possibilities include:

 * Automatic generation of unit tests and synthesized parameters
 * Forcing the user to manually create the objects they need to pass to a function
 * Caching various objects while the user is running their program
 
All of these approaches have unique benefits and drawback. But as it stands no one knows what they are. We'd like to see others researching live programming investigate these questions of practicality.

#### The inertia of past success

Finally, the biggest flaw in Learnable Programming is that it completely dismisses the inertia of past successes. In his conclusion, Bret confronts the crucial question: **"How does this scale to real-world programming?"**.

This question deserves an answer, but Bret dismisses it. Instead he compares it to asking "How the internal combustion engine will benefit horses". The internal combustion engine provided **at least** an order of magnitude improvement over the horse. It remains unclear whether a live programming system can provide even a 2X improvment over traditional environments. (If it can we've **grossly** underpriced Alive as it would mean saving a programmer tens of thousands of dollars of time!)

###### If we want to see live programming systems become usable tools, we need to confront the reality that inertia (usually) wins.

We need only look to history for evidence of this. There have been hundreds of attempts to replace Javascript. Coffescript, Typescript, Dart, not to mention you can compile [virtually any language to Javascript](https://github.com/jashkenas/coffeescript/wiki/list-of-languages-that-compile-to-JS).

Bret goes on, saying:

> Here is a more useful attitude: Programming has to work like this. Programmers must be able to read the vocabulary, follow the flow, and see the state. Programmers have to create by reacting and create by abstracting. Assume that these are requirements. Given these requirements, how do we redesign programming?

This attitude is a losing one. For all its warts, bumps, pains and bugs, programming today works somewhat decently enough. The field has plenty of room for improvement, but not of "burn it to ground" flavor suggested here. In order for programmers to sacrifice their massive investment in today's languages and tools such a redesign of programming would have to offer *extremely* compelling improvements. (I'd wager they'd need to see improvement of at least **one to two** orders of magnitude).

So let me give an additional requirement: **Any live programming system must interface fluently with existing languages and tools**.

### Final Thoughts

**What Works**

* People understand what they can see. So show them what their programs are doing.
* Allow people to control time to gain a better understanding of how their program works.

**What Doesn't**

* Two-dimensional examples. They're misleading, and don't work for the vast majority of code.
* If we're going to show programmers data, we have to consider: Where is that data going to come from? How are we going to create it?
* Ignoring inertia and counting on raw "betterness" of new tools or languages to win the hearts and minds of developers.

Finally, let me thank Bret for his inspiring work in this area. In The [Future of Programming](https://vimeo.com/71278954) Bret alludes to a worry of his:

> The real tragedy would be if people forgot you could have new ideas about programming models in the first place.

Until 2012, I'd never considered that there were different approaches to thinking about programming. I looked at programming as a "solved" problem. It wasn't until I stumbled upon Bret's work that I considered programming could be changed and improved upon. 

At Code Connect we owe him a lot and are eagerly awaiting his next project. :)


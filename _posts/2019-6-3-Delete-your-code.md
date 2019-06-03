---
layout: post
title: "Delete your code: in search of a minimalist approach to software development"
---

![](https://cdn-images-1.medium.com/max/2600/1*HTKqg1DFILEq90zjQV8onw.jpeg)

> I’m sorry I wrote you such a long letter; I didn’t have time to write a short one. 
> — Blaise Pascal

Software is a difficult and beautiful problem. Software engineering is the field that addresses it and although it is a young discipline, a lot of ideas has emerged trying to improve our ability to deal with software. This article is about a group of ideas on which we use to rely while developing that coincide with a minimalist approach to code and software.

### Starting point

A good starting point is the notorious *No Silver Bullet* essay. Within it, we find that the first attack on the conceptual essence of software is *buy vs. build*: “the most radical possible solution for constructing software is not to construct it at all”*.* Apart from the obvious meaning of this attack, I think that the key to this point is somewhere else. *Buy vs. build* is a recursive solution to the simple existence of software. It says to avoid building software while you can. Three decades after the essay and we have been trying to do it. But we always get to the base case and we have to build.

What I mean is this: what if we have missed the base case? We have enhanced our limits based in reducing our need to build parts of our software (using SaaS, microservices, Open Source, etc.). But what if the code we should be minimizing is the one we have already developed?

### Minimalism and what can it provides

Minimalism is on trend nowadays. A group of Netflix documentaries, TED talks and writers have created a concept difficult to define. What is being a minimalist? Even Oxford dictionary has been left behind. The most accurate definition is that of the adjective *minimalist*: “taking or showing as little action and  involvement in a situation as possible”.

If you want to create a precise definition of this modern term the artistic movement of post-WWII minimalism is not very useful. We can rescue the phrase by the painter Ad Reinhardt: “The more stuff in it, the busier the work of art, the worse it is. More is less. Less is more.”

If we change the subject and look into the history of thought we can find Epicurus (341–270 B.C.E.). A couple thousand years before us he said: “Nothing is enough for the man to whom enough is too little.” He searched for a happy and tranquil life, characterized by the freedom from fear and the absence of pain, living a life surrounded by friends.

Such ideas traveled Western and Eastern history for thousands of years. We can have an article written only about them, but that is not the idea. How do these ideas relate to Marie Kondo? Can these ideas give any value on our work? I will end the section with Leo Babauta’s modern definition of minimalism:

> It’s simply getting rid of things you do not use or need, leaving an uncluttered, simple environment and an uncluttered, simple life. It’s living without an obsession with material things or an obsession with doing everything and doing too much. It’s using simple tools, having a simple wardrobe, carrying little and living lightly.

The quote is important because it shows that this concept isn’t about not doing things, it is about avoiding doing too much. It’s about using simple tools for simple problems. That’s our starting point.

### Predecessors in software development

These ideas have been going around in software development for years. We can describe some of them:

#### Extreme Programming (XP)

If we have to look for a predecessor of this idea, it is impossible to avoid Extreme Programming (XP). A year before Kent Beck published his book on the methodology, Ron Jeffries was writing about *You are NOT gonna need it!*. The idea was clear: resist each time the urge to develop features that you don’t actually need. Jeffries discussed the importance of time and how the amount of code affects not only its developer but each person who reads, mantains or works in any way with that code. To be even clearer I can quote Ron: “the best way to implement code quickly is to implement less of it. The best way to have fewer bugs is to implement less code*”.* What is the idea of deleting your code more than a better implementation of that principle?

#### Worse is better

This approach holds that in software making it is best to start with a minimal creation and grow it as needed, in “piecemeal growth”. The creator of this concept was the computer scientist Richard P. Gabriel, known for his work with the Lisp programming language. In his words, the essence of the style is slightly different to the MIT/Stanford *the right thing* style of design. In short, they agree that simplicity is the most important consideration in a design.

#### KISS

Keep It Simple, Stupid. The U. S. Navy left us this beatiful concept that is very close to the common phrase “everything should be made as simple as possible, but not simpler”. KISS is repeated everywhere in software engineering. It became an important principle because of that tendency among engineers to over-engineer solutions. It is better for you to build software using code that is *stupid* simple. It creates more maintanable and flexible software.

#### Jamie Zawinski, software bloats and feature creeps

If the previous points touched on ideas related to avoiding creating more code than is needed, has to do with problems after that happens. We have a specific name for the problem on expanding the features in our code: *feature creeps*. Zawinski does a better job than me: “Every program attempts to expand until it can read mail. Those programs which cannot so expand are replaced by ones which can.”. The famous Andrew Tanenbaum also had something to say about this in his book *Computer Networks*: “In addition, a substantial number of the problems caused by buggy software, which occurs because vendors keep adding more and more features to their programs, which inevitably means more code and thus more bugs.”.

It seems that adding capabilities to a piece of software that was never thought of doing that kind of work can only lead to *software bloats*, the complete loss of meaning of the original design, the waste of resources when using technologies that do not correspond to the scope, the inability to maintain and refactor the software, among others nightmares..

#### The No Code repository

“No code is the best way to write secure and reliable applications. Write nothing; deploy nowhere.” It is a joke about other software topics but I can’t help but include what Kelsey Hightower did in this GitHub repository.

### What do we have to offer? A development approach

What am I trying to say with *delete your code*? I think that software should be developed thinking with the actual use of it in mind first. This must be taken into account in every step of software life cycle, not only in its design. This development approach can be summarised in three points:

* Every piece of software must contain only the software that is being used.
* A piece of software must have a cohesive ammount of use between its parts.
* A piece of software should be designed, implemented, monitored and mantained with the above concepts in mind.

### Is it even possible to DYC?

This article could end with the possibility of a new process called Delete Driven Development (we would use DeDD, DDD is already busy) or perhaps Usage Driven Development (UDD). But I think that it is very important to think about a real chance of implementing these strategies.

There are a lot of concepts that play a role in this approach, but there is one that is a key for making it possible: monitoring. You have to profile your software in production and you have to do it in a way that makes the results representative. This is not easy but it is not negotiable to have the possibility to remove part of your code. That’s why we need a solution that does not overload our software while it is profiling at least a partial time of its usage. In my opinion, the right approach is with an Application Performance Management (APM) such as those provided by DataDog or Stackify.

The need is clear: you need to know how much your pieces of code are being executed. We are not only talking in terms of APIs but also in terms of classes, functions and up to lines of code. We have to know how much each piece of our code is being used to be able to delete the unused code and refactor the rest to follow the three principles.

### An ally: microservices

Microservices must, by definition, be maintainable and testable. Why are microservices important to the approach? Because microservices are pieces of software that give us the ability to mantain a cohesive amount of usage. If your microservice has more than one responsability without a cohesive amount of use, you may have to split this microservice. Do you need to add a new feature in your software and are you tempted to add it to a microservice that will not correspond with its responsability? I am sure that after adding the feature it won’t have a cohesive amount of usage as the microservice previous state had.

What do we want to avoid with that? Waste of resources and use of tools or technologies that only apply to a part of the functionality. The work has to be done at all levels but I believe that microservices are a great point of reference to apply the principles defined before.

### Conclusion

This article is intentionally incomplete. It is an idea that needs a lot of work to be more than a concept. It might even turn out to be a bad idea. But it is clear to me that there are many indications that lead us in that direction. We’ve known for a long time that we can expect better pieces of software using less code and we have to fully embrace that idea. So, in a nutshell: check the actual use of your software and delete your unused code. I’m sure the profits will outweigh your lost LOC.

*****

### References

* Jeffries, J. (1998, Apr 4). *You’re NOT gonna need it!* Retrieved from [https://ronjeffries.com] http://ronjeffries.com/xprog/articles/practices/pracnotneed/)
* The Apache Software Foundation (2019). *What does KISS stand for?* Retrieved from* *[http://people.apache.org](http://people.apache.org/~fhanik/kiss.html)
* Raymond, E. (2003, Dec 29). *The Jargon File v. 4.4.7*. Retrieved from [http://jargon-file.org/](http://jargon-file.org/)
* Hightower, K. (2018, Feb 6). *No Code Repository*. Retrieved from [https://github.com/kelseyhightower/nocode] https://github.com/kelseyhightower/nocode)
* Tanenbaum, A. (2010). *Computer Networks*. Asia: Prentice Hall, Indian International Ed.
* Richardson, C. (2018). *What are microservices?* Retrieved from [https://microservices.io](https://microservices.io/index.html)

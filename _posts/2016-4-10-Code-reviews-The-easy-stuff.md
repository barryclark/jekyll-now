---
layout: post
title: "Code reviews: The easy stuff"
---

I take code reviews seriously. If I'm looking at someone else's changes, then I want to devote the appropriate amount of time and energy to provide thoughtful feedback. It can be hard to take a step back and take in suggestions on why your baby may not be the prettiest around, but long term it makes you a better programmer and improves the average quality of the code.<!--more-->

Some things that I look for immediately in the web applications and API-related work that I review:

* Are you properly validating all inputs from the outside world? For web applications that use an API, that includes passing in all manner of values for the request. NULL, empty strings, strings where numbers are expected and vice versa, and whatever other weirdness I can think of. [OWASP Zed Attack Proxy](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project) has been a help here for viewing and modifying HTTP requests, and I've heard that [Fiddler](http://www.telerik.com/fiddler) has similar functionality.
* Does the code read well? Are parameter and method names consistent? Naming is a process, and you may not get the best name on the first pass, but I look for easy cleanups like stashing a nasty bit of logic away in a method with an easier-to-understand name, or renaming a non-intuitive variable name into something that will save a future developer some time.
* Does the code do what you said it does? Reading code and making suggestions is great, but I always run it myself to make sure it works as advertised and doesn't break other functionality in unexpected ways.
* Is there an easier way to do it? I try not to get too clever/unintelligible with my coding style, but if you can replace a chunk of code with a one-liner from the included framework library or a bit of syntactic sugar that's more understandable to boot, I believe it's well worth it.
* Are there unused dependencies, commented out code, or other things that don't need to be there? We can get rid of it and make the remaining code easier to read.

These are more the low-hanging fruit. There's always the bigger architectural questions, the "is this designed the right way?" question, but hopefully that is tackled before you get to the code review stage.

Overall a code review should be a conversation with a back-and-forth that hopefully leaves all parties satisfied with the code. Developers shouldn't have that ball of fear in their stomach when they think about changing the code and adding a new feature.

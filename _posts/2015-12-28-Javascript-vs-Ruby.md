---
layout: post
title: Javascript & Ruby - A Brief Comparison
excerpt_separator: <!--more-->
img_file: ruby-vs-javascript.png
---
I will try and compare Javascript and Ruby... I might not be correct or accurate in all my observations so please feel free to <a href="/contact.html">let me know</a> if there are any discrepancies.
<!--more-->

<h3>JavaScript is not a compiled language:</h3>

With conventional programming languages like **C**, **C++** or **Java**, you compile the code before you execute it. Compiling takes your code and produces a machine efficient representation of it, usually optimized for runtime performance. Scripting languages are typically interpreted, which means that the browser runs each line of JavaScript code as it gets to it. Scripting languages place less importance on runtime performance, and are more geared towards tasks like prototyping, interactive coding and flexibility. Unlike other languages, JavaScript is delivered, as code, directly to your browser. That’s different!

<h3>Javascript is a much more popular language</h3>

JavaScript’s not only one of the most popular programming languages, it’s also supported in all modern (and most ancient) browsers; JavaScript’s even branching out and being embedded in a lot of environments outside the browser. 


<h3>Javascript does not have private methods</h3>

Ruby provides ways to explicitly declare certain methods and properties private and signal an error when you try to use them from outside the object. JavaScript does not, so you will have to rely on some other form of communication to describe what is part of an object’s interface.


<h3>Javascript is much more forgiving</h3>

Ruby wants to know the types of all your variables and expressions before even running a program and will tell you right away when a type is used in an inconsistent way. JavaScript considers types only when actually running the program, and even then, it allows you to do some clearly nonsensical things without complaint, such as x = true * "monkey".


<h3>Javascript does not have a global scope</h3>

Ruby has a scope level between global (everyone can see it) and local (only this function can see it). JavaScript does not. Thus, by default, everything that needs to be visible outside of the scope of a top-level function is visible everywhere.

<h3>Objects in Javascript are Hashes in Ruby</h3>

In ruby hashes are referred to like so:

`hash_name = { hash_key: hash_value , sechash_key: sechash_value}`

In Javascript hashes are referred as Objects , the “Key” in Ruby is simply a variable.

`var hash_name = { hash_key: hash_value , sechash_key: sechash_value}`

You can call upon the hash to find the value of a key in ruby by using

`hash_name[:hash_key] —-> hash_value`

In Javascript you can call the “Object” to get the value of the key , which would look like so:

`hash_name.hash_key —-> hash_value`

<h3>The semicolon (;) Deal in Javascript</h3>
Semicolons are not obligitory in Ruby , in fact they are not an option at all there are no semicolons where there is a statement in ruby.
However in javascript Semicolons are necessary where there is more than 1 statement on a line.








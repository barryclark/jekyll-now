---
layout: post
tags: rust
#categories: []
date: 2021-11-10
last_updated:
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Five Things I Hate About Rust'
comments_id: 
---

Please excuse the clickbaity title and bear with me. I was listening to the recent episode "The Language Menagerie" of the [Two's Complement](https://www.twoscomplement.org/) podcast in which the hosts discussed programming languages. They came up with a half-serious programming interview question: to test the depth of someone's experience with a particular programming language they propose to ask "What are the 5 things you hate about the language?". They joked that if someone cannot come up with five things they dislike about a programming language, it would mean that they just hadn't enough experience with it.

I believe there is some truth to that and I posed myself the challenge of coming up with five things I dislike when programming in Rust. I chose Rust because I wanted to make it a challenge

# Disclaimer
I like Rust; love it, even. It is an incredibly well designed language which stands on the shoulders of giants and it shows. Each of the five things in the next section needs to be prefaced with this. Most of the complaints, which are honestly more like quarrels, is typically a side-effect of some expertly designed feature where the benefits outweigh my quarrels by a long shot. Also my list reflect my personal programming style and might not resonate with people of different programming styles or problem domains.

So without further ado, let's get into my list. I came up with six things, although admittedly some are very minor.

# My Six Quarrels
Spoiler alert: the borrow checker is not one of them. 

## Annoying Inheritance Semantics
yes, I know OOP is bad, member fields in traits

## No Implicit Widening Conversions
BUT: Good thing that Rust does not allow comparisons of e.g. types of different signedness (https://stackoverflow.com/questions/5416414/signed-unsigned-comparisons)
small one implicit widening conversions on numeric types. Rust PG: https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=3045450fe76bce27e7fa0b6561ca6998. Why do I have to be so explicit, because there is literally that can be wrong here!!! 

## Metaprogramming
this is a weird one
biig plusses
* mostly (!), not completely hygenic
can programmatically manipulate the ast. Using both the limited macro rules syntax and the powerful procedural macros. (but also this goes back to the point about complexity)
but at the end of the day this is just glorified string replacement without any type level information.

Example: accessing tuple elements by type.
Example: the impls crate
Specialization: do something when a type is copy vs do something else when a type is clone. Maybe the compiler is already smart enough to optimize that away...

## Half-baked Allocator Support in the Standard Library

## Dependencies
This isn't a problem with the language, but with the Rust ecosystem. you always pull too many dependencies

## Complexity
many ways to do things which is especially a program when doing things with other programmers. Clippy enforces certain idioms, but cannot catch everything.

# Conclusion
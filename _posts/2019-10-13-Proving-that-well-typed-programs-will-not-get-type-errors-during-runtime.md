---
layout: post
title: Proving that well-typed programs will not get type errors during runtime
---

I came across this theorem recently, and thought that it's an interesting result. The proof itself isn't particularly flashy, but I think the result is relevant to every prorammer's daily life and that's pretty cool. My hope is to explain it enough that a programmer with basic logic experience can understand the proof. I'll explain notation along the way.

## The Theorem

Theorem: ![theorem](https://latex.codecogs.com/gif.latex?%5Ctextup%7BIf%20%7D%5CGamma%20%5Cvdash%20M%20%3A%20%5Csigma%20%5Ctextup%7B%20and%20%7D%20M%20%5Ctwoheadrightarrow_%5Cbeta%20N%20%5Ctextup%20%7B%20then%20%7D%20%5CGamma%20%5Cvdash%20N%20%3A%20%5Csigma)

### Notation

To break this down: 
- ![gamma](https://latex.codecogs.com/gif.latex?%5CGamma) is an environment. Formally that means it's a finite set of pairs of the form {x:T} where x is a (lambda) variable and T is a type. Informally, you can think of this like a scope/environment in a program.
- ![vdash](https://latex.codecogs.com/gif.latex?%5Cvdash) is sometimes called a "turnstile". ![gamma turnstile m](https://latex.codecogs.com/gif.latex?%5CGamma%20%5Cvdash%20M) would be read as "M is derived from ![gamma](https://latex.codecogs.com/gif.latex?%5CGamma)". 
- ![m : sigma](https://latex.codecogs.com/gif.latex?M%20%3A%20%5Csigma) can be read as "M proves ![sigma](https://latex.codecogs.com/gif.latex?%5Csigma)". Alternatively, you could also read it as "M is a term of type ![sigma](https://latex.codecogs.com/gif.latex?%5Csigma)" (The fact that you can read it either way is itself extremely intresting and an important correspondence)
- ![beta trans reduction](https://latex.codecogs.com/gif.latex?%5Ctwoheadrightarrow_%5Cbeta) is the transitive and reflexive closure of beta reduction. To break that down more
  - For transitive closure, imagine you had a relation R that meant "can fly to". So New York R Los Angeles would mean you can fly directly from New York to Los Angeles. The transitive closure of this operation would mean something like "can fly to by taking one or more flights". So for example, Los Angeles -> New York -> Amsterdam would be a valid statement.
  - Beta reduction, written as ![beta reduction](https://latex.codecogs.com/gif.latex?%5Crightarrow_%5Cbeta) (note the single arrowhead instead of the two above), means {BETA REDUCTION EXPLANATION}


### Interpretation

So basically this is saying that given a certain environment (![gamma](https://latex.codecogs.com/gif.latex?%5CGamma)), we know that some term M has type ![sigma](https://latex.codecogs.com/gif.latex?%5Csigma); and we also know that M eventually reduces to N - given those two conditions, we can also conclude that in the same environment, N must also have type ![sigma](https://latex.codecogs.com/gif.latex?%5Csigma).

## The Proof

We use induction on ![beta trans reduction](https://latex.codecogs.com/gif.latex?%5Ctwoheadrightarrow_%5Cbeta). 

Base case: ![base case](https://latex.codecogs.com/gif.latex?M%20%3D%20%28%5Clambda%20x%20P%29Q%20%5Ctextup%20%7B%20and%20%7D%20N%20%3D%20P%5Bx%3A%3DQ%5D)

Assuming it holds for {M trans reduces N}, show that it holds for {M' reduces to M, trans reduces to N}

We showed in the base case that if M' has type {sigma} then M must also have type {sigma}. Given our assumption - if M {trans reduces} N and M has type {sigma} then N has type {sigma} as well - then N must have the same type as M'. 


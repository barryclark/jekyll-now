---
layout: post
title: Proving that well-typed programs will not get type errors during runtime
---

I came across this theorem recently, and thought that it's an interesting result. The proof itself isn't particularly flashy, but I think the result is relevant to every prorammer's daily life and that's pretty cool. My hope is to explain it enough that a programmer with basic logic experience can understand the proof. I'll explain notation along the way.

Theorem: https://latex.codecogs.com/gif.latex?%5Ctextup%7BIf%20%7D%5CGamma%20%5Cvdash%20M%20%3A%20%5Csigma%20%5Ctextup%7B%20and%20%7D%20M%20%5Ctwoheadrightarrow_%5Cbeta%20N%20%5Ctextup%20%7B%20then%20%7D%20%5CGamma%20%5Cvdash%20N%20%3A%20%5Csigma

To break this down: 
- {TURNSTILE} is sometimes called a "turnstile". {GAMMA TURNSTILE M} would be read as "M is derived from {GAMMA}". 
- {BETA REDUCTION} is the transitive and reflexive closure of beta reduction. To break that down more
  - For transitive closure, imagine you had a relation R that meant "can fly to". So New York R Los Angeles would mean you can fly directly from New York to Los Angeles. The transitive closure of this operation would mean something like "can fly to by taking one or more flights". So for example, Los Angeles -> New York -> Amsterdam would be a valid statement.
  - Beta reduction, written as {BETA REDUCTION} (note the single arrowhead instead of the two above), means {BETA REDUCTION EXPLANATION}
- {M : sigma} can be read as "M proves {sigma}". Alternatively, you could also read it as "M is a term of type {sigma}"

So basically this is saying that given a certain environment ({GAMMA}), we know that some term M has type {sigma}; and we also know that M eventually reduces to N - given those two conditions, we can also conclude that in the same environment, N must also have type {sigma}.


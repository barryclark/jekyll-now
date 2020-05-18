---
layout: post
title: Visualizing Cantor's Theorem on Dense Linear Orders Using Coq
---

[Cantor's Theorem](https://en.wikipedia.org/wiki/Dense_order#Uniqueness) about dense linear orders states that any two linear orders which are

- countably infinite
- dense
- do not have endpoints (i.e. unbound from above and below)

are isomorphic.  

The standard proof is a quintessential application of the [back-and-forth method](https://en.wikipedia.org/wiki/Back-and-forth_method), where one builds an isomorphism between two countable structures ![equation](https://latex.codecogs.com/gif.latex?X) and ![equation](https://latex.codecogs.com/gif.latex?Y) by iteratively building up a finite partial isomorphism:  grab the "next" point in ![equation](https://latex.codecogs.com/gif.latex?X) and find some point in ![equation](https://latex.codecogs.com/gif.latex?Y) so that these two points extend the existing partial isomorphism; and then do the same thing starting from ![equation](https://latex.codecogs.com/gif.latex?Y).  Continuing in this fashion, at stage ![equation](https://latex.codecogs.com/gif.latex?\omega) you have a full isomorphism (since both structures are countable).

While the proof may not too difficult to understand, visualizing the isomophorisms produced by this method is another story.  Fortunately, Cantor's Theorem is constructive, with a few caveats<sup>1</sup>, so we can actually construct these isomorphisms.  In order to do to this, I used Coq to [formalize Cantor's Theorem in the abstract](https://github.com/emarzion/cantor/blob/master/Cantor.v), and then provided [some examples](https://github.com/emarzion/cantor/blob/master/Instances.v) of these orders.  In particular:

- ![equation](https://latex.codecogs.com/gif.latex?\mathbb{Q}) is a countable dense linear order without endpoints
- If ![equation](https://latex.codecogs.com/gif.latex?X) is such an order and ![equation](https://latex.codecogs.com/gif.latex?x&space;\in&space;X), then ![equation](https://latex.codecogs.com/gif.latex?X&space;-\lbrace&space;x&space;\rbrace) (with the induced suborder) is also
- If ![equation](https://latex.codecogs.com/gif.latex?X,Y) are two such orders, then ![equation](https://latex.codecogs.com/gif.latex?X&space;\sqcup&space;Y) (with the coproduct order) is also
- If ![equation](https://latex.codecogs.com/gif.latex?X,Y) are two such orders, then ![equation](https://latex.codecogs.com/gif.latex?X&space;\times&space;Y) (with the lexicographic order) is also

The full verification effort can be found in [this](https://github.com/emarzion/cantor) repo.

After extracting a couple of examples to Haskell, I was able to produce these three plots:

An order isomorphism from ![equation](https://latex.codecogs.com/gif.latex?\mathbb{Q}&space;-&space;\lbrace&space;0&space;\rbrace) to ![equation](https://latex.codecogs.com/gif.latex?\mathbb{Q}):

<div class="iframe_container">
  <iframe width="720" height="640" frameborder="0" scrolling="no" src="//plotly.com/~emarzion/6.embed"></iframe>
</div>

An order isomorphism from ![equation](https://latex.codecogs.com/gif.latex?\mathbb{Q}&space;\sqcup&space;\mathbb{Q}) to ![equation](https://latex.codecogs.com/gif.latex?\mathbb{Q}):

<div class="iframe_container">
  <iframe width="720" height="640" frameborder="0" scrolling="no" src="//plotly.com/~emarzion/11.embed"></iframe>
</div>

An order isomorphism from ![equation](https://latex.codecogs.com/gif.latex?\mathbb{Q}&space;\times&space;\mathbb{Q}) to ![equation](https://latex.codecogs.com/gif.latex?\mathbb{Q}):

<div class="iframe_container">
  <iframe width="720" height="640" frameborder="0" scrolling="no" src="//plotly.com/~emarzion/8.embed"></iframe>
</div>

---

1: To avoid using choice principles, we assume that countability is witnessed by a bijection with the natural numbers, density is witnessed by a midpoint-finding function, and lack of endpoints is witnessed by functions which find points to the left and right.


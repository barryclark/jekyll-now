---
layout: post
title: Algorithms to live by
---

## Optimal stopping

- Picking a book? ander voorbeeld, papers kiezen om te lezen?
- knowing when to fold
- *secretary problem*, stop after 37% ($1/e$)
- parking problem (denk dat dit poison is?)
- full information

```python
In [16]: secretaries = [np.random.randn() for _ in range(100)]

In [17]: tests = []

In [18]: for _ in range(10000):
    ...:     rd.shuffle(secretaries)
    ...:     tests.append(choose_secretary(secretaries))
    ...:     

In [19]: number_chosen, skills = zip(*tests)

np.mean(number_chosen)

In [20]: np.mean(number_chosen)
Out[20]: 43.266599999999997

In [21]: np.mean(skills)
Out[21]: 2.597230591985014

In [23]: np.mean([skill == max(secretaries) for skill in skills])
Out[23]: 0.75149999999999995
```

> When choosing something, spend 37% just looking and only then make a choice.

## Exploring / exploiting

- voorbeeld
- *Gittins index*
- regret and confidence bounds
- A/B testing

## Sorting

- example: books in order?
- searching vs sorting
- binsort
- tournaments

## Caching

- keeping things close by for easy access
- clairvoyance
- Nogushi filing system
- memory works like cashing

> Ordering and keeping things ordered is a hassle. Just divide your stuff in a manageable number of 'bins'.

## Scheduling

- picking order of things to do
- **earliest due date**
- **Moore's algorithm**
- **Shortest processing time**
- minimum time to do something => context switching

> Do tasks in order of importance divided by the time it takes to finish the task.

## Bayes's rule

- predicting using one data point
- *power-law distributions* => multiplicative rule
- *normal distributions* => average rule
- *Erlang distribution* => additive rule

## Overfitting

- only liking particular tastes = overfitting on food
- cross validation
- penalizing complexity
- early stopping

> Open yourself to randomness: make a random wikipedia page / random research article your browser starting page.

## Relaxation

- Relaxation of hard problems
- tafel schikking

## Randomness

- monte carlo methode
- Metropolis Hastings methode
- hill climbing
- simulated annealing

## Networking

- forgiving people: exponential backoff
  - omgaan met mensen: elke fout verdubbel je de straf
- peter principle

## Game theory

- cheating: moeilijk om mee om te gaan
- tragedy of the commons
- prisoner's dilemma
- emoties: heuristiek van natuur om groep te bevoordelen (liefde/ergernis)
- veiling
  - *sealed-bid first auction*
  - Vicrey auction: sealed bid, winner has to pay the offer of second-place bidder

## Computationa kindness

Min aantal keuzes die anderen moeten maken

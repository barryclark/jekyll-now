---
layout: post
title: Sorting socks and other practical uses of algorithms
---



## Optimal stopping

- Picking a book? ander voorbeeld, papers kiezen om te lezen?
- knowing when to fold
- *secretary problem*, stop after 37% ($1/e$)
- parking problem (denk dat dit Poison is?)
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

Despite having a master degree in engineering, I have to admit that I do not really know how to operate our washing machine. Hence, I am usually the one who has to fold the laundry which my partner has washed. I can treat this mostly as an exercise in mindfulness, except for the socks. We seem to have an endless variety of different kinds of socks (my mother has a shop selling underwear) and most of my time in the laundry room is finding the matching pairs of socks. Sadly, I use a rather inefficient form of ... sort: I pick a (initially brightly colored) sock and subsequently comb trough the pile to find its partner. This leaves me with a depressing time complexity of $\mathcal{O}(n^2)$, time proportional to the the number of socks squared.

When going through your laundry, organizing your contacts, alphabetizing your books or sorting a pack of cards, an efficient method of sorting requires more effort than going though the whole collection once. More precisely, it requires about $\mathcal{O}(n\log n)$ comparisons. This is better than how I organize my socks, but still requires several passes through the collection. Why do we sort if it is that much work? Because it is much easier to find items from a sorted collection compared to an unorganized collection. And this is the *searching-sorting trade-off*. Sorting is a lot of work in advance, but you save time searching for things on the long run.

As an easy alternative for keeping your stuff perfectly sorted you can use *bin sort*:

> Ordering and keeping things ordered is often an unnecessary hassle. Instead, simply divide your collection in a manageable number of 'bins'.

This is the approach that is used in ..., the most efficient library in the world. ...

- tijdscomplexiteit
- sorteren vs zoeken

#REVIEW
- naam sorteer algorithm
- naam efficient bibliotheek
- Foto van mijn sokken

## Caching

- keeping things close by for easy access
- clairvoyance
- Nogushi filing system
- memory works like cashing

## Scheduling

- picking order of things to do
- **earliest due date**
- **Moore's algorithm**
- **Shortest processing time**
- minimum time to do something => context switching

> Do tasks in order of importance divided by the time it takes to finish the task.

## Bayes' rule

- predicting using one data point
- *power-law distributions* => multiplicative rule
- *normal distributions* => average rule
- *Erlang distribution* => additive rule

## Overfitting

- only liking particular tastes = overfitting on food
- cross validation
- penalizing complexity
- early stopping

## Relaxation

- Relaxation of hard problems
- tafel schikking

## Randomness

- monte carlo methode
- Metropolis Hastings methode
- hill climbing
- simulated annealing

> Open yourself to randomness: make a random wikipedia page / random research article your browser starting page.

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

## Computational kindness

As a last piece of advice for dealing with others (or yourself): try to limit the amount of computation needed.

- organiseren van feestjes

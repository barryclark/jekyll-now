---
layout: post
title: Options when Implementing Game of Life at a Code Retreat
---

Having done Game of Life at Code Retreat a number of times, there are a few often-silent early choices which have a big impact on how the session goes. Neither of the options in each pair are the "right" or "wrong" option. My purpose is to encourage you to recognize that these options exist, and to pick consciously.

## Complete an implementation or learn about an idea?

I've seen folks bias towards the former, and there's nothing wrong with that. But unlike the day job, no one will care if we get nothing "done" in Code Retreat - we have not committed to a deliverable. I've had sessions where we spend the entire time refining a single test case!

## Input as visual representation or a list of coordinates?

There are lots of variations, but here is an example:

```
blinker="""\
	.*.
	.*.
	.*.
""".dedent()
```

vs.

```
blinker = [
    {1, 0}
    {1, 1}
    {1, 2}
]
```

The former makes the tests easy to read (saving time), but you have to implement some kind of parsing (costing time).

Similarly, is the output / assertion visual? Implementing visual outputs is easier than inputs, and ApprovalTests helps.

## Infinite or bounded universe?

[The Game of Life rules say the universe is infinite in all 4 directions](https://en.wikipedia.org/wiki/Conway's_Game_of_Life#Rules), but people often miss that detail and code it up as a fixed-size board (e.g. 100x100, positive coordinates only). A bounded space seems easier, but then you have to decide on the rules for what happens at the edges, and you have to be OK with the fact that you're not implementing the original spec. An infinite board has interesting challenges like "how do we store the data in finite memory?" and "how do we display it on a finite screen?"

A related question is whether you have a code entity that represents a dead cell. 

## Start with the  whole game or an algorithm used in the game?

People commonly start with a test about an initial game state, a tick of the clock, and an assertion about the result. 

But we could start with a test about a rule, like

```
	Test("Any live cell with fewer than two live neighbours dies")
		result  = ApplyRule(state: Living, liveNeighbourCount: 1)
		result.should_be(dead)
```

We might never deal with the board before the timebox runs out.

## Choose on purpose

If you've done the Game of Life exercise before, I encourage you to do it again, but making a different choices on one of these questions compared to what you are accustomed to, and see how it turns out.

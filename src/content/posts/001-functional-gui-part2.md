---
title: "Functional Programming GUIs (part 2) - Arrowized FRP "
date: "2019-07-23"
categories: ["Engineering", "Startup Technology"]
tags: ["GUI Programming", "Software Development", "Functional Programming"]
author: "Adrian Roșian"
description: "Continuing from our exploration of GUI programming challenges, this article delves deeper into Functional Reactive Programming (FRP), analyzing its evolution and impact on GUI development, with a focus on its methodologies and their effectiveness in improving composability, type safety, and simplifying complex GUI tasks."
image: "img2.jpg"
---

# Functional Reactive Programming (FRP)

Functional Reactive Programming (FRP) is a declarative method of creating systems that react to changes of the environment over time. The initial work of Elliott and Hudak[^1] introduces two types of inputs to the system as values that change over time (time-varying values): behaviors and events. Behaviors are continuous varying values:

$$
\text{Behavior } \alpha = \text{Time} \rightarrow \alpha
$$

while events are discrete values:

$$
\text{Event } \alpha = [(\text{Time}, \alpha)]
$$

The first type of value helps model physical systems, for instance, where phenomena like position, velocity, acceleration depend on continuous input, while events help model situations with discrete inputs, like GUI interactions with a user. The focus of the first formulation of FRP was animation (the original implementation is called FRAN - functional reactive animation), and this is the reason for this work to be focused on continuous values.

The original implementation is very expressive and flexible, posing no significant difficulties in understanding or implementation while being composable. However, it allowed accumulation of events in the event system due to the lazy nature of the host implementation language - Haskell - which only evaluates a value when it is explicitly requested by the effect system. This could potentially lead to memory exhaustion, causing a problem called space leaks. When the events are finally evaluated, they create an execution bottleneck that leads to longer execution time known as a time leak or a global delay. For the continuous counterpart, it required frequent sampling of the input space that triggered extraneous re-renderings of the entire system for no modifications or only partial modifications of the system state, a problem known as an unnecessary update. The implementation also allowed defining behaviors that depended on past values (causing memory leaks) or future values (breaking causality, thus not implementable).

Subsequent updates to the classical FRP utilize the observation that the discrete case of the event system is isomorphic to the continuous case for optional values:

```haskell
Maybe a = Just a | Nothing;
Event a = Behavior (Maybe a)
```

leading to both events and behaviors being represented by a signal:

$$
\text{Signal } \alpha = \text{Time} \rightarrow \alpha
$$

With this new data type, it is possible to introduce a more restrictive language as a reactive front-end with a more flexible compilation target language that allows limiting the problem surface for the space and time leaks, as well as for the unnecessary updates.

These approaches, while working, lose some of the expressiveness of the classical FRP. The efforts to reclaim this expressiveness while maintaining the safety guarantees lead to arrowized FRP.

An arrow is the generalization of a function at type level in a pure functional programming language. In a category theory interpretation of arrows that suits computing best (where $V$ is $\text{Set}$), they are monoids in the category of bifunctors $\text{Cop} \times C \rightarrow V$ where $V$ is a symmetric closed monoid and $C$ is $V$-enriched[^2]. This allows arrows to compose while retaining some context of the computation in the chaining.

Arrowized FRP overcomes the limitations of classical, real-time, and event-based FRP by restricting access to signals to avoid time and space leaks and by reclaiming the expressiveness of classical FRP through the properties of an arrow. It defines a datatype

$$
\text{SF } \alpha \beta = \text{Signal } \alpha \rightarrow \text{Signal } \beta
$$

that abides by the arrow laws. Because the signal types available to the programmer are specified at the source level and their constructors are not available for direct usage, the usage of signals is both restricted to avoid leaks and respect causality. Even with these measures, leaks are still possible in the host implementation due to the instant update assumption[^3] that states that the semantics of arrows can be respected as long as the sampling interval for updates goes to 0.

Czaplicki uses the concept of signal arrows in the creation of his Elm language to disallow folds from the past of signals that drop signals during the fold. For this reason, the type representing a signal in Elm is only an applicative functor, not a monad (joining would be flattening the signal). At the same time, a signal is isomorphic to an arrow from the World (environment) to the value $\alpha$:

$$
\text{Signal } \alpha \approx \text{SF World } \alpha
$$

This interpretation gives the backend compiler the flexibility to use the arrow interface to interpret the reactive interface (foldp and lift).

Citing difficulties in the adoption of the language (A farewell to FRP, Czaplicki, E., May 10, 2016), Czaplicki moves Elm with version 0.17 away from FRP in 2016, favoring a message-passing concurrent approach similar to Erlang.

While arrowized FRP presents good compositional properties when representing signals as arrows, a practical implementation that does not leak time and memory will impose significant limits on these properties. Arrows impose a point-free style that is notoriously difficult for programmers. Defining lambda calculus in terms of arrows to allow decoupling of computations implies adding separate arrow interface functions for function application, choice, and feedback and making concurrent arrows naturally flows towards the Erlang actor model. Arrows compose using arrow transformers (a generalization of monad transformers), but these structures imply unwrapping the nesting levels to perform the desired effect and consume the effect stack. However, some arrow-based combinations might still yield good results as a means to pass along application state in an effect composition chain.

[^1]: Conal Elliott and Paul Hudak. Functional reactive animation. ACM SIGPLAN Notices, 2005. ISSN 03621340. doi: 10.1145/258949.258973.
[^2]: Tarmo Uustalu and Varmo Vene. Comonadic Notions of Computation. Electronic Notes in Theoretical Computer Science, 2008. ISSN 15710661. doi: 10.1016/j.entcs. 2008.05.029.
[^3]: Evan Czaplicki. Elm: Concurrent FRP for Functional GUIs. PhD thesis, 2012.

> You have a problem. You: Ah! I know! I use a distributed system. Now you still have a problem, but you no longer know where.

- https://twitter.com/llogiq/status/1010831210199777280

> As somebody who accidentally became a distributed systems “expert”, I am begging you with tears in my eyes never to use a distributed system unless there is absolutely no other way.
> 
> P.S. Same goes for microservices.

- https://twitter.com/WAWilsonIV/status/1010937077024935938

What is the danger? For me, the answer comes from this quote from a guest on [Greater than Code](https://www.greaterthancode.com/):

> Microservices are an organizational pattern.

And this quote from Arlo Belshee:

> Assume that a company is a data-processing system that transforms market information into insights and actions. Now, how should we scale it?
> 
> A. We could try to maintain transactional consistency and scale up.
> 
> B. Or we could try to maintain eventual consistency and scale out.
> 
> C. Or we could completely separate the problems such that we don't have to maintain any consistency, and then fully multi-process.
> 
> Know when each is appropriate.

Combined with [Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law):

> organizations which design systems ... are constrained to produce designs which are copies of the communication  structures of these organizations.

# The microservice test

If you've split your monolith service into multiple smaller services, do you have microservices or do you have a monolith distributed across multiple computers?

- If I want to deploy a change to one service, I have to deploy all the services at once. Same with roll-back.
- The people working on one service must consult with people working on another service before making changes.
- One service writes data to a some repository; another service reads it from that repository.
- An outage in one service means another service no longer works.
- When service `Foo` wants to switch from depending on service `Bar` to depending on some similar service `Bar2`:
  - The owners of `Bar` will get bent out of shape.
  - Modifying `Foo` to use `Bar2` means reworking a lot of code in `Foo` because it was built with `Bar` in mind.

Finding these good divisions between services is the same problem as separating responsibilities between modules, or between classes, or between teams. It's about coupling and cohesion. Organizations that can't do this in one context can't do it the other contexts, either. 

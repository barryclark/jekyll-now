---
layout: post
title: Hexagonal architecture using gradle...
---

The microservices buzz word has been going around for a few years now. People think it's the solution to all the problems they had with monoliths. But as a lot of people have noted way before me, "If you can't build a monolith properly, what make you think you can build a microservice?"

Well in my current job we had to build a new microservice which was a bit complex and had lots of dependencies. I'm not going to get into the usual discussion about microservices around how big it should be, how many dependencies it has etc. It is what it is and we had to work with what we had.
Just as an overview this microservice, lets call it XYZ, had to listen to two Kafka topics, produce a message to another two kafka topics, read and write to Couchbase and retrieve or send information to three other services.
It's doing a lot of stuff. So how do we structure this project so it doesn't end up being a a big mess?

We wanted to separate the concerns, being able to test everything in isolation, have 

---
layout: post
title: To Phoenix or Not to Phoenix — That is the Question
---

I have been playing around with Elixir and Phoenix over the last couple of months. I have also just joined Up Learn as the Head of Engineering with the enviable job of rebuilding the platform for long term maintenance and use. This post is about the conundrum of whether to go with Phoenix as the backend web framework when rebuilding the platform. The alternative would be Django, a framework I have used for almost 10 years.

![Phoenix Web Framework]({{ site.baseurl }}/images/elixir-phoenix.jpg)

# For
**Functional Programming Language:** Phoenix is built on Elixir programming language, which is a functional language. As with many other functional languages Elixir brings with it properties of immutability, functional composition (higher order functions), parallelization, and lazy evaluation. Many of these properties make organizing complex systems and arguing about their correctness easy. They also make it easier to write programs that have lesser bugs and utilize multiple cores seamlessly. For those interested in learning benefits of functional programming, I will redirect you to this post or this Quora question. In the short term, parallelization will provide performance boost which will allow me to not spend time and resources on scaling systems and maintaining them at scale. The better organization of complex systems will allow us to decompose the product as different teams manage different parts of it.

**Elixir:** In addition to functional programming aspects, Elixir provides some interesting features that make code more readable. Specifically pattern matching and streams. Pattern matching makes it easy to write readable code and same is the case with streams. In addition, streams also make it incredibly easy to build stream processing with worrying about memory requirements or parallelization. It isn’t clear whether the memory benefits would come in handy at Up Learn, but code readability is very crucial for a maintainable system and that is definitely a consideration for me.

**Familiar Structures and Syntax:** Phoenix has been built to look and feel similar to Ruby on Rails. The Ecto migrations look similar to rails migrations and the folder structure is similar. Further, Elixir has also been built to look similar to Ruby (even though the internal fundamentals are completely different). This makes it easier for someone coming from Rails world to start working with Phoenix. This means that it should be possible to find developers who can get productive with Phoenix soon.

**Erlang VM:** Elixir, and therefor Phoenix runs on the Erlang VM, which has been designed for high availability, fault tolerance, and concurrency. 50% of world’s telecom traffic is handled by Erlang, making it battle tested. Using Phoenix brings those properties over to Up Learn’s web server. [Over 2 million simultaneous connections](https://phoenixframework.org/blog/the-road-to-2-million-websocket-connections) have been handled by Phoenix on a single machine. Although this isn’t the only scalability requirement, it is good to know that this aspected is covered.

**Attractive Framework for Developers:** Many developers want to work with functional programming languages but the opportunities to do so have been limited so far as the languages and related tools so far have not been productive resulting in slower software development. Elixir and Phoenix are the first tools that combine developer efficiency with functional programming paradigm. Using Phoenix should thus attract quality engineers, something that continues to be a difficult task in the competitive environment of London.

**A Good GraphQL Library:** This would make it easy for me to build out GraphQL APIs. Even though Django has a library for GraphQL, I found it poorly documented and hard to work with. Absinthe, on the other hand, seems more promising.

# Against
**Limited Knowledge In-house:** The knowledge about the framework and the programming language is quite limited at Up Learn right now. This means that a lot of mistakes will be made in how the backend is set up, which will have to be fixed as we learn about them. Further, there is a risk of the framework not meeting a particular need for the product and lack experience with it makes it hard to uncover that limitation.

There are ways to alleviate this. First, someone with experience in working with the framework can be brought in. This can make sure that common mistakes with the framework are not made and some protection can be built against unknown limitations of the framework. The other approach that is relevant in Up Learn’s case (because we are rebuilding the product) is to try to rebuild the most complex feature of the product first in Phoenix and see what problems come along the way. The decision about whether to use Phoenix can be delayed post this learning experience. This should help guard against any unknown limitations as well as provide some experience to understand mistakes that need to be avoided.

**Lack of Access to Developers:** Since Phoenix and Elixir are new, it is hard to find developers that have experience in those programming languages. However, the good thing is that there are many developers who are interested in working with Elixir/Phoenix. The similarity toRails and Ruby should make transition easier for Rails engineers. Nevertheless, this remains an unknown quantity for me.

Do you have suggestions on how I could take the call? Let me know.

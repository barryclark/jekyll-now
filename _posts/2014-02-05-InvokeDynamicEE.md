---
layout: post
title: InvokeDynamic and Java EE?
excerpt: JSR 292 defines a new bytecode, i.e. InvokeDynamic, that allows the execution of method invocations...
---

> Man cannot discover new oceans unless he has the courage to lose sight of the shore.
>
> -- <cite>[André Gide](http://en.wikipedia.org/wiki/Andr%E9_Gide)</cite>

[JSR 292 (Supporting Dynamically Typed Languages on the Java Platform)](https://www.jcp.org/en/jsr/detail?id=292), introduced in Java SE 7, is about simplifying and improving the support of dynamically typed languages on the Java Platform. JSR 292 defines a new bytecode, i.e. InvokeDynamic, that allows the execution of method invocations in the absence of static type information. So it is clearly the first bytecode that has been designed for dynamically typed language and not for the Java language.

[Project Nashorn](http://openjdk.java.net/projects/nashorn/), Java 8's new JavaScript engine relies heavily on InvokeDynamic. In Fact, originally Nashorn 'was just' an InvokeDynamic Proof of Concept. The PoC was successful and Nashorn has, since then, evolved into a high-performance 100% ECMAScript compliant engine.

Despite the fact that InvokeDynamic was originally conceived for dynamically typed languages, it turns out that this bytecode could also be useful for the Java language itself. For example, Java SE 8's [Lambdas are using, under the hood, InvokeDynamic](http://cr.openjdk.java.net/~briangoetz/lambda/lambda-translation.html).

Antoine Sabot-Durand, CDI co-spec lead, is currently conducting some experimentations around using [InvokeDynamic to replace Weld's proxies](https://github.com/antoinesd/weld-invokedynamic). At this stage, it's just an initial Proof of Concept but it works! If his efforts goes to fruition and since Weld is the CDI Reference Implementation and is used by different Application Servers (JBoss AS, WildFly, GlassFish, WebLogic...), who knows, we might get, and not just for Lambdas support, InvokeDynamic under the hood of some Java EE Application Servers. Only the future will tell us!

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/invokedynamic-and-java-ee) blog.*

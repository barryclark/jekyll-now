---
layout: post
title: Type Conversion in JPA 2.1
excerpt: JPA 2.1 adds support for Type Conversion methods, sometime called Type Converter. ...
---


The [Java Persistence 2.1 specification (JSR 338)](http://download.oracle.com/otndocs/jcp/persistence-2_1-fr-eval-spec/index.html) adds support for various new features such as schema generation, stored procedure invocation, use of entity graphs in queries and find operations, unsynchronized persistence contexts, injection into entity listener classes, etc.

JPA 2.1 also adds support for Type Conversion methods, sometime called Type Converter. This new facility let developers specify methods to convert between the entity attribute representation and the database representation for attributes of basic types.

For additional details on Type Conversion, you can check the [JSR 338 Specification](http://download.oracle.com/otndocs/jcp/persistence-2_1-fr-eval-spec/index.html) and its corresponding [JPA 2.1 Javadocs](https://docs.oracle.com/javaee/7/api/index.html?javax/persistence/Convert.html). In addition, you can also check those 2 articles. The first article ('[How to implement a Type Converter](http://www.thoughts-on-java.org/2013/10/jpa-21-how-to-implement-type-converter.html)') gives a short overview on Type Conversion while the second article ('[How to use a JPA Type Converter to encrypt your data](https://thoughts-on-java.org/how-to-use-jpa-type-converter-to/)') implements a simple use-case (encrypting data) to illustrate Type Conversion. Mission critical applications would probably rely on transparent database encryption facilities provided by the database but that's not the point here, this use-case is easy enough to illustrate JPA 2.1 Type Conversion.


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/type-conversion-in-jpa-21) blog.*

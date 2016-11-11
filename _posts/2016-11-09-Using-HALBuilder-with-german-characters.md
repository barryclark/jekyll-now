---
layout: post
title: Using HALBuilder with german characters
subtitle: How to make sure that umlauts are properly displayed
category: Howto
tags: [devops]
author: Filip Fiat
author_email: filip.fiat@haufe-lexware.com
header-img: "images/bg-post.jpg"
---

>HATEOAS (Hypermedia as the Engine of Application State) is a constraint of the REST application architecture. A hypermedia-driven site provides information to navigate the site's REST interfaces dynamically by including hypermedia links with the responses.

[Understanding HATEOAS - Spring](https://spring.io/understanding/HATEOAS)

>Hypertext Application Language (HAL) is a standard convention for defining hypermedia such as links to external resources within JSON or XML code. [...] The two associated MIME types are media type `application/hal+xml` and media type `application/hal+json`.

[Hypertext Application Language (HAL)](https://en.wikipedia.org/wiki/Hypertext_Application_Language)

[MeinKonto's RESTful API](https://github.com/Haufe-Lexware/api-meinkonto-mylexware) was designed with this constraint in mind. Thus was decided to use HAL Representation to implement HATEOAS.

### TheoryInPractice's HalBuilder 4.x

There are a lot of builders for this standard Json representations and the chosen one was TheoryInPractice's HAL implementation builder (http://www.theoryinpractice.net/ ).
The [HalBuilder](https://github.com/HalBuilder) library provides an API for both generating and consuming HAL based resource representations.

These days I was doing some updates on the Meinkonto RESTful API using this HAL implementation (http://www.theoryinpractice.net/ ) and like every time I work with some new technology I ended up indubitably at the following theme: "umlauts". 
Basically this library is very robust and we are using it without any major impediments for generating and consuming HAL resources in pure Java, but seems to have some flaws in working with UTF-8 encoded special characters.

For instances of 
```java 
com.theoryinpractise.halbuilder.api.Representation
``` 
they provide this method 
```java 
toString(RepresentationFactory.HAL_JSON)
``` 
for generating the JSON string from a `JsonRepresentation `object.
Unfortunately for strings with German characters the outcome is not quite the expected one, i.e. "ä" becomes "Ã¤" and so on.
Searching the documentation, some relevat tech forums and codebase, I was not able to find a way to specify the correct encoding, thus I've ended using the following construction.

### "Good old JAVA" solves any problem

Create a String object from the outcome of this method with the right encoding (UTF-8), i.e. my code looks like this
```java 
halRepresentationUTF8 = new String(halRepresentation.toString(RepresentationFactory.HAL_JSON).getBytes(), "UTF-8")
```
And this does the trick ;)... the string, `halRepresentationUTF8` is properly UTF-8 encoded.
In fact this is a simple way to make sure the outcome (`HAL_JSON` representation), which is basically a string, will be properly encoded as UTF-8.

Comments and suggestions are more than welcome. **Happy coding!**

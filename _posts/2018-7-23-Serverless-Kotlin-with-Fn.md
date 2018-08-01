---
layout: post
title: Serverless Kotlin with Fn Project
---

[Kotlin](https://kotlinlang.org/) is one of the fastest growing programming languages; it is used in the Android ecosystem and also is gaining traction in the enterprise world. So why not use Kotlin in the FaaS and Serverless space too?

<p align="center">
<img alt="Kotlin & Fn — A perfect combo?" src="https://cdn-images-1.medium.com/max/1600/1*y3Cv0BioS1leQH7qv8D-4g.png" width="80%">
</p>

Given its polyglot nature, [Fn](http://fnproject.io/) makes it very easy to write Kotlin based functions (“functions” as in FaaS).

## Boostrap a Kotlin Function
To develop a Kotlin function, simply bootstrap it using the usual way with the [Fn CLI](https://github.com/fnproject/cli) (v0.4.129+), `fn init —-runtime kotlin myfunc`. This will create the required files to quickly get started. And obviously, all those files have a Kotlin flavor.

<script src="https://gist.github.com/delabassee/01e3f02ac59798ba6b92fb541321f00b.js"></script>">

src/main/kotlin/HelloFunction.kt is a simple Kotlin function that helps you bootstrap your own function.

GIST

src/test/kotlin/HelloFunctionTest.kt is a Kotlin based rule to Unit test this same function.

A *func.yaml* containing the function metadata and a Maven based build file (*pom.xml*) are also created in that init process.

## Test, Run and Deploy a Kotlin Function

To test the function, call Maven with the test goal, i.e. `mvn test`.

To run the function, simply invoke `fn run myfunc`.

The function can be deployed via the usual way `fn deploy --local --app myApp myfunc`.

Finally, the deployed function can be invoked using its HTTP endpoint or via the Fn CLI, e.g. `echo -n "Kotlin" | fn call myApp myfunc`.

The conciseness of this post demonstrates that Fn makes it easy to leverage Kotlin in the Serverless space. In fact and in its simplest form, it is just a 3 step process; i.e. init, deploy and call the Kotlin function.

```
fn init --runtime kotlin myfunc
fn deploy --local --app myApp myfunc
fn call myApp /myfunc```

Given that Kotlin is leveraging the Java platform and that Java is a 1st class citizen on Fn will offer Fn users some nice benefits that will be highlighted in an upcoming post.
 

*Originaly posted on [Medium](https://medium.com/fnproject/serverless-kotlin-with-fn-project-914486c5c9ec).*

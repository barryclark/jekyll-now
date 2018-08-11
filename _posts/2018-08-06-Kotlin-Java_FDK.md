---
layout: post
title: Kotlin and the Java FDK
excerpt: The Kotlin support is, in Fn, largely based on the Java support and more specifically...
---

As we saw in [this post](https://medium.com/fnproject/serverless-kotlin-with-fn-project-914486c5c9ec), it is really simple to write and deploy Serverless Kotlin functions using [Fn](https://github.com/fnproject/fn). The Kotlin support is, in Fn, largely based on the Java support and more specifically on the [Java FDK](https://github.com/fnproject/fdk-java).


The initial Fn Kotlin support was a bit different than it is today as it was using the [kotlinc](https://kotlinlang.org/docs/tutorials/command-line.html) compiler in a Docker (build) image. That approach has been recently replaced (from CLI 0.4.129) in favor of Maven using the regular Java FDK images. The only real difference between Java and Kotlin is now how the runnable artifacts (JARs) are being built (obviously!) but in both cases, those artifacts are built using Maven.


The fact that the Koltin support is based on the Java FDK offers some nice benefits to Fn users developing functions in Kotlin.


## JUnit support


Both Java and Kotlin are using JUnit for unit testing. Kotlin does it via the standard [kotlin.test.junit](https://kotlinlang.org/api/latest/kotlin.test/kotlin.test.junit/index.html) library, it enables to write testing rules in Kotlin. To get you started, a sample Kotlin based rule is automatically created when you initialize a new Kotlin function via `fn init --runtime kotlin myfunc`. You can then use Maven to unit test this Kotlin function, i.e. `mvn test`.


Should you want to skip those unit tests, just set the following property `<skipTests>true</skipTests>` in the _pom.xml_ `<properties>`.


<script src="https://gist.github.com/delabassee/fc41bfc2bebf126981702a75e6aae20e.js"></script>


## Maven support

When it comes to Maven, it’s _business as usual_ so you can continue to do what you have been doing for years with Maven like using your existing Java toolchains (e.g. your favorite IDE). As mentioned previously, Maven can also be used to invoke the Function unit tests. You can choose the Kotlin version to use by adjusting the `<kotlin.version>` in the _pom.xml_, etc.

You can also use, from your Kotlin functions, external Maven dependencies. For example, let’s write a simple Kotlin function that will produce some countries related information as a JSON document. For that, we will use two external dependencies, [Kotlin Jackson module](https://github.com/FasterXML/jackson-module-kotlin) for the JSON support and a simple Java-based dependency that will provide some country related data. You can grab this sample function [here](https://github.com/delabassee/fn-kountry).

To add JSON support to our Kotlin function, we just need to add the Jackson module in the function _pom.xml_  `<dependencies>`.

```
<dependency>
  <groupId>com.fasterxml.jackson.module</groupId>
  <artifactId>jackson-module-kotlin</artifactId>
  <version>2.9.6</version>
</dependency>
```


The second dependency is a simple project that will generate some countries related information using Java; it is pretty basic but that’s not the point of this sample. This dependency is hosted on GitHub, and is not available in Maven Central. The Kotlin function will access it using [jitpack.io](https://jitpack.io/). For that, we just need to update the _pom.xml_ `<repositories>` to include the _jitpack.io_ repository.


```
<repositories>
  <repository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
  </repository>
</repositories>
```


And obviously, we also need to include the dependency coordinates in the function _pom.xml_.


```
<dependency>
  <groupId>com.github.delabassee</groupId>
  <artifactId>demo-countries</artifactId>
  <version>0.1</version>
</dependency>
```

Our Kotlin function can now use those two external dependencies, the Kotlin one, and the Java one.


<script src="https://gist.github.com/delabassee/58b2aec9ddad525986f4898802900bde.js"></script>


If you now invoke the function (`echo "bel" | fn run country`), it will return all countries that include the passed string in their names. If none are found, the function will simply return all countries. In this function, the marshalling from Kotlin to JSON is handled by the Jackson dependency.

```
[ {
  "iso" : "BEL",
  "code" : "BE",
  "name" : "Belgium"
}, {
  "iso" : "BLR",
  "code" : "BY",
  "name" : "Belarus"
}, {
  "iso" : "BLZ",
  "code" : "BZ",
  "name" : "Belize"
} ]
```

## Input/Output coercion

The Java FDK provides [transparent data binding of input and output type](https://github.com/fnproject/docs/blob/master/fdks/fdk-java/DataBinding.md). Basically, an incoming JSON document will be automatically unmarshalled, by the Java FDK, to a Java object that will then be passed to the called Java function. And reciprocally, any Java object returned by a Java function will automatically be marshalled to a corresponding JSON document and sent to the caller of the function. Given that Kotlin support is based on the Java FDK, this feature is also available to Kotlin functions.


In the previous example, we relied on an external Jackson dependency but that was an unnessary step assuming we do not want to work with JSON directly within the Kotlin function. If so, we can simply leverage the Java FDK input/output coercion capability.


To illustrate this, just switch the sample function to use the _FdkFunc.kt_ function instead of the _JacksonFunc.kt_ function by commenting/uncommenting the appropriate _cmd_ entry in the _func.yaml_. If you now run the function again (`echo "bel" | fn run country`), you will obtain the same result but this time, the marshalling to JSON is automatically handled by the Java FDK.


<script src="https://gist.github.com/delabassee/f14a79d5fe2fef34f04c24dbe5315828.js"></script>


In this example, we have used the Java FDK to transparently marshall Java objects to JSON documents (i.e. in output) but it obviously works in both directions (i.e. input and ouput). The Java FDK will also unmarshal incoming JSON documents to Java objects and will pass those Java objects to the called functions. It should be mentioned that under the hood, the Java FDK is also using Jackson to provide JSON/Java un/marshalling (see [here](https://github.com/fnproject/fdk-java/tree/master/runtime/src/main/java/com/fnproject/fn/runtime/coercion)) but that is just an implementation detail.


## The Java Ecosystem


And last but not least, using Kotlin to write Serverless functions allows you to leverage one of Kotlin’s key value, i.e. its interoperability with Java. As you saw previously, you can keep using your favorite Java-based tool-chain to develop Kotlin functions. You can also leverage existing Java API’s including the Java FDK API’s. At runtime, you also get all the benefits of running on top of the JVM, etc. In a nutshell, Kotlin support in Fn gives you the best of Kotlin combined with all the benefits of Java’s first class support on Fn!


If you have any questions or remarks regarding Fn Kotlin support, feel free to join us in the [Fn Slack channel](https://join.slack.com/t/fnproject/shared_invite/MjIwNzc5MTE4ODg3LTE1MDE0NTUyNTktYThmYmRjZDUwOQ).

*Originaly posted on [Medium](https://medium.com/fnproject/kotlin-and-the-java-fdk-ffcf1778c74a).*

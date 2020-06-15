---
layout: page
title: "Java 14 - Preview Features associated APIs"
permalink: /draft_previewAPI/
redirect_from:
  - /draft/
---

<br/>
<h3>TL;DR</h3>
Java 14 brings multiple enhancements related to preview features and their associated APIs:
* It is now impossible to invoke an API associated with a preview feature without using the `--enable-preview` flag at compile and runtime.
* The javadoc related to associated APIs are now much clearer.
* Warnings are now also much clearer as they are about preview features being used, and not about the underlying mechanism used.


<br/>
<h3>The slightly longer version...</h3>
This post discusses some useful improvements done in Java 14 around  preview language features, and more specifically improvements done, in Java 14, around APIs that come with preview language features, aka preview feature associated APIs.

<br/>
The Preview Feature mechanism is now an essential tool for the development of new Java language features. Here’s a quick recap of the Preview Features properties, for more details see [here](https://blogs.oracle.com/javamagazine/the-role-of-preview-features-in-java-14-java-15-java-16-and-beyond).

* Preview features are bound to a specific Java feature release. For example, [JEP 368](https://openjdk.java.net/jeps/368) defines the second Text Block preview, and is specific to Java 14. 
* Preview features are disabled by default to prevent any unintentional use. To use a preview feature, it should be enabled, at compile time and runtime, using the `--enable-preview` HotSpot flag.
* Preview features are non-final and non-permanent. They might evolve in later releases. And although it is unlikely, a preview feature might even be removed in a future release.
* A Java Language feature might have associated APIs, so a 'previewed' Java language feature might also have such associated APIs.

<br/>
For example, Text Blocks is a new Java language feature previewed in Java 13 and Java 14, and scheduled to be made a permanent feature in Java 15 (see [JEP 378](https://openjdk.java.net/jeps/378)). A text block is in essence a multi-line string literal that helps to embed structured text (ex. structured languages such as JSON or HTML) directly into Java source code. To support Text Blocks, the following associated methods have been introduced:

* `String::stripIndent()` used to strip away incidental white space from the text block content
* `String::translateEscapes()` used to translate escape sequences
* `String::formatted(Object... args)` simplify value substitution in the text block

<br/>
Before Java 14, it was technically possible to use an API associated with a preview feature without using the `--enable-preview` flag, the trick was to use the associated API and not the preview feature itself. For example, it was possible to invoke, in Java 13, Text Block's associated `String::stripIndent()` method directly. That was a bit awkward since we were able to use, without any special precaution, a non-permanent non-final API! The javac compiler would simply issue a _"deprecated and marked for removal"_ warning.

The good news is that this is not possible anymore! In Java 14, javac and HotSpot will recognize that we are trying to use an API associated with a preview feature, i.e. a non-final API, and will issue an error. The only way to use that non-final associated API is to use the `--enable-preview` flag at both compile-time and runtime. We will then be prompted with the usual warning informing us that a preview feature is being used.

<br/>
Moreover, one could run into the odd situation of being prompted _"xyz API has been deprecated and marked for removal"_ when that xyz API was, in fact, introduced in that same Java feature release. One could naively ask: why add an API if that same API is considered _"dead on arrival"_?

We need to look under the hood to understand what was going on. Java 12 and Java 13 were using the deprecation mechanism to safeguard associated APIs with preview features. The associated APIs were in fact terminally deprecated at birth, that is, annotated with `@Deprecated(forRemoval=true, since=...)` when they were introduced.

This is now fixed as of Java 14! A specific [annotation](https://github.com/openjdk/jdk/blob/master/src/java.base/share/classes/jdk/internal/PreviewFeature.java) is now used instead to safeguard preview features, including associated APIs. We will not face that quirk anymore as associated APIs need to be explicitly enabled with the `--enable-preview` flag, even if they are used without using the actual language feature to which they are associated with (ex. Using the `String::stripIndent()` method without using a text block). As a consequence, we will always be prompted with the more informative _"xyz.java uses preview language features"_ warning. 

<br/>You can observe the old behavior (Java 12 & Java 13) and the new behavior (Java 14+) in the demo below.

<link rel="stylesheet" type="text/css" href="/asciinema-player.css" />
<div style="box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5);">
<asciinema-player speed="1.6" start-at="7" src="/resources/cast/preview_api.cast" cols="116" rows="32" poster="npt:1:00"></asciinema-player>
</div>
<script src="/js/asciinema-player.js"></script>​


Given that APIs associated with preview features, in Java 12 and Java 13, were terminally deprecated; the `@Deprecated` annotation was making the javadoc a bit confusing.


<p align="center">
<a href="https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/lang/String.html#stripIndent()">
	<img alt="javadoc in Java 13" src="/images/PreviewAPI_JDK13.png" width="100%" style="box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5);"/>
</a>
</p>

<br/>

This is now solved with Java 14+! The javadoc related to associated APIs have been improved via the use a dedicated `@Preview` taglet ([example](https://github.com/openjdk/jdk14u/blob/e23aaedacfdef53d097250c206f5c7f2babdcc7f/src/java.base/share/classes/java/lang/String.java#L2891-L2898)). They are much clearer!

<p align="center">
<a href="https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/String.html#stripIndent()">
	<img alt="Javadocs in Java 14" src="/images/PreviewAPI_JDK14.png" width="100%" style="box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5);"/>
</a>
</p>



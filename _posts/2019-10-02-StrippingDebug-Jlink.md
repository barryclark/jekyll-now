---
layout: post
title: Stripping debug information from jlink runtime images
excerpt: jlink also comes with some additonal plugins, some of which will help to additionaly reduce the size of the produced custom runtime image...
---

<p align="center">
<img alt="Photo by Nuno Silva" src="https://delabassee.com/images/blog/windows-cleaning.jpeg" width="75%"/>
</p>

Using [`jlink`](https://docs.oracle.com/en/java/javase/13/docs/specs/man/jlink.html), one can easily create a custom Java runtime image that will only contain the modules required to run a given application. `jlink` also comes with some additonal plugins, some of which will help to additionaly reduce the size of the produced custom runtime image — namely the `compress` and the `strip-debug` plugins.


As its name implies, the `strip-debug` plugin will remove debugging information out of the output runtime image. With JDK13, this plugin was only stripping Java debug attributes from classes of the output image. Starting JDK13, it has been updated to be more granular and is now, in addition to Java debug attributes, also able to remove native debug symbols from the output custom image.


To invoke it, just append your `jlink` command with one of the `strip*debug*` flags but do note the behaviour difference in JDK13.

E.g. `jlink --module-path mlib --strip-debug --add-modules com.greetings --output myappruntime`

### Pre-JDK13 behaviour

* `—-strip-debug` : strips out Java debug attributes.

### JDK13+ behaviour

* `—-strip-debug` : combined debug stripping, i.e. removes the Java debug attributes ( `—-strip-java-debug-attributes`) *and* the native debug symbols (`--strip-native-debug-symbols`).

* `—-strip-java-debug-attributes` : strips out the Java debug attributes.

* `—-strip-native-debug-symbols` : strips out the native debug symbols.

To remove native debug symbols, the `strip-debug plugin relies on the native Linux [`objcopy`](https://web.mit.edu/gnu/doc/html/binutils_4.html) utility. If it is not installed (ex. on Alpine Linux) or installed in a non-standard location, you will get the following exception:

```
java.io.IOException: Cannot run program “objcopy”: error=2, No such file or directory
```

You can solve that by specifying the path of `objcopy` :

```
jlink … --strip-native-debug-symbols objcopy=/usr/bin/objcopy …
```

This is particularly useful when targeting a different platform.

### Caveats

* Some builds (e.g. [Oracle OpenJDK builds](https://jdk.java.net/13/) and [Oracle JDK builds](https://www.oracle.com/technetwork/java/javase/downloads/index.html)) are already stripping the Java debug attributes so `—-strip-java-debug-attributes` will be of little use with those.

* `objcopy=<path>` only works with `--strip-native-debug-symbols` not with `—-strip-debug`.

* `—-strip-native-debug-symbols` and `—-strip-debug` are exclusive.

* Stripping native debug symbols is platform-dependent and is as of now only supported on Linux.


### Conclusion

Improved runtime size is especially important when running Java applications in containers as keeping container images small is key. Moreover, it is always a good practice to avoid carrying bits that will never be used. `jlink is a tool that every Java developer should consider leveraging to achieve this.

*Originaly posted on [Medium](https://medium.com/@david.delabassee/jlink-stripping-out-native-and-java-debug-information-507e7b587dd7).*

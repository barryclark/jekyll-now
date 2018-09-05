---
layout: post
title: On building a Go project…
excerpt: As a Java veteran, I was a little disturbed when I first tried to build Fn. The confusion was mainly due to my Java background as things are quite different in Go...
---

As a Java veteran, I was a little disturbed when I first tried to build [Fn](https://github.com/fnproject/fn). The confusion was mainly due to my Java background as things are quite different in Go!

In short, I faced 3 hurdles, the first one was tied to the fact that that Go has its own way of organizing a project (see [here](https://golang.org/doc/code.html#Organization)) which is unsurprisingly different than the typical Java project structure.

The second hurdle was how to properly clone the upstream project repository while preserving the imposed project organization. The trick is simply to not `git clone` the repository but use `go ge`t instead.

The third hurdle was to understand how Go dependencies work. This is step is not really required to start if you know that you shouldn’t use `git clone`.

So after some trial and error, some RTFMs; here is the most basic _“how-to build a Go project when you’re a Java developer”_ guide! This short how-to will hopefully help people like me to quickly build Fn and/or any of its related Go projects (e.g. [Fn CLI](https://github.com/fnproject/cli)).


* Make sure that Go (v1.10+) is correctly installed.


* Set the `$GOPATH` environement variable to point to your workspace.


* `cd $GOPATH`


* `go get github.com/fnproject/fn`


* `cd $GOPATH/src/github.com/fnproject/fn`


* `make install`


and you’re done!


* `$GOPATH/bin/fnserver start` (this assume that you have the pre-requistes in place to run Fn, i.e. Docker running).


*Originaly posted on [Medium](https://medium.com/fnproject/on-building-a-go-project-d3c3e7952a58).*


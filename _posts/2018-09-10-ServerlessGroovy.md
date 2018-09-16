---
layout: post
title: Serverless Groovy! Yeah!
excerpt: The good news is that I was able, in a few hours, to add Groovy functions to Fn thanks to the new init-image approach...
---

<p align="center">
<img alt="Groovy Logo" src="https://delabassee.com/images/blog/groovy-logo.png"/>
</p>


Right before my vacation, I had a short exchange with Guillaume Laforge, the [Apache Groovy](http://groovy-lang.org/) project PMC Chair, about running Groovy functions on [Fn](https://github.com/fnproject/fn).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Ootb, Fn doesn&#39;t support Groovy but that&#39;s quite trivial to do. I&#39;ll see if I can do that before my vacation.</p>&mdash; David Delabassée (@delabassee) <a href="https://twitter.com/delabassee/status/1025423919841464321?ref_src=twsrc%5Etfw">August 3, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 


The bad news is that my vacations are behind me and that I didn’t have the time to prototype Groovy support thanks to my _too-long-list-of-things-to-absolutely-do-before-going-away_! Now I am back and the good news is that I was able, in a few hours, to add Groovy functions to Fn thanks to the new [init-image](https://medium.com/fnproject/even-wider-language-support-in-fn-with-init-images-a7a1b3135a6e) approach!


As explained [here](https://github.com/fnproject/docs/blob/master/cli/how-to/create-init-image.md), all we need is to provide a Docker image that will generate the required files for the function. For Groovy, it is simply a _‘hello world’_ Groovy function, a bare-bone _func.init.yaml_ and a _Dockerfile_ that will run the given Groovy function using Docker, eg. using the official _groovy:alpine_ image.


<script src="https://gist.github.com/delabassee/b3a487bfe713fbec55c758a67f396b09.js"></script>

<script src="https://gist.github.com/delabassee/cf5cf7f8fe985d73bd1984b2c6f1d018.js"></script>


You can get all the files to create the Groovy init-image [here](https://github.com/delabassee/fn-groovy-init-image). The first thing to do is to build the Docker Groovy init-image.

`docker build -t groovy-init -f Dockerfile-groovy-init .`

You can then create a Groovy function using that Groovy init-image.

`fn init —init-image=groovy-init myfunc`

and finally run the Groovy function…

`echo "Dr. Evil" | fn run myfunc`


In Fn, functions are running inside containers. To communicate with Fn, Groovy functions are simply using the container’s STDIN to read the request and its STDOUT to return the response. Given that Groovy also runs on top of the Java Virtual Machine it would probably makes more sense to leverage the Java FDK like the Kotlin image does instead of using the more limited STDIN/STDOUT approach. By doing so, Groovy functions would also get some of the Java FDK features for free! See [here](https://medium.com/fnproject/kotlin-and-the-java-fdk-ffcf1778c74a) for more details on benefits the Java FDK can brings and [here](https://github.com/delabassee/fn-kotlin-init-image) for an initial version of the Kotlin/Java FDK init-image.


Fn does not officially support Groovy but this minimalistic PoC demonstrates that it is trivial to add _unsupported_ languages to Fn. All you need to know is how that language works and a little bit of Docker, nothing more! The _init-image_ approach is a recent Fn enhancement, i.e. it might evolve, but it clearly provides several benefits like the ability to generate more dynamic boilerplates for functions, the ability to add custom images without having to hack the Fn CLI, etc.


*Originaly posted on [Medium](https://medium.com/fnproject/serverless-groovy-yeah-c36a57bb7fe1).*


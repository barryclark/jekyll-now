---
layout: post
title: Dive into Serverless Functions
excerpt: Dive is a simple tool that allows you to easily explore the different layers of a Docker image, a tool that can be very handy for some Fn users...
---


<p align="center">
<img alt="Photo by Markus Spiske" src="https://delabassee.com/images/blog/dive.jpg" width="75%"/>
</p>


[Fn](https://github.com/fnproject/fn) is a cloud agnostic, container native, serverless platform and as such, Fn leverages Docker extensively. In a nutshell, Fn will expose any piece of code as a Serverless function by turning it into a Docker image. All the heavy lifting of making the Docker image, invoking it properly with the right input, etc. is handled by Fn. As an Fn user/function developer, you don’t need to understand Docker and all its underpinning as Fn abstracts Docker away. Leveraging Docker also means that Fn can benefit from Docker’s rich ecosystem and tools.


[Dive](https://github.com/wagoodman/dive) is a simple tool that allows you to easily explore the different layers of a Docker image. It is a tool that can be very handy for some Fn users, e.g. users who are doing their own [init-image](https://medium.com/fnproject/even-wider-language-support-in-fn-with-init-images-a7a1b3135a6e), users who want to understand a function’s dependencies, etc.


<p align="center">
<img alt="Photo by Markus Spiske" src="https://delabassee.com/images/blog/fndive.gif"/>
</p>


Explore the different layers of a function using Dive
To explore a functions layers, simply get the function image details using `fn list functions <app>` or `fn inspect function <app> <myfunc>` and dive into it (`dive <functionImage:tag>`); or simply use the wrapper script below (`divefn <app> <function>`). That’s it and thanks [Alex](https://twitter.com/alexgoodman87) for [Dive](https://github.com/wagoodman/dive)!
	
	
<script src="https://gist.github.com/delabassee/7f70d686a8080542b3fe760c9f9b31f6.js"></script>

*Originaly posted on [Medium](https://medium.com/fnproject/dive-into-serverless-functions-5d1ba3572906).*

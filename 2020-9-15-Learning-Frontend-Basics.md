---
layout: post
title: Learning Front End Basics !
---

[comment]:![_config.yml]({{ site.baseurl }}/images/config.png)

##### What is FrontEnd ? 
FrontEnd is referred to as Browser in case of Web Applications. Since there
are many browsers there has to be common standards for rendering frontend
applications on Web. 
Any frontEnd Application is eventually composed of **HTML**, **CSS** and **JavaScript**.
So its important to understand basics of these 3 in order to understand
any framework. 

##### What are Frameworks and Why we use Frameworks ?  
Frameworks like React, Angular or Vue, eventually convert code written
in these specific libraries to HTML, CSS and JavaScript. This is done via
different compilers or transpilers. E.g. if you are using TypeScript then
transpilers convert this into JavaScript so that browsers can understand 
the code. 

##### How does an application interact with Server ? 
Any application (html, css and js) could be stored on a web server and when
requested (http request get) then it is sent over to the client (browser). 
Many operations can happen within browser through javaScript. However, if 
application requires some data from server then it would make another call
to the server via HTTP GET or POST or other methods. It could also call an
API in order to retrieve the data from another server. 

##### How JS coding is different from other programming language ? 
One of the main difference in JS in other programming language is its ability
to make async calls. Web Applications are user facing applications and often
need data from different servers to present to users. In this case it cannot
make end user wait for the data to be fetched. If done so, it will result
in poor end user experience. This is one of the main reason async calls 
is main feature of JS. There are other frameworks like AJAX which also
helps in achieving same. You should read about **Promises** to get more knowledge 
on this. 

##### Why TypeScript and what is its importance ? 
Typescript is one layer on top of JavaScript. Since we cannot make change to 
browsers on every users computer, There is limitation in adopting to higher
versions of JavaScript. TypeScript comes handy here because it allows developers
with better syntax and ability to type check their code during development
phase. This becomes incredibly helpful. TypeScript also supports latest
standards like ES6 which is easy to learn for developers. However, transpilers
have options to transpile this code into ES5 standard which is understood 
by most browsers. For this reason, TypeScript importance has been increasing in developer community. 

##### What is Web Server ? 
Web Server is a server that mostly serves the request from various clients. 

##### What is client ? 
Client in case of Web Application is Browser. 





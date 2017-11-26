---
layout: post
categories: [node, hulp, build, watch, livereload, socket.io]
title: Gulp Live Reload Configuration for Node/Express
author: emir_osmanoski
comments: true
---

![NodeLiveReload]({{ site.baseurl }}/images/2016-08-06-Gulp-Live-Server-Node/00_header.png)

This is going to be a very short and simple post describing a very small
feature based on an interesting gulp module.

I stumbled upon some tutorials based around [socket.io](http://socket.io/) and
I found it fun and something new to learn and get into, so I followed and
completed this [tutorial](http://danielnill.com/nodejs-tutorial-with-
socketio/) which was quite interesting.

After finishing that, I decided I wanted to explore
[node.js](https://nodejs.org/en/) a bit more, but do it using the socket.io
framework. So I found a tutorial on the socket.Io page which is about building
a [chat application](http://socket.io/get- started/chat/).

The tutorial is very simple. It builds a very simple page and introduces some
features of both node.js and socket.io. It also introduces
[express.js](https://expressjs.com/) as a web/api framework for node.

But nothing mentioned above is going to be the topic of this short post. While
the tutorial is short and simple I wanted to follow it and build it in a very
seamless way.

I decided to introduce [gulp.js](http://gulpjs.com/) to streamline the
development process, from modifying the node.js code, to working on the html,
css and the javascript. I wanted to start a server and not have to refresh the
page to see the changes I’ve done on the files.

So, this node project/tutorial was the perfect opportunity to see what it
would take to setup a simple front-end build and reload environment. It is
also a great chance to learn and explore the internals of node.js, epxress and
socket.io whic I hope to do as I follow along the tutorial.

# Starting Point

Even though the tutorial for the chat application is simple and basic and only
mentiones and goes into simple node.js and Socket.Io features, I wanted to
start off with something a bit more complex and organized than just a
collection of files in a single folder.

So, as a starting point I used the [Node
Yeoman Generator](https://github.com/yeoman/generator-node).

This generates a skeleton which includes a gulpfile for running tests and
building the node module. It also adds a single node file located under the
lib folder. The index.js is just a placeholder and contains only an empty
export

```javascript
export default {};
```

Now because I wanted to build a website I went ahead and did some
modifications and added some extra features to the gulp configuration.

> Keep in mind that the node generator is for primarily building node modules 
> and does not provide anything special for web applications based on express.js

# Introducing Express

The first thing I did was rename and modify the index.js file. Renamed it to
server.js and introduced [express.js](https://expressjs.com/), having the
serves.js start up a http server using express listening on port 3000.

```javascript
var express = require('express');
var app = express();

var http = require('http').Server(app);
var path = require("path");

app.get('/', function (req, res) {
    res.sendFile(path.normalize(__dirname + "/../app/index.html"));
});

app.use(express.static('app'));
app.use("/bower_components", express.static('bower_components'));

http.listen(3000, function () {
    console.log('listening on *:3000');
});
```

Before being able to do this we installed express.js as a npm dependency for the
project:

```
npm install --save-dev express
```

I also added an app folder where we are going to store the client-side files
for the chat application including the main index.html file. 

At this point the server.js file and the express.js app is very very simple.
On each request for the root route **/** we serve back the index.html file
using some node.js/express.js utilities to retrieve it and serve it to the
browser:

``` javascript
app.get('/', function (req, res) {
    res.sendFile(path.normalize(__dirname + "/../app/index.html"));
});
```

Because the *app* folder contains static files that need to get to the browser
via **<script>** and **<link>** we have to configure express to serve static
files out of that folder. We do the same with the bower_components folder as
that is where we will serve third party files from:

``` javascript
app.use(express.static('app'));
app.use("/bower_components", express.static('bower_components'));
```

To read more about express static files take a look [here!]
(https://expressjs.com/en/starter/static-files.html)

That about concludes the very basic express configuration/implementation for
now. The main point is that the server.js file is used to configure our server
and the rest of the back-end that should follow from the tutorial.

# The Front End

Like mentioned the front end of the application is served from the app folder.
There we have the index.html file (returned when requesting the root path) and
some javascript and css files.

The index.html file references all the requested resources from the **app**
folder manually.

The javascript and CSS is simple and there is no frameworks other than
[jQuery](https://jquery.com/) and
[Bootstrap](http://v4-alpha.getbootstrap.com/).

But it is important that when we make changes to these files, we automatically
reload the browser so we can see the changes immediately.

# Serving the application via Gulp!

Now comes the interesting part! First of all we need to start up and have the
app defined in server.js running. We can do this very easily by manually
calling:

``` console
node ./lib/server.js
```

But what we also want to do is reload the browser when we change either the
back-end or frontend files.

To accomplish this we will use gulp to both serve and watch for changes on the files.

The original gulpfile generated by the yeoman generator contained a lot of
tasks for developing a node module. We are not going to need anything out of
that so I stripped everything away and after some research, about how the live
reload can be accomplished, arrived at the following gulp task configuration:

``` javascript
var gulp = require('gulp');
var gls = require('gulp-live-server');

gulp.task('serve', function () {
    var server = gls.new('./lib/server.js');
    server.start();
    
    gulp.watch(
        [
            "./app/**/*.html",
            "./app/**/*.css",
            "./app/**/*.js"
        ],
        function (file) {
            server.notify(file);
        });

    gulp.watch("./lib/server.js", function (file) {
        server.start();
        server.notify(file);
    });
});
```

Let's go over the configuration and look at the key points. First we see
that we load up gulp and a single module called gulp live-server:

``` javascript
var gulp = require('gulp');
var gls = require('gulp-live-server');
```

Again we can install the module using npm:

```
npm install --save-dev gulp-live-server
```

This installs and allows us to use the gulp-live-server module which will
allow us to use a livereload feature and at the same time allow us to server
the app from gulp.

Next we define the only task called *serve* and the few initial steps that
start our app using the express.js configuration in server.js

``` javascript
gulp.task('serve', function () {
    var server = gls.new('./lib/server.js');
    server.start();
    // ...
    // ...
    // ...
});
```

The main thing here is the **server.start()** call which just starts up a
server and has nothing to do with livereload.

We then define a gulp watch on a set of front-end files. If gulp registers any
of those files changing it calls the callback function:

``` javascript
gulp.watch(
[
    "./app/**/*.html",
    "./app/**/*.css",
    "./app/**/*.js"
],
function (file) {
    server.notify(file);
});
```

The callback function is passed the changed file as the parameter, and here
we just pass the file object to the **notify** function on the gulp-live server. This
will then cause gulp-live-server to reload the page or just reload
the file if possible.

> There is an important difference as livereload will not refresh the page for
> CSS files and will just apply the new styles dynamically.

The notify function provided by gulp-live-server is what will trigger the
livereload functionality. Calling that is going to cause the browser to reload
and it is the hook and the key method of the entire livereload functionality.

Finally the second and last watch is attached to the only server side file
which actually starts up the express server:

``` javascript
gulp.watch("./lib/server.js", function (file) {
    server.start();
    server.notify(file);
});
```

And the callback function is pretty much the same with the exception of
starting/restarting the server with the **.start()** method, so that server
side changes can be in effect.

# Starting the application
To start the app we navigate in a command line to the root (where the gulpfile
resides) and call

``` powershell
gulp serve
```

This is going to start a server listening to *localhost:3000* and we can
navigate there and see our app. But if we try to make changes, for example in
the CSS, **we will see that the app won't get reloaded or refreshed**.

> Even though we have configured live-server and live-reload using the gulp
> component we are still missing a key feature. To somehow notify the browser
> that the files we are watching have changed. What we need actually is
> provide a way for the **.notify** method to let the client side know to refresh.

# The final component

There is one last thing to figure out and that is reloading the page when we
notify the live server that something has changed.

To resolve this we can take a look at the gulp-live-server documentation
[here](https://www.npmjs.com/package/gulp-live-server#livereloadjs) we see
that we need to add the [livereload.js](http://livereload.com/) script to the
page. 

As the document states it can be done in 3 possible ways. I've opted out for
the livereload Chrome plugin which can be installed from
[here](https://chrome.google.com/web
store/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)

# Summary

And that is it!

We now have an environment setup where we can work on the app and any changes
we make during development will be automatically propagated to the web page.

I find this very useful as I tend to work on two monitors with the
code/tutorial on one screen and the actual app on the second. It was also very
useful when working on the CSS to get the full height chat window working
using Bootstrap!

The source code for the app is available [here](https://github.com/emir01
/socket-io-node-chat), and is something that I tend to contribute as I work on
the tutorial. 

> **Note** that I am doing it a bit differently and not strictly
> following the tutorial. For example I've added and styled the app using
> Bootstrap.
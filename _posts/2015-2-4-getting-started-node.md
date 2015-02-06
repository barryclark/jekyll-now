---
layout: post
title: Building Your First Website Using Node.js (Part 1) Hello Node
---

This is the first in a series of posts that explain, at length, how to build a fully-featured website or web application using Node.js and the popular Express framework.

### Prerequisites

* Basic understanding of terminal usage
* Basic JavaScript comprehension

## What is Node?

Node.js is an open-source server-side I/O framework built on Chrome’s V8 JavaScript engine. It provides an event-driven asynchronous framework ideal for developing highly scalable web applications quickly. What this means for us is basically just that node is a JavaScript framework primarily used for building custom web servers. These web servers can be as simple or as complex as a given project needs to be. You can do **many** other things with Node, but this is the use case that we will cover. 

Because of the open source nature of node.js, the use of other open source packages to build enhanced functionality on top of the framework makes rapidly developing a full-featured application a breeze. Enter NPM.

NPM is the package manager for node.js (and no, it does not stand for Node Package Manager). NPM is a global shell application that is highly efficient at managing project dependencies within node applications. We’ll use NPM extensively throughout this write up.

## Getting Started

Naturally, we’ll need a few bits of software to get up and running with node.js. First and foremost, we’ll need to install node.js from the official website. You can do that by visiting [this link](http://nodejs.org/download/). Installing node will include NPM, and we’ll install the rest of our dependencies (until we need to start digging into database software!) using that.

Once you have node installed, open up a terminal window. In OSX (or similar Unix environments) a simple bash shell will work. On Windows, open up the newly installed Node.js command prompt from your start menu.

In your terminal, `cd` to the destination where you’d like to store your project. `mkdir` a new directory for your project and `cd` into the new directory. This is where all of our project files will live.

To initialize a new node application with NPM, we’ll run the following command: `npm init`

{% highlight bash %}
	npm init 
{% endhighlight %}

will trigger a series of questions (typically Y/n) regarding the basic settings of your project. These are fairly straightforward, and so I won’t go into them here. If you don’t understand what a question is asking for, you can probably leave it blank for now.

Once you finish configuring your project, you should see a `package.json` file created in your directory. Let’s start installing the dependencies that we know we’ll be using:

## Managing Dependencies with NPM

NPM makes managing dependencies a breeze! Our project will rely heavily on one of the most popular node plugins available today: Express. To install the Express plugin, simply type:

{% highlight bash %}
npm install express --save
{% endhighlight %}

...into your terminal. Let’s break this apart:

First, we’re invoking the `npm` command. This tells our terminal that we want `npm` to do something. Second, we’re telling `npm` that we want it to `install` something; in this case, we’re telling it to install the `express` package. We’re also adding a `--save` flag to the end of the command. This tells NPM to **remember** Express as a dependency, rather than **just** installing it. 

Once Express is done installing, open up `package.json` in the text editor of your choice. You should see a new section called `"dependencies"`, with `express` listed inside along with a version number. When we tell NPM to save a dependency, it stores the relevant metadata in the project’s `package.json` file in this way. This allows us to maintain dependencies across multiple instances, without having to save the actual code of the dependency with our source. 

You should also have noticed a new folder in your project’s root: the `node_modules` folder. This is where NPM stores all of the locally installed dependencies by default. It is considered a best practice to ignore this folder when using any form of version control. Because NPM uses the `package.json` file to maintain a list of dependencies, once they are defined you can simply type: 

{% highlight bash %}
npm install
{% endhighlight %}

...to install all currently defined dependencies. Go ahead and delete the `node_modules` folder, and then run `npm install`. Because our `package.json` still has Express listed as a dependency, it knows to install that already! Pretty nifty!

## What the Heck is an Express?

On its own, Node.js is not very opinionated. Typically, you’d have to define how `exactly` to handle each and every request sent to the server (assuming you're building a webserver that is!). This includes things like sorting requests based on the request headers, determining how to respond to requests for certain types of assets, etc. etc. etc. This can all get incredibly complicated, especially if you just want to serve some HTML!

Express provides a minimal framework for routing network requests. That’s it. This might sound incredibly simple for some while making absolutely no sense for others, so lets work through what this might look like, and explain things as we go.

## My First Express App; or, how I learned to say Hello World!

Inside your project’s root folder, create a new file called `index.js`. This corresponds to your application’s "entry point", so if you entered anything else when configuring your project, use that instead.

Inside your new file, add the following two lines:

{% highlight javascript linenos %}
var Express = require('express'),
    app = new Express();
{% endhighlight %}

Node applications rely on the require syntax for modularity, allowing developers to create modular JavaScript files that are all linked from a single entry point (`index.js`). Node applications also know to look in the `node_modules` folder by default, and will only include relatively pathed requires if no corresponding `node_module` is found.

Because the Express module ultimately exports a JavaScript class definition, we’re going to capture that in a variable `Express` and then instantiate a new instance of that object as our `app` variable. The above code could be condensed to one line like so:

{% highlight javascript linenos %}
var app = new (require('express'))();
{% endhighlight %}

...but we won’t do that, because that looks gross.

Once we have declared our application variable, we need to tell that application to start listening for requests. We do this using the `app.listen` function:

{% highlight javascript linenos %}
var server = app.listen(3000, callback);
{% endhighlight %}

Odds are, we probably won’t do much with this `server` variable. You could just as easily not store the return of `app.listen`, and go about your day. To maintain consistency, this tutorial won’t do that.

To get our application listening to requests, we need to provide `app.listen` with at least one of two different variables: a port to listen at, and an optional callback to be run once the server is ready to accept requests. This callback is usually a good place to run a quick `console.log` to verify that your server starts up correctly. Lets make that change real quick:

{% highlight javascript linenos %}
var server = app.listen(3000, function(){
	console.log("Listening at port 3000");
});
{% endhighlight %}

**Note:** When using `console.log` from within a node project, contents are logged to the system running the node process. Locally, this will probably be your terminal application. When you are ready to host your app in the cloud, you may need to look into professional logging services.

Now your app knows to listen for requests, but we haven’t told it what to do with any of those requests yet. Go back to your `index.js` file, and make a few lines of space before `app.listen`. Write the following code:

{% highlight javascript linenos %}
app.get('/', function(req, res){
	res.send("Hello World!");
});
{% endhighlight %}

This code tells our application how to respond to a `GET` request to the root (`/`) of our site. When our application receives a GET request to the root path, an anonymous callback function is called with the parameters `req` and `res`. These represent HTTP `Request` and `Response` objects respectively. We can use the `req` object to collect data from the request and respond accordingly. We’ll use the `res` object (and its predefined functionality) to define responses to be sent to the client that made the request.

In the simple example above, when a client makes a request to the root path of our application, we will simply return the text "Hello World!". Let’s check to make sure this works. Go back to your terminal, and from the root of your application type:

{% highlight bash %}
node index.js
{% endhighlight %}

Again, if you named your entry point something other than `index.js`, now is the time to adjust. Once you see the console log we added above display, you know your app is ready to start handling requests. Open up your favorite web browser, and navigate to `localhost:3000`. If you did everything right, you should simply see:

Hello World!

That’s it for our first look at Node.js and Express. Next time we’ll dig deeper by adding more NPM modules, serving templated HTML, persisting data to a database, and much much more!


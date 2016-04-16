---
layout: post
title: Building a modern setup for JS development
tag: javascript
---

After starting my journey towards modernizing my toolset and workflows, I now take the full measure of how painful learning the cool new things can be. There a lot of tools out there in the JS/Node/NPM ecosystem, that all do one thing really well, and you kind of want all of them in your projects, but it's really hard to find the information about how to get them to play nice together. This is my attempt at documenting that process.

### The ecosystem

There are a bunch of tools I see mentionned in articles all over the web. There is some overlap between some of those tools, and initially it's not super clear when one would choose which:

- [Babel](https://babeljs.io/), a JS compiler, allows (among other things)urning ES6 and JSX to plain JS.
- [Browserify](http://browserify.org/) a JS processor that allows writing client-side JS modules in the way Node modules are usually written, and can build those into bundles.
- [Webpack](https://webpack.github.io/), a module bundler that can handle all kinds of resources (JS, but also CSS and others)
- [Jasmine](jasmine.github.io), a very well-established JS testing framework.
- [Karma](https://karma-runner.github.io), a JS test runner. Spins up a web server and takes care of automating the running of tests in multiple browsers.
- [Gulp](http://gulpjs.com/), a task-automation tool.
- [Grunt](http://gruntjs.com/), another task-automation tool.
- [NPM](https://www.npmjs.com), the Node package manager, makes it easy to install packages in your app.
- [Bower](http://bower.io/), another package manager, except this one is meant to manage client-side code when NPM does so mostly for server-side code.
- probably others that I forget.

### The end goal...
What I want is a repeatable setup I can use in my future projects. Ideally it'll offer the following features:

- ES6 compilation
- Jasmine tests running from the CLI (ideally with DOM support)
- Tests running automatically when saving source files
- Module bundling: JS blobs that can be loaded in a browser
- Production (minified) and optional debug versions of those blobs

### ...and how to get there.
I put together a small set of files I want to use for some 3d game/experiments. It's essentially the start of a minimal [Component-Entity-System](http://www.gamedev.net/page/resources/_/technical/game-programming/understanding-component-entity-systems-r3013) engine. I'll be using that project as a test bed for setting up and running tests, bundling, etc.

Itried to go about this in several steps, since it'd be impossible to debug everything at once.

In the past, I got a simple working setup for ES6 with Babel and Webpack on my [Manikin project](https://github.com/mikaelgramont/manikin), but I could not get testing to work, so this time around I'm going to start with testing, and then add ES6 later.

### Step 1 - Jasmine tests running in a browser window.
Following the [instructions on the Jasmine GitHub repo](https://github.com/jasmine/jasmine#installation) is pretty straightforward and it's easy enough to get going. One big issue is that you have to update your HTML file for every test spec you might add.

I captured the progress in this [commit](https://github.com/mikaelgramont/exploring-jasmine-setups/tree/41ad5476c5f7645d74d8a90237c072452f54262a) (see [test-suite.html](https://github.com/mikaelgramont/exploring-jasmine-setups/blob/41ad5476c5f7645d74d8a90237c072452f54262a/tests/test-suite.html) for the central parts).

### Step 2 - Jasmine tests running on the CLI
This is essentially putting the [Node instructions on Jasmine's GitHub](http://jasmine.github.io/2.2/node.html) to use and writing a test runner script.
Run ```node tester.js``` from [this repo](https://github.com/mikaelgramont/exploring-jasmine-setups/blob/ac6e34aec5b9f88c685eff48a940ec6a5335e8d4/tester.js).

### Step 3 - Jasmine (unit) tests running on the CLI + ES6
To get started here, I followed the [instructions on Babel's site](https://babeljs.io/docs/setup/). After picking Jasmine, the instructions spell everything out to build your ```jasmine.json``` file.

However, ES6 wouldn't work as if my config was not doing anything. After a little [node-debug](https://github.com/node-inspector/node-inspector) magic, digging down Jasmine's entrails, I realized that my helpers config was not recognized. And that's because folders listed in the ```helpers``` entry of the config file must be relative to the ```spec_dir```. Why Jasmine did not complain it couldn't find the folder I gave it, I don't know.

Anyway, I got [ES6 code + Jasmine tests](https://github.com/mikaelgramont/exploring-jasmine-setups/tree/7ced883ec1fd8bc0a88ad8a916879e2fac4de998) to run.

This is all nice, but it does not allow for tests to exercise anything that involves the DOM because it's running in Node. More on that later.

### Step 4 - Using Browserify to bundle things for production
This one is super simple. I just installed ```browserify``` and added the following script to my ```package.json``` file:

```"build": "browserify js/main.js > dist/bundle.js"```

...where ```main.js``` is my entry point file (the top-level file for my app) and ```dist/bundle.js``` is the file I want to load in a browser. Question: how did that ES6 get compiled?

### Step 5 - Source maps
Same here, super easy, just pass '--debug' and output to a different bundle file.

### Step 6 - Using Karma to automate testing
Karma is a test running framework. Its concern is to start a web server, some form of browser and sending tests to that (or those) browsers. First of all, that means that what we saw in steps #4 and #5 will remain separate from this because those were about production code.

However we do need to combine Karma's responsibilities with the ES6 compilation and our existing Jasmine configuration. [karma-browserify](https://github.com/nikku/karma-browserify) is key to making this work.

Here are some notes on something that got me stuck for a bit:

If you run ```karma start```, it'll kick off a webserver and you can then open that url in a browser, where the client connects to the server. However from here, two possibilities:

- if ```singleRun``` in the karma config is either false or not set, no test will run until another command, ```karma run``` is executed.
- if ```singleRun``` set to True, then the whole test suite will run, and results will be displayed in the server stdout (likely a terminal window). Nothing will be displayed in the client, which will actually disconnect (possibly blazingly fast) and look like it never worked in the first place.

Another simpler, working worfklow:

- replace singleRun with autoWatch
- run ```karma start```
- load the url in a browser locally
- the tests will then run every time a test or source file is saved

Problem: we need to open a browser manually, which is super annoying. Adding a ```browsers: [Chrome'],``` entry in the Karma config removes the need to manually open the browser. You'll need to install the karma-chrome-launcher package.

### Step 6 - Using PhantomJS to run integration tests on the CLI.
Adding PhantomJS as part of the list of browsers will run tests without needing to open a new browser process.
By the way, since we're running against browsers, we can now perform integration tests, and use the DOM as we would on the client.

### Summary
Karma-browserify is the center piece that ties together: Karma, Browserify, Jasmine and Babel. It's responsible for finding test files, running them through Browserify, which in turn knows to talk to Babel, and once that's done, things go through Jasmine. This is the bit that I wish people talked about more!

One important distinction:

- test configuration is all handled through the Karma config file.
- production configuration is separate.

Here's a [working repo](https://github.com/mikaelgramont/exploring-jasmine-setups/tree/140884865358038e36338984e19853db8f0425ef), just follow the instructions to get started.
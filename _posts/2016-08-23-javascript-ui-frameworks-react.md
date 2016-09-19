---
layout: post
title: Javascript UI Frameworks - React
---

## Overview
Javascript UI frameworks like React and Angular have changed the way that development teams approach Web application development.

These modern tools further diminish the role of server-side HTML generation and HTTP form processing in favour of manipulating the DOM within the browser and calling out to server-side REST services.

In many ways, they can be seen as the next evolution in Web application development, from interspersed HTML and Javascript (often JQuery) making REST calls to more complete frameworks offering templating, routing.

Techniques to allow the use of new Javascript language features on the browser-side (where support for new language features lags by several years) such as polyfills and transpilation have been developed and there’s been an explosion of tooling as a transition Node.js has gradually become more prominent in the development of client-side Javascript development. 

So we got together to talk about how this impacts modern software development practice.

## React and Angular are two popular UI frameworks, but what’s the difference?
DC: They are different beasts, Angular is a full MVC framework, and React is just a view layer with an ecosystem around it that will give you everything, but you can take bits as you want, so it's effectively like how we view microservices. You take little bits in and out. React is the extreme view of that, Angular is the more monolithic view.

CA: React is nice way for developers not to have to interact with DOM directly. Angular gives you that, and a whole slew of everything else you could possibly need under the sun, and a sink. If all you need is that your DOM manipulation is too complex, React helps you to solve that by giving you a good set of conventions, a good set of technologies, lots of support. Adopting Angular is more of a case of rewriting your whole app in the Angular way.

## What do they do?

DC: React is just a view layer nothing else, it isn't a full framework like Angular that does Models, Views and Controllers. All you do is define some components in React, modularly, and it helps you render elements on the page.

The magical thing in React, compared to most frameworks is this concept of a virtual DOM, so when you make changes, instead of doing direct DOM manipulation on the page, which can be quite slow, it updates a virtual DOM, and then in cycles does a diff comparison between the actual DOM and the virtual DOM, only making necessary changes to the actual DOM. That's where the magic of React comes in.

The main key of it, to me, is that it makes everything really easy from a developer's point of view, to build UI with, because you're just creating composable UI elements and patching them all together. It's really that simple.

## How does React work?

DC: The Flux pattern is a really common way to write apps in React. Redux is a really popular implementation of this pattern. React is unidirectional, you can't go back and edit the state from your UI whatsoever.

AH: Yes, so your UI components can trigger actions, you attach some data to the action and dispatch it, a UI component only has to care how it gets rendered, and what actions it makes.

DC: That’s a key difference between say, WPF apps, where you're propagating events through to the UI elements with bidirectional flows, and React. In the Flux pattern, you have to call an action, it goes through a specific flow and that's the only way you're supposed to do it.

In things like XAML in WPF desktop apps, you tend to have bidirectional flow, where updates are pushing back and forwards, which can be a bit of a mess. That's what this pattern is supposed to solve.

As you scale up with a bidirectional flow, as you get more controllers, more views, things start becoming intertwined, really difficult to test and really difficult to manage.

The key thing to note about that whole pattern is that React is literally just the view part of it. The React components are just sending off actions. The rest of it is javascript, or a lightweight framework like Redux that does a lot of nice things for you, but it's effectively just a library, it's not really a framework on its own, and that's why it's quite popular.

AH: Yeah, my understanding is that in the Flux / Redux mode. You've got a DOM with all the elements on it, a virtual DOM, some state held in the browser as a javascript object, a set of defined actions that can happen, and a set of functions which update the state based on the action that's just occurred. When you fire off a transition to the state object via an action, the bits of UI which need to update are then redrawn based on the state change.

In this model, the UI components never directly interact with the state. They just create actions which cause functions to modify the state and the modifications to the state result in the UI being re-rendered. So, it's a one-way data flow.

ND: So it's a bit like CQRS for the browser?

DC: That's right, yeah.

## Tooling

AH: React comes with some new tooling, pretty much all of the examples use ES2015 and JSX, and it makes sense to use packing tools like Webpack, and Node.js tooling for running unit tests.

I first started using React a few months ago, because a team I was working on was adopting it, so I thought, OK I'll give it a blast. I looked at the javascript code, and I couldn't understand it. I thought, "how is this possible?" because I've been writing javascript for like 15 years. I thought I knew it. [laughter]

It's got classes, which you can extend, there's a whole new slew of operators, rocket syntax from C# to create Lambda expressions instead of using the function keyword, it's got async/await, destructuring, spread operators and stuff. It's a very different language than what I knew.

BB: A lot of the examples are written in that, but strictly speaking it's optional.

CA: JSX compiles to ES2015, then you have to transpile to browser-compatible javascript. You still have to do a similar number of jumps, so skipping it isn’t gaining you much.

DR: So, ES2015, ECMAScript 2015, that's the latest version?

AH: Yes, there's definitely a time investment required to learn this stuff.

DR: So what's JSX then?

DC: Inline HTML basically. HTML inside your javascript.

AH: So, when you're writing JQuery, you'd add elements to the DOM with a put [draws on board] `$("#id").append("<div/>")` and all that. In JSX, you can return HTML-like syntax and there's a parsed which will turn that into `React.createElement` statements.

BH: It's in the context of a component, right, so you're actually implementing a `render` function for your React component, so it's weird at the start, but it feels like you're building a composable single thing you can use.

CA: And you can use your component names as tags in JSX. When it renders it, it expands out, instantiates another component, fills it in, and it's composable that way.

DR: Ah, so that's why I can't understand anyone's HTML any more?

[ALL]: That's right. [laughs]

## Why is writing React useful?

??: Now we have the opposite extreme of when you had your HTML with inline scripts injected in it, we have inline HTML inside scripts. How are we determining that this is ... better?

AH: It's the reusability of the components. The component essentially defines an interface - the properties that it accepts and renders, the actions that are initiated by that component.

CA: Essentially, it's a very lightweight template library that you have inline with your code instead of in a separate file.

DC: There's something else in it as well, when you write JQuery apps, you tend to get this massive javascript file which manipulates DOM, then the DOM becomes the state of your app. Not only is that bad for performance, but it becomes a nightmare to maintain.

React lets you have that state in the component, instead of being spread across input fields and the content of various HTML elements. It's self-contained within that component, which makes that component reusable, but also allows you to build dynamic complex bits of UI and not have to worry about how it interacts outside of that component.

Having the HTML inline means that you just have to write the initial HTML and a bit of view logic and that's it. You're not worried about anything outside manipulating it.

AH: These components can be unit tested as well, you can write javascript unit tests which exercise the behaviour of the components. These unit tests tend to be executed in Node.js.

DC: Yeah, using Mocha or another test runner.

ND: So what are the benefits from a developer perspective?

DC: It's easier, it's more testable. Performance is arguably better.

??: It doesn't sound easier.

DC: It isn't at first, it's counter-intuitive at first, but once you start writing apps in it, you get the gist of it, you write UI faster because you can reuse things, and you where your abstractions lie.

CA: Because there's an agreed set of conventions, plus this JSX technology, you end up with composable components.

BB: There was a long term movement towards progressive enhancement, basically that stops you from encapsulating your javascript and markup. Once you stop trying to do that, it makes it possible to create encapsulated functional components.

DC: Progressive enhancement is still a big thing, and it's possible to do server-side React, to render your HTML using isomorphic techniques. You're still doing your styles with external CSS, there are some people who do it inline of course...

## What's the HTTP request lifecycle of a React application?

AH: You hit a website, something has to give you a skeleton of a web page with an app id in it to connect the React javascript into the DOM. And something has to serve up the Javascript that your React application consists of.

Mostly, that's done with Node.js because the ecosystem is javascript, but you can use any web server.

There are some supporting tools like webpack, which take your javascript and dependencies, transpile them from ES2015 to browser-supported javascript, de-duplicate them, minify them and pull them all together in a single file for distribution.

We're writing React applications in JSX and ES2015, but most browsers don't support ES2015 at the moment, and none of them support JSX, so you need something that will take this stuff and convert it to browser-supported Javascript. There's lots of blog posts that talk about how transpilation is done, but essentially you end up with a blob of minified javascript.

## What’s the development experience like?

AH: Fortunately, React development tools are really good, and you can set breakpoints and all that kind of stuff in the browser, but you do need to understand a number of tools, npm, basics of Node.js, pick a testing library...

DC: There's so many of them, that's so annoying.

AH: And that's part of the problem, if you're coming into the ecosystem, you need to understand webpack, what babel is and what dialects of javascript you need to transpile, so it's something not to be taken lightly.

??: So is that in addition to Yeoman, Bower, Grunt?

AH: Not really.

??: So it's a case of bin those, forget those?

AH: Pretty much.

BH: I'm doing a Pluralsight Course on React, there's two of them, one with the newer version of the javascript specification, and the older one. If you go to the newer version of the course, it says to do the old one first, and that uses Grunt to do all of that stuff. I think the longest module is the environment setup, setting up Grunt to do the library linking and all that kind of stuff.

You can do React without Webpack and Babel, but it's the way to go.

CA: There's a subtle distinction between simple and easy, it's very easy to set up with one line of code, but you can end up not knowing what it's doing.

CA: I like to imagine that these onomatopoeic names for the tools like gulp are named after the noises the developers make when they're using them. [laughter]

BH: How does Webpack differentiate itself from Grunt? Grunt tasks can do bundling, minifying etc., how is Webpack different from that?

DC: The best way to think about Grunt is that it's a task scheduler, a makefile type of thing. You set up some tasks, you define them and it does them. Webpack is effectively a module bundler, it's purpose it to take all of these javascript modules and files that you've created and compile them into bundles for different pages.

CA: It's just that there's a bit of crossover between the capabilities of each tool.

DR: How is that different, to say, Bower or AMD modules?

DC: Bower and AMD are like NPM, package managers.

BB: Bower was around before Node started taking over the Javascript ecosystem, Bower was there to pull in browser-specific dependencies. You'd have them in a vendor file and it would be up to you really how you deployed them to the page. Bower is like the browser version of NPM, before Node kinda started, and Webpack started allowing the Node ecosystem into the browser.

DC: There's some history in that, in NPM 2 (the previous version of NPM), all of your dependencies were installed in a tree-like structure. What you'd end up getting was duplicate dependencies, different modules requiring different things, and you'd just end up with this massive tree, but that was all server-side.

Bower focussed on the UI, and was able to de-duplicate dependencies, making javascript files shipped to the browser were smaller.

NPM 3 came along and was able to do the same kind of things, so took over and Bower was discontinued because of that.

DR: So AMD is just a specification for packaging stuff up is it?

DC: Yeah - AMD, Common.js, Systems.js do that, while package.js is a file for defining your required modules.

## How do javascript UI frameworks change the way that interactions with server-side code occur?

DC: When you do React apps, the server-side code effectively becomes a REST API. Where you're just sending data, your single-page app (SPA) is handling all the view stuff. When you bundle it with your webpack etc., you've essentially got an index.html, and an app.js. It can be dangerous, because the app.js file can get quite big, like megabytes in size.

You need to figure out a way to deal with that. I've had apps that have gotten to 20MB in a Javascript file (pre-minified), which is ridiculous.

AH: So do you think all of these server-side frameworks are no longer required? We just need to produce JSON for consumption by React apps?

DC: Well, there's also isomorphic stuff you can do, where you can write render the HTML server-side. You can write this in C#, PHP, some other languages, by compiling them to javascript.

## Is it leaning edge, or is it bleeding edge?

AH: I think most people who are starting a new web app today are making the decision between Angular or React. I don't think many people are wondering which server-side framework they're going to use anymore. The server-side way still works, rendering some HTML out to a form and then receiving a form post. It's pretty simple, but it's got some downsides, page transitions cause flicker, it's not perfect. You end up writing a lot of mapping code of form posts to DTOs and database objects - a lot of monotonous code.

## How much transpiling is too much?

BB: What you're writing is source code, what gets executed on the computer is irrelevant. It's the same as a compilation, [in any high-level language] there's always going to be some difference between what you write and what gets executed.

CA: It's less a case of the computer, but it's the load of having multiple toolsets to stitch it all together. Each layer could fail, and someone has to pick through that when it does.

CA: The trend is that more tooling is improved tooling. You get to keep the old tools. [laughter]

DR: It sounds a bit like the step between low level and high level languages. You're writing your beautiful javascript, you run it through a bunch of transpilers, and out the other end, you get this completely unintelligible blob, you chuck it over the wall at the browser engine, which is treated as some sort of commodity generic processing engine thing and it deals with it. Then magic shiny things happen... Which is kind of the same as if you wind back 30-40 years and you wrote a bit of beautiful C code, ran it through the compiler, out of which you get an unintelligible blob of machine code, which you lob at the processor. It's analogous I think.

DC: I can explain it. There's a key difference, compilers are going from high level to low level, transpilers are going from one high level language to another with a view to supporting a wider range of browsers.

CA: So basically, your compile target is now javascript.

DR: You write JSX, which is compiled to ES2015, transpiled to javascript, bundled, minified and shipped to a browser to run in V8 or another Javascript engine.

??: Minification is a step you can accept, because it's giving you benefit, even though it's going from more human-readable to less human-readable. Every layer up you go should be more human readable, you should be able to deal with it easier, and simpler.

DC: When you minify, you can still read it, it's just a bit of a mess.

DR: We're basically treating the browser as a commodity compute engine. You wouldn't look at machine code and complain about it being unreadable.

BB: There's probably more people working on improving the speed of javascript execution than working on performance anywhere else, so it kind of makes sense.

## How does this affect the cost of running an application in production?

AH: When you execute more of the logic in the browser, the CPU requirements of the server-side reduces. You can serve your React application out of a static S3 bucket at very low cost, you don't even need a server behind it.

We've just said that all we need to do is to make REST calls, well, I can run up an API Gateway to create microservices driven by AWS Lambda and I've got completely serverless infrastructure to host my React app and provide backend services.

So it makes a lot of sense, you don't have as much to manage. All you're doing is shipping the initial HTML structure, and the bundled React javascript application, all of the page transitions are in the React application itself so are loaded in the single hit of javascript.

TW: It helps you to focus on what's important. You might be able to get rid of a lot of complexity and not take on as many people to run the IT part of the service, allowing you to concentrate on providing features for your customers.

AH: It's kind of amazing that right now, every page hit, every flicker of the screen costs us milliseconds of CPU time. We end up paying to run a full operating system for these machines.

CA: We had a customer struggling to carry out performance analysis on one of our React applications because the page transitions were instant and didn't show up on server logs. They were monitoring the server logs to try and do a like-for-like comparison against the existing server-side rendered web application. There's nothing in the logs, because the system wasn't hitting the server at all.

AH: A React application feels faster than an ASP.Net application or similar, because the browser is downlading and re-rendering the whole page on page refresh. A React application only has to call a REST API, render components and swap out some DOM, at the cost of a higher cost of initial page load when the React app is loaded.

DR: The React applications I've used seem really snappy when you're using them, but you have this up-front cost. You might think, well that's only once when you first hit the application, but that's the most important time. The first time someone gets to your website, if they're waiting, they're going to get bored and go somewhere else.

CA: The way that Facebook does it is to pre-render the page, and then take bits of the page over as and when those bits of the application load. To start with, it's static.

Every page you go to now, has like a 1MB of graphics, moving videos, maybe it's not that big a deal.

DC: Using Webpack, you can split your javascript file out into separate chunks based on pages, or modules. That allows you to prioritise loading your core application and home page.

## Is it a fast way to write applications?

CA: When teams are used to it, it's fast, but to start with you're going to be copying and pasting from StackOverflow a lot. [laughter]

## People
DC: Denis Craig
CA: Craig Andrews
AH: Adrian Hesketh
ND: Neil Dunlop
BB: Ben Brunton
DR: Dan Rathbone
BH: Ben Houghton
TW: Tom Walton

## Summary

Adopting React can provide many benefits, from reduced infrastructure costs for high scale deployments, perceptable improvements in user experience and a structured approach to UI construction, but comes to many at a retraining cost, and a cost of tooling complexity which can take the shine off the new technology.

Accordingly, finding people who know React and its tooling well is not easy, but for many organisations, the risks of being left behind in what’s essentially a step change in technology are too great to hold back adoption, despite questions about whether Angular 2 will win out in the developer mindshare over React.

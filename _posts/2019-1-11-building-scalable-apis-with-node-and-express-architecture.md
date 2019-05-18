---
layout: post
title: "Building Scalable APIs with Node and Express: Architecture"
excerpt: |
 There are many ways to organize a Node application, and figuring out how to do so can be a source of great stress and frustration if you don't have much experience.
 In this article I'm going to walk through one approach by building a simple yet fully functional and scalable API
published: false
---

There are many ways to organize a Node application, and figuring out how to do so can be a source of great stress and frustration if you don't have much experience.

In this article I'm going to walk through one approach by building a simple yet fully functional and scalable API. I've used several techniques in the past and this is currently my favorite, so let's get started!

### Initial Setup

First we need to create a new directory (I'll call mine node-express-demo), initialize an empty project, and install express.

{% highlight bash %}
mkdir node-express-demo && cd node-express-demo
yarn init
yarn add express
{% endhighlight %}

This next step is optional, but I recommend adding a start script to `package.json` to run the app via `yarn start`.

{% highlight json %}
"scripts": {
  "start": "node index.js"
}
{% endhighlight %}

### Project Structure

Here are the basic files and folders that will make up the core of our project. Pretty simple, right?

{% highlight text %}
middleware
modules
index.js
router.js
{% endhighlight %}

We'll discuss each of these in more detail, but let's start with `index.js` to get us up and running. This is the entry point of our application where we'll set up the Express server.

`index.js`

{% highlight javascript %}
const express = require('express')
const { name, version } = require('./package')

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello!'))

app.listen(port, () => console.log(`${name} version ${version} listening on port ${port}`))
{% endhighlight %}

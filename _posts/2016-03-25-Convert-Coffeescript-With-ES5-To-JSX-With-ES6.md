---
layout: post
title: How to migrate from Coffeescript + JSX => ES6 + JSX
comments: true
---

I maintained an SPA with relatively old frontend. The main trouble was coffeescript - a lot of new things built by ES6 standard and tying process can be a nightmare.
The simplest thing in this case - to move to ES6. Not a big deal, things like [decaffeinate](https://github.com/decaffeinate/decaffeinate) can help you!

I got a big problem. Decaffeinate can't work with JSX, but actually coffeescript & JSX are mixed together inside one file. I'll describe how to migrate below.

Preinstall dependencies

```
npm install -g babel-plugin-transform-react-createelement-to-jsx coffee-react lebab babel-cli
```

Okay, we have a set of `.coffee` files (maybe `.cjsx`, that's up to you). `cd` to root directory of these files and:

```
find . -name \*.coffee -print | xargs cjsx -bc
```

Now we have plain old `ES5` with ugly `React.createElement` inside. Let's deal with both drawbacks

[Lebab](https://github.com/mohebifar/lebab) is awesome 5to6 tool. Let's convert old style to new.

```
find . -name \*.js -print | xargs -iFile lebab File -o File
```

It's time for `JSX`. [Daniel](http://stackoverflow.com/a/36218474/2926641) gave me a hint how to do it:

```
find . -name \*.js -print | xargs -iFile babel --plugins transform-react-createelement-to-jsx File -o File
```

Another small thing. `Coffee-script` package adds a comment to the top of each file it converts. Remove these comments:

```
find . -name \*.js -print | xargs -iFile sed -i '1d' File
```

Last. You are using build tool, aren't you? So ok, let's replace `.coffee` dependencies by `.js`

```
find . -name \*.js -print | xargs sed -i 's/.coffee/.js/g'
```

Volia! Happy ES6!

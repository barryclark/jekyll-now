---
layout: post
title: Technology change
---

So, my previously released game [Nubbles](/nubbles) was built using libgdx, written in Java. There were a lot of things I liked about using libgdx, and some things I didn't. One of the things that always annoyed me was that I couldn't use my Chromebook to work on games, even though I have access to other laptops. So I looked into HTML5 game engines, something I could write anywhere, deploy on mobile but test in a browser.

After playing with a few, I settled on [Phaser](http://phaser.io/). It had excellent documentation and examples, both of which were easily accessible offline (yes I know, Chromebook, offline, random). After working up a prototype for a new game idea (Square Next, more on that later) I decided I wasn't keen on using plain Javascript to develop, being used to Java I kind of missed some of the OO mechanics, and wasn't keen on trying to implement or work around them in Javascript. So I found TypeScript and thought I'd give that a go. Some seven months later and I've finished the project, written entirely in TypeScript, using Phaser to do all the heavy lifting.

Some things worked well, some things were a pain. Being able to develop on pretty much anything with a web browser kind of went out the window, because I needed NodeJS to transpile the TypeScript back into Javascript. This meant I could still use the Chromebook (Crouton is a marvellous thing), but couldn't for example use an Android tablet (which tbh is probably not really an issue, I just like being able to develop on any device that I own for some reason). I have to admit to liking TypeScript, and debugging wasn't as bad as I thought it would be thanks to auto generated source maps and the Chrome debugger.

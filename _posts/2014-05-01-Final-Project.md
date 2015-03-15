---
layout: post
name: coding-bootcamp-final-project
title: Coding Bootcamp - Final Project
date: 2014-5-1 21:00:00 +00:00
---

The clock is ticking as our time at [Makers Academy](http://www.makersacademy.com) quickly draws to a close. For our final project we're making an app to help people quickly share simple data...And so far, it's being going surprisingly well.

Sure, there are definitely some tough challenges on the horizon, but I think overall we have been surprised with how far we have come already. Without a doubt, we would not have come this far if it weren't for Test Driven Development - a software methology that is drilled into Makers Academy students from day one.   

> **Red. Green Refactor.** 
Write a test and watch it fail. 
Write the code to make the test past. 
Improve your code... 

... and the added benefit for yours truley, is that I am pretty sure TDD helps to protect my sanity. There is so much going on in the code base already. Having those tests close at hand has been great for times when I need a refresher on what other team members have been up to.

### What we've built so far
To date we've kept our promise to keep the user stories we created top-of-mind whilst building the core functionality. At the time of writing we have a working app that:- has a sign up process.- allows the user to create a chart from a cdv upload.- provides the user with a choice of four chart types (including multiple series).- allows the user to share the chart on a number of social platforms- provides the user with an area to store all their charts in one place.

###Challenges
At the heart of our app is the [Chartkick gem](http://chartkick.com/), which taps into the Google Chart API and provides a simple way to generate charts from data. But with the added simplicity comes a price - less customisation and functionality. Chartkick will do for now but we may end up exploring using Google Charts API directly if we need more functionality. In addition, Chartkick takes a fairly simple approach to documentation so it didn't end up being straight forward when it came to implementation.We also have some work to do on embedding charts on other platforms. It's easy to generate a link to to a chart but as yet we have not yet been able to proide an image of the chart - for example, say you wanted to download a jpg of your fancy new chart. This is because the charts are rendered in javascript via our own API rather than html. 

### Feature-rama
We've already begun thinking about new and improved functionality that might be implemented over the coming days. Time permitting of course!- We defintely want to allow a user to manually enter data in the browser in order to create a chart. At the moment they can only do it by uploading a CSV file, making for a less than optimal experience for most people out there.- We are exploring a [voice api](http://Wit.ai) which may, just possibly, allow us to generate a chart using speech! - A great suggestion from Alex, one of our teachers...How about a Chrome extension whereby you can highlight some text (a simple stat), click on a button at the top of the browser and generate a graph automatically?

But of course, whilst implementing cool functionality may get us giddy with excitement, we won't be forgetting the not-as-exciting, yet absolutely essential tasks...

...Like search bars.

Stay tuned.

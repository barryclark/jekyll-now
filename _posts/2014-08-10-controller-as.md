---
layout: post
title: Controller As
cover: cover.jpg
date:   2014-08-10 12:00:00
categories: posts
---

## A new way to address the controller

The Controller as syntax gives us the ability to call a property of that controller using some value. for example your html would look something like this:

	<div ng-controller='FirstCtrl as first'>
	</div>

now if the FirstCtrl has a function or variable you'd like to use, we can call it by stating:

	{{first.myFunction}}

Interestingly, this syntax also lets you not have to state the scope as you create the controller. So your controller in app.js would look something like this:

myApp.controller('FirstCtrl', function(){
	this.myFunction(){...}
})

Another benefit of using this syntax is that when you have nested controllers you can clearly see from which controller you are calling a particular function. This helps you avoid naming collisions (which you shouldn't have anyways) and it makes your code more readable and easier to debug.

So try it! or dont. i dont give a shit; i understand it better having written this.
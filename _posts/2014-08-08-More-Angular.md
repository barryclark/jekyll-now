---
layout: post
title: More Angular
cover: cover.jpg
date:   2014-08-08 12:00:00
categories: posts
---

## Controllers

With angular you can tie controllers to specific parts of you html. for example:

	<div ng-controller='MyCtrl'>
	</div>

	<div ng-controller='NxtCtrl'>
	</div>

Here, an instance of the MyCtrl controller is created for the first div and, similarly, the second div gets an instance of NxtCtrl. This gives you access to the functions and variables in that controller but only within that div. A controller would be setup in you app.js file as such:

	var myApp = angular.module('myApp', [])

	myApp.controller('MyCtrl', ['$scope', function($scope){
		var hello = 'boobs';
		}]);

Here we first created our ng-app module, 'myApp'. This is done simply by giving this module a name and then articulating its dependencies. Then, we call myApp.controller which will accept two paramaters: the name of the controller and a collection. 

The collection will hold all of the dependencies (?) and then a function which holds all the variables and functions that belong to that controller.
In the above example MyCtrl hold a single variable called hello.

If we wanted to use this variable in out html we simply call it within two curly brackets. for example:

	<div ng-controller='MyCtrl'>
		<h2>{{hello}}</h2>
	</div>

This will result in:
	<div>
		<h2>boobs</h2>
	</div>


The End.

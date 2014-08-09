---
layout: post
title: Angular Scoping
cover: cover.jpg
date:   2014-08-09 12:00:00
categories: posts
---

Say you have a directive as such:

	var myApp = Angular.module('myApp', []);

	myApp.directive('aDirective', function(){
		return {
			restrict: 'EA',
			template: '<input type='text' ng-model="aVariable"> <div>{{aVariable}}</div>'
		}
		});

Here, this directive can be written as either an element or an attribute, and the directive will replace the html element with what is pronounced in the template, i.e the input and div elements.

so if our html looks like this:

	<div ng-app='myApp'>
		<aDirective></aDirective>
	</div>

it will be compiled into:

	<div ng-app='myApp'>
		<input type='text' ng-model="aVariable"> 
		<div>{{aVariable}}</div>
	</div>

Now, whatever, i put into my input will become aVariable throughtout the application. This is because we failed to set a scope for the directive. If we want aVariable to be specific for each time we employ the directive, then it needs to be written, as such:

	myApp.directive('aDirective', function(){
		return {
			restrict: 'EA',
			scope: {},
			template: '<input type='text' ng-model="aVariable"> <div>{{aVariable}}</div>'
		}
	});

this suggests an isolate scope and maintains the variable within this instance of the directive only.


## The @ sign

What if we have a new directive that looks like this

	myApp.directive('bob', function(){
		return {
			restrict: 'EA',
			scope: {},
			template: '<div>{{foo}}</div>'
		}
	});

We can feed the variable foo from outside as follows:

	<div ng-app='myApp'>
		<bob foo='jam'></bob>
	</div>

But in order for this to work we must elicit that we are importing this variable in our scope, so our directive now looks like this:

	myApp.directive('bob', function(){
		return {
			restrict: 'EA',
			scope: {
					foo:'@'
				},
			template: '<div>{{foo}}</div>'
		}
	});

Thus our template will render into:

	<div>jam</div>



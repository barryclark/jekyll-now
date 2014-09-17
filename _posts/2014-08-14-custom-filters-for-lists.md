---
layout: post
title: Custom Filters For Lists
cover: cover.jpg
date:   2014-08-14 12:00:00
categories: posts
---


In this blog we're going to make a basic custom filter for a list. Say you have several people and their city of origin and you'd like to be able to click a button that will filter for people that are only from, say, Chicago. 
So let's take a look at what we have in terms of the basic app. Our main.js starts off by declaring the app, and then a controller with an array of people objects:

	main.js

```html
var myApp = angular.module('myApp', []);

myApp.controller('MyCtrl', function(){

	this.people = [
		{name: 'fatima', city: 'nyc'},
		{name: 'mike', city: 'chi'},
		{name: 'abdul', city: 'la'},
		{name: 'jan', city: 'la'},
		{name: 'igor', city: 'chi'},
		{name: 'jamal', city: 'la'}
	];

});
```


On the index.html end we have a basic skeleton

```html
<div ng-app="myApp">
 	<div ng-controller='MyCtrl as ctrl'>

 		<ul>
 			
 		</ul>

 	</div>
 </div>
```



Here, weve declared the app and used the 'controller as' syntax to identify our controller. Now, lets iterate through the array so we can list out each of the peeps and the cities from which they come:

```html
<ul>
	<li ng-repeat='peeps in ctrl.people'>
   				{{peeps.name + ' - ' + peeps.city}}
  </li>
</ul>
```



now lets create a simple input that will filter based on whatever is typed:

```html
<input type='text'>
```


to tie this to the list we'll have to give it an ng-model value that we can then connect to the li's. so our input ends up looking like this:


```html
<input type='text' ng-model='ctrl.search.val'>
```


to connect this to the unordered list we simply add a filter into the ng-repeat declaration:

```html
<li ng-repeat='peeps in ctrl.people | filter:ctrl.search.val'>
   				{{peeps.name + ' - ' + peeps.city}}
</li>
```


Easy. Now our input field should affect what is seen on the list. Well, what if we wanted to only see people that are from chicago, or LA. We would need to create a custom filter for this:


```html
myApp.filter('ifCity', function () {

});
```



now, within this filter, we need to return a function, which, when called on an array, will pass in that array as a paramater like so:


```html
myApp.filter('ifCity', function () {
	return function (items) {

	}:
});
```


Now that we have the basic skeleton of our filter lets think about how we might implement a filter like this. Well, to start off we'll probably need a button that when clicked will change some variable. Our filter can watch out for this variable and if it changes to 'chicago', then it will apply that change. so lets create that variable in our controller:


```html
myApp.controller('MyCtrl', function(){

	this.city = ''

	this.people = [
		{name: 'fatima', city: 'nyc'},
		{name: 'mike', city: 'chi'},
		{name: 'abdul', city: 'la'},
		{name: 'jan', city: 'la'},
		{name: 'igor', city: 'chi'},
		{name: 'jamal', city: 'la'}
	];

});
```


	

so lets first create a button in our html that calls a method, let's call it findThisCity(), when it is clicked. It also passes in a parameter to change our city variable into the name of the city that we want to target. this means we'll be using ng-click:


```html
<button ng-click='ctrl.findThisCity("chi")'>Find People in Chicago</button>
```



So now let's create that function in our controller: 


```html
this.findThisCity = function(new_city){
	this.city = new_city
}
```


awesome so now we have a button that, when clicked will change the variable, city, into a particular string. So if city = 'chi' we will want to filter for only chicago residents. If city = '', then nothing has been assigned and our custome filter will let everything through.

So going back to the filter, it would only make sense for us to know what that variable is equal to, so we can filter accordingly. So we must pass in another parameter to our filter making it look like this:


```html
myApp.filter('ifCity', function () {
	return function (items, city_name) {

	}:
});
```




now let's iterate through each person in our array and check to see if that person.city is equal to city_name. But we also want to make sure that if city_name is an empty string that the filter does not change the landscape:


```html
if (city_name.length > 0) {
	var filtered = [];
  for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.city == city_name) {
        filtered.push(item);
      };
  };

  return filtered;

	}
else {
	return items
}
```


this will make our entire filter look like this:



```html
myApp.filter('ifCity', function () {
  return function (items, city_name) {
  	if (city_name.length > 0) {
  		var filtered = [];
	    for (var i = 0; i < items.length; i++) {
	      var item = items[i];
	      if (item.city == city_name) {
	        filtered.push(item);
	      }
	    }
	    return filtered;
  	}
  	else {
  		return items
  	}
  };
});
```


Now in order to apply the filter we simply chain it to the end of the previous filter we created for our input field. thus our unordered list element will look like this:


```html
<ul>
		<li ng-repeat='peeps in ctrl.people | filter:ctrl.search.val | ifCity:ctrl.city'>
			{{peeps.name}} - {{peeps.city}}
		</li>
</ul>
```


All done! Now when we click the button we should see a list that only shows chicago kids. We can create another button that will reset the list to it's entirety using the same methods:


```html
<button ng-click='ctrl.findThisCity("")'>Find all</button>
```


Thas wassup (:

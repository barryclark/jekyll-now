---
layout: post
title: Angular Plumber
cover: cover.jpg
date:   2014-08-06 12:00:00
categories: posts
---

I am in the process of learning Angular JS and figured it would be useful to explain the basics of how to setup things with angular. Angular is an excellent tool to use if you're interested in creating one-page apps that are snappy as fuck. 

My experience thus far has been in Rails, so throughout this post i will be comparing how the rails network is setup and how that differs from Angular. I will also eventually make a post on how to integrate Angular into your rails app.

In order to learn Angular one of the many resources i used was www.angularcourse.com, so definitely check that out.

## Your Skeleton

Typically with rails you can build an entire skeleton for your app with a simple 'rails new' command. To my knowledge, this is not the case with Angular. So in order to get started with a skeleton, you can fork one off of github and then clone that down to your local environment. I used the repository below to gather my skeleton.

[a link](https://github.com/fredsa/appengine-angular-seed-python)



## Routes

In rails all the routes for your app were housed in config/routes.rb. In angular, however, routes will be positioned in the app.js file. For each additional route that you;d like to add to your app, simply add:

$routeProvider.when('/your_url',
      {templateUrl: 'partials/waitlist.html',
       controller: 'WaitlistControllera'})

route provider accepts two arguments: the url you'd like to address ('/your_url') and an object that indicates the template for the url and the controller.

Interestingly, angular also offers an 'otherwise' clause that addresses what happens when a url is entered that doesn't match any of the urls that were addressed:

$routeProvider.otherwise({redirectTo: '/'});

We can use otherwise as a catchall and redirect them, say, back to the homepage.

---
layout: post
title: Angular, This is how we do it 
---
 
If you are new to Angular but familiar with AngularJS, then this is for you.

I will not go over into great detail what a component/service or guards are because I assume you already have a rudimentary understanding of they are.

This guide is for people who want to learn how to make a cohesive real world app that takes advantage of Angular.

# What we will be using
- Angular 
- Angular CLI

# Let's get started
We will be using the Angular CLI do create our app. So lets run 

```
ng new portfolio --routing
```

we are going to call our app "portfolio", we also added the `--routing` flag so the CLI will create a routing-module in our app module for us.

### Serve the app
now that we have an Angular app lets fire it up.
to do this we will run 

```
ng serve 
```

this will run our app by default on the port 4200 so if go to our browser and go to `localhost:4200` we should see:

![App Works]({{ site.baseurl }}/images/AngularThisIs/app-works.png)

# Create our first module
We are going to create a home module. Our home module will contain components such as our Dashboard or any other components that do not need to be behind a login screen.

We will later create an admin module for component that need to be hidden behind a login.

To create the home module we will use the CLI, navigate the the app directory and run.

```
ng g module home --routing
```

![Home Module Create]({{ site.baseurl }}/images/AngularThisIs/home-module-create.png)

## add our home module to app module
we will need to tell our module about our newley created home module.
So lets import our home module. 

```javascript
import { HomeModule } from './home/home.module';
```

Then you will want to add it to the list of imports in @NgModule delcartion of the App Module

```javascript
imports: [
  /* other imports removed for brevity */
  HomeModule,
]
```






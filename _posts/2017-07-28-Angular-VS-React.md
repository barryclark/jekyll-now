---
layout: post
title: Angular VS React
subtitle: Tips and Tricks
category: dev
tags: [frontend, development]
author: Bianca Gauca
author_email: bianca-vasilica.haufe@haufe-lexware.com 
header-img: "images/angular-vs-react/AngularVSReact-header.png"
---


A couple of months ago I had the chance to be involved in two new web applications, one with React and the other one with Angular 4. I had previous experience with Javascript, but mostly with JQuery, JQuery Mobile, ThreeJs and a little bit of AngularJS. Working with these 2 tehnologies at the same time it was chalenging and fun, but at the same time I was able to make a comparison between them. And, as a matter of fact, now I can share with you what I have learned, similarities and differences between React and Angular.

First, a brief look on the differences:

![Angular VS React](/images/angular-vs-react/AngularVSReact.png)
 
**Definition**

Let’s start with the begining. What is React? And what is Angular?

**React**:  „A Javascript library for building user interfaces” 

**Angular**: „A framework for building client applications in HTML and either JavaScript or a language like TypeScript that compiles to JavaScript.” 

So **Angular** is a framework with lot of things already built in, like [HttpClient](https://angular.io/guide/http#httpclient) to make HTTP requests, [Routing and Navigation](https://angular.io/guide/router#routing--navigation),  [Animations](https://angular.io/guide/animations) and others. It is based on modules which are boxing components and services.

**React** is a Javascript library, that can be used either to create new applications, either to integrate it with an existing application. React is based on small and reusable components, that manage their own state, then compose them to make complex UIs.  Even if React is not that complex as Angular, with many stuffs built in, there are a lot of libraries that can be added to have routers([react-redux](https://reacttraining.com/react-router/)) and HTTP requests([axios](https://github.com/mzabriskie/axios)), and a lot more others.

**Templating**

So first, let’s see how a component looks in React and in Angular, with a Hello World example.

**React**:

HelloWorld.js
```javascript
import React from 'react';
import './HelloWorld.css'; //import component style

class HelloWorld extends React.Component {
    render () {
        return (
            <div>Hello, { this.props.name }</div>
        )
    }
}

export default HelloWorld;
```

**Angular**:

hello-world.component.ts
```javascript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent {
  @Input() name = 'test';
}
```

hello-world.component.html
```html
<div>Hello, {{ name }}</div>
```


But how React components work? „All React components must act like pure functions with respect to their props.” Basically a React component receives inputs as props and returns the results with the render() function. It is pretty flexible to write a React component, it can be written as a function or as a class, you can use JSX for the returned component view, or a Javascript object. A React component written as a class has more features, like local state and lifecycle hooks.

React recommends JSX to describe how the UI should look. JSX is a Javascript extension, it looks very simmilar to HTML, but you can embed any Javascript expression by wrapping it in curly braces. More on JSX [here](https://facebook.github.io/react/docs/introducing-jsx.html).

To use the component you just import it in the file where you want to use it, and add it as an HTML tag. React send all the attributes as props to HelloWorld component.
```html
<HelloWorld name="Haufe-Lexware"/>
```
More info about how to write a React component [here](https://facebook.github.io/react/docs/components-and-props.html).

**Tip**: In React, all components should start with a capital letter. Like this React can make the difference between a React component and a normal HTML tag.

Angular components are more structured. Usually they have an HTML file which is the view, a TypeScript file for controlling the template and an CSS file for the styling. Basically the TypeScript file has a simple Javascript class, decorated with the @Component decorator. Component decorator receives an object with the configuration for the new component, like: selector (the tag that will be used to add the component), templateUrl (the html template used by the component), stylesUrls (the style that should be used for the component) and providers (this should be a list with services that are used by the component).
The selector is used to render the component:

```html
<app-hello-world [name]="'Haufe-Lexware'"></app-hello-world>
```

**Tip**: For Angular, having the style per component is a big improvment compared on how CSS works, because the selectors specified in the component style apply only to that component template. In React the component style is just like an usual import, but the style included there is applied to the whole application. So be carefull with the selectors used for CSS in React components.

There are a lot of decorators in Angular like @Component, @Input, @Output, that attach metadata to classes so that it knows what those classes mean and how they should work. 

Lifecycle Hooks – both Angular an React components have lifecycle hooks that can be implemented in order to access key life moments and the ability to act when they occur.


![Component lifecycle](/images/angular-vs-react/AngularVSReact_component_lifecycle.png)
  
**Binding**

A big difference between React and Angular is that React has unidirectional flow, and Angular is 2 way data binding.  This means that in React all data is going only from parent to children, and the data is send as „props”. In Angular, the data is binded in both ways. 

Take the following example of 2 way data binding from Angular. The input value will take the name value, but if the user types in the input, the name property will be updated with the new input value. More on [data binding](https://angular.io/guide/architecture#data-binding).
 
![Angular databinding](/images/angular-vs-react/Angular_databinding.png)

As this 2 way data binding it make it easier to update the application model, it it’s harder to debug the application then in React.

**DOM - Virtual DOM VS Regular DOM**

React is using virtual DOM when is updating the application. We can think of Virtual DOM as React’s local and simplified copy of the HTML DOM. When some component receives new props or the internal state of the component change, React checks the differences between the previuos state of the Virtual DOM and the new one, and then updates the real DOM only with the  modified nodes. More about this process called [Reconciliation](https://facebook.github.io/react/docs/reconciliation.html).

Angular update mechanism is using Zones.js which is a library that patch browser APIs with a lot more functionality, so they can trigger change detection in Angular. Mechanisms that support change detection are: browser events (click, mouseover, keyup, etc), setTimeout() and setInterval(), and Ajax requests. Each Angular component has an associated change detector, which is created at application startup time. When the change detection is triggered, for each expression used in the component template, it will compare the current and the previous value. If they are different the DOM is updated. Long story [here](http://blog.angular-university.io/how-does-angular-2-change-detection-really-work/).

**Application logic and state**

And where is kept the application logic and state of the application? Because we don’t want to combine the view with the model.
Well, Angular is providing Services for the application logic. Yet services are fundamental to an Angular application, there is no definition for them. A Service is a class with a specific purpose. Angular does not enforce you to use services for application logic, but does help you to make the services available to components through [dependency injection](https://angular.io/guide/architecture#dependency-injection).

React has no built in implementation for managing the state, but there are multiple implementation for these, the most common are [Flux](https://facebook.github.io/flux/) and [Redux](http://redux.js.org/). Redux evolves the idea from Flux and is a predictable state container for JavaScript apps. The main principle from Redux is that all the application model has a single source of truth, the Redux store which is a Javascript object tree.

Tip: Redux make it easier to implement browser history with the back button. You just set the store state with the previous state, and then the whole application is updated.

Both thechnologies provide tools that you can use to create a starter project:
-	React: [create-react-app](http://github.com/facebookincubator/create-react-app)
-	Angular: [Angular CLI](https://cli.angular.io/)

Create-react-app and Angular CLI are preconfigured with Webpack to package your application, and support ES6.

And for both of them you can use special Dev Tools to debug your application from the browser:
-	React: [React Dev Tools](https://facebook.github.io/react/blog/2015/09/02/new-react-developer-tools.html)
-	Angular: [Augury](https://augury.angular.io/)

Finally, both technologies are fast. Angular is more structered and is good at declarative solutions, but React is simple to use and flexible. Angular is offering an MVC framework, while React is offering only the view part. Both have plusses and minuses, and it’s a matter of prefference and dependends on what you whant to build, when it comes to choose between the 2 of them. 
React and Angular are both great technologies! I learned a lot the last past months and I’m happy that I started to work with them! 

More on:
-	Official documentation: [Angular](https://angular.io/) VS [React](https://facebook.github.io/react/)
-	[Angular lifecycle hooks](https://angular.io/guide/lifecycle-hooks#lifecycle-hooks)
-	[React lifecycle hooks](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)
-	[Virtual DOM VS Regular DOM](http://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/)



---
layout: post
title: Learning React
subtitle: from a testers point of view
category: dev
tags: [frontend, development]
author: Alina Ionescu
author_email: alina.ionescu@haufe-lexware.com
header-img: "images/learn-react/learn-react-header.png"
---

### **How it all began...**

So, I was at work and I heard we could use a few hours per week to work on a project for personal development.
It should be something that helps our daily business, or else I would have chosen to play some computer game instead. Just kidding.. :P

What a wonderful concept, to be able to try something new, not necessarily related to the project you are working on, or even your job title. Because you see, I am a tester and I chose to learn React. And for those who are newbs like me, this is frontend development. Maybe not very impressive for developers with a lot of experience, but definitely a challenge for me.

I have some years of experience as a tester. I went through all the stages from manual, to automation, to tester in a devops team. At Haufe I worked with Selenium and C#, HP Tools at the beginning, and the last years with Selenium with Java, docker and go.cd. Recently, I am learning bash and how to work on Linux machines, since it is much friendlier for devops, unlike Windows and learning to write microservices using SpringBoot. So, React, why not?

### **What is React all about?**
In other people's words, React is a user interface library developed at Facebook.
Basically you can write single page web applications with it.
Main competition is Angular framework developed by Google. If you are curious you can read an article written by my colleague Bianca, article that shows a comparison between the two: [Angular vs. React - A comparison](http://work.haufegroup.io/Angular-VS-React/). 

### **How is Javascript different from Java?**
As stated by the guys on [Stackoverflow](https://stackoverflow.com/a/245068)
>Java and Javascript are similar like Car and Carpet are similar.

I will not go into more detail... :D

### **A few concepts**
#### Arrow functions

>An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target. These function expressions are best suited for non-method functions, and they cannot be used as constructors.

Here is an example of a normal function and its corresponding arrow function:

```
function square (x) {
    return x * x;
};
const squareArrowFunction = (x) => x * x;
```

Both can be used.

#### State & Props

```state``` and ```props``` are two types of data that control a component.
While ```props``` values never change, ```state``` is being used for data that is going to change. 

For example:
Let's say one of our components displays a list of items. 
The ```props``` contains an array of items,
and ```state``` contains a property called ```noItems``` its default value being ```false```.
When the component mounts, we check the value of ```this.props.items```.
If it's ```undefined```, we set ```noItems=true;```.
When the component renders, based on the value of ```noItems``` we either show a message (No items are available) or we display the list of items.

#### Redux
Redux is a widely used library that handles application state management.
For more details check my colleagues' articles: 
- [Building a serverless web app](http://work.haufegroup.io/Serverless_single_page_apps_with_AWS_React_and_Redux/)
- [Introduction to React with Redux and Redux Thunk](http://work.haufegroup.io/intro-redux/)

### **Your React App in 7 simple steps**
So if you want to start a simple react app here is what you can try:
1. Clone this [boilerplate](https://github.com/AlinaIo/react-boilerplate) and run:
```npm install```
to generate all required dependencies.
2. Create Components for each part of your application
Split your application in reusable components. For example, in a ToDo application, you write a Todo Component and it will be called for each new todo item.
![](/images/learn-react/Components.png)

Component example:

```
import React from 'react';
import * as Redux from 'react-redux';

import TodoList from 'TodoList'
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';

export class TodoApp extends React.Component {
  render () {
    return (
      <div>
        <h1 className="page-title">Todo App</h1>
        <div className="row">
              <TodoSearch/>
              <TodoList/>
              <AddTodo/>
        </div>
      </div>
    )
  }
};

export default Redux.connect()(TodoApp);
```

3. To build the application locally run:
```webpack``` or ``` webpack -w``` if you want to rebuild at every change
then to run it:
```node server.js```
and the application will be available at: http://localhost:3000/
4. Style your application. 
For styling you can use [Foundation](https://foundation.zurb.com/) or [Bootstrap](http://getbootstrap.com/) or any other styling framework you prefer. There are many examples and documentation available.
5. Test your application.
It is a very good practice to write unit tests for your application.
You can easily catch problems when changes occur. Trust me I'm a tester ;)
For example, below you can see 2 tests. One that tests the TodoApp component exists and it correctly renders the TodoList.
Component test example:

```
var {Provider} = require('react-redux');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var configureStore = require('configureStore');
import {TodoApp} from 'TodoApp';
import TodoList from 'TodoList';

describe('TodoApp', () => {
  it('should exist', () => {
    expect(TodoApp).toExist();
  });

  it('should render TodoList', () => {
    var store = configureStore.configure();
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <TodoApp/>
      </Provider>
    );

    var todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0]
    var todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);

    expect(todoList.length).toEqual(1);
  });
});
```

6. Use [Firebase](https://firebase.google.com/) as backend.
Firebase has a lot of interesting features you can use. Like authentication, database, etc.
7. Deploy your application to production.
This can very easily be done with [Heroku](https://www.heroku.com/).
After installing heroku and logging in you only have to run:
```git push heroku master```
and your code is Live.
Here is [mine](http://immense-meadow-56655.herokuapp.com/).

For further reference I recommend following tutorials:
- [The Complete React Web App Developer Course](https://www.udemy.com/the-complete-react-web-app-developer-course/learn/v4/overview)
- [The Complete React Web Developer Course (2nd Edition)](https://www.udemy.com/react-2nd-edition/learn/v4/overview)
- [ES6 Javascript: The Complete Developer's Guide](https://www.udemy.com/javascript-es6-tutorial/learn/v4/overview)
- [Foundation documentation](https://foundation.zurb.com/sites/docs/)

### **Challenges**
Here are some challenges I have encountered:
- Learning Javascript. 
- Understanding the concepts in React and thinking in a more functional way.
- Fixing dependencies versions conflicts.
- Finding time to practice, because you forget if you don't practice.
For most of the challenges I could find answers on the internet. 
The community, resources and documentation are great.

### **Conclusions**
After following the tutorials, I feel more confident that I can write a simple web application by myself. I hope I will have the opportunity to use what I have learned in a project at work and sharpen my React skills :)

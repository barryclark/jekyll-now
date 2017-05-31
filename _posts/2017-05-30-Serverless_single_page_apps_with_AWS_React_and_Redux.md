---
layout: post
title: Building a serverless web app
subtitle: Serverless single page apps with AWS, React and Redux
category: conference
tags: [culture, serverless, cloud]
author: melania_andrisan
author_email: melania.andrisan@haufe-lexware.com 
header-img: "images/bg-post-clover.jpg"
---

### Background story

I had a presentation last week at [ITCamp](https://itcamp.ro) about Serverless single page apps and you can find the slides on [SlideShare](https://www.slideshare.net/melaniadanciu/serverless-single-page-apps-with-react-and-redux-at-itcamp-2017). ITCamp is a very interesting conference with 40+ speakers, 40+ sessions and 500+ attendees. It had a lot of interesting topics with very curious attendees. My presentation was about my journey into building a Serverless project with no servers to manage for backend and frontend. 

It all started with a prototype in .Net Core which showed us the main components of our app. And yes, .Net Core, because I am a .Net developer under cover :). I love C# and the powerful .Net framework but going back to our app…

Here are some challenges:
- The app manages different types of data created by the user and has a relatively strong relation between entities.
- The app should be scalable and easily deployable with low cost of maintenance
- The hosting cost should be as little as possible
- The development should be easy, modern and fast

There are hundreds of solutions for this problem and I picked one which I will try to present to you in the next lines.
And to add one more challenge I was asked what does it mean to use Lambda for this project. And when I say Lambda, it's not the Lambda from .Net, it's AWS Lambda Functions.

Having also this last thing and having some knowledge about micro-services, SOA and static websites I decided to go all Serverless. There are a lot of books on this topic, a lot of articles and hundreds of pages of documentation on Amazon docs about their offer. The backend is done using Lambda Functions and I already wrote about them in [my last blogpost](http://dev.haufe.io/Serverless_with_AWS_at_DevTalks/). 
 
### And now the Static Website

First challenge: the Frontend - making it a Static Website. In a nutshell this means I should be able to have the entire website deployed as HTML pages with some JavaScript files and CSS files, and all the data needed should be requested using AJAX calls with no server rendering whatsoever.
Again the question is what to use for data binding, templating, and all of that:
1. Plain old JavaScript(or new JavaScript) with HTML. I think this might be a solution when the UI is no so dynamic and the user interaction is not so big
2. Angular: I used Angular 1 in a previous project and the beauty of having two way bing is cool but also comes with strange bugs and not easy unit tests
3. React: New for me and incredibly attractive together with Flux/Redux(coming back to these  2 a little bit later)
4. A lot others like Backbone, Vue.js, Knockout and here you can find a small list and [a comparison between 9 of them](http://engineering.paiza.io/entry/2015/03/12/145216)
For sure there are plusses an minuses for all of them and the one thing which made me start with React was the way in which it is modularised and easy to test. And on top of this Facebook offers a [create-react-app](https://github.com/facebookincubator/create-react-app) starting project with everything that you need to have a Static Website up and running in a couple of minutes. 
I recommend learning React starting from scratch and then moving to one of the starter kits.

### Writing code and building the Website

Here I will add a couple of things which I found interesting related to creating a React app, developing it and topics related to UI Templates, what is a component and how state and props work for that component and how do I manage the data flow using Redux. 

First the create and develop using create-react-app

There are multiple elements of create-react-app integrated in our app and I will just highlight some: 
- It uses Webpack and when deploying the app you will have a `build` folder with one `.html`, one `.js` and one `.css` file and a folder with you theme if needed.  
- Available scripts from it:
    - `npm start` - to start your project and have hot reload 
    - `npm build` - to create a deliverable build folder which can be deployed on a file storage
    - `npm test` - to run the tests and have to reload for them 
- Writing code using ES6 with Babel
- Using [loadash](https://lodash.com/) for better performance when working with arrays
- More on create-react-app [readme page]( https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)

### UI with React and [Redux](http://redux.js.org/)

Now moving on to creating the UI and display the data in it using React and Redux.

'[React](https://github.com/facebook/react) is a JavaScript library for building user interfaces.'

'Redux is a predictable state container for JavaScript apps.'

As the quotes say, React is used to build the UI and Redux is used to manage the state of the application. 

#### UI templates with JSX

First create the UI using JSX or createElement(…), you can choose either of them I chose JSX and I will tell you why: 
Almost all the examples on the web related to React are built with JSX. JSX is like writing XML/HTML in JS, and after a couple of days of writing it it doesn’t look wrong anymore :).

It looks like this:

```
import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default function LoaderButton({ isLoading, text, loadingText, disabled = false, ...props }) {
  return (
    <Button disabled={ disabled || isLoading } {...props}>
      { isLoading && <Glyphicon glyph="refresh" className="spinning" /> }
      { ! isLoading ? text : loadingText }
    </Button>
  );
}
```

'Each JSX element is just syntactic sugar for calling React.createElement(component, props, ...children). So, anything you can do with JSX can also be done with just plain JavaScript.'

And yes, this is JavaScript; JS compiled with Babel. And because it's more like JS then HTML it uses camelCase property convention, and a nice thing about this is that it prevents injection Attacks, by default it escapes and embedded value. More about [Cross-site scripting on wiki]( https://en.wikipedia.org/wiki/Cross-site_scripting)

[There are many interesting things](https://facebook.github.io/react/docs/rendering-elements.html) which I found when learning React and one of them is linked to Elements and Components. All React elements are immutable. Once you create an element you cannot change its children or attributes. And even though it recreated the element when it needs to be changed it updates the UI with only what is necessary.

#### State and Props in React

You can [read from here about state and props](https://facebook.github.io/react/docs/state-and-lifecycle.html) in React and I will just highlight some points I found interesting:
- First is about props, they are Read-Only, the component must never modify its own props.
'All React components must act like pure functions with respect to their props'. To change the date within a React app you need to understand the concept of state and manage it properly. The state is private and fully controlled by the component. 

- Another is … Be a good citizen and free the space when you don’t need it using `componentWillUnmount()`.[More about it here.](http://codepen.io/gaearon/pen/amqdNA?editors=0010) 

- When you `setState()` you are not forced to change the entire state, you can change just a property of the state and the state is merged. 

- And now a cool one: [data flow is unidirectional](https://facebook.github.io/react/docs/lifting-state-up.html), just one component can own the state and send it to its children as props, but only that one component which owns the state can manage that data. There should be a single ‘source of truth’ for any data that changes in a React app. 

- 'You have to be careful about the meaning of this in [JSX callbacks](https://facebook.github.io/react/docs/handling-events.html). In JavaScript, class methods are not bound by default. If you forget to bind this.handleClick and pass it to onClick, this will be undefined when the function is actually called.' 


 - In React there can be [Components, Elements and not so much Instances](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html), ‘An element is a plain object describing a component instance or DOM node and its desired properties.’

- ‘A functional component is less powerful but is simpler, and acts like a class component with just a single render() method. Unless you need features available only in a class, we encourage you to use functional components instead.
However, whether functions or classes, fundamentally they are all components to React. They take the props as their input, and return the elements as their output.’

In the end React just builds the Virtual DOM Tree which contains Elements. 

#### And now about Redux
There are some very nice videos related to Redux and here are 2 of them:
- Dan Abramov - [Live React: Hot Reloading with Time Travel at react-europe 2015](https://www.youtube.com/watch?v=xsSnOQynTHs)
- Dan Abramov - [The Redux Journey at react-europe 2016](https://www.youtube.com/watch?v=uvAXVMwHJXU) 

First I used Flux for data flow, but for me Flux was too flexible and too verbose. And after a couple of days of playing with it I started looking for some structure and the structure of Redux I liked the most. Redux is Reducers + Flux. It uses a lot the concepts from functional programming and I will recommend to check them out before starting writing your app.

The main elements of Redux are: Reducer, Store and Actions. 
The Reducers are Pure functions, this pure function get as params the state and the action to change the state and base on action it returns a new state object. Here is one example. 

```export default function displayReducer(state =InitialState.display, action) {
    switch (action.type) {
        case ActionTypes.DISPLY_CONTACT:
            return { ...state, selectedContact: action.contact }
        default:
            return state;
    }
}
```

The Store is the single point of truth, is the place where you store your app state and the store is also able to dispatch actions and to register receivers. Here is how you configure it:

```export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            //handle async actions lin API calls
            applyMiddleware(thunk),

        )        //for dev mode applyMiddleware(reduxImmutableStateInvariant())
    );
}
``` 

And of course there are the Actions, which are the events which are called when you want to change the state. Actions are just simple functions which return the type of the action and a playload, for example when I create a contact I return the `CREATE_CONTACT_SUCCESS` and the payload, which in this case is the created contact. 

```export function createContactSuccess(contact) {
    return { type: ActionTypes.CREATE_CONTACT_SUCCESS, contact: contact }
}
```

In my app I have different folders for every component: one for actions, one for reducers, and one for store. 

I am using also REDUX_DEVTOOLS and I configured it in my store. With it you do not need `console.log()` to see what is happening with your actions, store state, go back to a particular state and even copy a unit test from there.

And this is Redux: it's very simple to use because if you want to create an action you go to actions folder create a function for it and that's it, if you want to handle these actions you create a reducer and that it. You can change your app state just in reducer, so if something is wrong with you date have a look in your reducer. 


### Unit testing
Unit testing is done with Jest(as test runner) [Enzyme](https://github.com/airbnb/enzyme) as test framework, [Expect](https://github.com/mjackson/expect) as assertion library and [sinon](http://sinonjs.org/) as mock library. I know that a lot of developers choose between Jest and Enzyme but is nothing to choose for and for a complete explanation read this [very good article](https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8). 

You can use [react-test-renderer](https://www.npmjs.com/package/react-test-renderer) for snapshot testing or you can use the renderer from Enzyme, we choose to use the renderer from Enzyme and doing so we are testing using assertions.

Snapshot testing is another new idea from Facebook. It provides an alternate way to write tests without any assertions. To write tests using assertions, Enzyme is quite useful.

A not so nice thing about behaviour testing is that you cannot simulate a button click in a form :(, see the [issue](https://github.com/airbnb/enzyme/issues/308).

And to test Redux properly you can have a look at [this article first](http://academy.plot.ly/react/6-testing/). 

### Style guide
To write proper JavaScript is interesting, and if you are alone on your project most probably you will have a consistent code. But having more than one member in the project and keeping the code consistent is challenging. This for sure screams for a coding style guide. What we have is our project is the style guide is from [Airbnb](https://github.com/airbnb/javascript/tree/master/react):
- Always start a component name with a capital letter
- All the component properties are camelCase written
- The test file for a component is ComponentName.test.js

### Some last words

This is for sure a change in your mindset, and you need to focus on your main functionality and use everything else as service. On the client, you need to change your implementation into functional programming and being stateless and immutable. We need to work with very small components, reusable, easy to test, easy to build and change being it on the server or on the client.   

### Other Resources

- [The State of Serverless](https://www.youtube.com/watch?v=AcGv3qUrRC4) 
- [Getting started with Serverless Architecture](https://www.youtube.com/watch?v=OI_V6OZZkZM)
- [Serverless Architecture patterns](https://www.youtube.com/watch?v=b7UMoc1iUYw)
- [From Monolith to Microservices](https://www.youtube.com/watch?v=oRIYtOsAlzk) - 
presenting Gilt 
- [Create React app with a server](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)



---
layout: post
title: Working With React and Flux
---

![React and Flux](http://no-kill-switch.ghost.io/content/images/2015/06/react.png)

Recently, I've been learning a lot about React and Flux while developing a full-stack web application. 
React is a JavaScript library for building user interfaces, and revolves around the idea of writing your components 
in a very declarative way. It can be thought of as the "View" portion of the Model-View-Controller pattern.
Flux is a pattern also developed by Facebook for building web interfaces - it utilizes
the concept of unidirectional data flow, which complements React's components quite well. In this post, we'll take a quick 
look as to how React and Flux can work together to create the components of a dynamic, responsive web application. I've learned a lot of this through the excellent [React Tutorial](https://facebook.github.io/react/docs/tutorial.html) and applied my knowledge through following along a [tutorial to create a full-stack app](https://facebook.github.io/react/docs/tutorial.html), both of which are excellent resources to check out. 

### React Overview
[React](https://facebook.github.io/react/) is a powerful UI library developed at Facebook that uses an innovative diff algorithm to efficiently re-render components when
data changes. With React, we don't interact with the DOM directly - instead, React uses the concept of a Virtual DOM, which is just an abstract, 
lightweight representation of the actual DOM. This virtual DOM can then be manipulated and then saved to the real DOM tree. A major advantage of React
is that this is done in an efficient way through the diffing algorithm used under the hood. The algorithm calculates the minimum number of elements 
it needs to update, and then efficiently re-renders the component by only applying these changes to the actual DOM. Calculating the diff between two trees (or more specifically, the "edit distance" between two trees) is a O(n^3) problem, but React uses heuristics based on a few practical use-case assumptions to bring it down to O(n). For more on that, check out the [Docs](https://facebook.github.io/react/docs/reconciliation.html).

React also has a few other notable features that make it pretty useful: 

- Server-side rendering of components. Since React doesn't require the actual DOM tree as a dependency, you can render your components on the server as opposed to the client-side, and then just send the resulting HTML instead of having the client download and execute additional JavaScript. This could reduce perceived page load times. 
- Declarative style: components and elements allow you to write your component's render() function in a declarative way. 
- Reusability and composability: React's components naturaly lend themselves to be reusable if they are designed well (for example, ensuring each component has only a single responsibility), and are therefore easy to compose with other components to quickly build complex user interfaces. 

### Flux Overview
[Flux](https://facebook.github.io/flux/) is a pattern that complements React and the idea of unidirectional data flow. It's used internally at Facebook and is commonly paired with React. It's componsed of four components: Actions, Dispatcher, Store, and Controller Views, which manage the flow of data through an application and define what picks it up along the way. There's many implementations of Flux, and the one I've been using is Alt.js. 

## React + Flux Example
Let's create a simple React component, along with actions and a store for it. The store will be responsible for listening for actions and updating the state of our componenet accordingly. We'll subscribe our React component to the store so that it knows about changes in the store, and can update its own state accordingly. Also, we'll define a few actions that fetch data and notify the store about whether the data fetch was successful or not. Let's get started with these actions first, which are placed into a file called `MyComponentActions.js`:

<script src="https://gist.github.com/rohan-varma/c76af8ce80cc1e99597c3521339a8aa4.js"></script>

Here, we've defined three actions, one of which requests data from our backend, and two of which notify our store about the request's success or failure. Note that we haven't yet handled these two actions - that'll be done when we define our handlers in the store. The store will also bind our actions to their handlers - sort of like a mapping from an action to the action handler. We'll revisit this when we define our `MyComponentStore` class. The last line of the above code simply exports our actions so that they can be imported elsewhere. 

### Defining the Component Store
Now, we can move on to defining a store for our React componenet. The store will be responsible for handling the actions we've defined and updating the state accordingly, so that our componenet can listen for state changes. Let's put this code into a file called `MyComponentStore.js`:
<script src="https://gist.github.com/rohan-varma/e580bd6ce605c838e5ed77454d9a540e.js"></script>

Here, `bindActions` is an Alt function that binds actions to their action handlers, with a specific naming convention. As an example, an action with name `doAction` will bind to `onDoAction` or just `doAction` (but not both). In this case, when our `getMyMembersSuccess` action occurs, the code in the handler `onGetMyMembersSuccess` will be executed and the members field of the state will be updated. With our actions and store defined, we're ready to define our actual React componenet. 

### Creating the React Component

Our React componenet will fire off actions (such as, in our example, getting members from the backend) and listen to the store for state changes. When our componenet is initially rendered, it sets its initial state to the store's state, and also subscribes a listener to the store to listen for changes so that its state can be updated accordingly (the `OnChange` function in the code below). Additionally, we can remove our store listener when the component is unmounted. Here's some basic boilerplate code that could be used to design this component:

<script src="https://gist.github.com/rohan-varma/719c4d36d1660710fc20e87e379d5be2.js"></script>

And that's it! Hopefully, this was a good example to introduce how React and the Flux pattern work together to achieve unidirectional data flow, and how firing and handling actions update our component's store. [This full-stack tutorial](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/) is an excellent resource for learning more about React, Flux, and using Node to develop a full-stack app. 

### Sources

- [Cloning Yelp with React](https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/)
- [Full-stack React/Node/Mongo tutorial](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/)
- [Getting started with React](https://facebook.github.io/react/docs/getting-started.html)
- [Getting to Know Flux](https://scotch.io/tutorials/getting-to-know-flux-the-react-js-architecture)
- [Adventures With React and Flux](http://no-kill-switch.ghost.io/my-adventure-with-react-flux-setting-sails/)

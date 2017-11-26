---
layout: post
title: Introduction to React with Redux and Redux Thunk
subtitle: How to fetch data from an API
category: dev
tags: [development, frontend, howto]
author: Camil Bradea
author_email: camil.bradea@haufe-lexware.com 
header-img: "images/intro-redux/header.png"
---



### Introduction

Redux, according to the [offical docs](http://redux.js.org), is a predictable state container for JavaScript apps written by 
Dan Abramov. It's a lightweight implementation of Flux, which is another library for managing the state. Basically Redux 
took the ideas that Flux brought in, leaving out its complexity by "borrowing" things from [Elm](http://elm-lang.org/).


For starters, there are several key concepts to understand: store, actions / action creators, and reducers. The official documentation is pretty straightforward and also plenty of examples and nice analogies can be found on the internet.



### Principles

Redux has three fundamental principles:
- single source of truth

    The whole state of the application is stored in an object tree (within a single store). Visualize the state as a "model",
    but without setters. As a plus, a single state tree enables us to debug our application with ease.

- state is read-only

    In order to modify state in Redux, actions have to be dispatched. Actions are a plain JavaScript object that describe what changed, sending data from the application to the store. 


    An action will look like this:
    ```
    {
        type: 'ACTION_TYPE',
        action_value: string
    }
    ```

- changes are made with pure functions

    In order to tie state and actions together, we write a function called a reducer that takes two parameters: the (soon to be previous) state and an action. This pure function applies the action to that state and returns the desired next state.

    Example of a reducer:
    ```
    export function reducer(state = '', action) {
        switch (action.type) {
            case 'ACTION_TYPE':
                return action.action_value;
            default:
                return state;
        }
    }   
    ```

    **Important:** Reducers do not store state, and they do not mutate state. You pass state to the reducer and the reducer will return state.

**Tip:** As a best practice, even though it's possible to have a single reducer that manages the transformation done by every action, it is better to use reducer composition - breaking down the reducer into multiple, smaller reducers, each of them handling a specific slice of the application state.



### How it works

When one action is dispatched to the store, the combined reducer catches the action and sends it to each of the smaller reducers. Each smaller reducer examines what action was passed and dictates if and how to modify that part of state. You will find an example of a combined reducer a bit later in the article.

After each smaller reducer produces its corresponding next state, an updated state object will be saved in the store. 
Because this is important, I'm mentioning again that the store is the single source of truth in our application. Therefore, when each action is run through the reducers, a new state is produced and saved in the store.

Besides all of this, Redux comes up with another concept, action creators, which are functions that return actions. These can be linked to React components and when interacting with your application, the action creators are invoked (for example in one 
of the lifecycle methods) and create new actions that get dispatched to the store.

```
    export function actionCreator(bool) {
        return {
            type: 'ACTION_TYPE',
            action_value: bool
        };
    }
```



### Fetching data from an API

Now onto our application. All of the above code snippets were just examples. We will now dive into the important bits of the 
code of our app. Also, a github repo will be available at the end of the article, containing the entire app.

Our app will fetch (asynchronously) data that is retrieved by an API - assuming we already built and deployed a working API, 
how convenient :) - and then display the fetched data as nice as my UI design skills go (not too far).

TVmaze's public API contains tonnes of data and we will fetch all the shows they have ever aired. Then, the app will display 
all the shows, toghether with their rating and premiere date.

**Designing our state**

In order for this application to work properly, our state needs to have 3 properties: `isLoading`, `hasError` and `items`.
So we will have one action creator for each property and an extra action creator where we will fetch the data and call the other 3 action 
creators based on the status of our request to the API.

**Action creators**

Let's have a look at the first 3 action creators:

```
    export function itemsHaveError(bool) {
        return {
            type: 'ITEMS_HAVE_ERROR',
            hasError: bool
        };
    }

    export function itemsAreLoading(bool) {
        return {
            type: 'ITEMS_ARE_LOADING',
            isLoading: bool
        };
    }

    export function itemsFetchDataSuccess(items) {
        return {
            type: 'ITEMS_FETCH_DATA_SUCCESS',
            items
        };
    }
```


The first 2 action creators will receive a bool as a parameter and they will return an object with that bool value and
the corresponding type.

The last one will be called after the fetching was successful and will receive the fetched items as an parameter. This
action creator will return an object with a property called `items` that will receive as value the array of items which
were passed as an argument. Instead if `items: items`, we can just write `items`, using an ES6 syntactic sugar called 
[property shorthand](http://es6-features.org/#PropertyShorthand).


To visualize a bit what was described earlier, this is how it looks in [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension):

![](/images/intro-redux/redux_devtools_action_creators.PNG)



Out of the box, action creators can return just actions. That's where [Redux Thunk](https://github.com/gaearon/redux-thunk) comes in handy. Thunk allows us to have action creators that return a function instead of an action and dispatch an action only in certain cases. 


If it wasn't for Redux Thunk, we would probably end up having just one action creator, something like this:

```

    export function itemsFetchData(url) {
        const items = axios.get(url);

        return {
            type: 'ITEMS_FETCH_DATA',
            items
        };
    }

```

Obviously, it would be a lot harder in this scenario to know if the items are still loading or checking if we have an error.


Knowing these and using Redux Thunk, our action creator will be:

```
    export function itemsFetchData(url) {
        return (dispatch) => {
            dispatch(itemsAreLoading(true));

            axios.get(url)
                .then((response) => {
                    if (response.status !== 200) {
                        throw Error(response.statusText);
                    }

                    dispatch(itemsAreLoading(false));

                    return response;
                })
                .then((response) => dispatch(itemsFetchDataSuccess(response.data)))
                .catch(() => dispatch(itemsHaveError(true)));
        };
    }
```

**Reducers**

Now that we have our action creators in place, let's start writing our reducers.


All reducers will be called when an action is dispatched. Because of this, we are returning the original state in each of our reducers. When the action type matches, the reducer does what it has to do and returns a new slice of state. If not, the 
reducer returns the original state back.

Each reducer takes 2 parameters: the (soon to be previous) slice of state and an action object:

```
    export function itemsHaveError(state = false, action) {
        switch (action.type) {
            case 'ITEMS_HAVE_ERROR':
                return action.hasError;
            default:
                return state;
        }
    }

    export function itemsAreLoading(state = false, action) {
        switch (action.type) {
            case 'ITEMS_ARE_LOADING':
                return action.isLoading;
            default:
                return state;
        }
    }

    export function items(state = [], action) {
        switch (action.type) {
            case 'ITEMS_FETCH_DATA_SUCCESS':
                return action.items;
            default:
                return state;
        }
    }
```

Now that we have the reducers created, let's combine them in our `index.js` from our `reducers` folder:

```
    import { combineReducers } from 'redux';
    import { items, itemsHaveError, itemsAreLoading } from './items';

    export default combineReducers({
        items,
        itemsHaveError,
        itemsAreLoading
    });
```

**Creating the store**

Don't forget about including the Redux Thunk middleware in the `configureStore.js`:

```
    import { createStore, applyMiddleware } from 'redux';
    import thunk from 'redux-thunk';
    import rootReducer from '../reducers';

    export default function configureStore(initialState) {
        const composeEnhancers = 
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
                window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                    // options like actionSanitizer, stateSanitizer
                }) : compose;

        const enhancer = composeEnhancers(
            applyMiddleware(thunk)
        );

        return createStore(
            rootReducer,
            initialState,
            enhancer
        );
    }
```

**Using the store in our root `index.js`**

```
    import React from 'react';
    import { render } from 'react-dom';
    import { Provider } from 'react-redux';
    import configureStore from './store/configureStore';

    import ItemList from './components/ItemList';

    const store = configureStore();

    render(
        <Provider store={store}>
            <ItemList />
        </Provider>,
        document.getElementById('app')
    );
```

**Writing our React component which shows the fetched data**

Let's start by talking about what we are importing here.

In order to work with Redux, we have to import `connect` from 'react-redux':


```
    import { connect } from 'react-redux';
```

Also, because we will fetch the data in this component, we will import our action creator that fetches data:

```
    import { itemsFetchData } from '../actions/items';
```

We are importing only this action creator, because this one also dispatches the other actions to the store.

Next step would be to map the state to the components' props. For this, we will write a function that receives `state`
and returns the props object.

```
    const mapStateToProps = (state) => {
        return {
            items: state.items,
            hasError: state.itemsHaveError,
            isLoading: state.itemsAreLoading
        };
    };
```

When we have a new `state`, the `props` in our component will change according to our new state.


Also, we need to dispatch our imported action creator.

```
    const mapDispatchToProps = (dispatch) => {
        return {
            fetchData: (url) => dispatch(itemsFetchData(url))
        };
    };
```

With this one, we have access to our `itemFetchData` action creator through our `props` object. This way, we can call
our action creator by doing `this.props.fetchData(url);`


Now, in order to make these methods actually do something, when we export our component, we have to pass these 
methods as arguments to `connect`. This connects our component to Redux.

```
    export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
```

Finally, we will call this action creator in the `componentDidMount` lifecycle method:

```
    this.props.fetchData('http://api.tvmaze.com/shows');
```

Side note: if you are wondering why are we calling the action creator in `componentDidMount` instead of other 
lifecycle methods, I have found a couple of good reasons [here](https://tylermcginnis.com/react-interview-questions/):
> You can't guarantee the AJAX request won't resolve before the component mounts. If it did, that would mean that you'd be trying to setState on an unmounted component, which not only won't work, but React will yell at you for. Doing AJAX in componentDidMount will guarantee that there's a component to update.

> Fiber, the next implementation of React's reconciliation algorithm, will have the ability to start and stop rendering as needed for performance benefits. One of the trade-offs of this is that componentWillMount, the other lifecycle event where it might make sense to make an AJAX request, will be "non-deterministic". What this means is that React may start calling componentWillMount at various times whenever it feels like it needs to. This would obviously be a bad formula for AJAX requests.

Besides this, we need some validations:


```
    if (this.props.hasError) {
        return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
        return <p>Loading ...</p>;
    }
```


And the actual iteration over our fetched data array:


```
    {this.props.items.map((item) => (
        // display data here
    ))}
```


In the end, our component will look like this:

```
    import React, { Component, PropTypes } from 'react';
    import { connect } from 'react-redux';
    import { ListGroup, ListGroupItem } from 'react-bootstrap';
    import { itemsFetchData } from '../actions/items';

    class ItemList extends Component {
        componentDidMount() {
            this.props.fetchData('http://api.tvmaze.com/shows');
        }

        render() {
            if (this.props.hasError) {
                return <p>Sorry! There was an error loading the items</p>;
            }

            if (this.props.isLoading) {
                return <p>Loading ...</p>;
            }

            return (
                <div style={setMargin}>
                    {this.props.items.map((item) => (
                        <div key={item.id}>
                                <ListGroup style={setDistanceBetweenItems}>
                                    <ListGroupItem href={item.officialSite} header={item.name}>
                                        Rating: {item.rating.average}
                                        <span className="pull-xs-right">Premiered: {item.premiered}</span>
                                    </ListGroupItem>
                                </ListGroup>
                        </div>
                    ))}
                </div>
            );
        }
    }

    ItemList.propTypes = {
        fetchData: PropTypes.func.isRequired,
        items: PropTypes.array.isRequired,
        hasError: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    const mapStateToProps = (state) => {
        return {
            items: state.items,
            hasError: state.itemsHaveError,
            isLoading: state.itemsAreLoading
        };
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            fetchData: (url) => dispatch(itemsFetchData(url))
        };
    };

    export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
```

And that was all !



Our app will look like this:


![](/images/intro-redux/app.PNG)



I wasn't lying about my design skills, was I ? :)


### Last words and other resources

We now have an app that is fetching data asynchronously from an API, using React for our UI and Redux for managing
the state of our application. I think this is a good starting point for a personal / small project and also you get 
to work with new technologies.

This doesn't mean that Redux is the solution for every problem we face when writing apps in React or that Redux is a 
a must-use in any Javascript written project, as Dan Abramov states in an interesting [article.](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

Also worth noting, Facebook are preparing [React Fiber](https://github.com/acdlite/react-fiber-architecture), a 
reimplementation of React. They state that its goal is to make it more suitable for animations and gestures and 
that the key new feature will be incremental rendering which is:
> the ability to split rendering work into chunks and spread it out over multiple frames

Other interesting technologies (which I'm currently looking into) would be [Relay](https://facebook.github.io/relay/)
and [GraphQL](http://graphql.org/). Maybe I'll also write something about those. Stay tuned :)

### Resources

- [Github repo](https://github.com/bradeac/using-redux-with-react)
- [Redux docs](http://redux.js.org/)
- [Redux video tutorial by Dan Abramov](https://egghead.io/courses/getting-started-with-redux)
- [Redux Thunk](https://github.com/gaearon/redux-thunk)
- [Great article with a nice real-life analogy of why Redux is important and helpful](http://almerosteyn.com/2016/08/redux-explained-again)

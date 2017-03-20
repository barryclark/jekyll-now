---
layout: post
title: How to implement a news feed in React.js - Part 1
ref: react_1
lang: en
---

This is the beginning of a post series about React.js. The goal is to build a news feed with real-time updates. In addition to the front-end, we will also implement a back-end in Rails. This first post is an introduction to React.js. So even if you are not a Rails programmer, this post might be useful to you!

For those getting started in React, the number of technologies and tools available may seem complicated. So let's make it very simple here to make the learning process easier.

Let's build the application step by step and introduce some theoretical concepts of React at the most opportune moment. If you want the application source code, it's available in this [GitHub repository](https://github.com/lutchobandeira/news-feed-react).

Creating the React.js Project
-----------------------------

The easiest way to create a React project is by using the [create-react-app](https://github.com/facebookincubator/create-react-app) . It brings everything we need to our React project:

- [webpack](https://webpack.github.io/) - a module bundler that works very well with npm. It also includes a web server and a file watcher.
- [Babel](https://babeljs.io/) - a javascript compiler that offers support for the latest version of javascript even when browsers do not support it yet.

- [Autoprefixer](https://autoprefixer.github.io/) - a plugin that adds CSS vendor prefixes automatically.

- [ESLint](http://eslint.org/) - a tool that analyzes code and points out any problems.

Let's create the project:

``` bash
$ npm install -g create-react-app
$ create-react-app news-feed
```

Once we are done we can enter the folder and start our server:

``` bash
$ cd news-feed/
$ npm start
```

Done! Our server is available at [http://localhost:3000](http://localhost:3000) (or on another port if port 3000 is already in use).


React Components
----------------

The ```create-react-app``` created a root component named ```App```. We are going to use the opporunity to introduce some concepts of React. Take a quick look at the code below:

<pre class="line-numbers "><code class="language-jsx">
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      &lt;div className="App"&gt;
        &lt;div className="App-header"&gt;
          &lt;img src={logo} className="App-logo" alt="logo" /&gt;
          &lt;h2&gt;Welcome to React&lt;/h2&gt;
        &lt;/div&gt;
        &lt;p className="App-intro"&gt;
          To get started, edit &lt;code&gt;src/App.js&lt;/code&gt; and save to reload.
        &lt;/p&gt;
      &lt;/div&gt;
    );
  }
}

export default App;
<!-- 
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
-->
</code></pre>

Some things we can observe right away:

- Every React component inherits from ```Component```;
- The ```render``` method is implemented;
- There is a HTML-like syntax within the ```render``` method. This is JSX, we'll see next.

JSX
---

```JSX``` is a syntax that React uses to describe its components. In the code of the component ```App``` we note that JSX tag ```div``` is actually a React component that represents the HTML tag ```div```. Because of this similarity, we sometimes get confused and think that "there is HTML inside javascript".

```JSX``` is an extension of javascript, but in XML-style. As we will see next, for each HTML element there is a corresponding React component, ready to be used.

We can think of ```JSX``` as an intermediate syntax that will be converted to javascript, just as SASS is an intermediate syntax for CSS.

What actually converts JSX into javascript is [Babel](https://babeljs.io/]), the javascript compiler included at ```create-react-app```.

The same code converted to javascript would look like this:

``` jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return React.createElement(
      'div',
      { className: 'App' },
      React.createElement('div', { className: 'App-header' },
        React.createElement('img', { src: logo, className: 'App-logo', alt: 'logo' }),
        React.createElement('h2', null, 'Welcome to React')
      ),
      React.createElement('p', { className: 'App-intro' },
        'To get started, edit ',
        React.createElement('code', null, 'src/App.js'),
        ' and save to reload.'
      )
    );
  }
}

export default App;
```

Before we begin our implementation, just a little more theory. See the signature of the method ```createElement```:

``` jsx
React.createElement(type, [props], [...children])
```

Then, on the following call:

``` jsx
React.createElement('img', {src: logo, className: 'App-logo', alt: 'logo'})
```

- ```img``` is the element type. For each HTML element there is a corresponding React component.
- ```{src: logo, className: 'App-logo', alt: 'logo'}``` are the ```props``` of that component. We can think of ```props``` as the arguments of a function. And we can think of React components as functions, which receive ```props``` and return a React element.
- Note that React components that represent HTML tags, as in the example above, often use ```props``` matching HTML attribute names. Except ```className```, which was used instead of ```class``` because this is a javascript key word.

Implementing the first component
--------------------------------

Since we are building a news feed, nothing better than starting to implement this component. The implementation is very simple:

<pre class="line-numbers" data-start="14"><code class="language-jsx">
class Feed extends Component {
  render() {
    return (
      &lt;div className="feed"&gt;
        &lt;div className="post"&gt;
          &lt;span&gt;This is my first post!&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    )
  }
}
<!--
class Feed extends Component {
  render() {
    return (
      &lt;div className="feed"&gt;
        &lt;div className="post"&gt;
          &lt;span&gt;This is my first post!&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    )
  }
}
-->
</code></pre>

Let's display our ```Feed``` at the ```render``` of the root component ```App```:

<pre class="line-numbers" data-start="4" data-line="5"><code class="language-jsx">
class App extends Component {
  render() {
    return (
      &lt;div className="App"&gt;
        &lt;Feed /&gt;
      &lt;/div&gt;
    );
  }
}
<!--
class App extends Component {
  render() {
    return (
      <div className="App">
        <Feed />
      </div>
    );
  }
}
-->
</code></pre>

[Try on CodePen](https://codepen.io/lutchobandeira/pen/EWbvVP){:target="_blank"}

Extracting the component ```Post```
-----------------------------------

As you may have guessed, you can extract a component ```Post``` from within the component ```Feed```. This is one of the main ideas of React, to compose a large component from several small components:

<pre class="line-numbers" data-start="14" data-line="5-6"><code class="language-jsx">
class Feed extends Component {
  render() {
    return (
      &lt;div className="feed"&gt;
        &lt;Post content="This is my first post!" /&gt;
        &lt;Post content="This is my second post!" /&gt;
      &lt;/div&gt;
    )
  }
}
<!--
class Feed extends Component {
  render() {
    return (
      <div className="feed">
        <Post content="This is my first post!" />
        <Post content="This is my second post!" />
      </div>
    )
  }
}
-->
</code></pre>

See that we added a little more dynamism here. We pass the text of each post through a ```prop``` of our component ```Post``` called ```content```. The implementation of the component ```Post``` looks like this:

<pre class="line-numbers" data-start="25" data-line="5"><code class="language-jsx">
class Post extends Component {
  render() {
    return (
      &lt;div className="post"&gt;
        &lt;span&gt;{this.props.content}&lt;/span&gt;
      &lt;/div&gt;
    )
  }
}
<!--
class Post extends Component {
  render() {
    return (
      &lt;div className="post"&gt;
        &lt;span&gt;{this.props.content}&lt;/span&gt;
      &lt;/div&gt;
    )
  }
}
-->
</code></pre>

[Try on CodePen](https://codepen.io/lutchobandeira/pen/aJVyNN){:target="_blank"}

Using the ```state```
---------------------

Instead of creating a component ```Post``` for each news item, let's create a news list and then display via javascript a component for each element in that list.

<h3>Difference between <code>state</code> and <code>props</code></h3>

We will use the ```state``` for this. Unlike the immutable way of ```props```, the ```state``` is changeable. Since we want this list of news to grow over time, it makes sense to store this list in the ```state``` of our component ```Feed```.

We initialize the ```state``` in the constructor of our class, like this:

<pre class="line-numbers" data-start="14" data-line="2-9,12-14, 17"><code class="language-jsx">
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {content: 'This is my first post!'},
        {content: 'This is my second post!'}
      ]
    }
  }
  render() {
    const posts = this.state.posts.map((post, index) =&gt;
      &lt;Post key={index} value={post} /&gt;
    );
    return (
      &lt;div className="feed"&gt;
        {posts}
      &lt;/div&gt;
    )
  }
}
<!--
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {content: 'This is my first post!'},
        {content: 'This is my second post!'}
      ]
    }
  }
  render() {
    const posts = this.state.posts.map((post, index) =>
      <Post key={index} value={post} />
    );
    return (
      <div className="feed">
        {posts}
      </div>
    )
  }
}
-->
</code></pre>

[Try on CodePen](https://codepen.io/lutchobandeira/pen/JWOyKb){:target="_blank"}

In the method ```render``` we map each object in our list to an element ```Post``` and then we assign that list of components to the constant ```posts```.

We display this list of components ```Post``` as children of ```Feed```'s root component.

> Note that method ```render``` must return a React element. Therefore we need a component ```div``` involving our list of posts.

Extra Reading:

* [React Docs about State and Lifecycle](https://facebook.github.io/react/docs/state-and-lifecycle.html).
* [Docs about Arrow Functions (operator ```=>```)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

Form to create news
-------------------

Let's create the component ```PostForm```. This component will display a form to create news.

Let's also create our first method. So far we have only implemented the ```render``` of each component. This method will be named ```handleSubmit```, and as the name implies, it will be called when the user submits the form.

Our initial version of the component ```PostForm``` just connects the method ```handleSubmit``` to the form's event ```onSubmit```.

The method ```handleSubmit``` still needs a way to get the text field's value and a way to send that data to the component ```Feed```:

<pre class="line-numbers" data-start="56" data-line="4,7-9, 14"><code class="language-jsx">
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      &lt;div className="post-form"&gt;
        &lt;form onSubmit={this.handleSubmit}&gt;
          &lt;label&gt;
            Content:
            &lt;input type="text" /&gt;
          &lt;/label&gt;
          &lt;button className="button"&gt;Submit&lt;/button&gt;
        &lt;/form&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({content: this.content.value})
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Content:
            <input type="text" ref={(input) => this.content = input} />
          </label>
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
} -->
</code></pre>

Let's understand some points of this implementation.

Since we are using ES6 classes to implement our components, we need one additional step to declare our methods.

At line 59 we ```bind``` our method ```handleSumbit``` to make it visible from ```this```.

At line 72 we have our ```input```. In React we can implement form fields in two ways: **controlled components** and **uncontrolled components**.

<h3>Controlled components vs Uncontrolled components</h3>

* Controlled components: more React-way, because field's value is held in the ```state``` of a React component;
* Uncontrolled components: simpler than the controlled components. The value is held in the DOM itself.

In this example we use an **uncontrolled component**. Uncontrolled components are recommended for simple forms, such as the form of our example.

<h3>Implementing an uncontrolled component</h3>

As in our uncontrolled component the field value is held in the DOM itself, we need a way to capture the value of that input. This is a great opportunity to use a ```ref``` from React.

We make two changes to the code below:

* In the code ```ref={(input) => this.content = input}```, at line 73, we make our text field available in ```this``` through the attribute ```content```.
* In ```handleSumbit``` we use ```this.content``` to access our uncontrolled component. The only thing we do in ```handleSubmit``` for now is clear the value of our text field.


<pre class="line-numbers" data-start="56" data-line="8,18"><code class="language-jsx">
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      &lt;div className="post-form"&gt;
        &lt;form onSubmit={this.handleSubmit}&gt;
          &lt;label&gt;
            Content:
            &lt;input type="text" ref={(input) =&gt; this.content = input} /&gt;
          &lt;/label&gt;
          &lt;button className="button"&gt;Submit&lt;/button&gt;
        &lt;/form&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({content: this.content.value})
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Content:
            <input type="text" ref={(input) => this.content = input} />
          </label>
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
} -->
</code></pre>

Extra reading: 

* [React Docs about Uncontrolled Components](https://facebook.github.io/react/docs/uncontrolled-components.html).
* [React Docs about Refs](https://facebook.github.io/react/docs/refs-and-the-dom.html).

Communication between components
--------------------------------

We need a way to send the values ​​submitted by ```PostForm```'s form to the component ```Feed```.

<h3>Using a <code>prop</code> to pass a method to another component</h3>

The trick here is to implement in ```Feed``` a method that knows how to add a news item in the list and then pass that method to the component ```PostForm``` through a ```prop```.

It's easier to understand by seeing the code, so here we go:

<pre class="line-numbers" data-start="14" data-line="11,14-18,27"><code class="language-jsx">
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {content: 'This is my first post!'},
        {content: 'This is my second post!'}
      ]
    }

    this.handleNewPost = this.handleNewPost.bind(this);
  }

  handleNewPost(post) {
    this.setState({
      posts: this.state.posts.concat([post])
    });
  }

  render() {
    const posts = this.state.posts.map((post, index) =&gt;
      &lt;Post key={index} value={post} /&gt;
    );
    return (
      &lt;div className="feed"&gt;
        {posts}
        &lt;PostForm onSubmit={this.handleNewPost} /&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {content: 'This is my first post!'},
        {content: 'This is my second post!'}
      ]
    }

    this.handleNewPost = this.handleNewPost.bind(this);
  }

  handleNewPost(post) {
    this.setState({
      posts: this.state.posts.concat([post])
    });
  }

  render() {
    const posts = this.state.posts.map((post, index) =>
      <Post key={index} value={post} />
    );
    return (
      <div className="feed">
        {posts}
        <PostForm onSubmit={this.handleNewPost} />
      </div>
    )
  }
} -->
</code></pre>

Here's what we changed:

* We implemented the method ```handleNewPost``` (and made it visible to ```this``` with the ```bind``` of line 24);
* We displayed the component ```PostForm``` in line 40;
* And we passed the method ```handleNewPost``` to the component ```PostForm``` through a ```prop``` named ```onSubmit```, at line 40.

The big trick was to pass the method through a ```prop```.

Extra reading:

* [React Docs about Lifting the State up](https://facebook.github.io/react/docs/lifting-state-up.html).

<h3>Updating <code>state</code></h3>

The implementation of ```handleNewPost``` requires a special attention: in React every state update must be done using the method ```setState```. The method ```setState``` receives a hash with the attributes that should be updated.

To be clear: **Never change ```state``` directly!**

With the call to ```setState```, React knows that component's state has changed, and that it's time to call ```render``` again to reflect these changes visually.

<h3>Reconciliation: How React Updates the DOM</h3>

Recapping: when the user writes a news in ```PostForm``` and submits it, the method ```handleSubmit``` of ```PostForm``` is called. The method ```handleSubmit```, in turn, calls the method ```handleNewPost``` of ```Feed``` through the prop ```onSubmit``` of the ```PostForm```.

In ```handleNewPost``` a state update is done. At that moment React calls the ```Feed```'s method ```render``` in order to show the news feed updated on the screen.

React, however, does not "reload" the entire news feed when only one news item is added. Operations that manipulate the DOM are expensive. So to improve performance, React keeps an internal representation of the UI, known as "Virtual DOM".

When ```Feed```'s ```state``` is updated and method ```render``` is called again, React compares the current node tree with the new node tree in the Virtual DOM through a diffing algorithm.

For our example, the React diffing algorithm realizes that it's not necessary to recreate the whole ```Feed```, just one ```Post``` element must be added in the actual DOM.

This process is called **Reconciliation**.

Extra reading:

* [React Docs about Reconciliation](https://facebook.github.io/react/docs/reconciliation.html)

<h3>Calling a method through a <code>prop</code></h3>

To complete the communication between the components we only need to use the ```prop``` passed by ```Feed``` to ```PostForm```:

<pre class="line-numbers" data-start="55" data-line="8"><code class="language-jsx">
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({content: this.content.value})
    this.content.value = '';
    event.preventDefault();
  }
<!-- class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({content: this.content.value})
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Content:
            <input type="text" ref={(input) => this.content = input} />
          </label>
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
} -->
</code></pre>

[Try on CodePen](https://codepen.io/lutchobandeira/pen/GWOvjx){:target="_blank"}

Adding Categories to News
-------------------------

Every news in our feed belongs to a category.

Let's start with a pre-determined list of categories: World, Business, Tech, and Sport. We create then a constant to represent these values:

<pre class="line-numbers" data-start="4" data-line=""><code class="language-jsx">
const categories = ['World', 'Business', 'Tech', 'Sport'];
</code></pre>

And then we update the component ```Feed``` by adding the property ```category``` to the initial list of news in our ```state```:

<pre class="line-numbers" data-start="14" data-line="6-7"><code class="language-jsx">
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {category: categories[0], content: 'This is my first post!'},
        {category: categories[1], content: 'This is my second post!'}
      ]
    }
<!-- class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {category: categories[0], content: 'This is my first post!'},
        {category: categories[1], content: 'This is my second post!'}
      ]
    } -->
</code></pre>

In the component ```Post``` we display the category:

<pre class="line-numbers" data-start="48" data-line="5"><code class="language-jsx">
class Post extends Component {
  render() {
    return (
      &lt;div className="post"&gt;
        &lt;span className="label"&gt;{this.props.value.category}&lt;/span&gt;
        &lt;span className="content"&gt;{this.props.value.content}&lt;/span&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class Post extends Component {
  render() {
    return (
      <div className="post">
        <span className="label">{this.props.value.category}</span>
        <span className="content">{this.props.value.content}</span>
      </div>
    )
  }
} -->
</code></pre>

And in the component ```PostForm``` we make two changes: we add a field to the category and update the method ```handleSubmit``` to send the selected category:

<pre class="line-numbers" data-start="59" data-line="9,12,21-28"><code class="language-jsx">
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({
      category: this.category.value,
      content: this.content.value
    });
    this.category.value = categories[0];
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      &lt;div className="post-form"&gt;
        &lt;form onSubmit={this.handleSubmit}&gt;
          &lt;label&gt;
            Category:
            &lt;select ref={(input) =&gt; this.category = input}&gt;
              {categories.map((category, index) =&gt;
                &lt;option key={category} value={category}&gt;{category}&lt;/option&gt;
              )}
            &lt;/select&gt;
          &lt;/label&gt;
          &lt;label&gt;
            Content:
            &lt;input type="text" ref={(input) =&gt; this.content = input} /&gt;
          &lt;/label&gt;
          &lt;button className="button"&gt;Submit&lt;/button&gt;
        &lt;/form&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({
      category: this.category.value,
      content: this.content.value
    });
    this.category.value = categories[0];
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Category:
            <select ref={(input) => this.category = input}>
              {categories.map((category, index) =>
                <option key={category} value={category}>{category}</option>
              )}
            </select>
          </label>
          <label>
            Content:
            <input type="text" ref={(input) => this.content = input} />
          </label>
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
} -->
</code></pre>

[Try on CodePen](https://codepen.io/lutchobandeira/pen/mWqMmx){:target="_blank"}

Filtering news
--------------

News should be filtered by category or by content. Let's then add a text field at the top of ```Feed``` to implement our filter.

Unlike the text field used in ```PostForm```, we will use a **Controlled Component** here. This controlled input will be implemented in the component ```Filter```.

Before creating the component ```Filter```, let's implement the logic of filtering news in ```Feed```.

<h3>Logic of filtering news</h3>

We will make the following changes:

- Add ```filteredPosts``` to ```state```.
- In the method ```render```, we will display the ```posts``` complete list only if the list ```filteredPosts``` is empty. Otherwise, we will display ```filteredPosts```.
- The logic of filtering the posts based on the value entered by the user in ```Filter``` will be implemented in the method ```handleFilter```.
- The communication between the components ```Feed``` and ```Filter``` will follow the same strategy used previously. We will pass the method ```handleFilter``` as a ```prop``` of ```Filter```.

The implementation is following:

<pre class="line-numbers" data-start="51" data-line="9,22-29,35-37,41"><code class="language-jsx">
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {category: categories[0], content: 'This is my first post!'},
        {category: categories[1], content: 'This is my second post!'}
      ],
      filteredPosts: []
    }

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleNewPost(post) {
    this.setState({
      posts: this.state.posts.concat([post])
    });
  }

  handleFilter(filter) {
    this.setState({
      filteredPosts: this.state.posts.filter((post) =&gt;
        post.category.toUpperCase() === filter.toUpperCase() ||
          post.content.includes(filter)
      )
    });
  }

  render() {
    const posts = this.state.posts.map((post, index) =&gt;
      &lt;Post key={index} value={post} /&gt;
    );
    const filteredPosts = this.state.filteredPosts.map((post, index) =&gt;
      &lt;Post key={index} value={post} /&gt;
    );
    return (
      &lt;div className="feed"&gt;
        &lt;Filter onFilter={this.handleFilter} /&gt;
        {filteredPosts.length &gt; 0 ? filteredPosts : posts}
        &lt;PostForm onSubmit={this.handleNewPost} /&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {category: categories[0], content: 'This is my first post!'},
        {category: categories[1], content: 'This is my second post!'}
      ],
      filteredPosts: []
    }

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleNewPost(post) {
    this.setState({
      posts: this.state.posts.concat([post])
    });
  }

  handleFilter(filter) {
    this.setState({
      filteredPosts: this.state.posts.filter((post) =>
        post.category.toUpperCase() === filter.toUpperCase() ||
          post.content.includes(filter)
      )
    });
  }

  render() {
    const posts = this.state.posts.map((post, index) =>
      <Post key={index} value={post} />
    );
    const filteredPosts = this.state.filteredPosts.map((post, index) =>
      <Post key={index} value={post} />
    );
    return (
      <div className="feed">
        <Filter onFilter={this.handleFilter} />
        {filteredPosts.length > 0 ? filteredPosts : posts}
        <PostForm onSubmit={this.handleNewPost} />
      </div>
    )
  }
} -->
</code></pre>

Extra reading:

* [React Docs about Conditional Rendering](https://facebook.github.io/react/docs/conditional-rendering.html)

<h3>Implementation of a controlled component: the component <code>Filter</code></h3>

In any scenario a little more complex it's recommended to use a controlled component. As you already know, controlled components store the value of the field in ```state```, as any React component would do.

The implementation of a controlled component follows this roadmap: we create a method ```handleChange``` that updates the value of the input at ```state``` on every change in the field, as defined in  ```onChange={this.handleChange}```.

In order to apply the filter, the user must enter the name of a category or a piece of content and press Enter. Then we also implemented the method ```handleKeyUp```.


The initial version of the component ```Filter``` is following:

<pre class="line-numbers" data-start="113" data-line=""><code class="language-jsx">
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleKeyUp(event) {
    if (event.key === 'Enter') {
      this.props.onFilter(this.state.value);
    }
  }

  render() {
    return (
      &lt;div&gt;
        &lt;label&gt;
          &lt;input type="search" value={this.state.value}
                               onChange={this.handleChange}
                               onKeyUp={this.handleKeyUp}
                               placeholder="Filter by category or content..." /&gt;
        &lt;/label&gt;
      &lt;/div&gt;
    )
  }
}
<!-- class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleKeyUp(event) {
    if (event.key === 'Enter') {
      this.props.onFilter(this.state.value);
    }
  }

  render() {
    return (
      <div>
        <label>
          <input type="search" value={this.state.value}
                               onChange={this.handleChange}
                               onKeyUp={this.handleKeyUp}
                               placeholder="Filter by category or content..." />
        </label>
      </div>
    )
  }
} -->
</code></pre>

[Try on CodePen](https://codepen.io/lutchobandeira/pen/mWqMmx){:target="_blank"}

Extra reading:

* [React Docs about Forms and Controlled Components](https://facebook.github.io/react/docs/forms.html)
* [React Docs about Handling Events](https://facebook.github.io/react/docs/handling-events.html)

<h3>Removing the filter</h3>

We want to clear the previously applied filter by leaving the text field empty (pressing ```delete``` to erase all characters, for example).

To implement this strategy, we call ```onFilter``` when the value of the field is empty at ```handleChange```:

<pre class="line-numbers" data-start="113" data-line="12-14"><code class="language-jsx">
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    if (event.target.value === '') {
      this.props.onFilter('');
    }
  }
</code></pre>

[Try on CodePen](https://codepen.io/lutchobandeira/pen/LWOjjL){:target="_blank"}

Saving the news list locally
----------------------------

Our implementation is almost done! To finish it, let's save the news list on ```localStorage```. That way we do not lose our changes when closing the browser.

We have modified only the ```state``` initialization and the method ```handleNewPost```:

<pre class="line-numbers" data-start="16" data-line="5,14-16"><code class="language-jsx">
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: JSON.parse(localStorage.getItem('posts')) || [],
      filteredPosts: []
    }

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleNewPost(post) {
    var posts = this.state.posts.concat([post]);
    this.setState({posts: posts});
    localStorage.setItem('posts', JSON.stringify(posts));
  }
<!-- class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: JSON.parse(localStorage.getItem('posts')) || [],
      filteredPosts: []
    }

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleNewPost(post) {
    var posts = this.state.posts.concat([post]);
    this.setState({
      posts: posts
    });
    localStorage.setItem('posts', JSON.stringify(posts));
  } -->
</code></pre>

[Ver no CodePen](https://codepen.io/lutchobandeira/pen/JWOyON){:target="_blank"}

Next steps
----------

Our news feed is still not very useful. It only shows news created by the user. To make it really interesting, we have to implement the server side.

And that's what we'll do in the next blog post. We'll create an application in Ruby on Rails that will communicate with our news feed. Wait for it!


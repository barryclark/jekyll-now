At Flatiron, we've been working with React for about a week and half, and we had our code challenge on it today. Considering this milestone, and that we'll be graduating in exactly one month from now (OMG), I'd like to take this opportunity to write my opinions on React so far. 

## UI Elements & Nothing More

React was a breath of fresh air coming from plain JavaScript. Anyone who works with JS will have moments where the code's structure manages to work against them. React's opinions on how to manage a project from the top down gives us a clear path to follow, reeling in all the rope that JS gives us to hang ourselves working through procedural, object-oriented and functional iterations to a problem.

And thankfully, like any good library or framework, React is laser-focused on a small set of objectives. All it ever sets out to be is a better way to build a UI.

But this is where the pain comes in for me. We learn Ruby first, and as a programmer with some Java and Python experience, I'm always on the lookout for better ways to model my data. In the front end of an application, this is even more important. 

While the data should be modeled properly in your API for later consumption, having an easy way to manipulate that data in the front end can be just as beneficial. This might be in the form of more easily querying local data, resisting the tempation for another network request, or more easily accessing data througout components.

## A train of state

The only other complication I run into consistently is passing props all the way down through a long list of components. For this, there _are_ libraries out there to help, and we'll be getting into Redux soon. But until then, the long chain of state and props being passed around is a serious thorn in my side. 

One huge pitfall here - there's tons of repitition. If a callback has to go four components deep before being called in an event, you'll likely have three components containing this code:

```javascript
<SomeComponent
  myFunction={this.myFunction}
/>
``` 
, or
```javascript
<SomeComponent
  myFunction={props.myFunction}
/>
```

Thankfully, React will break quickly if you forget to put this line in your render. But if you refactor the function & want to rename it, you have to remember to look through all the components that received this prop. Or... not, if you live dangerously and are in a rush. And that's a problem - how often do you want to have the decision of renaming things, _maybe?_ I certainly don't, but for the sake of correctness, I'm fixing old Component props constantly as I iterate on the code. It's annoying and can easily give you a `not a function` bug if you aren't careful. 

## Simple Rules 

On the other side of this coin, React's outward simplicity flaunts a wonderful advantage: you don't have to know much about React to make a very effective UI. And truthfully, there isn't _that_ much to it. There's pitfalls in how state is updated, and the other behind-the-scenes work that React is doing, but React expects you to follow a simple set of rules to get your job done.

1. Pass things to Components to give them props, which don't change unless the Component is rerendered. 
2. If you expect data to change within a living Component, it should be in state. 
3. If a Component's children need to change its change, its children can only do so through a callback. (You can likely pass the children the same function you'd use in the parent.)
4. Your functions and Components should work irrespective of the presence of data, so think in terms of functional programming. It'll cut down on how much code you have to write and how many conditionals you have to maintain for operations that arn't directly involved in rendering.
5. State belongs in the lowest possible component that needs to pass state to its children.
6. Prefer functional Components over class Components. They're smaller, simpler, use less memory, and you won't have to qualify everything with `this`.

As I dive further into React, I'll update this post or write a sequel to see if the pros and cons of the framwork even out. Maybe someday, I'll have a reason to learn Vue and compare the two.


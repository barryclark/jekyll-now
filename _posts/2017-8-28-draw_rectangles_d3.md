---
layout: post
title: Making bounding boxes with d3.js
---

This post kicks off a series in which I will be creating a UI for ...

My goal in this post will be rather modest: we're going to make a web page using d3.js in which the user will be able to click and drag to create a rectangular bounding box. I decided to devote an entire post to this somewhat mundane-sounding task for two reasons. First, I haven't found a great tutorial for doing this elsewhere. Second, it is an essential part of the wider project.

At the end of this, we're going to have something like this:

<iframe width="100%" height="300" src="//jsfiddle.net/wmwooley/39abzhus/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

_Note:_ I'm going to do the "jsfiddle" version of the code, which means that I'm going to skip over some of the setup involved in linking stylesheets and javascript to the main HTML file and the like. It should all run in jsfiddle, however.

## Preliminaries: HTML, CSS, and the SVG Canvas

Before getting into the main javascript we need to set up some HTML and styling. The HTML can be super simple because we're going to add all of the other elements with d3.js:

```html
<body>
</body>
```

The CSS part is sort of optional but it never hurts to look good. We're going to be drawing rectangles so we'll create a class called `rect` for styling these elements:

```css
.rect {
  stroke: #303f9f;
  fill-opacity: 0;
  stroke-opacity: 0.5;
}
```

Next, we set up a "canvas" on which we can draw. The first part consists in adding an `html <svg></svg>` element to the body using d3:

```javascript
// Define height and width of canvas
var h = 350,
  w = 350;

// Define element 'svg'
var svg = d3.select('body')
  .append('svg')
  .attr('height', h)
  .attr('width', w);
```

To define `svg` I have used a common d3 pattern:

1. `d3.select('body')` selects the `body` element in the DOM.
2. `.append('svg')` says, "Add an `<svg></svg>` element within the body." The HTML now looks like this:
     ```html
     <body>
          <svg>
          </svg>
     </body>
     ```
3. `.attr('height', h).attr('width', w);` attaches two attributes to the `<svg></svg>` element that we just created. In particular, it says that the height and width of the element should be set to 350. The HTML now looks like this:
     ```html
     <body>
          <svg height="350" width="350">
          </svg>
     </body>
     ```

For the final part of the setup I'm going to add a rectangle to serve as a border for the svg. This jsut makes it clear where it will be possible to draw. Here's tehe code:

```javascript
// Border Rectangle
svg.append('rect')
  .attr('height', h)
  .attr('width', w)
  .attr('stroke', 'black')
  .attr('fill-opacity', 0.0)
  .attr('class', 'border-rect');
```

This code follows a scheme that is similar to what we used to add the svg. The only difference here is that, instead of explicitly selecting the `svg` element in the first step, we used the `svg` variable, which we already defined in the previous snippet. That is:
```javascript
var svg = ...
     ...
svg.append(...)
     ...
```
is equivelant to:
```javascript
d3.select('svg').
     ...
```

Okay, at this point our code will just output a black, 350x350 rectangle.

## Setting Up Event Listeners

The key to making this work is setting up "event listeners". In general, event listeners tell the machine want happens when the user does something like click or hover over an element.

In our case we want the following to happen:

1. When the user **_clicks (i.e. "mousedown")_** on the `svg` element a rectangle svg element is created.
2. \[_While the user is still holding down the mouse:_\] **_Moving_** the mouse causes the rectangle to expand and contract. One corner of the rectangle remains at the point of the initial click while the opposite diagonal corner follows the mouse.
3. When the user **_releases the click (i.e. "mouseup")_** the rectangle remains in place.

Luckily, d3 makes it fairly easy to do this sort of thing. Here's the basic outline of what we're going to do:

```javascript
svg.call(
  d3.drag()
  .on('start', addRect.start) // On mousedown, call function addRect.start
  .on('drag', addRect.drag)   // As the mouse is dragged call function addRect.drag
  .on('end', addRect.end)     // On mouseup, call function addRect.end
);
```

Let's walk through this code:

1. `svg.call(...)` As above, we've selected the `svg` element. We then [`.call`](https://github.com/d3/d3-selection/blob/master/README.md#selection_call) a function on the svg.
2. [`d3.drag()`](https://github.com/d3/d3-drag/blob/master/README.md#drag) "creates a new drag behavior". In other words, in the first step we just selected the `svg` element. Now we're going to say what is going to happen when the mouse drags on the `svg` element.
3. `.on('start', addRect.start).on('drag', addRect.drag).on('end', addRect.end)` tells the newly created drag behavior what to do when the user `'start'`s dragging, `'drag'`s, and `'end'`s dragging, respectively. In each case, we pass a function that will be called. Below, we will write each of these functions as part of a module/object called `addRect`. This explains the use of the dot notation.

For me, this is one of those times when d3 conventions seem sort of weird. In particular, why did we have to first `call` then define the `drag` behavior? I'm afraid that I can't give a great explanation at just this moment. I would, however, like to point out how neat and convenient this is. Think about how you might try to code click-and-drag behavior from scratch. I imagine you'd spend a lot of time trying to update the information on drag smoothly without crashing the browser. The creators of d3 have worked through those headaches already so we don't have to!

## Adding Rectangles

The last code snippet gives a good clue of how we're going to want to structure our code for adding rectangles. We're going to have three main functions:

1. `addRect.start` will create a rectangle at the point where the initial mouseclick occurred.
2. `addRect.drag` will update the coordinates/shape of the rectangle each time the mouse is dragged to a new position.
3. `addRect.end` will do some stuff once we're done creating the rectangle.

It will turn out to be advantageous to collect each of these funtions in the `addRect` module. I'm going to begin by setting up the structure of the module and then return to defining each function.

### `addRect` Structure

Let's set up the `addRect` module using a [revealing module pattern](https://scotch.io/bar-talk/4-javascript-design-patterns-you-should-know). The basic advantage of this method is that we're going to be able to call on common variables across each of the three functions discussed above while keeping them out of the global scope.

```javascript
var addRect = (function() {
     // A module for adding svg rectangles to the canvas.

     // Common variables to draw on (Private/Not exposed to public calls)
     var x0, y0; // Initial points clicked.
     var r;      // Rectangle object modified by each function

     var start = function() {
          // What to do on mousedown
          null;
     }

     var drag = function() {
          // What to do when mouse is dragged
          null;
     }

     var end = function() {
          // What to do on mouseup
          null;
     }

     // Exposed to public calls
     return {
          start: start,
          drag: drag,
          end: end,
     };

})();
```

When the browser loads our javascript it will return a dict-like object called `addRect` with methods/keys/elements corresponding to our three functions. At the top we declared some variables that will be shared across each of these three functions but that won't be used otherwise.

### `addRect.start` - Creating a rectangle

Now we're going to start out by writing `addRect.start`, which will be the function that is called when the user clicks on the svg canvas.

The basic gameplan for this function will be to:

1. Get the position of the mouse.
2. Create a rectangle on the canvas at the mouse position.

Let's do it:
```javascript
var start = function() {
     // What to do on mousedown
    // 1. Get mouse location in SVG
    var m = d3.mouse(this);
    x0 = m[0], y0 = m[1];
    // 2. Make a rectangle
    r = svg.append('rect')    // An SVG `rect` element
      .attr('x', x0)          // Position at mouse location
      .attr('y', y0)
      .attr('width', 1)       // Make it tiny
      .attr('height', 1)
      .attr('class', 'rect')  // Assign a class for formatting purposes
	;
  }
```
Notice that we assigned the initial mouse position to the private variables `x0` and `y0` declared at the top of the `addRect` module. Likewise, when we created the rectangle we assigned it to the `r` variable.

Notice that we used [`d3.mouse(this)`](https://github.com/d3/d3-selection/blob/master/README.md#mouse) to get the mouse position. Here, `this` is the `svg` element, which was passed through via `svg.call(...)`. The coordinates here are relative to the svg element, not the window. So, for example, if the svg was positioned at the bottom right of the page, clicking on the top right of the svg would return (0,0) _not_,say, (1400, 1000).

Notice that the pattern that we used to add the rectangle in `r = svg.append...` is practically identical to that used to create the border rectangle. If you were to try to run the code right now, though, it would look like you were just creating little dots. That's just because we made the width and height small to start out. Next, we're going to make something that looks like a rectangle by changing these parameters.

### `addRect.drag` - Growing Rectangles

With the `drag` function we're going to change the size and shape of the rectangle as the user drags the mouse. We'll do this by changing the attributes of the `r`ectangle element that was just created.

Here's the code:
```javascript
var drag = function() {
     // What to do when mouse is dragged
     // 1. Get the new mouse position
     var m = d3.mouse(this);
     // 2. Update the attributes of the rectangle
     r.attr('x', Math.min(x0, m[0]))
      .attr('y', Math.min(y0, m[1]))
      .attr('width', Math.abs(x0 - m[0]))
      .attr('height', Math.abs(y0 - m[1]));
}
```
As with `start` the first step was to get the (new) mouse position. We've already selected the current rectangle by assigning it to the `r` variable. To change the coordinates (or any attribute) of the rectangle then, we just use `r.attr(...)`.

We need to do some simple operations to make sure that the rectangle behaves correctly:

- `Math.min(x0, m[0])` sets the `x` coordinate of the rectangle to the minimum of the initial and current mouse position. This account for cases where the mouse is moved to the left. The same goes for `Math.min(y0, m[1])`.
- `Math.abs(x0 - m[0])` sets the `width` of the rectangle to the _absolute_ difference between the current and initial mouse position. For a width we always want a positive value. However, sometimes `x0` will be greater than `m[0]` and sometimes it wil not. Taking the absolute value ensures that we always get a positive value for the width. (Recall: `Math.abs(-3) === Math.abs(3) === 3`.)

### `addRect.end`

The last two functions did everything that we needed to do to create the rectangles. However, it is worth pointing out that we can do any number of things at the end of drawing the rectangle.

For example, we could print the bounding box of the rectangle to the console:

```javascript
var end = function() {
     // What to do on mouseup

     console.log(r.node().getBBox());
}
```











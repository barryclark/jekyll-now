---
layout: post
title: Drawing With HTML5: Fundamentals and Challenges
---

Introduction
----
Recently after graduating from The Flatiron School, I created a simple drawing application to help kids learn to draw their favorite cartoon character.  This application consisted of implementing an HTML5 canvas prototype and enabling drawing functionalities with JavaScript.  The API documentation is pretty complete and relatively easy to follow, but it does make some assumptions about the user.  As a beginner, not everything is so straight forward, so it can quite difficult at first to create your first drawing application, so I wanted to break down some of the challenges that I encountered, by going one step at a time.

Step One: Setting Up 
----
a) __Include the canvas element in your HTML:__
the canvas element is simply a container
for rendering graphics
Note: it has a transparent border, so giving it
a colored border may be a good idea for this 
exercise.

<style>
  canvas {
    border: 1px solid black;
  }
</style>

it's important to give it an id since it is what
we will be using later on an an identifier.
<canvas id="drawing-canvas"></canvas>

Don't worry about changing the dimensions yet.  That's actually one of the things I will touch upon soon.  For now, let's make sure it works. 

b) __Set the Context:__
Before we start to draw, we have to let the canvas know the type of graphics it will be rendering.  In this case, we will be working with 2-dimensional graphics.  This is defined in your javascript file:

```javascript
function(){
// We will soon need the context variable to enable drawing.
  var canvas = document.getElementById("drawing-canvas");
  drawingContext = canvas.getContext("2d"); 
}();
```

Step Two: Drawing
----
First, let's identify the desired behavior:
	* Render a stroke when the mouse is down.
	* Continue drawing on ```mousemove```, only if mouse is down.
	* Stop drawing on ```mouseup```.

__Challenge One: Tracking the Mouse__
Javascript gives you multiple functions to track the mouse:
  - ```pageX, pageY```: mouse coordinates in relation to the HTML document. 
  - ```clientX, clientY```: mouse coordinates in relation to the viewport.
  - ```screenX, screenY```: mouse coordinates in relation to the device.
  - ```offsetX, offsetY```: mouse coordinates in relation to the HTML element. 

I created a [simple app](https://github.com/jmsardina/html5-canvas-demo) to show you how they're different.  Feel free to zoom in an out, and scroll and unscroll to see how they change.  If you're using Chrome, you'll probably notice  ```offsetX, offsetY``` strokes on the exact position desired while all of the others are completely disconnected.  Now open this same application on Firefox and you will notice ```offsetX, offsetY``` disappear.  Currently, this fuction is not supported by Firefox, which is why we won't be using this one.

If we want cross-browser compatiblity, we can create a custom function that will return the mouse coordinates in relation to the target html element.  Something that worked for me was to identify the position of the target element (the canvas) and use that along with (pageX, pageY) function, which IS cross-browser compatible, to calculate the current position of the mouse. 

```javascript
function positionX(e){
  e.pageX - $(e.target).offset().length 
}

function positionY(e){
  e.pageY - $(e.target).offset().top
}
```

Now that we have that taken care of, we can get to business!
```javascript
function startDrawing(e){
  paint = true;
  var offsetX = positionX(e);
  var offsetY = positionY(e);

  e.beginPath(); // begins a new path detached from the last one.
  e.moveTo(offsetX, offsetY); // Identifies the starting point.
}
```

What's up with that ```paint``` variable? Let's take a minute to think about the expected behavior:
* When mouse is over the canvas, render a stroke when mouse moves and is held down.
* When mouse is over the canvas, do not render a stroke if mouse moves, but is not down.
We're using the ```paint``` variable as a flag to let us know when the mouse is down.  On ```mousedown```, paint becomes true.  On ```mousemove```, we'll see the stroke only if ```paint === true``` (mousedown):

```javascript
function keepDrawing(e){
  if( paint === true ){
    e.lineTo(positionX(e), positionY(e)); // Identifies the end point.
    e.stroke();
}
```

As you can imagine, ```paint``` becomes false on 'mouseup'. That's how it will stop drawing!

```javascript
function stopDrawing(){
  paint = false;
}
```

Step Three: Enhancing
----
The first thing I wanted to do with my canvas was make it bigger.  As a beginner, I thought CSS and HTML height and width attributes were interchangeable, so I mistakenly used CSS to scale my canvas, which ended up stretching my it as opposed to scaling it.  The problem? Try it yourself!  You'll see that when you use CSS to scale your canvas, the image will end up looking very pixelated and the coordinates will be off.  Make sure you use HTML attributes to scale it. 

The next thing I wanted to do after making it bigger was making it responsive.  As a user, I want to be able to resize the window and still be able to see the entire canvas.  When we use CSS we often use percentages to do that, but -- we're using HTML, which doesn't respond to percentages.

One way of getting around this may be a little expensive, but assuming the user won't be resizing the canvas like a mad person, it's actually not that bad. Since we can use Javascript to set attributes, we can try setting the attributes dynamically as a the user resizes the window.  This is how it looks:

```html
<div class="canvas-container">
  <canvas id="drawing-canvas"></canvas>
</div>
```

```css
.canvas-container {
  height: 80%;
  width:  80%;
} 
```

```javascript
$(window).on('resize', resizeCanvas);

function resizeCanvas(){
  $('#drawing-canvas').attr('height', $('.canvas-container').height());
  $('#drawing-canvas').attr('width', $('.canvas-container').width());
}
```

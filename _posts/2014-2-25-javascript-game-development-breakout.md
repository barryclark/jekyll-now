---
layout: post
title: JavaScript Game Development - Breakout
---

Creating video games can be a very fun and rewarding exercise for anyone looking to improve their development skills in any language. Its beneficial for anyone new to the field of game development to try their hand at recreating some of the simpler classics. In this article, we'll walk through creating our very own Brick-Breaker game with just JavaScript!

I recently set out to recreate the classic game "Breakout" using plain JavaScript and the HTML5 canvas. I was fairly successful, and I'd like to take this opportunity to walk you through creating your own Brick-Breaker game using just a dab of JavaScript.

## Setting up our Game Environment

The first step to creating a game within a canvas is to create our actual canvas. Create a new empty `*.html` file. This will be where all of our code goes for now. Place the following code within our new file and save it.

{% highlight html linenos %}
<canvas width="800" height="500" id="myGameCanvas">
    <p>Your browser does not support this feature</p>
</canvas>
{% endhighlight %}

You can style the canvas however you'd like (ie. border, placement, etc) with CSS, but keep in mind that the width and height need to be set on the canvas element in absolute pixels. CSS (and percentages) will cause your rendering to be warped and fuzzy.

## Configuring our Environment

Now the fun starts: lets dig in to some JavaScript. Right before our closing `</body>` tag, declare a new `<script type="text/javascript"></script>` block. We'll put all of our game's code in there.

I like to always try and maintain some modularity - even when creating single page applications - so we'll start off creating a basic `app` object that will store our game's basic properties and functions. Place the following code within the script block we just created:

{% highlight javascript linenos %}
var app = {

    init : function(){
    },

    canvas : null,
    context : null

};
app.init();
{% endhighlight %}

We now have a very basic skeleton that defines the basis of our software application. Because our script is contained in the global space, `app.init()` will be run automatically when our page loads. Lets grab our canvas and get the canvas context first. Inside `app.init`, write the following code:

{% highlight javascript linenos %}
init : function(){
   this.canvas = document.querySelector('#myGameCanvas');
   this.context = this.canvas.getContext('2d');
}
{% endhighlight %}

We're first getting our canvas element from the DOM with JavaScript's [`querySelector` function](https://developer.mozilla.org/en-US/docs/Web/API/document.querySelector), and storing that as a property of our app object. Then we'll get the 2D context of our canvas and save a reference to that in our app object as well - we'll be referring to `app.context` quite a bit.

## The Player Paddle

Now that we have persistent access to the canvas context, let's draw our paddle onscreen and start moving around. Create a player object like so:

{% highlight javascript linenos %}
var player = {

    position: {
        x: 100,
        y: 480
    },

    physics: {
        speed: 10
    },

    size: {
        height: 10,
        width: 50
    },

    draw : function(){
        app.context.fillStyle = "rgb(200, 0, 0)";
        app.context.fillRect(this.position.x, 
                             this.position.y, 
                             this.size.width, 
                             this.size.height);
    },

    moveLeft: function(){
        if (this.position.x > 0)
            this.position.x -= this.physics.speed;
    },

    moveRight: function(){
        if (this.position.x < (app.canvas.width - this.size.width))
            this.position.x += this.physics.speed;
    },

};
{% endhighlight %}

Its important to note that while creating an explicit player object works for our example, if we were creating a larger scale game, we would almost definitely abstract a lot of these properties into an extendable sprite class.

Hopefully the above code is pretty easy to understand. We define a two-dimensional position for our paddle (with default x and y coordinates), a physics object that currently only supports a speed attribute - which defines the rate at which the paddle moves across the screen, a size object, and a basic draw function that will draw a red rectangle on the canvas using the properties we have set.

Load up the page, and you'll notice that our paddle isn't being drawn. What the heck? We defined our draw code didn't we? Well we never actually called it. We'll do that in the next section.

## Creating our Game Loop

If you're unfamiliar with the concept of a game loop, I'll go over it briefly here. Its a pretty simple concept, but you could dig around and learn more about the finer points elsewhere online.

Basically, a game loop is just that - a loop that is constantly running telling our screen what to display and where to display it. If you're familiar with the term "Frames Per Second", you already understand the game loop! At 30fps, our game will be clearing and re-rendering the game screen a whopping 30 times per second!

> But how do we make a game loop with JavaScript?

We'll use JavaScript's [requestAnimationFrame](http://css-tricks.com/using-requestanimationframe/) to simulate a game loop in JavaScript. Go back to the app object and create a new function called `update`. This function will be called on every single frame of our game, so its important to not overload the CPU.

{% highlight javascript linenos %}
var app = {

    update : function(){
        //TODO: clear canvas
        player.draw();

        requestAnimationFrame(app.update);
    }

};
{% endhighlight %}

`requestAnimationFrame` is perfect for what we're doing here because it allows for the browser to optimize our game loop. Traditionally we would have used `window.setTimeout` to schedule our game loop in milliseconds. `requestAnimationFrame` was made specifically for use cases involving animations so that browser vendors could optimize loops and make our lives just a bit easier.

Finally, add a call to `app.update` inside of `app.init` to start running our game immediately once the page is loaded. You could also draw a start button on screen during the `init` phase, and then call the first `update` when that is clicked. Either way, we need to call `app.update` once to initiate our game loop.

Open the game in the browser, and you'll see our paddle. But we're unable to move it!

## Accepting Player Input

Getting player input is very easy! We'll simply create an event handler and attach that to the `'keydown'` event. In `app.init` add the following line:

{% highlight javascript linenos %}
var app = {

    init: function(){
        // ...

        window.addEventListener('keydown', controller.keypress, true);

        // ...
    }

};
{% endhighlight %}

The code above should indicate what we're going to do next: create a controller object and create a keypress function within it to handle the `'keydown'` event.

{% highlight javascript linenos %}
var controller = {

    keypress : function(event){

        switch (event.keyCode) {
            case 37: // Left
                player.moveLeft();
                break;
            case 39: // Right
                player.moveRight();
                break;
        }

    },

};
{% endhighlight %}

Reload the page, and start playing. You'll notice that you can move the paddle across the screen whenever you press the appropriate keys. How cool is that? With just a simple switch case to check which button is being pressed, we can tell our player exactly what to do. Our game loop will redraw the paddle in the updated position on each frame. Pretty neat huh?

## The Ball

Our game is shaping up, and we're able to control some aspects (specifically, our paddle). But what about the ball in breakout? We aren't able to control it using the keyboard, so it will have to update its position on its own during each iteration of our game loop. That shouldn't be too difficult. Create a ball object with the following properties and methods:

{% highlight javascript linenos %}
var ball = {

    position: {
        x: 50,
        y: 50
    },

    size: {
        height: 10,
        width: 10
    },

    physics: {
        speed: 5
    },

    direction: {
        x: 1, //Moving right
        y: 1 //Moving down
    },  

    draw : function(){
        app.context.fillStyle = "rgb(200, 0, 0)";
        app.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    },

    reset : function(){
        this.position.x = 50;
        this.position.y = 50;
        this.direction.x = 1;
        this.direction.y = 1;
    },

    update : function(){

        if (this.position.x <= 0) //Left Bounds
            this.direction.x = 1;
        if (this.position.x >= app.canvas.width) //Right Bounds
            this.direction.x = -1;
        if (this.position.y <= 0) //Top Bounds
            this.direction.y = 1;
        if (this.position.y >= app.canvas.height) //Bottom Bounds
            this.reset(); //TODO: die

        this.position.x += (this.physics.speed * this.direction.x);
        this.position.y += (this.physics.speed * this.direction.y);

        this.draw();
    },
};
{% endhighlight %}

The ball is very similar to the player, except that we are defining a direction object with X and Y parameters to determine which direction the ball is moving at a given time. With this implementation, the ball will always move in a perfect unit slope - meaning that it will always be moving in the X and Y directions at a rate of +/- 1. We could customize this to incorporate more maths, but for simplicity we won't in this article.

Also, keep in mind how we're using Y direction here. Because the origin point of the canvas (0, 0) is the top-left corner, a positive Y direction will actually cause the ball to move _downward_ visually.

Add a call to `ball.update()` inside of `app.update()` to have our ball appear on screen and start moving. If you reload the game, you'll notice that you can't actually hit the ball with your paddle, and that you "die" every time the ball is reset. Lets do that next!

## Basic Collision Detection

Collision detection is a basic concept in game design which aims to detect and handle when game objects transition from a state of "not touching" to "touching" - ie. collisions.

All of our games collisions are going to be coming from the ball, so let's add a function to our ball object called `checkCollision` that takes one parameter: the object we're checking for a collision with.

{% highlight javascript linenos %}
checkCollision : function(obj){

    if (this.position.y + this.size.height < obj.position.y)
        return false; //Above
    if (this.position.y > obj.position.y + obj.size.height)
        return false; //Below
    if (this.position.x > obj.position.x + obj.size.width)
        return false; //Left
    if (this.position.x + obj.size.width < obj.position.x)
        return false; //Right

    // We have a hit! Update direction based on where we hit the object

    //Moving towards lower right
    if (this.direction.x == 1
        && this.direction.y == 1)
    {
        if (this.position.y > obj.position.y)
            this.direction.x = -1;
        else
            this.direction.y = -1;
    }

    //Moving towards lower left
    else if (this.direction.x == -1
            && this.direction.y == 1)
    {
        if (this.position.y > obj.position.y)
            this.direction.x = 1;
        else
            this.direction.y = -1;
    }

    //Moving towards upper right
    else if (this.direction.x == 1
            && this.direction.y == -1)
    {
        if (this.position.y > obj.position.y)
            this.direction.x = -1;
        else
            this.direction.y = -1;
    }

    //Moving towards upper-left
    else if (this.direction.x == -1
            && this.direction.y == -1)
    {
        if (this.position.y > obj.position.y)
            this.direction.x = 1;
        else
            this.direction.y = -1;

    }

    return true;

},
{% endhighlight %}

Yikes - that's a lot of code! Let's break it down and try and understand it a little better.

{% highlight javascript linenos %}
if (this.position.y + this.size.height < obj.position.y)
    return false; //Above
if (this.position.y > obj.position.y + obj.size.height)
    return false; //Below
if (this.position.x > obj.position.x + obj.size.width)
    return false; //Left
if (this.position.x + obj.size.width < obj.position.x)
    return false; //Right
{% endhighlight %}

First, we're going to check if we've had a collision. We do this by testing what are known as contradictions. For example, if we know that the ball is too far left on the screen for it to have hit the object, then we'll return false, which signifies the lack of a collision. We perform checks for each of the four directions: Is the ball too far to the left? The Right? To high? Low? If any of those conditions are true, we know that we are not colliding, and immediately stop calculating. For simple rectangular objects, this is all we'll need.

Next we have another series of if statements to check which side of the object we're colliding with, and adjusting the direction of the ball accordingly. We could probably extract this into it's own function, but again - brevity.

Once we've got our collision detection hammered out, we simply need to run the check on each frame. In `ball.update()` add a line that looks like this:

{% highlight javascript linenos %}
this.checkCollision(player);
{% endhighlight %}

And that's it. Now, every single frame the ball will check if it's hitting the player paddle, and adjust its direction accordingly. Pretty sweet huh?

## Wrapping Things Up

The rest of the game is pretty simple. We'll add a bunch of bricks to break, store those bricks in an array, draw them on each frame, and then handle collisions between the bricks and the ball. Most of the hard work is behind us. Let's start off with a brick class:

{% highlight javascript linenos %}
var Brick = function(){

  this.health = 3;

  this.size = {
    height: 30,
    width: 50
  };

  //Will be determined on setup
  this.position = {
    x: 0,
    y: 0
  };

};

Brick.prototype.draw = function(){

  if (this.health <= 0)
    return;

  switch (this.health) {
    case 3:
      app.context.fillStyle = "rgb(0, 200, 0)"; //Green
      break;
    case 2:
      app.context.fillStyle = "rgb(200, 200, 0)"; //Yellow
      break;
    case 1:
      app.context.fillStyle = "rgb(200, 0, 0)"; //Red
      break;
  }

  app.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
};
{% endhighlight %}

Our bricks have a position, a size, and a health value. When we draw the brick, we first determine if the brick is living (and ignore the rest of the drawing phase if not) and if so, set a color to draw based on the current health value of the brick.

Now lets create all of our bricks. I'll leave out my implementation of the setup functions for you to figure that out on your own. However, I have `app.setupBricks()` to create an array of bricks, and `app.drawBricks()` to loop through bricks and call draw on each one. Call `setupBricks()` on init, and `drawBricks()` on update, and you should be good.

Finally, we simply need to check the ball's collision with the list of bricks on each iteration. Add the following code to our ball object:

{% highlight javascript linenos %}
checkCollisionWithBricks : function(){

    var i = 0;
    for (i = 0; i < app.bricks.length; i++)
    {
        var brick = app.bricks[i];
        var collision = this.checkCollision(brick);

        if (collision)
        {
            player.score += 20;

            brick.health -= 1;
            if (brick.health < 1)
                app.bricks.splice(i, 1);
        }
    }
}
{% endhighlight %}

And call `checkCollisionWithBricks()` inside `ball.update()`. Run the game, and revel in your brilliance!

Here is a Pen of the original game that I made: [http://codepen.io/JordanForeman/pen/DeqLz](http://codepen.io/JordanForeman/pen/DeqLz)

Hopefully this article was helpful! Please feel free to comment with any critiques you may have below in the comments!
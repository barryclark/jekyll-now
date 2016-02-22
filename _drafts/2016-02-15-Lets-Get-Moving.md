---
layout: post
categories: [javascript, game, development, canvas, animation, controls]
title: Lets get Moving!!!
author: emir_osmanoski
comments: true
---

It is time to give our game world a bit of life. In the previous post we saw how we can draw
our character in the world. 

In this post we will look into doing a very simple animation, moving around.
And we will do the animation based on user input.

So the 2 main things we will look at in order here are:

1. Reading User Input and modifying the location of the main character.
2. Properly animating the world and character as the character location changes.

Before doing the above though we are going to refactor the code a little bit
which is going to give us the freedom to better organize the different parts
of what is required to achieve our points.

# Module Pattern and the Game Module

One of the more used Javascript patterns is the (Revealing) Module Pattern.
It's what we are going to be using to organize the game in different modules.
We already have one module, which is the code initializing the game, the main
Game Module.

The pattern alswo allows us to separate different code dealing with different
functions into different files and then bring all those together in a single
place. The pattern finally will also allow us to achieve this by not poluting
the global window namespace. We will store all our code/modules under a single
variable under window.

Let's take a look at how the world.js file will look after we apply the small change:

{% highlight Javascript %}
(function(g){
	g.Game = function(){
		var jose = {
			x: 350,
			y: 250,
			width: 100,
			height: 100,
			color: "#F38F1D"
		};

		var world = {
			color:"#F4F4F4"
		};

		var canvas = document.getElementById('world');
		var ctx =  canvas.getContext('2d');

		startStory();

		function startStory(){
			drawWorld();
			drawJose();
		}

		function drawWorld(){
			ctx.fillStyle = world.color;
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		}

		function drawJose(){
			ctx.fillStyle = jose.color;
			ctx.fillRect(jose.x, jose.y, jose.width, jose.height);
		}
	}();
})(window.g = window.g || {});
{% endhighlight %}

We see that as before we have enclosed the definition of the functions and
objects inside a function definition which calls itself, but now we are also
sending the parameter *g* to the function.

The way the parameter is sent is seen at the bottom of the file

{% highlight Javascript %}
})(window.g = window.g || {});
{% endhighlight %}

This is a small trick that independent of which script was loaded first will
either use the g object from the window object or set the g object on window
to a new object.

This might seem a bit overkill but we will see how it fits once we introduce
the Input module we are going to use to initialize and setup user input.

# Input Module

We will start of with a very simple skeleton of the Input module and see how
we can use it in the main Game Module:

{% highlight Javascript %}
(function(g){
	var keys = {
		37:"left",
		39:"right",
		38:"up",
		40:"down"
	};

	g.Input = (function(){
		function init(character){
			alert("Initializing input");
		}
		return{
			init:init
		};
	})();
})(window.g = window.g || {});
{% endhighlight %}

If we load up the script in the index.html file before the main Game Module we
can then access is and call it on startStory:

{% highlight Javascript %}
function startStory(){
	drawWorld();
	drawJose();
	g.Input.init(jose);
}
{% endhighlight %}

We do not have to do any additional loading in the Game Module or anything. We
are also passing the *jose* object because based on the input we will be
changing the *x* and *y* properties on the character.

## Handling Input and Managing Keys

We can see that in Input we've declared an object containing the keys to which
we want to respond to. When handling Javascript events related to key presses
we are always going to be getting a code of the key that has been pressed. For
example the key code for the 'a' key is mapped to the number 65.

The keys and the codes defined in the module are the arrow keys on the
keyboard. We've sort of mapped each of the sort ofunreadable key codes to a
readable string and we will see how this is used further down.

Now, to read and respond to inputs we are going to attach an event listener to
the document object. Initially we are only going to be outputing to the
console the key that was pressed. Let's look at how the Input module has now
changed.

{% highlight Javascript %}
g.Input = (function(){
	var player;

	function init(character){
		player = character;
		addKeyEventListenerToDocument();
	}

	function addKeyEventListenerToDocument(){
		document.addEventListener("keydown", processKeyDown, false);
	}

	function processKeyDown(e){
		console.log(e.keyCode);
	}

	return{
		init:init
	};
})();
{% endhighlight %}

It's also noticable that we have also added a internal player reference so
that we can use it beyond the initialization method.

This is a good start to moving the character but we want to do more than just
output what key was pressed.

We are going to change the *processKeyDown* event  so that we make changes to
the properties on the player. We also want to move the player at a certain
speed or velocity when a key is pressed. We are going to be defining the speed
variable in the function and then probably move it out to a State or a Config
module:

{% highlight Javascript %}
function processKeyDown(e){
	console.log(e.keyCode);
	var playerSpeed = 5;

	switch(keys[e.keyCode]){
		case "left":
			player.x -= playerSpeed;
		break;
		case "right":
			player.x += playerSpeed;
		break;
		case "up":
			player.y -= playerSpeed;
		break;
		case "down":
			player.y += playerSpeed;
		break;
	}

	console.log(player);
}
{% endhighlight %}

Just to make sure we are doing everyting properly after changing the properties on the palyer we are logging the player object.

# Actually Doing some Moving!

If we try and open the page and use the arrow keys we are only going to see a
bunch of things written in the console. The player is actually never going to
move in the current state of the game.

What is happening here is that even though the properties on the character
object change the state of the world that was drawn is the one from the game
initialization.

**What we need to do is redraw the world after we have changed the state of
things, in this case the player.**

And now this is where things get interesting! We need to change up how the
story is started and how we process everything.

We can still keep the input initialization as it was, just move it in another
function and then keep redrawing the world in an infinite loop of sorts. This will
cause the square to be redrawn on the world. At each time we will first draw
the world and then the character which will be drawn at the new coordinates.

We can't really do this using a while loop because we are going to block the
application, so we are going to be using an interval that will be called 60
times per second. Or at least that is what it will try to do. And we will get
back to why it is probably going to fail a bit later on. For now we can add
the interval call in the startStory method:

{% highlight Javascript %}
function startStory(){
	setupInput();
	var fps = 1000/60;
	setInterval(draw, fps);
}
{% endhighlight %}


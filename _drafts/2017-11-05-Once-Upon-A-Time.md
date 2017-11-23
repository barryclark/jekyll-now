---
layout: post
categories: [games, development, javascript, engine, 2d, shooter, space]
title: The JavasScript KISS Space Shooter Game!
author: emir_osmanoski
comments: true
---

This is going to be a short one! Still in the middle of a bunch of other smaller
projects and this came up as a possibility and I wanted to keep up the momentum
of writing something! 

So, I recently started looking at some old projects and repositories and ran
into the second and last ever game I've worked on.

I also found what I consider the first, which is a Microsoft XNA educational
game on the solar system but I can't actually run it at the moment on the
account of XNA being basically deprecated and not usable on newer OSes. 

There is a way, using MONO, but that sounds like a job for some later time! 

This second one though! It's JAVASCRIPT! It's from 2013 and it still works! Mostly.... 

So I downloaded it and fired it up and I thought I'd would be fun to take a look
at that code and see how things have generally changed in the last 5ish years.

# Game Time! 

Before going any further the game is actually available here:

<h2 markdown="1" class="text-center">
[PLAY!](http://jsgame.students.mk/)
</h2>

> Note: There is a story here with me trying to setup that URL (pointing to a
> windows host) to be game.emirosmanoski.com.mk but after spending an hour
> playing around with DNS settings I gave up. For some reason I thought it would
> be as easy as pointing the blog URL to the github pages. Nope! A job for
> another time!

# The inspiration and the game design

I remember that the actual inspiration of doing the little hobby project came
from a post I ran into at [subreddit](https://www.reddit.com/r/gamedev/). It was
someone publishing a small set of game assets for a 2d space type of game.
Combining that with my interest in JavaScript resulted in me spending some free
time over the next period working on it. The rest is history!

For the purposes of this post I looked up the assets and they are still
available and actually have been expanded from what I remember was initially
published years back. If anyone is interested they can find the updated
collection <a href="https://opengameart.org/content/space-shooter-redux" target="_blank">here.</a>

## The Design! A Blast from the past!

The design of the game is very simple. You are a little spaceship and have waves
of enemies coming at you at the top and you can only move horizontally. When I
was a kid I've played tons of games using the similar approach and this was my
attempt at a very simplified version of that! 

After killing enough enemies you advance to the next wave which increases the
difficulty of the game by:

1. Spawning enemies faster
2. Making enemies and projectiles faster.
3. Increasing the number of required kills to advance to the next level!

You get 3 lives and after being hit by either an enemy or projectile you loose
one and gain an invulnerability shield for a couple of seconds.

When you run out of lives you are shown a Game Over Screen with  your score, the
enemy wave you reached and the time it took you to get there.

# Let's talk code! 

KISS! Keep it simple and stupid! And this little project delivers on that! 

At the time I wanted to learn a bit more about JavaScript so the game is
implemented without any frameworks (with exceptions) using the basic Canvas API,
with jQuery as a support for implementing the simple game UI.

So without any further delay:

<div>
<a href="www.github.com" target="_blank">The Code.</a>
</div>

> Note: The plan was always to openly publish the project and maybe have someone else
> use some parts of for educational purposes or even to build something
> else on top of it. 

The code is heavily commented. I did that both for my own sake, as a way to
verify/document the concepts but inline, and to make it easier for someone else
to get into it. Over the years I've come to think of the latter as a little
pitfall. They are bunch of better ways to make code understandable which don't
rely on comments. One of them is good code obviously! :)

So let's just take a glimpse at some of the more core aspects of the code

## The Game Loop!

The magical game loop! Take User Input! Update State! Check State Conditions!
DRAW!!

The main game file which handles all that (among other things) is of course
main.js. It's the "App Root" and in a way contains all the calls to all the
other modules.

Let's take a look at two functions in the main.js module. The Start game and the Game Loop

``` javascript

/*
	Called once all the assets are loaded. Hides the asset loading overlay and starts the initialization of 
	major game modules.
*/

function startGame(){
	// Remove the "loading screen"
	$("#main-loading").hide();

	// Initialize dom ui
	g.domui.initDomUI(resetGame);

	// Start the background music
	// g.assets.backgroundMusic.loop().play().fadeIn();

	// Initialize the 
	g.background.setupBackground();

	// Fully reset the game state
	resetGame();

	// Init the enemy spawner
	g.spawner.start();

	// Init the doodad spawner
	g.doodadspawner.start();

	// Setup the delta time functionality which is covered in the main game loop
	g.last = new Date().getTime(),
	g.dt = 0;

	// Start the game loop
	gameLoop();
};

function gameLoop(){

	requestAnimFrame(gameLoop);

	// update delta time
	var now = new Date().getTime();
	g.dt = now - g.last;
	g.last = now;

	if(g.dt > 1000){
		g.dt = 1;
	}

	// clear the screen
	g.draw.Clear(g.ctx);

	// if the game is not over
	if(!g.state.isGameOver()){
		// Make the update call
		updateCall();

		// make the draw call
		drawCall();
	}
	else{
		if(g.state.getState() != g.state.gameStates.GameOverDisplayed){
			g.domui.showGameOverOverlay(g.state.getPlayerScore(), g.state.getCurrentWave(),g.state.getTimeElapsed());
			g.state.setState(g.state.gameStates.GameOverDisplayed);
		}
	}
};

```

Looking at  "startGame" we can see that it initializes a lot of other modules
that handle a collection of different things while the game is running. All of
these submodules are then given a chance to do some processing in the game loop.

But where is the loop?! And what's all this time dt(delta time)? 

## RMP

I remember at the time learning about polluting the global namespace in
JavaScript and different ways to approach that problem. One of the ways to avoid
it was using the Revealing Module Pattern. 

So if you look at the code its a collection of modules that add/create
themselves under a single variable that lives in the global namespace.

There is an attempt at making a clear distinction and keeping things separated
as much as possible. 

To ease the process of creating these I even added a file that was just that, a RMP template:

``` javascript
/*
	An attempt at implementing the javascript 
	revealing module pattern for the major game components.

	Most of the components and javascript 
	files are organized to follow this structure.
*/

(function(g){
	g.INSERT_MODULE_NAME_HERE = (function(){
		// ================= Inner constructor functions ============
		// ==========================================================

		// ======================== Properties =======================
		// ===========================================================

		// ======================== Public Functions =================
		// ===========================================================

		// ======================== Private Functions =================
		// ===========================================================

		// ======================== RMP ==============================
		// ===========================================================

		return {
		};

	})();
})(window.game = window.game || {});
```

## Module Architecture! What?!

There actually is a fair amount of code in the project. I remember that at one
point the idea was to move out certain parts and make them re-usable for other
types of 2d games.

Certain Modules like particle.js try to do just that. It's a very generic module
that offers some classes that can be used to draw any sprite based "particles".
Basically given a sprite sheet depicting particles it is able to render the
images for the given sprite in any location on the canvas.

## Managing dependencies

What?! Are you crazy? Just download the jQuery version you need and slap it into
the **js** folder. What is not clear there?

Obviously this is a far cry from today's world of Bower (RIP), NPM, Yarn and so
on and so forth! But for such a simple requirement, hey guess what! It worked! 

## Building the Game

One of the weirdest moments I had re-exploring the code base was the utilities
**sourceCompilation** folder. It contains some sort of a compiler that takes all
the modules and concatenates them in a single file. I've actually even committed
this compiled file in the "js" folder. 

And what about the mechanism to replace the source files with the compiled
output? Looking at the script references in default.html might give us an answer
on how it was done:

``` html
<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/soundjs-0.3.0.min.js"></script>
<script type="text/javascript" src="js/buzz.js"></script>
<script type="text/javascript" src="js/debug.js"></script>
<script type="text/javascript" src="js/loader.js"></script>
<script type="text/javascript" src="js/animation-api.js"></script>
<script type="text/javascript" src="js/draw.js"></script>
<script type="text/javascript" src="js/input.js"></script>
<script type="text/javascript" src="js/background.js"></script>
<script type="text/javascript" src="js/particle.js"></script>
<script type="text/javascript" src="js/emanager.js"></script>
<script type="text/javascript" src="js/projectile.js"></script>
<script type="text/javascript" src="js/doodad.js"></script>
<script type="text/javascript" src="js/enemy.js"></script>
<script type="text/javascript" src="js/spawner.js"></script>
<script type="text/javascript" src="js/doodadspawner.js"></script>
<script type="text/javascript" src="js/player.js"></script>

<script type="text/javascript" src="js/domui.js"></script>
<script type="text/javascript" src="js/state.js"></script>

<script type="text/javascript" src="js/configs.js"></script>

<!-- Should always be the last script added  as it starts the game -->
<script type="text/javascript" src="js/main.js"></script>

<!-- <script type="text/javascript" src="js/compiled_output.js"></script> -->
```

Yep just delete all the source file references and uncomment the compiled
output! Once again, it was enough 5 years ago! 

# Challenges

## Sound

I actually vividly remember getting sound to work being a PITA. And today its
broken! No surprise there.

Looking at the source it seemed a library called
[buzz.js](http://buzz.jaysalvat.com/) was used. The referenced version is 1.0.x
BETA and now it seems to have gone stable so maybe updating it will fix the
issue.

One thing to note there was that each browser at the time supported different
formats for the audio files so there are a bunch of different file types for
each sound used.

# Lessons Learned

## JavaScript

One thing the project impressed on me is that JavaScript is very performant.
It's capable of smoothly drawing a big amount of images on the screen at the
same time, move them around, animate frames, and make a ton of calculations to
parallax animate backgrounds. It can process keyboard inputs and translate that
to movement of said images, all at the same time, and all while maintaining a
stable frame rate!

So if it turns out that any of the applications I'm working on today (mostly
Angular) are "slow" it means we are making some serious core mistakes somewhere.
Taking and validating user input in forms should never be slower or less
performant than flying spaceship around! 

I also came out of it thinking that you can do anything with the language. That
gave me a sense of "security" when tackling todays more "boring" challenges of
displaying data in this way or that way, or updating table cells based on
dynamic differences in data or whatnot! 

To summarize JavaScript was, still is and will probably continue to be my
favorite language. And I think this project has a big role in that! And I can't
wait to see what the future looks like! 

TypeScript, I'm looking at you!

## Tooling

Or basically the biggest mind-blown moment! 

Today I can't image starting anything to do with JavaScript without having
NPM/YARN and Gulp as support. They just offer so much in terms of quality of
life and productivity! I mean LiveReload! Come on!

And yet 5 years ago apparently it did not matter.
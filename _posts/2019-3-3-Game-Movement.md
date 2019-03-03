---
layout: post
title: First Game Prototype 
---

A prototype of the character and it's movement.

# General

The game will be build with Unity3D.
This will allow us to use default functions from Unity like physics and light.

# Character

The player character is a robot with wheels to traverse terrain.
In the first model seen in the picture below, he consists of four wheels, a body, head, and two arms.
The head has a big eye which will be the place of the first person camera of the player.

![player character](/images/first_character_model.png)

The arms seen in the picture might not initially be on the character when you start the game. Rather it will be one of the first upgrades you can get.

# Movement

The movement of the character consists of simple forwards and backwards movement combined with rotation.
It can be controlled with the arrow keys.

| key   | movement      |
| ----- |  ---------    |
| up    | forwards      |
| down  | backwards     |
| left  | rotate left   |
| right | rotate right  |

The camera is static and can't be moved independently of the body.

The player is affected by gravity and will fall. Unlike in other games there is no fall damage since the player can't die anyways.

The player is able to drive around the world and will automatically perform certain actions.
If the robot hits a small wall, this will be seen as a step and the robot will move over this step.
This ability is limited by the height of the step, he can only move up a step that is about half of the size of his wheels.
The picture below shows steps which the player is able to climb.

![stairs](/images/steps.png)

The player is also able to drive on slopes. This will tilt the character. Currently the only limitation of the slope is given by gravity which pulls the player down if the slope is to steep.

![slope](/images/slope.png)

As stated in the blog post about the game concepts, the player will be able to push objects from the start of the game.This is realized through the collision with an pushable object. The object can be pushed around and is affected by normal physics at all time. This also mean he can push it down stairs or on slopes but he can't move it up stairs.

Even though the player is able to push the object while moving forwards and backwards, he will only see the object if he is pushing it forwards, since the camera will always show the area in front of him.

![pushable object](/images/pushable_object.png)

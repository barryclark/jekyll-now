---
layout: post
title: First Game Level 
---

The first level of the game.

# Map

The first level of Purpose and Despair will teach the player fundamental skills and interactions without telling him anything.

The player sees 3 Button which he might try to use. The green button is ready for use, a yellow button can also bea activated but will spawn a new objects that can be pushed around or picked up if the skill is learned. A red button is currently disabled and can not be used.

In the first Level the player can see a terminal which is diabled (indicated by the red button). Also a spinning object that is locked behind a door.
The player now has to push the green button to open the door. In order to do the he need to put an object on it to be able to drive to the arm upgrade. Afterwards the terminal button color will change to green and is therefore enabled. 
The player can now trigger the NetGame on the terminal and get the "pickup" skill.

Currently there is no notification that the player has earned a new skill or that he ended the level.

![FirstLevel](/images/firstLevel.png)

# Cube Spawner

We realized that it is currently possible to push the cube of into the void. o avoid the a deadlock of the level the player can spawn as many cubes as he like with the cube spawner.

The cube spawner has a yellow button that the player can push, that will spawn a new cube that will fall down from the top of the spawner.

![CubeSpawner](/images/cubeSpawner.png)

The spawner is also used in the second level.

# Door

A door can lock areas behind it. To open the door a button has to be pressed permanently. The player can also open the door with standing on the button but as soon as he moves off the button the door will close.

![door](/images/door.png)

# Upgrade

A upgrade is a physical object that the player needs in order to earn a new skill. He will have to pick up the upgrade before he can learn to use it with the NetGame.

The upgrade moves up and down and rotates in order to get the attention of the player.

![upgrade](/images/upgrade.gif)

# NetGame Stand

In order to learn a new skill then player has to enable the use of an upgrade in its AI. this is done in the NetGame which is now directly playable from the gameworld. The stand is like a display stand that shows the game. The player can trigger a game with moving onto the button in front of it.
The button can also be disabled which and it will change its color to red.

![NetgameStand](/images/NetGameStand.png)

# Time invested
Tim: 5h
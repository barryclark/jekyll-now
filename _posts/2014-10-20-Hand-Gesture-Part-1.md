---
layout: post
title: How to find the number of fingers in hand image
---

I have been working on hand gesture recognition for the past few weeks.
All the things depend upon what is the definition of the gesture.
Like, many people think it is the state of the hand and some take it as some motion.

There are many things that people think as gesture.

  1. The number of fingers that are open can be taken as a gesture **Static Gesture**.
  2. The change of the state of the hand from one position to other **Dynamic or Pattern Gesture**.
  3. The change of the hand. (eg. open hand --> closed hand will give a **grip** gesture)

I have worked on the first two and will be explaining them here.

Lets start with the number of fingers that are open in an image. We need to work
on the following things

 - Identify the position of hand in the image.
 - Segment the hand.
 - Find the Number of fingers open.


 ###Identifying the position of hand in the image

 Identifying the hand in the image is a tricky part. An image contains so much
 information that pinpointing to a particular area is difficult in itself.
 Following are some common techniques.

 ####Finding the Skin color
 The most common approach to find the hand is related with finding the skin color
 in the image. The trick is there is only your hand in the image which is of skin color.
 If it has other areas also like the face then it will be noise and additional work.

 The first **assumption** that we make is *whatever matches the color is hand*
 and we extract it.

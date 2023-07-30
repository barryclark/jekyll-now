---
layout: post
title: Jerboa, a tailed bipedal hopping robot
categories: jerboa
---

New robot video!

<iframe width="420" height="315" src="https://www.youtube.com/embed/wvYthkpRFfk" frameborder="0" allowfullscreen></iframe>

When I first wanted to depart from the tried-and-true [RHex robots](http://kodlab.seas.upenn.edu/XRHex/XRHex) in Kodlab, my first thought was to build a robot that runs like RHex on two legs. So, full of visions of the running velociraptors in Jurassic Park, I set out to create a robot with a powerful tail, and two RHex-like legs.

The first Jerboa video (attachment to an ICRA paper soon to appear, and shared with permission) is now here...it (kind of) hops! (more experiments will happen soon--the IMU and mass distribution were both "broken" in that video). A full technical report to accompany this video is [here](http://kodlab.seas.upenn.edu/Avik/CompositionHopping).

## Bioinspired or not?

Obviously the design is bio-inspired (well, as long as you count animatronic replicas of long-dead creatures as "bio"-anything), but is the behavior?

*Note: In this post I'm only talking about hopping--a tail is of course a great device for [inertial reorientation](https://www.youtube.com/watch?v=oA-BNSisjVQ), as well as executing rapid turns. Watch this space for Jerboa addressing these in the future!*

### Kangaroo

Tail-energized Jerboa hopping doesn't *really* look [like a kangaroo](https://youtu.be/ftgY63SlmKY?t=1m7s) (probably what you think of if someone mentions a tailed hopping thing). In the robot video above, the tail and leg seem to move "in phase," whereas they counter-rotate in the kangaroo. 

It seems fairly well-accepted that the reason for the counter-rotation in the kangaroo is to cancel the leg angular momentum during swing aka recirculation in flight [[1]](http://www.academia.edu/download/30989167/1807.pdf) [[2]](http://dl.acm.org/citation.cfm?id=122755 ). If you accept that, there's really no reason for a robot with a light leg to use the tail for that function.

*Sidenote: a massless or inertia-less leg is a common assumption in robotics, where we have the design freedom to make appendages as light as materials allow. E.g. in the Jerboa, the tail inertia is > 50% of the body inertia, but the leg inertia is < 2%.*

### Jerboa the robot

In the video above, Jerboa instead uses its tail to replace (essentially) a "knee" joint in providing leg extension force to energize hopping. This is almost certainly the first use of a robotic tail in this way...for all its merits and flaws, you saw it here first!

### Jerboa the animal: Lesser Egyptian Jerboa

You were wondering where that name came from, right? :wink: This frankly adorable creature, similar to kangaroo rats, uses its tail for...something. See for yourself:

<iframe width="420" height="315" src="https://www.youtube.com/embed/AwJMP_pYqs4" frameborder="0" allowfullscreen></iframe>

BTW the "skipping" behavior, where the relative leg timing is awkwardly between a hop (legs in phase) and a run (legs exactly out of phase), is very interesting to me in and of itself, and probably will feature in a future post here. But I digress...

To me, it seems in that video that the tail is being used for balance, but at the same time it isn't moving very much. I.e., it seems that the balance is quasistatic (tail slowly moving center of mass around) versus dynamic (tail flinging to exert reaction torques on the body).

This different mode of balance is in the process of being explored using our robot Jerboa as well!


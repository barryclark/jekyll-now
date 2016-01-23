---
layout: post
title: Designing 3D-printable parallelogram joints&#58; part 1
categories: robots mechanical
---

To take full advantage of increasingly ubiquitous rapid-prototyping hardware (laser-cutter, 3D printer), you really need to know how to design your hardware in a way that plays to their strengths and weaknesses. 

The emphasis has to be on:

* **Rapid:** Manufacturing should have really quick turnaround. E.g. fasten lasercut plastic with bolts and standoffs, don't wait for a 3D aluminum piece that has to be shopped out to a 5-axis CNC.
* **Off-the-shelf:** In the prototyping phase, things break. It's easier to buy 10 shoulder screws from McMaster to use as shafts than to remake a custom one on a lathe if (when) it breaks.
* **Functional:** Prototypes don't have to look pretty. Actually, I don't think I've ever made a finished product that looks pretty, but [some people can](http://www.mechachoi.com/).

### Things to think about when designing

Other than these broad strokes, after you pick the materials, you have to think about

* **Strength:** Typical prototyping materials (plastics) are pretty weak. Common causes of extreme sadness are [cantilevered loads](http://en.wikipedia.org/wiki/Cantilever) (especially on long shafts), [stress concentrations](http://en.wikipedia.org/wiki/Stress_concentration) (use more fillets, avoid narrow necks)
* **Tolerances:** Know in advance about the [kerf](http://www.cutlasercut.com/resources/tips-and-advice/what-is-laser-kerf) of your laser-cutter (your holes will be bigger than expected) and the "[blobbies](http://www.makerbot.com/blog/2011/01/06/vertex-polygon-and-diameter-recommendations-for-printing-small-holes/)" (official Makerbot term) from your 3D printer (some will fill in more than expected)

### Joints

Assuming you're making something that moves (if not, you should be!) you have to know how to design basic joints. I'm going to list the categories that I think are the most important, and link heavily to this [amazing instructable](http://www.instructables.com/id/How-to-Build-your-Everything-Really-Really-Fast/) by [Charles Guan](http://www.etotheipiplusone.net/):

* Right-angle attachments -- [tab and slot](http://www.instructables.com/id/How-to-Build-your-Everything-Really-Really-Fast/step2/Magical-Finger-Joints-Joining-Plates-at-Right-Angl/), [slotted insert nut](http://www.instructables.com/id/How-to-Build-your-Everything-Really-Really-Fast/step4/The-T-nut-Crossed-T-nut-Jesus-Nut-Slotted-Insert-N/)
* Parallel attachments -- [standoffs / spacers](http://www.instructables.com/id/How-to-Build-your-Everything-Really-Really-Fast/step9/Joining-Parallel-Plates-Using-Standoffs-and-Spacer/)
* Shafts -- [shoulder screws as shafts](http://www.instructables.com/id/How-to-Build-your-Everything-Really-Really-Fast/step13/Rotating-Parts-Using-Shoulder-Screws/) (personal favorite), [live axles](http://www.instructables.com/id/How-to-Build-your-Everything-Really-Really-Fast/step14/Rotating-Parts-Live-Axles-and-Bearings/) (don't cantilever), [attaching to shafts](http://www.instructables.com/id/How-to-Build-your-Everything-Really-Really-Fast/step15/Attaching-to-Rotating-Parts-Live-Axles-with-Set-Sc/)
* Pin joints -- think of these as two pieces joined by a shaft, and use one of the previous methods.

### Parallelogram joints

Sometimes you have to build joints that are not one of these common ones. I might blog someday about a 2-DOF spherical joint I had to make for my research at some point, but today it's going to be a parallelogram joint.

A parallelogram joint consists of **two spherical joints** connected by a rigid link, constrained so that one axis on the distal end is parallel to the corresponding one at the proximal end. (*Hint:* the joint will effectively have $$2 \times 2 - 1 = 3$$ degrees of freedom).

The only reasonable use for these that I have seen are in a [delta robot](http://en.wikipedia.org/wiki/Delta_robot):

![Delta robot](/images/delta_annotated.png "Delta robot")

(Original image from imgur, annotations mine.)

The part I encircled in red is one parallelogram joint (note that the bottom triangle is always parallel to the top triangle). See how complicated that looks to make? Thankfully, that's never stopped me. :wink:

#### Attempt #1: Rod-ends

Going by my **off-the-shelf** dictum, I started with 4x rod-ends per joint (as in the diagram above), but instead of the two shafts with 4x bearings, I chose to use a bolt as a shaft.

Here is an extremely blurry picture of what this looked like:

![Rod end parallelogram joint](/images/parallelogram_rod_end.png "Rod end parallelogram joint")

While it worked, there were several problems with this:

* **Range of motion:** I tried many many rod ends from McMaster, but it's really difficult to find any with >30 degree swivel (end-to-end, i.e. 15 degrees from nominal). This ends up constraining the motion too much
* **Manufacturability:** The aluminum female-threaded rods to attach to the male threaded rod ends had to be made in-house, and of course, eventually the threads stripped.
* **Extra "roll" DOF:** the rod-ends can spin in their socket a small amount along the axis of the long aluminum link. This is strictly a nuisance... although it doesn't hurt, who wants their parts making clink clink noises constantly?

#### Attempt #2: Custom 3D-printed joints

With the magic of 3D printing, it's conceivable to make a compact *enough* piece that has the requisite DOF's. Here's the plan so far:

![Parallelogram v0 side](/images/parallelogram_v0_side.png "Parallelogram v0 side")

The white-looking links would be laser-cut from Delrin (slippery), and attached to the purple (3D-printed) pieces with shoulder screws.

I tried to align the joint so that a *compressive load* along the link (most common) would mostly be transferred to the bolts and not have to be borne by the 3D-printed piece. (I mean, I didn't do any FEA, but I eyeballed it *carefully*.)

Here's an animation of me moving it around so that you can see all the degrees of freedom:

![Parallelogram v0](/images/parallelogram_v0.gif "Parallelogram v0")

Now the onus is on getting the tolerances right (loose, but tight?) so that the motion is unhindered, but there is no wiggling near the (numerous) fasteners. 

Stay tuned for part 2!



---
layout: post
title: Releasing 'Draw Me a Kicker'
tag: drawmeakicker
---

Man, it feels good to ship stuff. After a few months just sitting on this project while it was 90% done, I finally launched [Draw Me a Kicker](http://drawmeakicker.com/). It's not completely finished, and it will be a bit buggy for a while, but I'll get to it. 

<figure class="content-youtube fourbythree">
	<iframe src="http://www.youtube.com/embed/mbBs5oQdYyQ" frameborder="0" allowfullscreen></iframe>
	<figcaption>Quick overview of the project</figcaption>
</figure>

### How it all came to be.
I really started working on it in the summer of '14, but it was really just a toy running on my local machine at the time. Then after getting injured last winter, I had some time on my hands, so I thought I'd sign up for [DesignLab's really cool Design 101 class](http://trydesignlab.com/web-design-course/) and use that as my design project. By the way, I was really impressed by the class, I highly recommend it. Check out [what I did](http://trydesignlab.com/certificates/design-101/mika/) during the class. Alongside the design side of things, I cleaned up and extended the code, and thought I'd take on Polymer as a framework. Why not, right?

### The last mile is the longest
Over the last few weeks, I implemented the saving/loading from the database, as well as the sharing. I originally had not thought the whole saving/sharing thing through, and really only focused on designing the first two phases (designing and vizualising). Turns out that it shows, the UX isn't great! Hopefully I'll revisit, but since I'm not monetizing the project, that'll have to wait.

Since I didn't want to go with Node or Mongo/Couch, I stuck with PHP and MySQL which are things my other sites are running on, so I had to write the code myself instead of dropping a couple of require's, which sucked because ORM is the most boring thing ever. Anyway

The last steps were about implementing a minimum of performance best practices (concatenation, minification, vulcanizing components) and making sure things worked outside Chrome (!). For that I picked up Gulp for the first time, and was really pleasantly surprised. Such fast, very efficiency, wow!

### What I've learned
I've learned a bunch about ThreeJS (it's really great): building and texturing custom geometry on the fly, loading JSON objects, rendering text in 3D, and probably a few other things I forget. Hopefully I'll get some of those in writing.
I'll probably write a short thing about Polymer and what my first impression has been, too.

### What's next
Some of the things I intend to do over the next few weeks:

- clean up the UI a bit.
- use a CDN to speed up delivery and protect my small, weak server if anything were to happen.
- set up HTTPS.
- use file versioning. There is none at this point, so caching is all messed up.
- WebVR! I already have a quick hacked up version in, I'm hoping to add more assets to make things look better.
- make the UI responsive, it's not a great experience on mobile at this point, although the 3D is fast!
- maybe at some point play with the following: HTTP/2, client hints, service workers
- probably never: adding some tests. My alibi here was that I had no idea what the Polymer architecture was gonna look like so I didn't bother writing tests. I know it looks bad, but who wants to spend time refactoring code on personal projects?

### In the long run
I've already received a few feature requests from people (rollin tower specs, volume calculations for landings), I'd love to take them on, but time is a finite resource. We'll see :)

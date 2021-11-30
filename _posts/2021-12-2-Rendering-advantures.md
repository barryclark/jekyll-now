---
layout: post
title: Journey to first completed project
---

I've always been amazed with computer graphics, and looking at recent advancements with ray tracing, and the great upgrade that Unreal Engine 4 supposed over Unreal Engine 3 with the physically based rendering (PBR from now on) work flow made me more curious.

I had tried before GPU accelerated rendering with OpenGL, but I had never advanced more than a textured quad, so 2021's summer was the time to finally tackle this curiosity with a own built PBR renderer written in C++ and vulkan.

In this writeup we'll talk about how modern graphics work, the PBR magic and how the project went.

## Modern realtime rendering
Rasterization is what modern video games use to create those beautiful graphics. There are more kinds of rendering techniques apart from rasterization like ray tracing or path tracing, but they all suffer to produce enough frames per second to make the illusion of movement, so it was not interesting for me.

Rasterization works by converting triangles into pixels and drawing them by using special programs. As each pixel can be calculated independently, heavily parallel hardware like GPUs can make this technique real time. We can organize any object as a collection of points (or vertices as we call them), and form faces with those vertices. So, to describe any object, we basically need points and a description to connect them to form triangles. But, how can you map this triangles into the correct position to make the illusion of depth? With math, specifically with lineal algebra.

Those object’s vertices come on what we call model space. This means that all the vertices are located relative to the root of the model. But this object needs to be located somewhere in the world, so what we do is transform all the vertices to position them on the world. This transformation is done using matrices. By multiplying the position vector of a vertex with the transformation matrix we basically move the vertex into the world position. 

After we’ve moved model’s vertices into world space, we encounter a problem: we can’t move our head around in this world, so what do we do... let’s move the whole world to make the illusion of moving our heads! Those transformations are done by using what’s called the view matrix.

Well, we already have the things in front of us, the work is already done right? Wrong. The world is in the position we want, but reality has something strange called perspective that we need to simulate so that things look real. That’s done using the projection matrix. 

All those matrices are typically provided by math libraries like GLM or CGLM.

Once the vertices are positioned where they should be, we need to light the pixels appropriately. There are several ways to calculate how much light has hit a particular part of the mesh and how much of that light gets reflected into the camera, but for this project the Cook-Torrance method has been chosen, as it creates accurate and beautiful lighting. For more information about how Cook-Torrance works you can check the documentation on the [repository](https://github.com/IkerGalardi/PBR-Renderer/blob/main/doc/SoftwareDocumention.pdf).

## Results
So… how far did the project get? I got a realistic looking image, but the promise of using vulkan was too much for the project. Vulkan itself is a pretty complex API, so combining that with learning how PBR math magic works was a pretty bad idea. After some thinking, the graphics API was changed to OpenGL and the focus was put into understanding how that PBR magic works.

![Example Rendered Image](https://github.com/IkerGalardi/ikergalardi.github.io/blob/master/images/tiles_render.png?raw=true)

As it can be seen in the image, the results obtained aren’t bad at all. Still, the renderer has lot’s of issues, and the most important one is the normal mapping. At first glance the image looks OK, but when you start realizing that some tiles are lit from the wrong side, the illusion falls apart. 

The structure of the program itself is a bit weird as well, as given the short time I had to build and learn how PBR rendering works, lot’s of shortcuts have been taken. The next are some of the weird parts of the structure:

* Why differentiate mesh and model in such a confusing way? 
* Why not use a ECS approach? 
* Using GLTF format to read the scene and models. This way scenes could be built in blender and results could be compared more easily.
* Some kind of built in debugging would be really nice.
* Shader hot reloading to live edit them and see results more easily.

Before trying to do anything else with the project, the previous points should be addressed to be able to work more comfortably and not go crazy. Almost all the engine should be rewritten for that, so it probably would be easier to redo the project from scratch.

# Bored of computer graphics?
Not at all. Since summer I’ve found many resources about this topic, including how Epic games approached UE4’s rendering engine and had an idea on combining more advanced  techniques like deferred rendering and ray tracing that would be interesting to try to implement. 

But for now no more advancements will be done as University is keeping me pretty busy and I have more short term projects applying some newly learned topics. 

Stay tuned to see the projects I’m talking about and don’t forget to check the [github repository](https://github.com/IkerGalardi/PBR-Renderer) of the project.

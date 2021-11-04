layout: post
title: Journey to first completed project: LMake
---

With this article I will describe the journey of creating an application to create other applications... kinda crazy right! It really isn't. What LMake is resembles more to what *GNU Make* is than to what a compiler is. 

The project started with another project, an operating system! Not many people have tried to build operating systems but those who did try know that the building and linking process differs a bit from standard applications. That results in most build systems like *premake* and *cmake* get on your way, making *GNU Make* the best alternative. But for me dependency based build systems seem a bit odd, so I decided to create my own build system using lua and C++.

So knowing that, I started designing how build scripts would be written. As this project was needed to build very customized applications, I decided to design on a command description + execution schema. What does this mean? Let's take a closer look with an example script:
```lua
-- Configure the build command
lmake_set_compiler("gcc")
lmake_set_compiler_flags("-O2 -ftree-vectorize")
lmake_set_compiler_out("bin/%.o")

-- Gather all the C files and compile them
local source_files = lmake_find("src/**.c")
lmake_compile(source_files)
```
As you can see, it's basically programming how the application should be built at the compilation/linking level, giving the all the posibilities needed to create the before mentioned operating system. I know, linking all the source files is missing, just for demostration purposes.

## The journey of building the application

Once I had a basic idea of what functions where needed to build an application I just started writting code. Slowly but surely I started executing lua files with *liblua*, started giving access to some C++ functions to lua and had a basic prototype running. I worked with linux and unix system calls before, so creating and managing processes was not difficult for me.

Of course, without any planning or previous knowledge of working with *lua*, for no ones surprise, the code was a mess. Not only that, but I didn't play with proper modern C++ before, so smart pointers where totally missing, with all the consequences. So the next phase was to back down on all the written code, and fix all the memory leaks and use after frees I had. Finally! After some time of removing all the `new`s and all the `malloc`s and only using smart pointers, I had a program without any memory leaks!

After convincing some of my friends to use *LMake* on their projects, bugs where found, and after some time, fixed. In this time I realized that the workflow I was using was not letting me develop as fast as I wanted, so I started investigating about how *Github*'s pull request system works, and how I could take advantage of that.

## Development workflow
As my code was getting bigger and bigger (for me having 6000 lines of code big), and having to implement features that where big enough not to be able to finish them in one seat. That point was when I realized that I needed another workflow.

Using github's pull request and review system helped me to better organize features, work on multiple features at a time and, I know this sounds weird, review my own code. This point was when I realized that I often write stupid things, and giving me another stage to take a look at the code helped not to directly put those stupid things on the master branch.

At the same time I started using Issues and Projects to keep track on what features I wanted and what features didn't want. At this point, I started realizing that the first stable version was near.

## LMake 1.0.0
Yay! We've got to the first stable version. This was a long journey, with it's ups and it's "I want to delete this project from my github repository". So the questions now become, was it usefull? What's now going to happen with this project?

To the first, actually no. The operating system was abandoned before even having a stable version, and some usability issues didn't help to this matter. To the second question, I don't really know! As said before, the interface exposed to the scripts is really verbose and a bit of a pain to work with, and I dont really have any idea on how to improve that.

## Conclusions
I find a bit tedious to use my own build system, and I don't really know how to improve that situation... so the project won't be further developed until I find time and a better design. 

So we can call the project itself a failure, but what about the process? In the process I've learned a lot on how to approach a project, how to use issues and pull requests to better organize myself and the importance to check all the code I want to merge and avoid stupid things. So from this point of view I can call the project a success. 

Maybe I will revolutionize the C/C++ build system panorama on the future with *LMake 2.0.0*, who knows!

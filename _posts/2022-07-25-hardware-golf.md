---
layout: post
title: On Code Golfing
published: false
---

I've recently been trying to learn Rust for use in embedded projects, and one of the things that I sometimes return to when learning a new language where it's hard to immediately dive in is [Project Euler](https://projecteuler.net/).
Whenever I do this type of problem, though, I wind up being moderately interested in "code golf" with ever-smaller answers.

I have a love/hate relationship with code golf: I appreciate the clever answers that folks come up with in languages that I also use, and I come away learning new things.
But I always harbor a small resentment toward wielders of languages optimized for code golf because it feels a bit like cheating.
Here's one example of a golf language that solves the first Project Euler problem:

> If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
> Find the sum of all the multiples of 3 or 5 below 1000.

Response by user `bxfbxf`:
> Code in Stax ( 9 bytes): ñ╔♥╫ë«ñ«♫
> Uncompressed (11 bytes): F3%_5%*0_?+
> 
> Link: https://staxlang.xyz/#p=a4c903d789aea4ae0e&i=999

The answer is written in the [Stax language](https://github.com/tomtheisen/stax/), which is implemented in dotnet and, for developer productivity, has a web UI and debugger integrated which is fairly nice.
But it is an example of the endgame of code golfing as-is: golf languages game by pushing complexity out of the program into the layers underneath it.
The 9 bytes in the solution are underpinned by the entire dotnet runtime and an interpreter much larger than the code above suggests.

How could we improve code golfing to stop this gamification?
Could we come up with a ruleset that wouldn't hide complexity somewhere else?

My personal answer is to golf on hardware!
One potential objective measure of hardware golf could be transister count.
The lower the transistor count, the lower the likely complexity of the tool you're using to solve the problem (although you could probably come up with some pretty neat, overly complicated analog machines but I'm not sure that's a _bad_ thing).

In that vein, I challenged myself to implement the first problem of Project Euler in the smallest piece of hardware that I could manage: an ATTiny85.
The ATTiny85 is a fairly modest 8-bit microcontroller containing 512 bytes (yes, bytes. Not gigabytes, not megabytes, not kilobytes, just bytes) of SRAM, 32 "general purpose" 8-bit registers, and a few interesting hardware features that we can fully ignore.
There exist smaller chips, but this one was readily available to tinker on: see my [getting started in assembly on the ATTiny85](/projects/attiny85-assembly/).

## My Solution

The first question with trying to compute this on an embedded machine is: what is the simplest way to send the result?
I figure that doing things like flashing the answer onto EEPROM and reading it off requires the whole lot of complexity afforded by the reading system.
Same for using a hardware debugger to read memory, or sending over serial.

But maybe we can blink the answer on an LED in binary?
That doesn't seem very complex at all and you can come up with the answer with a pen and paper, no transistors required!

I don't see a clever way around the complexity to actually program the hardware, yet, but I chose assembly since it's the closest thing to the target machine language so it's pretty thin on complexity over the target.

So... with all of that said, here's my (not very optimized yet) solution:

<script src="https://gist.github.com/shawnnapora/c4a4e8892ea26184bc3c17021d4cba63.js"></script>

It is 132 bytes, compiled, of assembly and will compute the answer and then blink it out in binary, starting from the least significant bit!

## Final Thoughts

What's the logical conclusion of this?
I think the endgame of hardware golf is likely to be far more interesting in its own right, in that gaming it would likely mean lower and lower hidden complexity or "standing on the shoulders of giants" in solutions.

Overall I got pretty far distracted from my original goal of learning Rust for embedded processors, but I had a great time and it was really cool to learn the low-level workings of AVR microcontrollers by programming in assembly.
This is by no means the most optimal hardware target or code, though.

How would you improve on this?
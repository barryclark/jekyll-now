---
layout: post
title: I have watched Computer Architecture course from ETHZ. Here is what I think about it
---

![preview]({{ site.baseurl }}/images/computer-architecture-review-preview.png)

This is the second post in my improvised series "I learned X and what I think about it". I intentionally cover good learning resources here, as I am convinced that knowing where to learn something is much better than knowing where not to learn something. So, this time we will discuss [Digital Design and Computer Architecture course](https://www.youtube.com/watch?v=AJBmIaUneB0&list=PL5Q2soXY2Zi_FRrloMa2fUYWPGiZUBQo2) lectured by professor [Onur Mutlu](http://people.inf.ethz.ch/omutlu/).

## What will be discussed and what won't

In this post I plan to talk about pros and cons of ETHZ CA course and give a brief explanation of what is covered there. So the targeted audience of this article are the software engineers, who want to learn computer architecture by their own, but who are not certain where to start. It is worth mentioning that I have my own opinion on university vs self-taught (online) education, but this topic will probably be covered in my another blogpost. 

## What does ETHZ Computer Architecture course cover?

The roadmap of the course is pretty usual and follows most of popular computer architecture books. It starts from the ground goes up, bringing new and new abstractions on what was covered before. Such course structure is really good for a student, as the process of studying is more like "inventing new technologies using existing knowledge based on older lectures" and not like "revealing how black-boxed technologies work, going deeper and deeper". Starting from the concept of transistor, the course builds up the understanding of logic gates, combinational and sequential logic, ALUs and registers and so on. To my surprise, it also covers some not mainstream, but quite interesting topics, for example systolic arrays. So here is a full list of key concepts discussed in lectures in their original order:

- Computer architecture, its field and architectures overview: CPUs, FPGAs, GPUs, TPUs

- Design goals, common constraints, Row-Hammer attack

- Combinational and sequential logic

- Hardware Description Languages and Verilog

- Timing and verification

- Von Neumann Model, Instruction Set Architecture, LC-3 and MIPS architectures

- Microarchitecture

- Pipelining and its issues

- Out-of-Order execution, Tomasulo algorithm

- DataFlow & load/store handling in OoO architecture

- Dataflow and superscalar execution

- Branch prediction

- VLIW and systolic arrays
- Fine-Grained Multithreading and SIMD Processors

- Graphics Processing Units and GPU Programming

- Memory Organization: technologies, hierarchies, caches

- Cache issues and multiprocessor cache designs

- Virtual memory
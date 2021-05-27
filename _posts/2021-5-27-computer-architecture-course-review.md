---
layout: post
title: I have watched Computer Architecture course from ETHZ. Here is what I think about it
---

![preview]({{ site.baseurl }}/images/computer-architecture-review-preview.png)

This is the second post in my improvised series "I learned X and what I think about it". I intentionally cover good learning resources here, as I am convinced that knowing where to learn something is much better than knowing where not to learn something. So, this time we will discuss [Digital Design and Computer Architecture course](https://www.youtube.com/watch?v=AJBmIaUneB0&list=PL5Q2soXY2Zi_FRrloMa2fUYWPGiZUBQo2) lectured by professor [Onur Mutlu](http://people.inf.ethz.ch/omutlu/).

## What will be discussed and what won't

In this post I plan to talk about pros and cons of ETHZ CA course and give a brief explanation of what is covered there. So the targeted audience of this article are the software engineers, who want to learn computer architecture by their own, but who are not certain where to start. It is worth mentioning that I have my own opinion on university vs self-taught (online) education, but this topic will probably be covered in my another blogpost. 

## What does ETHZ Computer Architecture course cover?

![meme]({{ site.baseurl }}/images/meltdown-spectre-meme.png)

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
- Fine-grained multithreading and SIMD Processors

- Graphics Processing Units and GPU Programming

- Memory organization: technologies, hierarchies, caches

- Cache issues and multiprocessor cache designs

- Virtual memory

## What I especially liked

![tomasulo-algorithm]({{ site.baseurl }}/images/tomasulo-algorithm.png)

I already had a superficial knowledge of most concepts covered in lectures, but that was definitely not enough. This was the main reason why I started watching the course in the first place.  So, comparing me before watching this course and after finishing it, I can certainly say that I learned a lot. My huge respect to professor Multu - pipelining and Out-of-Order execution (including Tomasulo algorithm) were explained accessibly and really well. Caches were also covered in great detail, with parallels in design of virtual memory. I have learned new design concepts, like VLIW and systolic arrays, which to my regret, I did not known before. I also liked the idea of questioning every new introduced concept, showing it pros and cons and comparing it to alternatives. The key is that there is no best design decision - every idea has some tradeoffs that computer architect make when designing a system. Such skeptical look encourages students to think more and analyze stuff, not simply memorizing that "this is good" and "this is bad".

## What can be done better

![warp-scheduling]({{ site.baseurl }}/images/warp-scheduling.png)

As a graphics developer, one of my aims was to learn GPU architecture. And yes, it was covered in lectures, but not so detailed as I would like. Certainly that was because the course aims to cover a wide range of topics and cannot go into every detail in each one, but it is needed to say that if you, like me,  want to study GPU architecture, this course will be a good start, but will definitely be not enough. One of the most today's challenging topics, branch prediction, was also explained quite fast, leaving modern standard prediction algorithms for self learning. Of course there is masters computer architecture course which focuses more deeply on exact concepts, but I wish that as much as possible of them might be learned from bachelors one.

## What's next

As I already said, one computer architecture course even from top-10 university will not be enough to become computer architect or professional C++ developer. The learning route of a professional never was a straight line and even I am not sure what to do next. Maybe I will watch [ETHZ CA master course](https://www.youtube.com/watch?v=c3mPdZA-Fmc&list=PL5Q2soXY2Zi9xidyIgBxUz7xRPS-wisBN&index=1) in the future, luckily it is also available on youtube. Maybe I will finally read [Structured Computer Organization](https://www.amazon.com/Structured-Computer-Organization-Andrew-Tanenbaum/dp/0132916525) which has been dusting on my shelf for a year. Maybe some papers from Nvidia and AMD would be enough, who knows:)

Anyway, I am really glad that there are such good people like prof. Mutlu, who allows us to receive high-level education for free. Universities will not lose any of their students if their lectures are available online for free, and their reputation will only increase, as more and more people will know the real quality of education they provide. So, do not forget to learn new technologies, share your knowledge and do good things for others! I hope this article was helpful for you, as usual if you have any questions and suggestions, or found mistake in the article, feel free to [contact me](https://t.me/momodeve).
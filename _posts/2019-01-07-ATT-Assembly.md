---
layout: post
title: AT&T x86 Assembly
---

The resources are hard to comprehend and general understand is (in my case at least) being done with a lot of Stack Overflow answers. So, let's make some notes and consolidate all the learnings together

## AT&T general syntax is `src, dest`

## The Symbols (`$`,`%`,`*`)
* `$` is a prefix is for immediates (constants)
* `%` prefix is for registers (they are required)
* `*` indicates an absolute jump, in contrast with the absense of the asterisk meaning a relative jump.
* `( ____ )` is used for dereferncing a memory location. Dereferncing is to, `access the value at address ____`

Ref: [`$,%`](https://stackoverflow.com/a/9196757/2806163), [`*`](https://stackoverflow.com/a/19215911/2806163)

## Absolute(`*0xADDR`) and Relative Jump (`0xADDR`)
A jump instruction moves the instruction pointer to a new location. It's the machine language equivalent of goto. Absolute jumps move the instruction pointer to an absolute address. A relative jump jumps to an address specified relative to the current instruction pointer.
[Ref](https://stackoverflow.com/a/17788557/2806163)

## References
* [AT&T vs Intel](http://tuttlem.github.io/2014/03/25/assembly-syntax-intel-at-t.html)
* [popfl,pushfl,lahf,sahf](https://docs.oracle.com/cd/E19455-01/806-3773/6jct9o0ak/index.html)
* [rdtsc](https://www.aldeid.com/wiki/X86-assembly/Instructions/rdtsc)
* [Jump commands](http://unixwiz.net/techtips/x86-jumps.html)
* https://stackoverflow.com/questions/30802831/x86-jmp-asterisk-eax
* https://stackoverflow.com/questions/54066242/att-x86-what-does-xadd-eax-ecx-do/54066448#54066448
* https://stackoverflow.com/questions/54065871/x86-att-what-does-add-instruction-do-using-memory-addressing?noredirect=1#comment94965407_54065871
* https://gist.github.com/mishurov/6bcf04df329973c15044
* https://c9x.me/x86/html/file_module_x86_id_26.html
* http://flint.cs.yale.edu/cs421/papers/x86-asm/asm.html
* https://stackoverflow.com/questions/42887105/x86-assembly-memory-what-does-the-add-instruction-do
* https://stackoverflow.com/questions/7544672/im-not-exactly-sure-what-this-x86-add-instruction-is-doing
* https://stackoverflow.com/questions/1898834/why-would-one-use-movl-1-eax-as-opposed-to-say-movb-1-eax
* http://www.jagregory.com/abrash-zen-of-asm/#replacing-call-and-ret-with-jmp

---
layout: post
title: GCC Calling Conventions
---

## Question 1: What is the advantage of using callee and caller-saved registers? Why can’t all the registers be either callee-saved or caller-saved?

GCC dictates how the stack is used. Contract between caller and callee in x86 is:

* An entry to a function (i.e., just after call):
	* %eip points to the first instruction of function
	* %esp+4 points at first argument
	* %esp points at return address
* After ret instruction
	* %eip contains return address
	* %esp points to the argument pushed by caller
	* Called function may have trashed arguments
	* %eax (and %edx, if return type is 64-bit) contains return value (or trash if the function is void)
	* %eax, %edx, and %ecx may be trashed
	* %ebp, %ebx, %esi, and %edi must contains content from time of call
* Terminology:
	* %eax, %ecx, %edx are "caller save" registers
	* %ebp, %ebx, %esi, and %edi are "callee save" registers

### Resources
* The above text is a part of course notes and seems to be taken from <https://www.cse.iitd.ernet.in/~sbansal/os/lec/l5.html>
* [Google Search](https://www.google.com/search?ei=tjc-XMqVF47orQGM6pTADw&q=gcc+x86+calling+conventions+caller+callee&oq=gcc+x86+calling+conventions+caller+callee&gs_l=psy-ab.3..33i160l2.20198.22958..23160...0.0..0.192.2314.0j14......0....1..gws-wiz.......0i71j0i22i30j33i21.EFjvvT4uodk)
* [Calling Convention for different C++ compilers and operating systems](https://www.agner.org/optimize/calling_conventions.pdf) - **57 Page PDF** (By Agner Fog. Technical University of Denmark.)
* [The 64 bit x86 C Calling Convention](https://aaronbloomfield.github.io/pdr/book/x86-64bit-ccc-chapter.pdf) - **6 Page PDF Chapter**. This chapter was derived from a document written by Adam Ferrari and later updated by Alan Batson, Mike Lack,
Anita Jones, and Aaron Bloomfield. *Does not talk about Caller v/s Callee and why/what reasons are there for it*.
* It's beneficial for a calling convention to designate both caller-save registers and callee-save registers. If the convention designated all registers as callee-save, then subroutines would not be able to use any registers at all without saving them onto the stack first — which would be a waste, since some of the saved registers would be transient values that the calling subroutine did not care about long-term. And if the convention designated all registers as caller-save, then programmers would be forced to save many registers before every call to a subroutine and to restore them afterwards, lengthening the amount of time to call a subroutine. Ref: [1](https://web.archive.org/web/20111222233853/http://ozark.hendrix.edu:80/~burch/cs/230/cso/ch13-sub/index.html), [2](https://zhongshugu.wordpress.com/2011/02/23/caller-save-registers-and-callee-save-registers/)
* In general, neither caller‐save nor callee‐save is “best”:
	* If caller isn’t using a register, caller‐save is better
	* If callee doesn’t need a register, callee‐save is better
	* If “do need to save”, callee‐save generally makes smaller programs
* Functions are called from multiple places
	* So… “some of each” and compiler tries to “pick registers” that minimize amount of saving/restoring
* Ref: <https://courses.cs.washington.edu/courses/cse410/17wi/lectures/CSE410-L13-procedures-II_17wi.pdf>
* Caller-save are volatile, Callee-save are non-volatile. [Ref](https://stackoverflow.com/a/16265609/2806163)

## Question 2: Why do we need to save all the registers on the stack on an interrupt? Can we only save callee-saved registers?

From Course Notes: *Interrupts are events from external devices that force a processor (CPU) to execute a different stream of Instructions. Interrupts can be triggered by multiple devices. To distinguish between interrupts from different devices, a vector number is associated with every interrupt. The x86 hardware supports 256 different interrupt vectors. An IDT contains the handler for every interrupt. On interrupt, the hardware automatically saves the EIP and EFLAGS on the stack before jumping to the target handler. An IRET instruction automatically pops the EFLAGS and EIP from the stack and restore them*

### Resources
1. <https://wiki.osdev.org/Interrupt_Service_Routines>
2. <https://gcc.gnu.org/onlinedocs/gcc/x86-Function-Attributes.html#x86-Function-Attributes>
3. <http://www.ece.utep.edu/courses/web3376/Notes_files/ee3376-interrupts_stack.pdf>
4. When a hardware interrupt occurs on an x86 the flags and return code segment+offset are pushed onto the stack. Then interrupts are disabled. This is to set the stage for the interrupt routine to service the interrupt: switch stacks or whatever it wants to do before either re-enabling interrupts and processing some more before/or returning from the interrupt. The iret instruction pops the previously saved flags (including the interrupt flag which was originally enabled) and the return location so that the interrupted routine can continue processing none the wiser. [Ref](https://stackoverflow.com/a/5278502/2806163)
5. GitLab Source Code of some part of GCC: <https://gitlab.indel.ch/thirdparty/gcc/commit/5ed3cc7b66af4758f7849ed6f65f4365be8223be>
6. **For regular function calls we use the registers and stack to pass parameters, but interrupt threads have logically separate registers and stack. More specifically, registers are automatically saved by the processor as it switches from main program (foreground thread) to interrupt service routine (background thread). Exiting an ISR will restore the registers back to their previous values. Thus, all parameter passing must occur through global memory. One cannot pass data from the main program to the interrupt service routine using registers or the stack.** Ref: <http://users.ece.utexas.edu/~valvano/Volume1/E-Book/C12_Interrupts.htm>
7. The compiler automatically saves and restores any registers that it uses in an interrupt function.<br />
If it sees that the interrupt function calls another function, it will save and restore all of the working registers that the called function might use. <br />
It is not necessary to be concerned with individual registers when programming in C, since the W register array is a compiler-managed resource. <br />
Ref: <https://www.microchip.com/forums/m364030.aspx>

## Saving Registers - Recursive Interrupts
**Question 3: Do you think that saving register on the stack also works with recursive
interrupts (a recursive interrupt mean an interrupt handler can also be
interrupted)? Justify your answer.**

### Resources
1. <https://cs.stackexchange.com/a/29847/86726>
2. <https://stackoverflow.com/a/6585224/2806163>
3. <https://www.avrfreaks.net/forum/do-interrupts-get-interrupted>
4. <https://stackoverflow.com/a/28767868/2806163>
5. <https://stackoverflow.com/questions/38805278/arm-irq-handler-doesnt-work-properly-in-gcc>
6. <https://stackoverflow.com/questions/11403915/can-an-interrupt-handler-be-preempted-by-the-same-interrupt-handler>

## `printf`

**Question 4: Look at the implementation of “printf” in Pintos source code. printf takes a variable number of arguments. A function that receives a variable number of arguments must declare the name of at least one parameter. Given the name of a parameter, “va start” routine can retrieve additional parameters. Do you think the compiler can retrieve the first argument, if the arguments are passed in the reversed order, i.e., the argument just after the return address is the nth argument? Justify your answer.**

### Resources
1. <https://stackoverflow.com/questions/2735587/in-a-c-function-declaration-what-does-as-the-last-parameter-do>
2. <https://www.youtube.com/watch?v=S-ak715zIIE>

## Other Resources
1. Godbolt - Compiler Explorer. Link: <https://godbolt.org/#g:!((g:!((g:!((h:codeEditor,i:(fontScale:1.7000000000000006,j:1,options:(colouriseAsm:'0',compileOnChange:'0'),source:'long+pcount_r(unsigned+long+x)+%7B%0A++if+(x+%3D%3D+0)%0A++++return+0%3B%0A++else%0A++++return+(x%261)%2Bpcount_r(x+%3E%3E+1)%3B%0A%7D%0A'),l:'5',n:'1',o:'C%2B%2B+source+%231',t:'0')),k:50,l:'4',n:'0',o:'',s:0,t:'0'),(g:!((h:compiler,i:(compiler:g520,filters:(b:'0',commentOnly:'0',directives:'0'),fontScale:1.7000000000000006,options:'-O1'),l:'5',n:'0',o:'%231+with+x86-64+gcc+5.2',t:'0')),k:50,l:'4',n:'0',o:'',s:0,t:'0')),l:'2',n:'0',o:'',t:'0')),version:4)> from some famous course
2. CSE IIT-Delhi Course
	* [Homepage](https://www.cse.iitd.ernet.in/~sbansal/os/)
	* [Videos or Lectures](http://www.cse.iitd.ac.in/os-lectures)
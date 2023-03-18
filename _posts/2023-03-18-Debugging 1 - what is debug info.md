---
layout: post
title: What is Debug Info? (An Explainer)
published: False
excerpt_separator: <!--end-of-excerpt-->
---

Debug Info is the information about a running program that the debugger uses to understand that program. Let's delve...

(Part 1 of a series on Windows debugging.)

<!--end-of-excerpt-->

# About me and the debugger

I was a developer on the Visual Studio Debugger (and the Visual C++ Debugger before that) from 1996 to 2002. A lot of the tech in this series was developed for the Windows Debugger (WinDbg) first and then adopted by Visual Studio. I don't know WinDbg very well and my writings here are based on the technology in Visual Studio from that time. As far as I can tell not much has changed since then, but if you see a difference in a modern Windows debugger, let me know in the comments or [email me](/about). 

# What is Debug Information? 

When source code is compiled into a "binary" (on Windows, a `.exe` or `.dll` file) the compiler can also produce an accompanying file of metadata describing things like where each function, statement, and variable is laid out in memory. When you are debugging and ask for the value of some variable `x`, the debugger looks in this metadata to understand things like "what type is `x` and how to evaluate it and present its value to you.

For example, consider this very interesting program that I totally invented just now:

```
const auto message = "Hello World!";
std::cout << message << std::endl;
```

Which I compiled (no optimization) to:

```
00371934  mov         dword ptr [ebp-8],377B30h  
0037193B  mov         eax,dword ptr [ebp-8]  
0037193E  push        eax  
0037193F  call        003710D2  
00371944  add         esp,4  
```

(Aside: in my headcannon both `e` and `x` in `eax` mean "extended" and `a` is short for `accumulator` from CPUs that only had one general-purpose register.)

I guess this is readable if you know assembly. With debugging information the debugger can map these instructions back to source code and explain data reference. It looks like this:

```
    const auto message = "Hello World!\n";
00371934  mov         dword ptr [message],offset string "Hello World!\n" (0377B30h)  
    printf(message);
0037193B  mov         eax,dword ptr [message]  
0037193E  push        eax  
0037193F  call        _printf (03710D2h)  
00371944  add         esp,4  
```

On Windows the metadata for debugging is stored in a `.pdb` file, short for "Program Database". I guess every file is a "database" so I'm not sure that's a very compelling name, but that's what it's called. Also, the first 4 bytes are `RSDS`, the initials of the folks that defined the format.

# Debug vs. Release builds

Here's the same program in Release:

```
    const auto message = "Hello World!\n";
    printf(message);
00F31046  push        offset string "Hello World!\n" (0F32100h)  
00F3104B  call        printf (0F31010h)  
00F31050  add         esp,4  
```

The main difference is `message` has been inlined, saving a few instructions for improved performance. There are no instructions that explicitly come from the declaration of that local variable, so you can't step through the code in the same way.

A common misunderstanding is that the difference between the Debug build and the Release build is that debugging information (in a PDB file) is only available for the former, and that the latter cannot be debugged. This is incorrect. Debugging information can be produced for both Debug and Release. Release builds are (almost always) _optimized_ which can make them more _difficult_ to debug, but it's still _possible_ to debug. 

## A short rant

Some compilers and build systems default to only producing debugging information for the Debug build, but in my not-at-all-humble opinion this is dumb and reinforces that misunderstanding. The build should *always* produce debugging information. The option to not produce debug info shouldn't even exist.

## A short apology

What is the difference between the terms "debug info" and "symbols" and "PDB"? Nothing. They're synonyms. "Symbols" is a common term when implementing a compiler, but outside of that context it's an odd term; yet we use it all over the place in debugger-land. Sorry for the confusion.

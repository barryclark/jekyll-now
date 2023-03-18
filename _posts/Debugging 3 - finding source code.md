---
layout: post
title: Finding source code in Visual Studio, with Source Server
published: False
excerpt_separator: <!--end-of-excerpt-->
---

# How does the debugger find source code?

When you build your source code locally on your development machine and then run it under the debugger, the debugger finds the debugging information automatically. What about when you didn't build the program yourself?

(Part 3 of a series on Windows debugging.)

<!--end-of-excerpt-->

# What about source code?

Once the debugger finds debugging information for your program, the next thing you'll want is matching source code. If you built binaries locally that is again easy - the PDB file says that function `Foo()` came from `C:\source\myprogram\foo.cpp` so the debugger looks there first.

(Aside: The debugger uses a checksum to ensure the file it finds is an exact match, because a mismatch would make debugging very confusing. That is especially problematic on large systems where there might be multiple files with the same name. Visual Studio has a whole bunch of `thread.cpp`, for example.)

"Source Server" takes the spirit of Symbol Server and extends to finding source code. The official build knows it used `foo.cpp` revision 5 and can record that information in the PDB file; the debugger can use that information to retrieve `foo.cpp` revision 5 from the source control system. 

At the time when source server was created, Microsoft mostly used Source Depot (SD) as its version control system. To retrieve a specific file from SD you might run `sd.exe print -q //depot/myprogram/foo.cpp#5`. Source Depot is an internal fork of Perforce. Even though SD is internal, it is mentioned in the [public documentation for Source Server](https://learn.microsoft.com/en-us/windows/win32/debug/source-server-and-source-indexing) even today. Funny.

`p4 print` works pretty much the same as `sd print`, so if your code is in Perforce you can use the same approach. I don't really know Subversion but `svn cat` seems to match as well. Team Foundation Server Version Control has `tf view`.

Note that the debugger doesn't actually understand anything about version control. The PDB file just says "in order to get this source file, run this command line". That's great for decoupling and extensibility: it can adapt to any version control system. It's also terrible for security: "run an arbitrary command line" is a hacker's dream. That's why the Visual Studio options for source server are off by default and will prompt before running each command unless you explicitly change that option.

![Visual Studio Source Server options](https://user-images.githubusercontent.com/1259628/224551631-b516170d-6133-403b-beb9-e3d919a387df.png)

## A short rant-pology

While I'm at it: the word `support` should be stricken from that setting's display name, and the all 4 of these options should move to their own debugger setting tab, to reduce clutter.


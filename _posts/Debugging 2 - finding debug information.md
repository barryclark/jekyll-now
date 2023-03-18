---
layout: post
title: How the Visual Studio Debugger finds debug information
published: False
excerpt_separator: <!--end-of-excerpt-->
---

# How does the debugger find the debug information?

When you build your source code locally on your development machine and then run it under the debugger, the debugger finds the debugging information automatically. What about when you didn't build it yourself?

(Part 2 of a series on Windows debugging.)

<!--end-of-excerpt-->

At build time the debug information is placed on disk adjacent to the binary; for example `C:\source\myprogram\bin\Debug\foo.exe` and `C:\source\myprogram\bin\Debug\foo.pdb`. If you debug the `.exe`, the debugger will just find the PDB file right there.

If you move the build binaries to another directory (e.g. `C:\bin\foo.exe`), the debugger just finds the PDB file anyway. How? Because the compiler records the generated PDB path (e.g. `C:\source\myprogram\bin\Debug\foo.pdb`) in the binary. 

We can describe this as a search sequence:

1. You are debugging `C:\bin\foo.exe`, so look for `C:\bin\foo.pdb`.
2. It was originally compiled to `C:\source\myprogram\bin\Debug\foo.exe` so look for `C:\source\myprogram\bin\Debug\foo.pdb`.

It's common for the "official" build to happen in some kind of official build environment, like CI/CD or a build lab. As a developer, if you copy those binaries to your development machine and try to debug them, you'll quickly get stuck if you didn't copy the PDB with it. The debugger searches like this:

1. You are debugging `C:\bin\foo.exe`, so it looks for `C:\bin\foo.pdb`.
2. It was originally compiled to `E:\builds\myprogram\bin\Debug\foo.exe` so it looks for ``E:\builds\myprogram\bin\Debug\foo.pdb`.

You don't even have an `E:` drive, so that definitely doesn't work! What next?

Hopefully when your official build saved away the outputs it also saved away that debug info. Maybe it's on a network share, `\\files\builds\mprogram\2023-02-01\123450\bin\foo.pdb`. You can tell the debugger to look in that directory and find the matching PDB file. Either use the `Load Symbols` menu item in the Modules or Callstack window:

TODO: image

Or add to the symbol search paths in debugger settings:

![Debugger Symbol Search Paths](https://user-images.githubusercontent.com/1259628/224564588-365ecf23-a9ce-4f62-8175-9e770e252cef.png)

Now the search sequence is:

1. You are debugging `C:\bin\foo.exe`, so it looks for `C:\bin\foo.pdb`.
2. It was originally compiled to `E:\builds\myprogram\bin\Debug\foo.exe` so it looks for ``E:\builds\myprogram\bin\Debug\foo.pdb`.
3. Each of the symbol paths in debugger settings

You see that cache entry in the symbol settings? You should set it to some local directory (e.g. `C:\symbols`), so the debugger doesn't have to go over the network every time.

1. You are debugging `C:\bin\foo.exe`, so it looks for `C:\bin\foo.pdb`.
2. It was originally compiled to `E:\builds\myprogram\bin\Debug\foo.exe` so it looks for ``E:\builds\myprogram\bin\Debug\foo.pdb`.
3. The local symbol cache in debugger settings.
4. Each of the symbol paths in debugger settings.

I said "matching". What does that mean? What if you accidentally told it to look in the `2023-01-02\` directory instead of `2023-02-01\`? The PDB file with the right name might be found at that location, but it's the wrong file - all the variables and functions are probably laid out differently, and the debugger wouldn't be able to find them correctly. When the compiler records the path to the PDB file in the output binary, it also records PDB signature so the debugger can later ensure that it only loads an exact-match PDB file.

# Enter Symbol Server. 

Finding PDB files this way can be a hassle. Can we do better? 

If we know the PDB signature, can we use it as a key to find the matching PDB file?". Yes. When the official build runs, it can follow up with a "symbol publishing" step which places the PDB file on a network share in a directory named by the signature. For example if the PDB signature is `1234ABCD` then the PDB could be found at `\\symbols\symbols\1234ABCD\foo.pdb`. You can read more about in [the official documentation](https://learn.microsoft.com/en-us/windows/win32/debug/symbol-servers-and-symbol-stores).

Later this technology was extended to allow HTTP(S) connections to a symbol server over the internet. You can use this today to get debugging information for Windows and .NET binaries:

![Official Microsoft Symbol Servers](https://user-images.githubusercontent.com/1259628/224551344-90409a10-63f2-4bf7-9dd5-735a4ee6b158.png)

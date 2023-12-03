---
published: false
tags: technical
---
This post will cover the design and implementation of a very basic bootloader for x86 BIOS. Additionally, the build tools that I will use throughout this project will be introduced. BIOS is so 1990, and eventually I will roll a UEFI bootloader, but would take longer, and delay the time when we can actually begin writing the kernel.

This bootloader was designed with the goal of getting into x86's protected mode and into a high level language as soon as possible.  Doing this
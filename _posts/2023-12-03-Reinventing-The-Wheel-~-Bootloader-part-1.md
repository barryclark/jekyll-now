---
published: false
tags: technical
---
This post will cover the design and implementation of a very basic bootloader for x86 BIOS. Additionally, the build tools that I will use throughout this project will be introduced. BIOS is so 1990, and eventually I will roll a UEFI bootloader, but would take longer, and delay the time when we can actually begin writing the kernel.

This bootloader was designed with the goal of getting into x86's protected mode and into a high level language as soon as possible(Don't worry, there will be plenty of assembly).


## Bootloader Theory
When a computer is powered on the BIOS, which resides in read only memory(ROM) of the motherboard, first performs a power on self test(POST) where the computer initializes hardware and peripherals and performs some basic diagnostics. After this, control is given to the bootstrap loader whose job it is to load the first sector of the hard drive where the bootloader will reside. A sector is 512bytes in size, so when writing the bootloader this imposes a certain restriction on us. The other restriction is that the last two bytes of the bootloader must be equal to 0x55, 0xAA. The BIOS will check for this value to make sure that the bootloader is valid and not corrupted. The bootloader will be loaded into physical memory at address 0x7c00.

When an 
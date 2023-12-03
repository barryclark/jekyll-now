---
published: false
tags: technical
---
This post will cover the design and implementation of a very basic bootloader for x86 BIOS. Additionally, the build tools that I will use throughout this project will be introduced. BIOS is so 1990, and eventually I will roll a UEFI bootloader, but would take longer, and delay the time when we can actually begin writing the kernel.

This bootloader was designed with the goal of getting into x86's protected mode and into a high level language as soon as possible(Don't worry, there will be plenty of assembly).


## Bootloader Theory
When a computer is powered on the BIOS, which resides in read only memory(ROM) of the motherboard, first performs a power on self test(POST) where the computer initializes hardware and peripherals and performs some basic diagnostics. After this, control is given to the bootstrap loader whose job it is to load the first sector of the hard drive where the bootloader will reside. A sector is 512bytes in size, so when writing the bootloader this imposes a certain restriction on us. The other restriction is that the last two bytes of the bootloader must be equal to 0x55, 0xAA. The BIOS will check for this value to make sure that the bootloader is valid and not corrupted. The bootloader will be loaded into physical memory at address 0x7c00.

When an x86 processory first powers on it is operating in 16 bit real mode and we must operate in this environment when we our in our bootloader. This mode primarily exists for backwards compatibility reasons, and it is much less powerful than the other processor execution modes available in modern processors. The design of our bootloader takes this into consideration and attempts to get to real mode as soon as possible. Below you can see a simplified finite state machine of a modern x86 processor. As you can see, we will need to set the PE bit in the control register zero(CR0) to enter protected mode.

![]({{site.baseurl}}/images/wheel_x86executionmodes.jpg)
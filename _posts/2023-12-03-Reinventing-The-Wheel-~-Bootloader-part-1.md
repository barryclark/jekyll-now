---
published: true
tags: technical
---
This post will cover the design and implementation of a very basic bootloader for x86 BIOS. Additionally, the build tools that I will use throughout this project will be introduced. BIOS is so 1990, and eventually I will roll a UEFI bootloader, but would take longer, and delay the time when we can actually begin writing the kernel.

This bootloader was designed with the goal of getting into x86's protected mode and into a high level language as soon as possible(Don't worry, there will be plenty of assembly).


## Bootloader Theory
When a computer is powered on the BIOS, which resides in read only memory(ROM) of the motherboard, first performs a power on self test(POST) where the computer initializes hardware and peripherals and performs some basic diagnostics. After this, control is given to the bootstrap loader whose job it is to load the first sector of the hard drive where the bootloader will reside. A sector is 512bytes in size, so when writing the bootloader this imposes a certain restriction on us. The other restriction is that the last two bytes of the bootloader must be equal to 0x55, 0xAA. The BIOS will check for this value to make sure that the bootloader is valid and not corrupted. The bootloader will be loaded into physical memory at address 0x7c00.

When an x86 processory first powers on it is operating in 16 bit real mode and we must operate in this environment when we our in our bootloader. This mode primarily exists for backwards compatibility reasons, and it is much less powerful than the other processor execution modes available in modern processors. The design of our bootloader takes this into consideration and attempts to get to real mode as soon as possible. Below you can see a simplified finite state machine of a modern x86 processor. As you can see, we will need to set the PE bit in the control register zero(CR0) to enter protected mode.

![]({{site.baseurl}}/images/wheel_x86executionmodes.jpg)

Before entering into protected mode, we must also set up a Global Descriptor Table(GDT) and load its address into the Global Descriptor Table Register(GDTR). See https://en.wikipedia.org/wiki/Global_Descriptor_Table. The Global Descriptor table holds segment descriptors that are used when in Protected Mode. Segmentation was originally created as a method by which system software could isolate software processes (tasks), and the data used by those processes, from one another in an effort to increase the reliability of systems running multiple processes simultaneously. The AMD64 architecture is designed to support all forms of legacy segmentation. However, most modern system software does not use the segmentation features available in the legacy x86 architecture. Regardless, it still must be set up. 

In our design we will take advantage of the Flat Segmentation model. In this design we set the base address of all segments to zero and set the limits to 4GB(the maximum addressable memory in 32bit addressing 2^32). x86 automatically uses the Flat Segmentation model in 64bit mode, but we must manually set it up for protected mode. 

Our to do list for the assembly section of our bootloader is as follows:
1. Set up and load a GDT that enables the Flat segmentation model
2. Set CR0.PE to 1 to enable protected mode
3. Jump to the portion of the bootloader written in C


## Bootloader Implementation


The following assembly snippets are following NASM syntax which we will use to build all assembly snippets through out the series.


I will walk through each line step by step for the bootloader. 

We first issue a couple of directives. The first specifies that the symbol bootmain is located in another file. This will be the first bit of C code that we will call into once we're in protected mode. The next directive says that start is a global symbol which is needed to make our linker script work later on. Next we have the start label, which is just used in NASM to mark memory locations in a more human readable way. The start label marks the memory location 0x7c00, where the BIOS loaded us into memory. The directive \[bits 16] tells NASM to emit 16bit code. The instruction 'cli' clears the interrupt flag in the FLAGS register to disable interrupts. We do not want to encounter any interrupts during bootloader execution as this could cause serious issues. Next we load the GDT descriptor(described further down) into the GDTR. Now we are ready to set the PE by in CR0 which is the first bit of the register. 

![]({{site.baseurl}}/images/wheel_bootloader_enablePE.PNG)


NASM also lets us define structures. Here we define a minimal GDT that uses the flat segmentation model. You can see that we set we set the base to 0x0 and the limit to 0xfffff. Segment descriptors are quite unwieldy in the way they are implemented as the base and limits are not described contiguously. If you use NASM to describe these structures, make sure that bytes defined with db are 8bits in length other wise you will run into issues. I had this problem as I was trying to divide the separate fields onto their own lines. The code and data segment descriptors are the same except for a few type flags. 

![]({{site.baseurl}}/images/wheel_bootloader_gdt.PNG)



Here we also compose the GDT descriptor. The GDT descriptor is made up of two components: size and start address. We can calculate size with a little address(label) arithmetic and the start address we defined with a label we saw above. 

![]({{site.baseurl}}/images/wheel_bootloader_gdt_descriptor.PNG)


















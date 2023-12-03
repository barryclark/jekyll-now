---
published: true
tags: technical
---
This post will cover the design and implementation of a very basic bootloader for x86 BIOS. Additionally, the build tools that I will use throughout this project will be introduced. BIOS is so 1990, and eventually I will roll a UEFI bootloader, but that would take longer, and delay the time when we can actually begin writing the kernel.

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


NASM also lets us define structures. Here we define a minimal GDT that uses the flat segmentation model. First we must define a 16 byte null descriptor which is mandatory from the spec. You can see that we set we set the base to 0x0 and the limit to 0xfffff. Segment descriptors are quite unwieldy in the way they are implemented as the base and limits are not described contiguously. If you use NASM to describe these structures, make sure that bytes defined with db are 8bits in length other wise you will run into issues. I had this problem as I was trying to divide the separate fields onto their own lines. The code and data segment descriptors are the same except for a few type flags. 

![]({{site.baseurl}}/images/wheel_bootloader_gdt.PNG)



Here we also compose the GDT descriptor. The GDT descriptor is made up of two components: size and start address. We can calculate size with a little address(label) arithmetic and the start address we defined with a label we saw above. Below this we define some constants that we will use for FAR addressing(https://en.wikipedia.org/wiki/Far_pointer) which will immediately come in handy.

![]({{site.baseurl}}/images/wheel_bootloader_gdt_descriptor.PNG)



Now that we have set CR0.PE to 1, we want to ensure that protected mode is actually enabled. Think about what has to occur for an instruction to be executed. The instruction must be fetched, the operand must be fetched, the instruction must be decoded, the steps(may be more than 1) to actually execute the instruction must be done, and finally the result is written. To take advantage the various steps that take place in a single instruction modern CPUs use instruction pipelining. Instruction pipelining allows for a certain amount of instruction level parallelism(ILP) and increases instructions per cycle(IPC). The instructions we issued to enable protected mode may be anywhere in the fetch/decode/execute cycle and may not actually be all the way executed, there is no guarantee. To ensure that we are for sure in protected mode we will issue a FAR jump, which on x86 will always flush the CPU pipeline. We use CODE_SEG:address to select our segment descriptor that will be used for real mode segment addressing, which because we are using 0x0 as the base address this really has extra effect compared to a regular jmp besides flushing the CPU pipeline.

![]({{site.baseurl}}/images/wheel_bootloader_farjump.PNG)


From here we just need to initialize new segment and stack registers and then we are good to call into bootmain(). We will not be using ss or es so we can just set the selector in these registers to the ds selector. At this point we will not make use of fs or gs. These two registers are used to hold operating system specific data structures in modern implementations. For example on 64bit Windows the gs register holds the address of the Thread Information Block. We may make use of these two registers later on. We are setting the initial stack to physical address 0x9000 and we need to keep in mind that the stack grows downward to lower memory addresses. Finally we can call into bootmain. The last instruction 'jmp $' is just an infinite loop that should only be hit if bootmain returns, which should not happen under expected circumstances.

![]({{site.baseurl}}/images/wheel_bootloader_initpm.PNG)


The initial bootmain method is quite simple. We will simply write the character 'Z' to the physical address 0xb8000 and set its color to red(0x4).

![]({{site.baseurl}}/images/wheel_bootloader_bootmain1.PNG)


Now we have to build all of this code in a way that it will actually boot. I will not go into the details of Makefiles as this post is already running quite long. The entire Makefile is included in the project Github repo for your viewing. I will only cover the steps that are needed to build what we have so far. 

To assemble our boot.asm file into an object file we issue the following command
- nasm boot.asm -f elf32 -o boot.bin


When we compile our C code need to to instruct GCC to include no dependencies. We do not have access to the C run time(CRT) or to the C standard libary when doing this type of programming. We issue a few flags so GCC knows this:
- gcc -m32 -fno-pie -ffreestanding -c bootmain.c -o bootmain.o


Now we will link these two together into a single binary file using a very simple linker script that will put all of the data we use into the .text section:

- ld -m elf_i386 --entry=start -Ttext 0x7c00 -T ./os/boot/bootlink.ld -o $@ $^

>-----LINKER SCRIPT bootlink.ld START-----
>ENTRY(start)
SECTIONS {
    . = 0x7C00;
    .text : {
    }
}
----- LINKER SCRIPT bootlink.ld END -----


Now to build the final bootsector we will dump the .text section from the elf file we created and then pad the ending and add the magic identifier so it is exactly 512 bytes and in the format the BIOS expects. The easiest way I found to do this was with a simple python script that calculates how much padding is needed and then adds it. We can also add some easy error checking in the python script to make sure we do not exceed 512 bytes in size.

- objcopy -S -O binary -j .text bootsector.elf bootsector.bin
- python3 pad_bootsector.py



> -----pad_bootsector.py START-----
import os
size = os.stat('./bootsector.bin').st_size
if size > 510:
    printf(f"FAILED TO BUILD BOOTSECTOR. OVERSIZED: {size} bytes\n")
    exit(-1)
with open('./bootsector.bin', 'ab') as f:
    for i in range(510-size):
        f.write(b'\x00')
    f.write(b'\x55\xaa')
size = os.stat('./bootsector.bin').st_size
if size != 512:
    print(F"FAILED TO BUILD BOOTSECTOR. END SIZE: {size}")
----- pad_bootsector.py END -----


To run and test our implementation we will use qemu. We can do this with the following command:
- qemu-system-i386 ./bootsector.bin

If everything was done correctly, you will see a red character being printed to the top left of the display.

![]({{site.baseurl}}/images/wheel_bootloader_redchar.PNG)






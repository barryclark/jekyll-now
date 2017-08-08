---
layout: post
title: Actiontec - Fuzzing input, overflowing buffers
---

Placeholder

Found the firmware/build image from google dorks. 

Built a firmware image from source, found gdb-server, used radare2 on the httpd daemon

Link to MIPS ASM code.

Describe state of httpd ( stripped, using sstrip,killed ELF headers, no debug symbols)

Need to use syms2elf, connect radare2 to gdb-server process on router (usb stick staticly compiled)

Screenshots of dissasembly

Document stripped out characters - string is read into memory, but special chars are replaced when read from mem to be displayed. 

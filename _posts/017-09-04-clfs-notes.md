---
published: false
title: CLFS Notes
---
## Cross Linux From Scratch Notes
This post documents some of the issues I encountered while working through the Cross Linux From Scratch Book.

### Section NCURSES Ch 5
needed to add CPPFLAGS="-P" to the ./configure command

### Section MPFR 3.1.2 Ch 5
make sure to separate ldflags and ./configure as two commands

### Sectiong GCC 32 Bit
had issue with clfs book setting up a gcc compile improperly, which required this command export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/mnt/clfs/cross-tools/lib

### Section Glibc 32bit (also 64 bit?)
required setting export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/mnt/clfs/cross-tools/lib but then removing the : for some reason

### section GCC 64 bit
no issues compiling, but left LD_LIBRARY_PATH set the same as in the previous section.

### cross GCC 5.16 section
need to separate commands into two lines AR=ar etc. and ../config need to be two separate commands

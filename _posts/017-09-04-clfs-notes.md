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

no issues, LD_LIBRARY_PATH still set

### ch 7 Shadow
typo in book; erratta
this echo "#define ENABLE_SUBUIDS 1" >> config.h should be this echo 
"#define ENABLE_SUBIDS 1" >> config.h

### Issue with Boot Method
Boot Method is not well documented and is missing the temporary grub configuration from previous versions of the book. reverting to chroot method.

### 10.7. Glibc-2.19 32 Bit Libraries
libio/tst-ftell-partial-wide.out fails because it needs a locale that has not yet been generated. 
This is from the LFS book, it is missing in the CLFS book.

### 10.11 gmp 6.0.0
seems that the flag code LDFLAGS etc needs to entered as individual commands, blows up otherwise?

### 10.24
sed -i -e '/test-bison/d' tests/Makefile.in is needed to prevent failures from bison test checks, because bison isn't installed yet.
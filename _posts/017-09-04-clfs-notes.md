---
published: false
title: CLFS Notes
---
## Cross Linux From Scratch Notes - Part 1
This post documents some of the issues I encountered while working through the **Cross-Compiled Linux From Scratch - Version 3.0.0-SYSVINIT-x86_64-Multilib Book**. For my host OS I used **Slackware 14.2**

### Section 5.5. Ncurses-5.9
Needed to add **CPPFLAGS="-P"** prior to the **./configure** command.

### Section 5.8. MPFR-3.1.2
Needed to separate **LDFLAGS=** and **./configure** as two separate commands

### Section 5.13. Cross GCC-4.8.3 - Static
Needed this command before running configure: **export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/mnt/clfs/cross-tools/lib**

### Section 5.14. Glibc-2.19 32bit
Required setting **export LD_LIBRARY_PATH=$LD_LIBRARY_PATH/mnt/clfs/cross-tools/lib** from  section **5.13**, but needed to remove the **:**.

### Section 5.15. Glibc-2.19 64bit
Required setting **export LD_LIBRARY_PATH=$LD_LIBRARY_PATH/mnt/clfs/cross-tools/lib** from  section **5.13**, but needed to remove the **:**.

### Section 5.16. GCC-4.8.3 - Final
Needed to separate **AR=ar** and **../gcc-4.8.3/configure** as two separate commands.

**LD_LIBRARY_PATH** still set.

### Section 7.6. Shadow-4.2.1
This **echo "#define ENABLE_SUBUIDS 1" >> config.h** should be this **echo "#define ENABLE_SUBIDS 1" >> config.h**.

### Issue with Boot Method
The boot method is not well documented and is missing the temporary grub configuration from previous versions of the book; Reverting to Chroot method.

### 10.7. Glibc-2.19 32 Bit Libraries
Note: **libio/tst-ftell-partial-wide.out** fails, because it needs a locale that has not yet been generated. This note is from the LFS book, but it is missing in the CLFS book.

### 10.11. GMP-6.0.0 32 Bit Libraries
**LDFLAGS=** needs to be entered as separate command from **./configure**.

### 10.24. Flex-2.5.39 64 Bit
The command **sed -i -e '/test-bison/d' tests/Makefile.in** is needed to prevent failures from bison test checks, because bison isn't installed yet.

### 10.41

after make NON_ROOT_USERNAME=nobody check-root one test fails, mount point a/b already traversed circular directory structure, appears to not be an issue, obscure

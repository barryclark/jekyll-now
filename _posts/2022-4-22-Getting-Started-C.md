---
layout: post
title: Getting Started with C Programming
---

Hello geeks,

In this article, I am going to show you how to get started with C Programming in TurboC.

# Setup
Here's how to Setup Turbo C without installing anything on your PC.
Go to https://www.onlinegdb.com/

![OnlineGDB](https://user-images.githubusercontent.com/46340124/163584849-41dd8a67-8d3c-4ef6-a0c6-6153d8dc90d6.png)

In the top left corner, Select 'Language' as "C (TurboC)" from the drop down menu. 
![OnlineGDB_TurboC](https://user-images.githubusercontent.com/46340124/163584994-c86cf4cc-e69a-4369-8d6d-d09ed0dd627a.png)


By default, onlineGDB loads in some code. You can delete this code and place your own code instead.
.................................

# Basic Structure of a C Program
```c
#include <header file name>
#include <header file name>
void main()
{
............
............
}
```
This is what the structure of a C program looks like.

# Your First C Program
Let's create our first C file.

Open OnlineGDB and type in the following code.

```c
#include <stdio.h>
#include <conio.h>

void main() 
{
  printf("Hello World!");
  getch();
}
```
Now Run the program by clicking the green 'Run' button near the top of your screen.

# Explanation of the Program

**What is `<stdio.h>` ?**

It stands for 'Standard Input Output'. stdio.h is a header file which has the necessary information to include the input/output related functions in our program. Functions like `printf` and `scanf` are from stdio.h.

**What is `<conio.h>` ?**

It stands for 'Console Input Output'. conio.h is a header file which is mostly used by MS-DOS compilers like TurboC. Functions like `getch()` are from conio.h and _won't work unless conio.h is included in the program_.

**What is `void main()` ?**

void main() is the entry point for execution in C program. It is where the main code of your program is written. 
> Main function is the heart of C program. Everything inside the main block will be code that is executed.

**What is `printf()` ?**

printf() is a function used to output text to the screen. In our example it will output "Hello World!".

**What is `getch()` ?**

getch() is a function used to keep the output from the program on the screen for some time until the user presses a key. Without getch(), we wouldn't be able to see the output of our program in TurboC as after execution the program would close.


# That Was Your First C Program
Congratulations! Now you know how to get started with C. 


---

If you have anything to add here, you can email me on the address given below.
Join our [WhatsApp Group](https://chat.whatsapp.com/K3NrW5tPwrsHhfbdYstjLl)

---

Posted by Siddharth Bhatia ([sid@tsecgeeks.in](mailto:siddharth@tsecgeeks.in))

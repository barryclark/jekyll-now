---
layout: post
title: Looking at an Integer Overflow
category: VRD
---
# Introduction
Having been doing research and coursework within vulnerability development, integer overflows and underflows have kept cropping up.
This post will be looking at an Integer overflow and how they can possibly cause a security risk to within an application.
Integer vulnerabilities are common in many applications and can affect the application in a small way, and in a costly way.
An example of an integer overflow causing a significant amount of damage, is the [ARIANE 5 Explosion](https://www.youtube.com/watch?v=qnHn8W1Em6E). This was due to a data conversion between a 64bit floating point and a 16 bit signed integer.
The inquiry board write up is worth a read and can be found here [Inquiry Board](http://www-users.math.umn.edu/~arnold/disasters/ariane5rep.html).<br>
All code demonstrated below was compiled on Ubuntu 16.04 LTS, using the GCC compiler with the following flags:
~~~shell
gcc -m32 -g filename -o fileout
~~~
- g - Extra debugging information
- m32 - Compile in 32bit mode
- o - Output file with a specific name or location

# What is an integer?
An integer in this case is a 32-bit/4-byte sized variable which holds values ranging from -2147483648 to 2147483647.
The following code block will help demonstrate these values. In C, the int value by default is signed.
Meaning that an integer can be both negative and positive, which can lead to problems when the value goes out of bounds of an array.

## Demonstration of size, minimum and maximum of the type 'int'.
~~~c
#include <stdio.h>
#include <limits.h>

int main(void)
{
	int i = 9999;
	int x = sizeof(i);
	printf("INT_SIZE IN BYTES: %d\n", x)
;	printf("INT_MAX = %d = 0x%x\n", INT_MAX, INT_MAX);
	printf("INT_MIN = %d = 0x$x\n", INT_MIN, INT_MIN);
	return 0;
}
~~~
Output:
~~~shell
INT_SIZE IN BYTES: 4
INT_MAX = 2147483647 = 0x7fffffff
INT_MIN = -2147483648 = 0x8000000
~~~
# Integer Overflow
When the variable holds a number that is larger than it can hold, it will cause the wrap around to occur, going from 2147483647 to -2147483648.
This doesn't lead to an exploit in the same way a buffer overflow would, as the integer overflow doesn't write over memory. However that being said
in the context of the variable, it could be used to access memory locations outside the bounds of an array, or could generate a segmentation fault when assigning a particular block of memory from the heap via malloc.

## Demonstration of a wraparound
~~~c
#include <stdio.h>
int main(void)
{
	int i = 0x7fffffff;
	int x;
	printf("the value of i is %d, %x\n", i, i);
	x = i * 0x3;
	printf("i * 3 = %d, %x\n", x, x);
	x = i + i;
	printf("i + i = %d, %x\n", x, x);
	return 0;
}
~~~
Output:
~~~shell
The value of i is 2147483648, 7fffffff
i * 3 = 2147483645, 7ffffffd
i + i = -2, fffffffe
~~~

## Demonstration of Malloc + a wraparound
To demonstrate the risk in which an integer overflow could cause if not properly implemented, we can allocate memory based on an integer using Malloc.
### Malloc & Strcpy
Malloc is a function which is found in the stdlib.h library within C. Malloc is a function in which we can use to request and allocate memory for a specific purpose.
~~~c
malloc(specify the size of memory to allocate);
~~~
Strcpy is a function which is found in the string.h library within C. Strcpy copies a string from a certain memory location another. The following example demonstrates this going from string location 1(stringloc1) to string location 2(stringloc2).
~~~c
strcpy(stringloc2, stringloc1);
~~~

Carrying on with our demonstration of malloc + strcpy + an integer overflow. We can create a C program which successful allocates memory and copies the value of "eXit" to the memory allocated by the use of Malloc.

~~~c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
void main(void)
{
	int size = 0; /*Variable to store the sizeof the memory allocated */
	char *str = (char *) malloc(256); /* Allocates 256 bytes of memory to the 'str' variable*/
	size = sizeof(*str); /*Gets the size of our 'str' variable (line 2) which should be one byte as it is a char */
	strcpy(str, "eXit");
	printf("The size of the memory block is %d byte(s), and the memory is %p, and the value is %s\n", size, str, str);
}
~~~
~~~shell
The size of the memory block is 1 byte(s), and the memory address is 0x80bf008, and the value is eXit.
~~~

However if the Malloc'd value is a negative then we have a segmentation fault.
~~~c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
void main(void)
{
	int size = 0; /*Variable to store the sizeof the memory allocated */
	char *str = (char *) malloc(-1); /* Allocates negative one bytes of memory to the 'str' variable*/
	size = sizeof(*str); /*Gets the size of our 'str' variable (line 2) which should be one byte as it is a char */
	strcpy(str, "eXit");
	printf("The size of the memory block is %d byte(s), and the memory is %p, and the value is %s\n", size, str, str);
}
~~~
~~~shell
Segmentation fault (core dumped)
~~~

Using IDA(free) we can disassemble the C code into x86 instructions which demonstrates what is going on at a machine code level.
The following image is of the first code segement of the above malloc.
![IDA dissassembly of Malloc](/images/dis_image2.png "Malloc without an Integer Overflow")

The following image is of the second code segement of the above malloc which is using a negative value to demonstrate what could happen with an Integer Overflow.
![IDA dissassembly of Malloc](/images/dis_image1.png "Malloc with an Integer Overflow")

In Addition: If a segmentation fault doesn't occur, the value that is being set will automatically wrap around not to a negative number but to a significantly higher number within the unsigned region. This is because malloc is expecting an unsigned value, in which the compiler can automatically allocate this.
# Conclusion
As demonstrated an integer vulnerabilities can cause extreme problems which is why it is always important to check that you are using the right variable types when writing code.

# Update
As a real world example of an integer overflow occurring, see my post about [Crashing The Apple Network Manager](http://www.exit.wtf/Apple_Network_Manager_Crash/)

# References
[Phrack: Basic Integer Overflows](http://phrack.org/issues/60/10.html)


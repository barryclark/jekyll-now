---
layout: post
title: Raspberry Pi as PC 
date: June 8 2019 
time: 23:19 UTC-4 
---

So I have just begun using a Raspberry Pi as a total desktop. And I am really enjoying it. The text editor choices are very lean, so I've been using VI, and I  really like using it to be honest. I've added some screenshots below.

I really started to enjoy `vi` as well. It's very pretty. I will post the hello world assembly in ARM as well below.

```asm
.data

msg:
	.ascii "Hello World, from ARM assembly!\n"

len = . - msg

.text

.globl main
main:
	mov %r0, $1
	ldr %r1, =msg
	ldr %r2, =len
	mov %r7, $4
	swi $0
	mov %r0, $0
	mov %r7, $1
	swi $0
```

![Rasp Pi 1]({{ site.url }}/images/rasp-pi.png)
![Rasp Pi 2]({{ site.url }}/images/rasp-pi2.png)


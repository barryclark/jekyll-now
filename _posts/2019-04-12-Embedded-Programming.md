---
layout: post
title: Embedded programming with the STM32
lang: EN
ref: Embedded
categories: [cansat2019]
teaserImage: /images/posts/2019-04-12_STM-unpacked.jpg
---

Our social media followers and [blog post](/Hardware-selection_2019/#processor) readers already know that we want to use the [STM32H743ZI](https://www.st.com/resource/en/datasheet/stm32h743zi.pdf) processor by STMicroelectronics. But how will this work? That's what this post's for.

## The chip

{% include post-figure.html path="/images/posts/2019-04-12_STM-unpacked.jpg" alignment="right" image_size="small" %}

We've chosen the STM32H743ZI not only because of its catchy name, but also because of its outstanding performance. The processor is based on the [ARM Cortex M7](https://developer.arm.com/ip-products/processors/cortex-m/cortex-m7) und is far more powerful than an [Arduino Nano](https://store.arduino.cc/arduino-nano): With 400&nbsp;MHz (25 times faster) and 1&nbsp;MByte RAM (500 times more), it will be easy to record multiple measurements and images simultaneously.

## No need for C!

In Arduino and in general embedded development, C is the most common programming language. Unfortunately, C forces developers to handle pointers and memory allocation by themselves, which makes coding harder and more annoying. This also leads to common errors like memory allocation errors.

That's why we decided to use the  [Rust](https://www.rust-lang.org/) language. It makes fun to work with the modern Mozilla project and, thanks to the [ownership model](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html), there's a memory safety guarantee – no memory allocation errors anymore! We even don't have to make trade-offs in performance as Rust doesn't need a runtime garbage collector like many high-level languages do. Furthermore, much more errors are detected at compile time and we don't have to deal with pointers.

## [Rust Embedded](https://www.rust-lang.org/what/embedded)

In the Rust Embedded area, it's advisable to use a so called [Hardware Abstraction Layer (HAL)](https://docs.rust-embedded.org/book/portability/index.html) for your chip. The HAL creates uniform interfaces for higher-order applications which makes us independent from the underlying hardware. That means, we can even use a completely different chip later without throwing the existing CanSat software into the bin.

Precisely, we need an implementation of the [embedded-hal project](https://github.com/rust-embedded/embedded-hal) for the STM32H743ZI. [Some STM32 chips](https://github.com/rust-embedded/awesome-embedded-rust#stmicroelectronics-1) are already supported, the STM32H7 series unfortunately not. We'll have to write an implementation on our own.

Furthermore, we need drivers for all sensors and components that we want to control with the STM. Some drivers already exist, the other ones have to be developed by us.

We have to read the specifications, data sheets and manuals of the chip and the sensors carefully in order to create an HAL we can work with. As soon as this is finished, we can start writing our CanSat program to collect and store our data.

{% include post-figure.html path="/images/posts/2019-04-12_STM-testing.jpg" alignment="center" image_size="big" caption="Test installation of the STM32 development board, along with some sensors." %}

One difficulty we have to cope with is how to flash our program onto the STM as the support from the open source community is relatively low here. There's the [STM32Cube](https://www.st.com/en/ecosystems/stm32cube.html) tool chain by STMicroelectronics to flash the chip, but there's no possibility to debug the chip using the command line interface (CLI). Maybe that could work with a development version of [OpenOCD](http://openocd.org/), which could make it possible for the [GNU Project Debugger (GDB)](https://www.gnu.org/software/gdb/) to debug the chip.

## What have we already achived?

Like last year, [Henrik](/en/team/#henrik) is our main software developer. This year, also [Johanna](/en/team/#johanna) helps him at implementing the drivers. Currently, they're busy with the HAL: Thankfully, the GPIO implementation could be adapted from another [Rust project for the STM32H7](https://github.com/saschagrunert/stm32h7-rs). The Reset and Clock Control (RCC) has been correctly implemented by us according to the data sheet, but it doesn't work. That's a critical issue because we basically can't do anything without a working clock. As soon as this is fixed, [I²C](https://en.wikipedia.org/wiki/I%C2%B2C), [SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface) and [UART](https://en.wikipedia.org/wiki/Universal_asynchronous_receiver-transmitter) will be added, as they are needed to control the sensors. Finishing the HAL and the needed drivers are the first milestone that we currently aim.

Last year's experience has teaches us that early plans will very likely be changed several times. We don't know how our plans develop in future – maybe we will use a completely other system because we find the current one not suitable. In all cases, we will inform you about that in detail!

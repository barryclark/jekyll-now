---
layout: post
title: Writing embedded drivers in Rust isn't that hard! Part 1
---

Recently Niklas Cölle, a friend of mine, designed a credit card sized PCB ([link](/i2c-driver-schematic.pdf) to the schematic) with
a small LED matrix, a USB Micro port for power and communication with a PC as
well as an AT42QT1070 (a touch sensor) chip on it, all controlled by a STM32L4 microcontroller.

While looking into building some small programs to test whether the thing worked,
I noticed that the AT42QT1070 does actually not yet have a driver in written in
Rust. Furthermore, a quick look at the chip's datasheet (it's only 34 pages
long) shows that this chip isn't actually a complex one to implement a
driver for, so let's dive right into it!

## Rust
If you don't happen to know Rust yet, I recommend you check out the [Rust Book](https://doc.rust-lang.org/book/), otherwise you might
end up confused by some of the syntax and concepts used in this post.

If you do happen to know Rust but have no idea how to use Rust in embedded
development or no idea about embedded development at all, don't worry I'll try
to keep the embedded parts as simple as possible here and explain concepts
too complex to intuitively understand. Alternatively, you might want to check out
the [Embedded Rust Book](https://rust-embedded.github.io/book/) which explains a
lot of the concepts we will be using and partially explaining here (probably better than I ever could).

## Embedded development with Rust
Lots of the rust embedded ecosystem evolves around a single crate called
[embedded-hal](https://github.com/rust-embedded/embedded-hal), which essentially provides a bunch of traits for lots
of interfaces common in embedded development, such as the InputPin and OutputPin
trait for General IO pins or more complex ones like the traits describing
the I2C (Inter Integrated Circuit) protocol.

There are crates called HALs (Hardware Abstraction Layers) that implement these
traits for certain chips or even families of chips. Then driver crates (like
the one we are about to implement) expect to be passed objects that implement
these traits, so they can for example light up an LED by using the OutputPin trait.

## Getting started
What this means for us is that, at least for now, the only dependency we require
is embedded-hal and maybe an implementation of a HAL for the STM32L4 for a little
example running on our development board. This means our Cargo.toml
will end up looking as follows:
```toml
[dependencies]
embedded-hal = "0.2.3"

[dev-dependencies]
stm32l4xx-hal = "0.5.0"
```

Next up we of course do want to verify that the Chip on our little development
board is working so let's dig into the
[datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-9596-AT42-QTouch-BSW-AT42QT1070_Datasheet.pdf) to figure out how we can do that.
The first page of the datasheet already gives us some important information: `Interface: I2C-compatible slave mode (400
kHz). Discrete detection outputs`. So it seems like we will be communicating with
our chip using the previously mentioned I2C protocol.

## But what is I2C?
I2C is a master slave based bus protocol, this means we have certain master chips
(in this case our microcontroller) communicating with certain slave chips (in this case our touch sensor)
on a bus, this means we could also have 1 master communicating with dozens of
different slave chips all on the same bus. Communicating in an I2C context means
that the master is either sending data to one of its slaves or is reading data
from one of its slaves. How exactly that is realized on an electronical level
is not relevant here but you can read the Wikipedia article on [I2C](https://en.wikipedia.org/wiki/I%C2%B2C)
or do some research yourself, there are lots of resources about it.

### Sending data with I2C
If the master wants to send data to one of its slaves this is usually done as
follows:

1. The master sends the slave address onto the bus so in case there are multiple
chips on the bus they know who the following message is for (in our case this address
can be found in chapter 4.2 I2C Address in the datasheet and has the hex value 0x1B)
2. The master sends a register address of the slave onto the bus. For example there
might be a register that contains an 8 bit value describing the sensitivity of our
touch points or a register that if written 0xFF into might cause a recalibration of
the chip etc.
3. The master sends the data it wants to write into the register

### Reading data with I2C
If the master wants to read data from one of its slaves this is done by

1. The master again sends the slave address onto the bus
2. The master again sends a register address onto the bus, this time of course
the address it wants to read from, e.g. an address that tells us if touch point x
is touched right now or not.
3. The slave will respond with the content of the register, which the master has
to read from the bus

## Writing a small program that tests our touch sensor
### A very minimal example of an embedded program in Rust
We'll be creating our test program inside the examples directory of our project
as it's not related to the library itself, luckily for us the stm32l4xx-hal
already provides a program that performs a simple [I2C write](https://github.com/stm32-rs/stm32l4xx-hal/blob/master/examples/i2c_write.rs)
so we can just harvest some of that. At the very top we got do do a bunch of simple imports and
two things most Rust users that are not into embedded development have probably
never seen before.
```rust
#![no_main]
#![no_std]

extern crate panic_semihosting;

use cortex_m_rt::entry;

use stm32l4xx_hal::prelude::*;
use stm32l4xx_hal::i2c::I2c;

#[entry]
fn main() -> ! {
     loop {}
}
```
The two uncommon parts here `#![no_main]`, which tells the Rust compiler that we will define our own main
function instead of using the builtin main mechanism (this is what `cortex_m_rt::entry`
is going to take care of for us), as well as the `#![no_std]` which tells the Rust compiler that we don't
want to use the standard library for this as no std implementations exists for most embedded targets.

Some readers might wonder why we are using the `extern crate` syntax for
`extern crate panic_semihosting;` here, this is because `panic_semihosting` tells
our application what to do once the panic! macro is called (or we unwrap an Err, etc.)
as this behaviour is not defined when writing a `no_std` program per default, hence we
just need to tell Rust that we include this crate in our program but not actually use it.
This specific panic implementation will (as the name says) use semihosting,
a mechanism that can be used to communicate between an embedded
chip and an attached debugger, to print out the stack trace.

Of course all these dependencies aren't inside our Cargo.toml yet so let's quickly add them
```toml
[dev-dependencies]
stm32l4xx-hal = "0.5.0"
panic-semihosting = "0.5.3"
cortex-m-rt = "0.6.12"
```
If we attempt to compile this now, stm32l4xx-hal throws an error, luckily though
along with the error we also get the description of what to do in order to fix it
```
error: This crate requires one of the following features enabled: stm32l4x1, stm32l4x2, stm32l4x3, stm32l4x4, stm32l4x5 or stm32l4x6
  --> /home/nix/.cargo/registry/src/github.com-1ecc6299db9ec823/stm32l4xx-hal-0.5.0/src/lib.rs:21:1
   |
21 | compile_error!("This crate requires one of the following features enabled: stm32l4x1, stm32l4x2, stm32l4x3, stm32l4x4, stm32l4x5 or stm32l4x6");
   | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```
So we quickly check the schematic from above, figure that we have a stm32l4x2
and change our Cargo.toml accordingly
```toml
[dev-dependencies.stm32l4xx-hal]
version = "0.5.0"
features = ["stm32l4x2"]
```
Just to get hit with the next error, a rather weird one this time though
```
error: language item required, but not found: `eh_personality`
```
You can find more about what `eh_personality` exactly is and what it does for us
[here](https://www.reddit.com/r/rust/comments/estvau/til_why_the_eh_personality_language_item_is/).
The fix for this error is rather simple though, at the moment rustc has no idea what
target architecture we are compiling for or how it is supposed to link our binary,
this behaviour is defined in the file .cargo/config, which we can also find the in
stm32l4xx-hal repository, the relevant pieces for us are
```toml
[target.'cfg(all(target_arch = "arm", target_os = "none"))']
rustflags = [
  # LLD (shipped with the Rust toolchain) is used as the default linker
  "-C", "link-arg=-Tlink.x",
]

[build]
target = "thumbv7em-none-eabi"   # Cortex-M4 and Cortex-M7 (no FPU)
```
The file link.x mentioned here is automatically created by the cortex-m-rt crate
which als requires us to put a memory.x file into our project root to describe
the memory layout of our chip (surprise), luckily stm32l4xx-hal has such a file
as well so we just copy the relevant pieces over as well
```
MEMORY
{
  /* NOTE K = KiBi = 1024 bytes */
  /* TODO Adjust these memory regions to match your device memory layout */
  FLASH : ORIGIN = 0x8000000, LENGTH = 256K
  RAM : ORIGIN = 0x20000000, LENGTH = 64K
}
_stack_start = ORIGIN(RAM) + LENGTH(RAM);
```
Now where our minimal examples compiles just fine we can move towards the implementation
of our minimal example to prove that the chip works just fine.

### Reading the Chip ID
According to table 5-1 in our datasheet, there exists a register at address 0x0
that is supposed to contain the chip ID, which is a constant value of 0x2E according
to chapter 5.2, sounds ideal for our purposes, so let's read it!

The i2c_write example already shows us how to setup the HAL so it can do I2C so let's take
a look at their code.
```rs
 let dp = stm32l4xx_hal::stm32::Peripherals::take().unwrap();
 let mut flash = dp.FLASH.constrain();
 let mut rcc = dp.RCC.constrain();
 let clocks = rcc.cfgr.hclk(8.mhz()).freeze(&mut flash.acr);
```
This piece is just a bunch of structs we need to setup the STM32L4 itself and configure
its internal clocks properly

After that they show us how to setup the SCL and SDA pins.
These are the two physical pins used for the I2C protocol with SCL being the line that
transmits the clock signal to keep master and slaves in sync and SDA being the line that
transmits the data signal. However we use different pins than they in our PCB so we have
to simply replace these here to get the setup we wish and end up with
```rs
let mut gpiob = dp.GPIOB.split(&mut rcc.ahb2);

let mut scl = gpiob.pb10.into_open_drain_output(&mut gpiob.moder, &mut gpiob.otyper);
let scl = scl.into_af4(&mut gpiob.moder, &mut gpiob.afrh);

let mut sda = gpiob.pb11.into_open_drain_output(&mut gpiob.moder, &mut gpiob.otyper);
let sda = sda.into_af4(&mut gpiob.moder, &mut gpiob.afrh);
```
We don't have to understand what exactly is happening here as it is again HAL specific code
but it basically configures the pins PB10 and PB11 so we can use them with the I2C
implementation inside our chip.

The last line we need to take over from them is the one instantiating the I2C object
```rs
// We use 400 khz because it was mentioned like that in the datasheet, see above
let mut i2c = I2c::i2c1(dp.I2C1, (scl, sda), 400.khz(), clocks, &mut rcc.apb1r1);
```
However this line is going to fail us with a huge error:
```
error[E0277]: the trait bound `stm32l4xx_hal::gpio::gpiob::PB10<stm32l4xx_hal::gpio::Alternate<stm32l4xx_hal::gpio::AF4, stm32l4xx_hal::gpio::Output<stm32l4xx_hal::gpio::OpenDrain>>>: stm32l4xx_hal::i2c::SclPin<s
tm32l4::stm32l4x2::I2C1>` is not satisfied
  --> examples/read_id.rs:29:19
   |
29 |     let mut i2c = I2c::i2c1(dp.I2C1, (scl, sda), 100.khz(), clocks, &mut rcc.apb1r1);
   |                   ^^^^^^^^^ the trait `stm32l4xx_hal::i2c::SclPin<stm32l4::stm32l4x2::I2C1>` is not implemented for `stm32l4xx_hal::gpio::gpiob::PB10<stm32l4xx_hal::gpio::Alternate<stm32l4xx_hal::gpio::AF4,
stm32l4xx_hal::gpio::Output<stm32l4xx_hal::gpio::OpenDrain>>>`
   |
   = help: the following implementations were found:
             <stm32l4xx_hal::gpio::gpiob::PB10<stm32l4xx_hal::gpio::Alternate<stm32l4xx_hal::gpio::AF4, stm32l4xx_hal::gpio::Output<stm32l4xx_hal::gpio::OpenDrain>>> as stm32l4xx_hal::i2c::SclPin<stm32l4::stm32l4
x2::I2C2>>
   = note: required by `stm32l4xx_hal::i2c::I2c::<stm32l4::stm32l4x2::I2C1, (SCL, SDA)>::i2c1`

error[E0277]: the trait bound `stm32l4xx_hal::gpio::gpiob::PB11<stm32l4xx_hal::gpio::Alternate<stm32l4xx_hal::gpio::AF4, stm32l4xx_hal::gpio::Output<stm32l4xx_hal::gpio::OpenDrain>>>: stm32l4xx_hal::i2c::SdaPin<s
tm32l4::stm32l4x2::I2C1>` is not satisfied
  --> examples/read_id.rs:29:19
   |
29 |     let mut i2c = I2c::i2c1(dp.I2C1, (scl, sda), 100.khz(), clocks, &mut rcc.apb1r1);
   |                   ^^^^^^^^^ the trait `stm32l4xx_hal::i2c::SdaPin<stm32l4::stm32l4x2::I2C1>` is not implemented for `stm32l4xx_hal::gpio::gpiob::PB11<stm32l4xx_hal::gpio::Alternate<stm32l4xx_hal::gpio::AF4,
stm32l4xx_hal::gpio::Output<stm32l4xx_hal::gpio::OpenDrain>>>`
   |
   = help: the following implementations were found:
             <stm32l4xx_hal::gpio::gpiob::PB11<stm32l4xx_hal::gpio::Alternate<stm32l4xx_hal::gpio::AF4, stm32l4xx_hal::gpio::Output<stm32l4xx_hal::gpio::OpenDrain>>> as stm32l4xx_hal::i2c::SdaPin<stm32l4::stm32l4
x2::I2C2>>
   = note: required by `stm32l4xx_hal::i2c::I2c::<stm32l4::stm32l4x2::I2C1, (SCL, SDA)>::i2c1`
```
And while this error looks **insanely** huge and scary stm32l4xx-hal actually
just safed us from a lot of confusion afterwards. Essentially what it is telling us
here is that the SCL and SDA pins we use (PB10 and PB11) cannot be used with the
I2C1 peripheral of our microcontroller (the trait bound `stm32l4xx_hal::gpio::gpiob::PB11<..>: stm32l4xx_hal::i2c::SdaPin<stm32l4::stm32l4x2::I2C1>` is not satisfied)
What it also tells us is that it did find an implementation for `stm32l4xx_hal::gpio::gpiob::PB11<...>:  stm32l4xx_hal::i2c::SdaPin<stm32l4::stm32l4x2::I2C2>` (note the 2 at the end)

So if we just switch this to `I2c::i2c2(dp.I2C2...` our code will compile.

What stm32l4xx-hal just did is warn us at compile time that we were about to
misconfigure our chip for the task we were planning to let it do AND also how we
could fix our misconfiguration, furthermore all these warnings have absolutely 0
impact on run time performance or binary size, isn't that awesome?

So now where we got our variables set up we can leverage the embedded-hal
[WriteRead](https://docs.rs/embedded-hal/0.2.3/embedded_hal/blocking/i2c/trait.WriteRead.html) trait
and its method `write_read(&mut self, address: u8, bytes: &[u8], buffer: &mut [u8])` which
sends all the u8's in `bytes` to `address` and will then read `buffer.len()` u8's into `buffer`
for us. The datasheet told us that we want to read the register 0x0 from address 0x1B and expect
one byte in return. So our method call will be
```rust
let mut buffer = [0u8; 1];
i2c.write_read(0x1B<<1, &[0x00], &mut buffer).unwrap();
```
The reason we have to shift our address by one to the left here is related to
the fact that I2C expects 7 address bits followed by 1 other bit indicating
either a read or write operation, however as of now our last address bit is
the rightmost bit so we want to shift it by one to the left to make space for
the read write bit.

## Test our ID reader
In order to test this small program we have to flash it onto our microcontroller
and afterwards attach a debugger to it somehow so we can read out the value of
our buffer variable and thus check wether we got the expected value from our chip.

For both of these we need to attach a so called debug probe to the PCB, a debug
probe is a piece of hardware that allows us to communicate with our chip and
for example set breakpoints, read variables etc. all the stuff you'd expect a
debugger to do for you. As you can see in the schematic of our PCB Niklas added
few connections we can attach such a probe to (top right the SWD header). Once
we got these wired up with our debug probe and our probe connected to our
computer we have to make our computer communicate with our probe. The default
go-to for this would be a software called `openocd` written in C, however there
is also a Rust equivalent of this software called `probe-rs` which we will be
using here alongside with its integration into cargo called `cargo-flash`.

A simple `cargo install cargo-flash` is enough to acquire everything we need here,
the only thing we got do then is `cargo flash --chip=STM32L452 --example read_id --gdb --reset-halt`
in order to tell cargo flash that we are flashing a STM32L452 chip and want it to put
our example called read_id there. The `--gdb --reset-halt` arguments will then make it
reset the chip to the beginning of our program, halt it there and launch a so called
GDB server on our machine which allows us to speak with the chip through a remote GDB
connection (GDB in case you don't know being the GNU general debugger).

After cargo flash is done, we fire up our GDB with `gdb target/thumbv7em-none-eabi/debug/examples/read_id`.
Once inside GDB, we can connect to our GDB server, set a breakpoint at the end of
our program and continue execution till we hit it
```
(gdb) target remote :1337
Remote debugging using :1337
read_id::__cortex_m_rt_main () at examples/read_id.rs:33
33          loop {}
(gdb) hbreak read_id.rs:33
Hardware assisted breakpoint 1 at 0x8001c6a: file examples/read_id.rs, line 33.
(gdb) c
Continuing.
halted: PC: 0x080064f0

Breakpoint 1, read_id::__cortex_m_rt_main () at examples/read_id.rs:33
33          loop {}
(gdb) p buffer
$1 = [46]
(gdb)
```
And as we can see the buffer contains 46 which is 0x2E in hexadecimal, the exact
value we wanted! This means our chip works properly and everything is set for
part 2, where we will start reading the rest of the datasheet and implement the
actual driver.

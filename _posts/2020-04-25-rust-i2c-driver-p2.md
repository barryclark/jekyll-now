---
layout: post
title: Writing embedded drivers in Rust isn't that hard. Part 2
---

Now that we implemented a small program that is able to read the ID field of the AT42QT1070, we will
first write a small library that generalizes this implementation to every HAL that provides an I2C
implementation and then expand upon that implementation with more and more functionality.

## A simple driver structure
First off we define a simple `Driver` struct which just contains a generic I2C object as well as
an `Error` enum that, for now, only has the `I2cError` variant which in turn contains a generic type,
this is because different HALs do of course return different I2C errors and we want to be prepared for all of them.
```rust
#![no_std]
use embedded_hal::blocking::i2c::WriteRead;

#[derive(Clone, Copy, Debug)]
pub enum Error<I2cError> {
    I2cError(I2cError),
}

pub struct Driver<I2C> {
    i2c: I2C,
}
```
As our I2C struct is purely generic, as of now our implementation will of course have to constrain it
to implementing the `WriteRead` trait, this is quite simply done with:
```rust
impl<I2C, I2cError> Driver<I2C>
where
    I2C: WriteRead<Error = I2cError>,
{
}
```
This declaration now also allows us to have a Result containing the I2C error from the HAL as we
have now bound this type to our generic parameter `I2cError`, hence we can define a `new` function 
in order to (surprise) create a new instance of our struct.
```rust
pub fn new(i2c: I2C) -> Result<Driver<I2C>, Error<I2cError>> {
    let mut driver = Driver {
        i2c: i2c,
    };
}
```

## Integrating the ID getter
However when calling `new` we of course do want to verify that the chip is actually on the I2C bus we
just got passed, this is quite simply done by trying to read the ID from our chip. If the chip is not
attached to the bus it will not respond which should cause the HAL to throw an error, if a chip with
the same address from another manufacturer (remember, I2C has per default only got 7 bits of address
space, collisions will happen) is on the bus it (hopefully) respond with something that is not equal
to the ID we expect. We already implemented the logic behind this last time so now we just got to
wrap it into our generic:
```rust
fn get_id(&mut self) -> Result<u8, Error<I2cError>> {
    let mut buffer = [0u8; 1];
    self.i2c.write_read(chip::I2C, &[chip::ID_ADDR], &mut buffer)?;
    Ok(buffer[0])
}

// This will just contain all our addresses and constants related to the chip
 mod chip {
     pub const I2C: u8 = 0x1B << 1;
     pub const ID: u8 = 0x2E;
     pub const ID_ADDR: u8 = 0;
 }
 ```
 However this piece of code will actually not work:
 ```
 error[E0277]: the trait bound `Error<I2cError>: core::convert::From<I2cError>` is not satisfied
  --> src/lib.rs:38:70
   |
38 |         self.i2c.write_read(Chip::I2C, &[Chip::ID_ADDR], &mut buffer)?;
   |                                                                      ^ the trait `core::convert::From<I2cError>` is not implemented for `Error<I2cError>`
   |
   = note: required by `core::convert::From::from`
 ```
 In order to solve this we basically have two options, we could either do a `map_err()` every time we
 try to write something on the I2C bus or we simply implement the From trait for our `Error` as follows:
 ```rust
impl<E> From<E> for Error<E> {
   fn from(error: E) -> Self {
       Error::I2cError(error)
   }
}
```
Of course now this piece of code will convert every error that we try to return as our `Error` enum
into an `I2cError` variant, that means we have to be careful if we should include more third party
libraries later as these errors too will be converted into `I2cError`, however as long as we don't do
that this solution is actually really convenient.

Now where we got the `get_id()` stuff down we can rewrite our `new()` in order to do the ID check:
```rust
pub fn new(i2c: I2C) -> Result<Driver<I2C>, Error<I2cError>> {
    let mut driver = Driver {
        i2c: i2c,
    };

    let id = driver.get_id()?;
    if id != chip::ID {
        return Err(Error::IdMismatch(id));
    }

    Ok(driver)
}

// And of course extend the Error enum
#[derive(Clone, Copy, Debug)]
pub enum Error<I2cError> {
    I2cError(I2cError),
    IdMismatch(u8)
}
```

## Initializing the chip properly
In order to make the chip work properly we have to configure it, the datasheet notes this can be
done by writing a non zero value to address 56 (see Address 56: Calibrate), which will set the
calibrate bit in the status register at address 2, once the bit is celared the calibration is done.
The status information is represented as an 8 bit long value with 3 relevant and 5 reserved bits (see 5.4 Address 2: Detection Status). In order to represent this bit field in rust we will use the very
commonly used bitfield (TODO crates.io link) crate which gives us a really nice macro in order to
automatically generate such bitfield structs, so lets just include it in our Cargo.toml quickly
```toml
[dependencies]
embedded-hal = "0.2.3"
bitfield = "0.13.2"
```
And stick to the docs in order to denote the information we got from the datasheet in rust, using
said bitfield macro:
```rust
use bitfield::bitfield;

bitfield!{
    pub struct Status(u8);
    impl Debug;
    pub calibrate, _: 7;
    pub overflow, _: 6;
    pub touch, _: 0;
}
```
Now where we got our struct down we can write another simple method that fetches the status for us,
and puts it into the struct so we can use it to, for example, find out wether the pads on the PCB have
been touched yet using the touch bit.
```rust
pub fn get_status(&mut self) -> Result<Status, Error<I2cError>> {
    let mut buffer = [0u8; 1];
    self.i2c.write_read(chip::I2C, &[chip::STATUS_ADDR], &mut buffer)?
    Ok(Status(buffer[0]))
}

// And as always, extend our chip mod
mod chip {
    pub const I2C: u8 = 0x1B << 1;
    pub const ID: u8 = 0x2E;
    pub const ID_ADDR: u8 = 0;
    pub const STATUS_ADDR: u8 = 2;
}
```
So all that is missing now is a routine that performs the calibration write before polling the
status register until the calibration is done and we can start reading actual values!

Before we write this implementation though, we have to add another constraint on the generic I2C
parameter as we are only supposed to write a non zero value into the calibrate register but not
actually read a response, hence our implementation looks as follows:
```rust
use embedded_hal::blocking::i2c::{Write, WriteRead};

impl<I2C, I2cError> Driver<I2C>
where
    I2C: WriteRead<Error = I2cError> + Write<Error = I2cError>,
{
	pub fn calibrate(&mut self) -> Result<(), Error<I2cError>> {
		self.i2c.write(chip::I2C, &[chip::CALIBRATE_ADDR, 0xFF])?;
	
		loop {
			let status = self.get_status()?;
			if !status.calibrate() {
				break;
			}
		}
	
		Ok(())
	}
}
// More constants!
mod chip {
    pub const I2C: u8 = 0x1B << 1;
    pub const ID: u8 = 0x2E;
    pub const ID_ADDR: u8 = 0;
    pub const STATUS_ADDR: u8 = 2;
    pub const CALIBRATE_ADDR: u8 = 56;
}
```
## Read the touch values!
This is actually surprisingly simple and similar to what we just did before, we just define another
bitfield struct according to the specifications in chapter 5.5 Address 3: Key Status, read that one
just like we read the previous status register and we are done
```rust
bitfield! {
    pub struct KeyStatus(u8);
    impl Debug;
    pub key6, _: 6;
    pub key5, _: 5;
    pub key4, _: 4;
    pub key3, _: 3;
    pub key2, _: 2;
    pub key1, _: 1;
    pub key0, _: 0;
}

pub fn get_key_status(&mut self) -> Result<KeyStatus, Error<I2cError>> {
    let mut buffer = [0u8; 1];
    self.i2c.write_read(chip::I2C, &[chip::KEY_STATUS_ADDR], &mut buffer)?;
    Ok(KeyStatus(buffer[0]))
}

mod chip {
    pub const I2C: u8 = 0x1B << 1;
    pub const ID: u8 = 0x2E;
    pub const ID_ADDR: u8 = 0;
    pub const STATUS_ADDR: u8 = 2;
    pub const KEY_STATUS_ADDR: u8 = 3;
    pub const CALIBRATE_ADDR: u8 = 56;
}
```
And...we are already done, quite simple once you got it down for the first time, right?

## A small example on the stm32l4
In order to verify our blindly written implementation works, we can come up with a simple example for
the stm32l4 chip from last time. First of all, we will, of course, take over the big blob that initializes
our chip properly from last time:
```rust
#![no_main]
#![no_std]

extern crate panic_semihosting;

use cortex_m_rt::entry;

use stm32l4xx_hal::i2c::I2c;
use stm32l4xx_hal::prelude::*;
use at42qt1070::Driver;

#[entry]
fn main() -> ! {
    let dp = stm32l4xx_hal::stm32::Peripherals::take().unwrap();

    let mut flash = dp.FLASH.constrain();
    let mut rcc = dp.RCC.constrain();
    let clocks = rcc.cfgr.hclk(8.mhz()).freeze(&mut flash.acr);

    let mut gpiob = dp.GPIOB.split(&mut rcc.ahb2);

    let scl = gpiob
        .pb10
        .into_open_drain_output(&mut gpiob.moder, &mut gpiob.otyper);
    let scl = scl.into_af4(&mut gpiob.moder, &mut gpiob.afrh);

    let sda = gpiob
        .pb11
        .into_open_drain_output(&mut gpiob.moder, &mut gpiob.otyper);
    let sda = sda.into_af4(&mut gpiob.moder, &mut gpiob.afrh);

    let i2c = I2c::i2c2(dp.I2C2, (scl, sda), 400.khz(), clocks, &mut rcc.apb1r1);
}
```
On top of that we can now just use our driver:
```rust
let mut driver = Driver::new(i2c).unwrap();
driver.calibrate().unwrap();
```
And now write a simple routine that checks wether the touch bit (which indicates that one of the pads has been touched) from the status register has been set
yet and if it has read the key status register
in order to find out which pad:
```rust
loop {
    let status = driver.get_status().unwrap();
    if status.touch() {
        break;
    }
}

let key_status = driver.get_key_status().unwrap();
let all_pads = [
    key_status.key0(),
    key_status.key1(),
    key_status.key2(),
    key_status.key3(),
    key_status.key4(),
    key_status.key5(),
    key_status.key6(),
];

// We have to loop in the end again so our main function never returns
loop {}
```
And if we quickly build and flash this onto the microcontroller, set a breakpoint at the proper spot, 
run the example (while of course touching one of the pads) and print out the `all_pads` variable
we will be greeted with:
```
(gdb) p all_pads
$1 = [false, true, false, false, false, false, false]
```
Which, according to the schematic, is the exact key we touched \o/.

## Conclusion
The chip does have a few more settings such as the AKS groups and a few measurement sensitivity ones,
however they will just require a few more register writes and thus don't add anything new conceptually to
what we learned in this 2 part series, hence I'll just implement them in private and publish the
crate once I'm done (consider it as an exercise for the reader *wink*) . I hope you learned something reading this little series. If you have any
feedback etc. for me you can just send it to the address at the bottom of the web page.

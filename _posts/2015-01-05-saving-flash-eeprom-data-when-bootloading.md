---
layout: post
title: Saving EEPROM data when bootloading on STM32
categories: stm32
---

TL;DR: This [modified version of stm32loader.py](https://github.com/avikde/koduino/blob/master/stm32/system/stm32loader.py) takes extra parameters for EEPROM location and can automatically save and reload EEPROM data when reprogramming the microcontroller!

## Long version

On the STM32 microcontrollers, it is possible to emulate EEPROM using the flash memory (this is where your code itself is stored, among other things).

#### What is EEPROM?

EEPROM is non-volatile memory on the microcontroller where you might store things like parameters or data that have to persist through power cycles, e.g. magnet calibration for a brushless motor controller. 

A naive way to do this would be to hard-code these parameters in the source file itself, but you'd have to have a different version of the source code for every board you make then...

#### EEPROM emulation with flash memory

The STM32 libraries allow you to "unlock" the flash memory (you can imagine why it might be dangerous to accidentally write over the code that is executing), and write your own values to it. This has the advantage of being much faster than typical I2C external EEPROM chips, and seems very convenient as long as you have the little bit of extra flash memory available.

#### The problem

Unfortunately, all the bootloader scripts I have seen for STM32 (especially UART ones such as `stm32loader.py`, and I'm fairly confident also `dfu-util`) have to issue an [extended erase command](http://www.st.com/web/en/resource/technical/document/application_note/CD00264342.pdf) before writing the new program into the flash memory. This means all of your EEPROM data disappears.

I wanted to see if I could extract the correct part of the microcontroller memory before the erase command, and put it back where it was after reprogramming, so that the calibration parameters would be unharmed while I tested firmware features.

### The code

This is simple EEPROM code that should be familiar from [Arduino](http://arduino.cc/en/Reference/EEPROM), with 1 exception that I will emphasize:

> The read or written values are 16-bit, not 8-bit. This is because the STM32 FLASH library only allows operations on word boundaries (as far as I understand).

That explains why I dared write the decimal `456` to EEPROM location 1:

{% highlight c++ %}

#include <Arduino.h>
#include <EEPROM.h>

#define VAL0 123
#define VAL1 456
#define SW_BUILTIN PC14

void setup() {
  Serial1.begin(115200);
  pinMode(SW_BUILTIN, INPUT_PULLUP);
}

void loop() {
  if (!digitalRead(SW_BUILTIN)) {
    EEPROM.write(0, VAL0);
    EEPROM.write(1, VAL1);    
  }
  Serial1 << "Expect " << VAL0 << ", " << VAL1 << "; read " << EEPROM.read(0) << ", " << (int16_t)EEPROM.read(1) << "\n";
  delay(100);
}

{% endhighlight %}

Basically it reads back the data in EEPROM locations 0 and 1, and when I press the button on the board, it overwrites them with `123` and `456`. I uploaded this to one of my "mainboards" (tiny button visible)...

![](/images/mainboard_v1.1.jpg "Mainboard v1.1")

...and hit the button to save the values into EEPROM.

### Trying to find the EEPROM data in microcontroller memory

For the content of this post, I only used [stm32loader.py](https://github.com/avikde/koduino/blob/master/stm32/system/stm32loader.py). I modified the "read memory" part of the code to print the data, to make sure I was looking in the right place.

{% highlight py %}

if not conf['write'] and conf['read']:
  rdata = cmd.readMemory(conf['address'], conf['len'])
  print(map(chr,rdata))
  with open('eeprom.bin', 'wb') as f:
    f.write(bytearray(rdata))

{% endhighlight %}

Running the script yields the output:

{% highlight sh %}

$ python stm32loader.py -r -a 0x08010000 -l 12
Bootloader version 0x31
Chip id 0x432, STM32F37x
Reading: 100%, Time: 0:00:00 |################################################|
['\x00', '\x00', '\xff', '\xff', '{', '\x00', '\x00', '\x00', '\xc8', '\x01', '\x01', '\x00']

{% endhighlight %}

Now how did I know what the `address` and `len` should be? 

* `0x08010000` is the `PAGE0_BASE_ADDRESS` that I set (blindly following the ST EEPROM emulation example code) in [eeprom_stm32.h](https://github.com/avikde/koduino/blob/master/stm32/libraries/EEPROM/eeprom_stm32.h),
* The length of 12 bytes is arbitrary (I noticed everything was `0xff`, the `ERASED` value, after that), but a good strategy would be to save everything between `PAGE0_BASE_ADDRESS` and `PAGE1_END_ADDRESS`.

So, what does this mean? 123 [is the ASCII character `{`](http://www.asciitable.com/), and 456 in hex is `0x1C8`, so it looks like *we found the data!* I'm not totally sure why it is not in the first 4 bytes, but let's ignore that for now. The python code above saved the EEPROM data to the file `eeprom.bin`. 

Next I reprogrammed the microcontroller, and as expected, the EEPROM values were erased (I didn't press the button this time). Instead, I wrote back the dumped bin file with

    $ python stm32loader.py -w -a 0x08010000 -l 12 eeprom.bin

and on firing up the serial terminal again:

    Expect 123, 456; read 123, 456

*Yay!*

### Automating the process

This modified version of [stm32loader.py](https://github.com/avikde/koduino/blob/master/stm32/system/stm32loader.py#L526) included with [Koduino](https://github.com/avikde/koduino), contains the conceptually simple operation:

1. Read the EEPROM data *before* extended erase
2. Erase, write, (optionally verify) as usual
3. Write the EEPROM data back to the right location

Of course, you need to tell it where the start and length of the EEPROM. Thankfully, this can all be gleaned from [eeprom_stm32.h](https://github.com/avikde/koduino/blob/master/stm32/libraries/EEPROM/eeprom_stm32.h). 

**Caveat:** Only the STM32F373 part of the EEPROM code has been tested yet, and I haven't figured out exactly how to decide where the EEPROM start location should be. Even though the ST example program hard-codes a single value for each series (F3, or F4), surely this location should depend on the amount of flash memory the particular chip has? Let me know in the comments if you can enlighten me!

The usage is

    $ python stm32loader.py -E <eeprom_start_address> -L <eeprom_length> -ew <bin_file>

#### Moving beyond stm32loader: stm32ld fork

Even though I used stm32loader.py in this post, I'm not really a huge fan since

* it needs python, which is not a given for some user on Windows who has just installed the Arduino IDE, and
* it uses the somewhat restrictive GPL---I'm tending towards an open MIT license for my software, but this isn't final yet.

Last week I forked [stm32ld](https://github.com/avikde/stm32ld), added carefully tuned auto-resetting and bootloading, and will try to get it up to shape to handle multiple NRST/BOOT0 connections, wireless bootloading, etc. soon.

However, currently stm32ld does not have a memory reading functionality. I'll probably program that in soon and port the EEPROM saving/writing trick to it as well.


---
layout: post
title: ATTiny85 Assembly First Steps
published: true
---

The ATTiny85 is a readily available, arduino-compatible chip that is tiny (like its name suggests) and fairly straightforward to understand. Let's program it in assembly!

The ATTiny85 is readily available in Arduino format, as Digistump kickstarted a board called the "Digispark". At time of writing, these be ordered from Amazon from several vendors and arrive the next day for about $4 per part in quantities of 4-5 pieces. Search "digistump" or "attiny86". [Digistump](http://digistump.com/products/1) themselves may sell the product directly but they were currently out of stock. I just bought four, as desoldering one to program manually would still leave me some Arduino compatible toys.

To get started with, I tinkered with the Arduino studio. I added the digistump board support to the IDE (tools -> manage boards -> search digistump and install the AVR board support) and wrote a hello world that will blink an LED you can breadboard up to the pin labeled p0 (or pb0):

```
void setup() {
  // put your setup code here, to run once:
  pinMode(0, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(0, HIGH);
  delay(1000);
  digitalWrite(0, LOW);
  delay(1000);
}
```

I was not fortunate enough to be able to flash to the chip directly from Arduino in my Linux environment. If you are on a Linux machine and having similar issues (I saw segfaults for `micronucleus` in `dmesg`) the issue may be that you're not running as root. I wasn't able to install board support when running Arduino as root, so I located micronucleus from the board support files and ran the following command to manually flash as root after building:
```
sudo ~/.arduino15/packages/digistump/tools/micronucleus/2.0a4/micronucleus -cdigispark /tmp/arduino_build_103319/sketch_jul19a.ino.hex
```

After that, with an LED and 220 ohm resistor wired from PB0 to ground I had blinking!

Onward to assembly...

I took a quick moment to inspect the hex file, again using tools installed by Arduino to disassemble:
```
~/.arduino15/packages/arduino/tools/avr-gcc/4.8.1-arduino5/bin/avr-objdump -D -m avr25 /tmp/arduino_build_103319/sketch_jul19a.ino.hex
```

This is a handy way to see what the program is actually doing, but has limited value right now except for to see approximately how big our file is:
```

/tmp/arduino_build_103319/sketch_jul19a.ino.hex:     file format ihex


Disassembly of section .sec1:

00000000 <.sec1>:
   0:	16 c0       	rjmp	.+44     	;  0x2e
   2:	25 c0       	rjmp	.+74     	;  0x4e
   4:	24 c0       	rjmp	.+72     	;  0x4e
   6:	23 c0       	rjmp	.+70     	;  0x4e
   8:	45 c0       	rjmp	.+138    	;  0x94
...
 2b0:	80 df       	rcall	.-256    	;  0x1b2
 2b2:	ce de       	rcall	.-612    	;  0x50
 2b4:	d0 de       	rcall	.-608    	;  0x56
 2b6:	fe cf       	rjmp	.-4      	;  0x2b4
 2b8:	f8 94       	cli
 2ba:	ff cf       	rjmp	.-2      	;  0x2ba
```

I looked up the `-m avr25` architecture value in this [avr-mcus.def file](https://github.com/gcc-mirror/gcc/blob/releases%2Fgcc-10.2.0/gcc/config/avr/avr-mcus.def).

Next up is to make sure that we can use a programmer to read the flash from the ATTiny. I needed a refresher, and [this guide](https://github.com/blurpy/minipro) was quite helpful. I then tried to use my TL866 reader using `minipro` with ISP headers to wire up to the RST/MOSI/MISO/CLK wires that appeared to be hooked up correctly on the board according to the diagram and datasheet, but was unable to read:
```
$ sudo minipro -p "ATTINY85" -r ~/Downloads/attiny85_ino.bin -i
Found TL866II+ 04.2.126 (0x27e)
An error occurred while parsing XML database.
Invalid Chip ID: expected 0x1E930B, got 0x0000 (unknown)
(use '-y' to continue anyway at your own risk)
```

Further reading seemed to indicate that the reset pin isn't properly exposed while it's mounted to the PCB. So I then desoldered an ATTiny from its board using a hot air rework station and mounted it in the socket that came with the TL866 and read it:
```
$ sudo minipro -p "ATTINY85" -r ~/Downloads/attiny85_ino.bin -i
[sudo] password for shawn: 
Found TL866II+ 04.2.126 (0x27e)
Chip ID OK: 0x1E930B
Reading Code...  0.44Sec  OK
Reading Data...  0.03Sec  OK
Reading fuses... 0.00Sec  OK
$ cat ~/Downloads/attiny85_ino.fuses.conf 
fuses_lo = 0xe1
fuses_hi = 0xdd
fuses_ext = 0xfe
lock_byte = 0xff
```

The above is a human-readable (ish) file containing the fuse configuration that sets how functions of the chip such as whether the clock signal is read externally from pins or set with an internal oscillator, so I was able to successfully read the chip!

Next up is coming up with a hello world! Rjhcoding has excellent [avr assembly tutorials](http://rjhcoding.com/avr-asm-tutorials.php) so I followed the [blink example](http://rjhcoding.com/avr-asm-led-blink.php). The first line is to import a set of `.def` statements that map all of the registers, memory mapped io, and various constant values to standard names. The file above is targeting an Atmega328, while we're targeting an ATTiny85. The official AVR studio appears to come with these include files, but the `avra` assembler I'm using doesn't. Fortunately, the author of the site also uploaded the .def files, and the includes can be found inside his [avra GitHub repo](https://github.com/Ro5bert/avra/tree/master/includes).

I downloaded [tn85def.inc]](https://raw.githubusercontent.com/Ro5bert/avra/master/includes/tn85def.inc) into a directory, and authored `blink.asm` from the example, changing the include appropriately:
```
	.include "tn85def.inc"

	.def	mask 	= r16		; mask register
	.def	ledR 	= r17		; led register
	.def	oLoopR 	= r18		; outer loop register
	.def	iLoopRl = r24		; inner loop register low
	.def	iLoopRh = r25		; inner loop register high

	.equ	oVal 	= 71		; outer loop value
	.equ	iVal 	= 28168		; inner loop value

	.cseg
	.org	0x00
	clr	ledR			; clear led register
	ldi	mask,(1<<PINB0)		; load 00000001 into mask register
	out	DDRB,mask		; set PINB0 to output

start:	eor	ledR,mask		; toggle PINB0 in led register
	out	PORTB,ledR		; write led register to PORTB

	ldi	oLoopR,oVal		; initialize outer loop count

oLoop:	ldi	iLoopRl,LOW(iVal)	; intialize inner loop count in inner
	ldi	iLoopRh,HIGH(iVal)	; loop high and low registers

iLoop:	sbiw	iLoopRl,1		; decrement inner loop registers
	brne	iLoop			; branch to iLoop if iLoop registers != 0

	dec	oLoopR			; decrement outer loop register
	brne	oLoop			; branch to oLoop if outer loop register != 0

	rjmp	start			; jump back to start
```

Then compiled:
```
$ avra blink.asm 
AVRA: advanced AVR macro assembler Version 1.3.0 Build 1 (8 May 2010)
Copyright (C) 1998-2010. Check out README file for more info

   AVRA is an open source assembler for Atmel AVR microcontroller family
   It can be used as a replacement of 'AVRASM32.EXE' the original assembler
   shipped with AVR Studio. We do not guarantee full compatibility for avra.

   AVRA comes with NO WARRANTY, to the extent permitted by law.
   You may redistribute copies of avra under the terms
   of the GNU General Public License.
   For more information about these matters, see the files named COPYING.

Pass 1...
tn85def.inc(44) : PRAGMA directives currently ignored
tn85def.inc(48) : PRAGMA directives currently ignored
tn85def.inc(53) : PRAGMA directives currently ignored
tn85def.inc(54) : PRAGMA directives currently ignored
tn85def.inc(647) : PRAGMA directives currently ignored
tn85def.inc(648) : PRAGMA directives currently ignored
tn85def.inc(649) : PRAGMA directives currently ignored
tn85def.inc(650) : PRAGMA directives currently ignored
Pass 2...
tn85def.inc(44) : PRAGMA directives currently ignored
tn85def.inc(48) : PRAGMA directives currently ignored
tn85def.inc(53) : PRAGMA directives currently ignored
tn85def.inc(54) : PRAGMA directives currently ignored
tn85def.inc(647) : PRAGMA directives currently ignored
tn85def.inc(648) : PRAGMA directives currently ignored
tn85def.inc(649) : PRAGMA directives currently ignored
tn85def.inc(650) : PRAGMA directives currently ignored
done

Used memory blocks:
   Code      :  Start = 0x0000, End = 0x000C, Length = 0x000D

Assembly complete with no errors.
Segment usage:
   Code      :        13 words (26 bytes)
   Data      :         0 bytes
   EEPROM    :         0 bytes
```

And that's much smaller than the arduino example!

```
$ avr-objdump -D -m avr25 blink.hex

blink.hex:     file format ihex


Disassembly of section .sec1:

00000000 <.sec1>:
   0:	11 27       	eor	r17, r17
   2:	01 e0       	ldi	r16, 0x01	; 1
   4:	07 bb       	out	0x17, r16	; 23
   6:	10 27       	eor	r17, r16
   8:	18 bb       	out	0x18, r17	; 24
   a:	27 e4       	ldi	r18, 0x47	; 71
   c:	88 e0       	ldi	r24, 0x08	; 8
   e:	9e e6       	ldi	r25, 0x6E	; 110
  10:	01 97       	sbiw	r24, 0x01	; 1
  12:	f1 f7       	brne	.-4      	;  0x10
  14:	2a 95       	dec	r18
  16:	d1 f7       	brne	.-12     	;  0xc
  18:	f6 cf       	rjmp	.-20     	;  0x6
```

Flash it to the microcontroller:
```
$ sudo minipro -p ATTINY85 -w blink.hex 
[sudo] password for shawn: 
Found TL866II+ 04.2.126 (0x27e)
Chip ID OK: 0x1E930B
Found Intel hex file.
Erasing... 0.01Sec OK
Writing Code...  1.07Sec  OK
Reading Code...  0.43Sec  OK
Verification OK
```

And it blinks, in 26 bytes of code!
![](../images/VID_20220722_065352194.mp4)

## Useful references:
* [Datasheet](https://ww1.microchip.com/downloads/en/devicedoc/atmel-2586-avr-8-bit-microcontroller-attiny25-attiny45-attiny85_datasheet.pdf)
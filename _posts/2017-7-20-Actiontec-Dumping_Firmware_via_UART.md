---
layout: post
title: Actiontec - Dumping the firmware..
---
![Minicom](https://github.com/gclair/ActionTecR1000/raw/master/images/minicom-SendBreak.png "Minicom")

Starting of an outline of how I dumped the firmware off of an Actiontec device through the UART interface. More to expand on.

1. Get a friend with a steady soldering hand to put on some header pins after using
   the flashlight trick to figure out the `GRND` pin.

1. Connect USB->UART interface (Used an FTDI based device, no drivers required).

1. Serial program `minicom`, start logging, send a break to break the countdown and drop into the CFE> interface.

1. `dm` to dump to a log file.

1. Edit log file to make sure only hexdump with address is there.

1. Use `xxd -r` to transform hexdump file into binary file.

1. Use `binwalk` on file to extract the images. Document weird headers here.

Reference: [Dumping Firmware](https://github.com/gclair/ActionTecR1000#dumping-firmware-via-serial "Dumping firmware")
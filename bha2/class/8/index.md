---
layout: page
title: Class 8: Guest speaker
permalink: /bha2/class/8/
---

## Synopsys

This week we'll welcome a guest speaker to our class. The exact topic remains to be announced! Meanwhile, the microbes in your bioreactor continiously need fresh food. Let’s get rid of the manual feeding and connect syringe & peristaltic pumps. You will also learn more about feed stocks and other substrates.

## Schedule

* Guest Speaker
* Pump Design
* Practicals
  * Grown your own certificate

## Devices

This week you can build two types of pumps. As with the other projects, each of the devices has its own github repository.

### Some notes on the source files and designs
* Code: We have included the LiquidCrystal_I2C library. However, as there are multiple libraries named LiquidCrystal_I2C around on the web, if you have included one in your Arduino libraries directory it can result in a conflict (errors during compilation). Temporarily remove the library from your Arduino libraries directory.
* Peristaltic pump: the design of the pump depends on the diameter of the tube. In case you use a different type, you will need to adjust the diameters. In our design we used HelixMark™ tubes (internal diameter 6.35 mm; external diameter 9.55 mm)
* Syringe pump: the mounting interface between the pump and the syringe depends on the type of syringe you use. In our design we used a MediWare 60mL syringe (REF: I3 040800).

### Syringe pump

This pump is best for moving small volumes of liquids.

* [BHA_SyringePump repository](https://github.com/BioHackAcademy/BHA_SyringePump)

![SyringePump](/biofactory/class/8/SyringePump.png)

### Peristaltic pump

This pump is best for moving small volumes of liquids.

* [BHA_PeristalticPump repository](https://github.com/BioHackAcademy/BHA_PeristalticPump)
* [Building guide](/biofactory/class/8-pumps/peristaltic-pump-building-guide/) 

![PeristalticPump](/biofactory/class/8/PeristalticPump.png)

Finished peristaltic pump:
[![Peristaltic Pump in action](http://img.youtube.com/vi/rvNwhfQSCfg/0.jpg)](http://www.youtube.com/watch?v=rvNwhfQSCfg)

[Watch the pump in action on Youtube](http://www.youtube.com/watch?v=rvNwhfQSCfg)

## Bill of Materials

In order to take part in this class you will need the following materials:

* [Syringe Pump materials](http://www.github.com/biohackacademy/BHA_SyringePump/BoM.md)
* [Peristaltic Pump materials](http://www.github.com/biohackacademy/BHA_PeristalticPump/BoM.md)

## Additional reading and hacking

* DIY Syringe pumps
  * [OpenPump](https://www.wevolver.com/gerrit.niezen/openpump---an-open-source-hardware-syringe-pump/openpump)
* DIY Peristaltic pumps
  * [Instructable Peristaltic Pump](http://www.instructables.com/id/Inexpensive-easy-to-build-peristaltic-pump/)

## Feeling lazy?

Go ahead and buy some pumps:

* [Syringepump.com](http://www.syringepump.com/index.php)
* [LabX Peristaltic Pump](http://www.labx.com/pumps-peristaltic)

Back to [BHA2](/bha2/)
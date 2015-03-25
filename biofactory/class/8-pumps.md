---
layout: page
title: Syringe & Peristaltic Pump (Class 8)
permalink: /biofactory/class/8-pumps/
---

> NOTE: these instructions are still under construction. The designs and BoM might be subject to change.

## Synopsys

The microbes in your bioreactor need fresh food. Let’s get rid of the manual labour and connect syringe & peristaltic pumps. You will also learn more about feed stocks and other substrates. We’ll go a bit deeper into metabolic networks too.

## Schedule

* Metabolic networks & flux analysis
* Mechinical drive materials
* Syringe pump design
* Peristaltic pump design

## Pump Designs

This week we will two type of pumps. As with the other projects, each of the devices has its own github repository.

* [Functional and technical requirements](/biofactory/class/8-pumps/requirements/)
* Syringe pump design
  * [Github repository (including arduino code)](https://github.com/BioHackAcademy/BHA_SyringePump)
  * [Github repository (as ZIP)](https://github.com/BioHackAcademy/BHA_SyringePump/archive/master.zip)
  * [SketchUp assembly](https://github.com/BioHackAcademy/BHA_SyringePump/blob/master/Syringe-Pump-Sketchup.skp?raw=true)
  * [SVG laser cut files](https://raw.githubusercontent.com/BioHackAcademy/BHA_SyringePump/master/syringe-pump-lasercut.svg)

![Syringe Pump](https://raw.githubusercontent.com/BioHackAcademy/BHA_SyringePump/master/Syringe-Pump.png)

* Peristaltic pump design
  * [Github](https://github.com/BioHackAcademy/BHA_PeristalticPump)
  * [Download repository as ZIP](https://github.com/BioHackAcademy/BHA_PeristalticPump/archive/master.zip)
  * [Sketchup design](https://github.com/BioHackAcademy/BHA_PeristalticPump/blob/master/Peristaltic-Pump-Sketchup.skp?raw=true)
  * [Fritzing wiring]
  * Arduino Code: See repository. We have included the LiquidCrystal_I2C library. However, as there are multiple libraries named LiquidCrystal_I2C around, if you have included one in your Arduino libraries directory it can result in a conflict (errors during compilation). Temporarily remove the library from your Arduino libraries directory.

![Peristaltic Pump](/biofactory/class/8/Peristaltic-Pump.png)

## Bill of Materials

In order to take part in this class you will need the following materials:

* [Syringe Pump materials](/biofactory/class/8-pumps/syringe-pump-materials/)
* [Peristaltic Pump materials](/biofactory/class/8-pumps/peristaltic-pump-materials/)

## Assignment

Document one of your devices in as an instructable.

## Additional reading and hacking

* Metabolomics
  * [Wikipedia Flux Analysis](http://en.wikipedia.org/wiki/Flux_balance_analysis
* DIY Syringe pumps
  * [OpenPump](https://www.wevolver.com/gerrit.niezen/openpump---an-open-source-hardware-syringe-pump/openpump)
* DIY Peristaltic pumps
  * [Instrutable Peristaltic Pump](http://www.instructables.com/id/Inexpensive-easy-to-build-peristaltic-pump/)

## Feeling lazy?

Go ahead and buy some pumps:

* [Syringepump.com](http://www.syringepump.com/index.php)
* [LabX Peristaltic Pump](http://www.labx.com/pumps-peristaltic)

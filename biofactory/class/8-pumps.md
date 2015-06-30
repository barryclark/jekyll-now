---
layout: page
title: Syringe & Peristaltic Pump (Class 8)
permalink: /biofactory/class/8-pumps/
---

## Synopsys

The microbes in your bioreactor need fresh food. Let’s get rid of the manual feeding and connect syringe & peristaltic pumps. You will also learn more about feed stocks and other substrates. We’ll go a bit deeper into metabolic networks too.

## Schedule

* [Metabolic networks & flux analysis](/biofactory/class/8/pdf/1 Metabolic Flux Analysis.pdf)
* [Mechanical drive materials](/biofactory/class/8/pdf/2 Mechanical Design.pdf)
* [Pump designs](/biofactory/class/8/pdf/3 Pumps design.pdf)


## Pump Designs

This week you can build two types of pumps. As with the other projects, each of the devices has its own github repository.

### Some notes on the source files and designs
* Code: We have included the LiquidCrystal_I2C library. However, as there are multiple libraries named LiquidCrystal_I2C around on the web, if you have included one in your Arduino libraries directory it can result in a conflict (errors during compilation). Temporarily remove the library from your Arduino libraries directory.
* Peristaltic pump: the design of the pump depends on the diameter of the tube. In case you use a different type, you will need to adjust the diameters. In our design we used HelixMark™ tubes (internal diameter 6.35 mm; external diameter 9.55 mm)
* Syringe pump: the mounting interface between the pump and the syringe depends on the type of syringe you use. In our design we used a MediWare 60mL syringe (REF: I3 040800).

* [Functional and technical requirements](/biofactory/class/8-pumps/requirements/)

### Syringe pump

This pump is best for moving small volumes of liquids.

* Syringe pump design
  * [Github repository (including code and wiring)](https://github.com/BioHackAcademy/BHA_SyringePump)
  * [Github repository (as ZIP)](https://github.com/BioHackAcademy/BHA_SyringePump/archive/master.zip)

![Syringe Pump](/biofactory/class/8/Syringe-Pump.png)

### Peristaltic pump

Peristaltic pumps are best used in continious flow systems or for pumping large volumes.

* Peristaltic pump design
  * [Building guide](/biofactory/class/8-pumps/peristaltic-pump-building-guide/) 
  * [Github Repository (including code and wiring)](https://github.com/BioHackAcademy/BHA_PeristalticPump)
  * [Download repository as ZIP](https://github.com/BioHackAcademy/BHA_PeristalticPump/archive/master.zip)

![Peristaltic Pump Sketchup](/biofactory/class/8/Peristaltic-Pump.png)

Finished peristaltic pump:
[![Peristaltic Pump in action](http://img.youtube.com/vi/rvNwhfQSCfg/0.jpg)](http://www.youtube.com/watch?v=rvNwhfQSCfg)

[Watch the pump in action on Youtube](http://www.youtube.com/watch?v=rvNwhfQSCfg)

## Bill of Materials

In order to take part in this class you will need the following materials:

* [Syringe Pump materials](/biofactory/class/8-pumps/syringe-pump-materials/)
* [Peristaltic Pump materials](/biofactory/class/8-pumps/peristaltic-pump-materials/)

## Assignment

Answer the following questions in your documentation:

* What does the reactor do? What product has been made?
* From what designs is it derived?
* Which parts have been custom made, by what machine?
* What are all the components and how much do they cost?
* How is it assembled?
* What can be improved?

## Additional reading and hacking

* Metabolomics
  * [Wikipedia Flux Analysis](http://en.wikipedia.org/wiki/Flux_balance_analysis)
* DIY Syringe pumps
  * [OpenPump](https://www.wevolver.com/gerrit.niezen/openpump---an-open-source-hardware-syringe-pump/openpump)
* DIY Peristaltic pumps
  * [Instructable Peristaltic Pump](http://www.instructables.com/id/Inexpensive-easy-to-build-peristaltic-pump/)

## Feeling lazy?

Go ahead and buy some pumps:

* [Syringepump.com](http://www.syringepump.com/index.php)
* [LabX Peristaltic Pump](http://www.labx.com/pumps-peristaltic)

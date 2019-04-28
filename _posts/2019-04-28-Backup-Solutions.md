---
layout: post
title: Two CanSats in one!
lang: EN
ref: BackupCanSat
categories: [cansat2019]
teaserImage: /images/posts/2019-04-28_ATTiny-Testing.jpg
---

Compared to last year's CanSat, our hardware and software planning has become much more demanding and complex for us – and thus more error-prone. We cannot protect ourselves against every source of error, and it is therefore good to have a backup for all cases.

For example, a single wrong-wired PCB trace could literally blow up the processor, a wrongly written memory address could stop the entire program, or the SD card could fall out of its holder due to the vibrations during launch. A backup system that is protected against such cases must be completely separate from the main system and build as robust as possible. In addition, it must be able to fulfil the primary mission on its own – i.e. like an independent CanSat (only without secondary mission)!

{% include post-figure.html path="/images/posts/2019-04-28_STM-vs-ATTiny.jpg" alignment="right" image_size="medium" caption="That small (or tiny ...) is our backup ATTiny compared to the STM32 development board, which we'll use for our main system." %}

All we need is a microcontroller together with a small memory module that reads its own thermometer and barometer and uses as little power as possible to be completely integrated into the CanSat. Sounds like a task for the ATTiny85!

The [ATTiny85](https://www.microchip.com/wwwproducts/en/ATtiny85) is a very small microcontroller from Microchip with just five I/O pins (plus reset pin), 8 KB program memory and 512 bytes of RAM. That's not much, but sufficient for our application. To measure temperature and air pressure we use the BMP280, a small and energy-saving sensor from Bosch. It is controlled via I²C. The measurements are written as datapacks of 8 bytes (temperature and air pressure measurement taken together) on an M24M02 EEPROM from STMicroelectronics. With 2 MB, this provides enough memory for 31,250 measurements, which corresponds to approximately 8 measurements per second with a runtime of one hour.

{% include post-figure.html path="/images/posts/2019-04-28_ATTiny-Testing.jpg" alignment="center" image_size="big" caption="Trying to control the BMP280 sensor and the M24M02 EEPROM using the ATTiny." %}

According to the design regulations, the backup system must also have a runtime of at least 4 hours. The total power consumption of the individual components, including some tolerance, is 7 mA. A typical 12 mm lithium button cell has an average capacity of 35 mAh, which is sufficient for more than 5 hours runtime in our setup.

For those who are interested, here are also the schematics:

{% include post-figure.html path="/images/posts/2019-04-28_Backup-Schematic.png" alignment="center" image_size="big" %}

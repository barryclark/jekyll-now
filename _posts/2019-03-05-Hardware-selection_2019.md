---
layout: post
title: New competition, New secondary mission, New hardware!
lang: EN
ref: Hardwareauswahl2019
categories: [cansat2019]
teaserImage: /images/posts/2019-03-06_Blockdiagram.jpg
---

We have set ourselves a lot of goals for our secondary mission this year and to achieve all of them, we need a way better hardware than last year – because adding an Arduino and a few sensor breakouts is not nearly enough.

{% include image.html path="/images/posts/2019-03-06_Blockdiagram.jpg" %}

## Primary mission

The primary mission consists of measuring temperature and air pressure during flight. We will not use one, but two [BME280](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BME280-DS002.pdf) modules from Bosch. These are extremely compact, well documented and easy to control via I²C. The sensor has a pressure resolution of ±1&nbsp;hPa and can measure the ambient temperature accurately to ±1&nbsp;°C. Why two? This makes the measurement data a little more accurate and we are not stuck if one sensor should fail.

## Secondary mission

### Cameras

Our camera must be small, but at the same time have a sufficiently high resolution to reliably detect ground features in the images. That's why we've chosen OmniVision's [OV5640](https://cdn.sparkfun.com/datasheets/Sensors/LightImaging/OV5640_datasheet.pdf). The resolution and frame rate are adjustable in steps from 2592&nbsp;×&nbsp;1944 pixels at 15&nbsp;fps to 320&nbsp;×&nbsp;240 pixels at 120&nbsp;fps, giving us enough freedom to set and select the best combination for us. The camera is controlled via SCCB (Serial Camera Control Bus), which is quite similar to the typical I²C protocol, and the image data itself is output via an 8-bit DVP (Digital Video Port). Maybe we will build a DVP-UART converter between the controller and camera to control the camera directly via a serial interface, but this has to be tested.

### Motor driver

Our reaction wheel motor does not rotate by itself, that's why we use the [DRV8838](http://www.ti.com/lit/ds/symlink/drv8837.pdf) motor driver from Texas Instruments. This single channel driver can control a motor with 1.7&nbsp;A (maximum 1.8&nbsp;A) at up to 11&nbsp;V. Not only direction, but also speed are freely adjustable. The motor driver itself is controlled by the controller via two pins and connected directly to the main battery to provide the necessary power.

### Gyroscope

A rotating motor is something great, even though it would be better to know in which direction it has to turn to compensate the rotation of the CanSat. The 9-DOF gyroscope / accelerometer / compass [BNO055](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BNO055-DS000.pdf) from Bosch not only provides data on the rotation of the CanSat, but also on its absolute position in space. Since calculating the rotation and acceleration from the raw data output of a MEMS sensor proves to be surprisingly complicated, the BNO055 also integrates an ARM Cortex M0, which calculates all sensor data directly and outputs them in various formats, saving our main processor a lot of time and computing power.

## System and additional sensors

### Processor

In order to process two video live feeds at the same time, it takes more computing power than an ATMega328P – as it was installed on the Arduino Nano we wanted to use last year – could ever deliver. That's why we want to use the [STM32H743ZI](https://www.st.com/resource/en/datasheet/stm32h743zi.pdf) from STMicroelectronics. We chose the chip not only because of its catchy name, but also because of its outstanding performance. The processor is based on the ARM Cortex M7; with 400&nbsp;MHz (25 times faster than an Arduino) and 1&nbsp;MByte RAM (500 times more than an Arduino) it will be easy to record multiple measurements and images simultaneously.

To make the chip easier to program, we will implement an HAL (Hardware Abstraction Layer). This ensures that our program works largely independent of the hardware, which can be helpful if we decide to use a different chip after all. The programming will be discussed in more detail in a later blog post.

### Internal thermometers

Our CanSat contains many components that can (and will) emit heat. Voltage converters, motors, motor drivers and processors will heat up during flight, which could falsify the measurement data of our primary mission. To better understand how the heat is flowing in the CanSat, we are installing five [DS18B20](https://datasheets.maximintegrated.com/en/ds/DS18B20.pdf) thermometers from Maxim Integrated in different locations in the CanSat. These are very small and can be connected to the processor via the OneWire protocol developed by Maxim.

### GPS

For position and time determination, we use the [MTK3339](https://s3-ap-southeast-1.amazonaws.com/mediatek-labs-imgs/downloads/51c3cf5aaee074767384ab70d4f7d602.pdf) GPS module from MediaTek with integrated patch antenna. The module can track satellites on up to 22 channels simultaneously and is addressed via UART.

### Radio module

For transmiting the telemetry data we use the radio module [RFM69HCW](https://cdn.sparkfun.com/datasheets/Wireless/General/RFM69HCW-V1.1.pdf) from HopeRF. It operates at 433&nbsp;MHz in the ISM band (on which license-free transmission is possible) with a maximum transmission power of 20&nbsp;dBm. Although the low data rate of 300&nbsp;kb/s makes it impossible for us to receive live images at an acceptable speed, we can transmit our sensor data relatively easily to our ground station.

### Memory

Since our processor has direct SDMMC support, we can write our images and measurement data directly onto an SD card. However, since we had a bad experience with SD cards last year, we decided to add an external EEPROM (Electrically Eraseable Programmable Read-Only Memory): The [M24M01](https://www.st.com/resource/en/datasheet/m24m01-r.pdf) from STMicroelectronics doesn't offer any memory space for our images with only a single MBit, but we can store our most important measurement data (especially for the primary mission) on it. The chip hardly takes up any space in the CanSat and is controlled via I²C (like so many other things).

## Power supply

### Voltage Converter

All our electronics work at 3.3&nbsp;V voltage levels and are barely resistant to higher voltages. We use the [TPS62110](http://www.ti.com/lit/ds/symlink/tps62110.pdf) from Texas Instruments to power all components reliably. This DC/DC Step-Down Converter is capable of delivering up to 1.5&nbsp;A at input voltages from 3.1 to 17&nbsp;V. In contrast to a linear voltage converter, the switching regulator is much more efficient (at around ~95%), which is particularly relevant for compact and battery-powered projects like ours.

## Backup

And what if nothing works? What happens if the voltage converter overheats? What happens if the processor suddenly breaks down? Or the battery is released by the shocks and disconnects the entire power supply? It is always good to have a backup that is as separated as possible from the rest of the system. That's why, in addition to our main electronics, we want to install a second system that is just about capable of fulfilling the primary mission. With its own power supply, its own memory and its own processor.

### Backup processor

The [ATTiny85](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-2586-AVR-8-bit-Microcontroller-ATtiny25-ATtiny45-ATtiny85_Datasheet.pdf) is one of the smallest and weakest microcontrollers Atmel manufactures. With a 1&nbsp;MHz internal clock and 512&nbsp;bytes of RAM, it's barely able to to hold up to an Arduino. Nevertheless, it can control a sensor and a memory module perfectly. Power is supplied via a coin cell.

### Barometer / Thermometer

We use a [BMP280](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BMP280-DS001.pdf) from Bosch to fulfill the primary mission. Similar to the *BME280*, it has a pressure resolution of ±1&nbsp;hPa and a temperature measurement accuracy of ±1&nbsp;1°C. But it cannot measure air humidity – since that is not part of the primary emission.

### Memory module

To store the measurement data, we use again the EEPROM *M24M01* from STMicroelectronics (see above).

<br />

This list will continue to evolve as we develop, design and test our system. Maybe we'll replace some components with others or cross them out entirely. But for now we're going to work with what we have, because that should get us far.
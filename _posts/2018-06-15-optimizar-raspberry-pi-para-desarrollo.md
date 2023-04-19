---
published: true
id: 20180615
title: Optimize RPI for software development
date: 2018-06-15T00:00:00+00:00
layout: post
guid: 'http://ovalenzuela.com/?p=20180615'
permalink: /2018/06/optimize-rpi-for-software-development.html
tags:
  - development
  - raspberry
  - linux
comments: true
author: oscarvalenzuelab
---

This is the set of configurations I use more frequently when setting up a RaspberryPI as desktop enviroment. Probably there's better options and solutions, but I like to use this simple steps to improve the performance of my RaspberryPI setup for the kind of work I do.

## Increase SWAP memory

The RPI memory is very limited, anf for certain cases we would fall short. There's two main options I use to set specific memory limitations for RPI desktop setups.

`sudo dphys-swapfile setup`

`sudo /etc/init.d/dphys-swapfile stop`

`sudo /etc/init.d/dphys-swapfile start`

## Enable Turbo Mode

In order to increase performance, we can enable the Turbo Mode by using the appropiated options in the config.txt file:

`force_turbo=1`

`boot_delay=1`

The parameters below are used to overclock the RPI3 CPU to 1.35ghz. Your CPU or settings could be different, please check what parameters are supported by your RPI.

`arm_freq=1350`

`core_freq=500`

`over_voltage=4`

`disable_splash=1`

## Shared Memory for GPU

The settings below are recommended for cases where the RPI don't use the UI.

`gpu_mem=16`

For cases where UI is used, you should increase the memory to 32mb.

`gpu_mem=32`

## GUI installation (Debian Stretch Lite)

`sudo apt-get update && sudo apt full-upgrade -y`

`sudo apt-get install -y raspberrypi-ui-mods rpi-chromium-mods`

`sudo reboot`

`sudo apt-get install lightdm`

***Enable GUI and autologin***

`raspi-config`

Follow the options to activate the autologin on "Boot option"->"Desktop / CLI"->"Desktop autologin"`

### Useful links
* [https://www.makeuseof.com/tag/raspberry-pi-performance-tips/](https://www.makeuseof.com/tag/raspberry-pi-performance-tips/)
* [https://github.com/Hexxeh/rpi-update](https://github.com/Hexxeh/rpi-update)
* [https://www.makeuseof.com/tag/make-raspberry-pi-3-boot-usb/](https://www.makeuseof.com/tag/make-raspberry-pi-3-boot-usb/)
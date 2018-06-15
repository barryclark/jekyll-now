---
published: false
id: 150618
title: 'Optimizar Raspberry PI para desarrollo'
date: 2018-06-15T00:00:00+00:00
author: ovalenzuela
layout: post
guid: http://ovalenzuela.com/?p=090517
permalink: /2018/06/optimizar-raspberry-pi-para-desarrollo.md
categories:
  - General
  - Noticias Destacadas
  - Opinión
tags:
  - linux
  - raspberry
  - profesional
---

Primero que todo, no doy soporte. Si decides seguir las instrucciones que escribo a continuacion es tu problema.
Esto es solo una recoleccion de ideas y tips que he ido encontrando en Internet.

## Aumentar la memoria SWAP

### Opcion 1:
sudo dphys-swapfile setup

### Opcion 2:
sudo /etc/init.d/dphys-swapfile stop
sudo /etc/init.d/dphys-swapfile start


## Modo Turbo
Cambiar en el archivo config.txt:

force_turbo=1 #Voids Warranty!
boot_delay=1 #helps to avoid sdcard corruption when force_turbo is enabled.

More speed? Raspberry Pi 3 Overclock – 1.35GHz
arm_freq=1350
core_freq=500
over_voltage=4
disable_splash=1
//#force_turbo=1 #Voids Warranty! (uncomment to avoid CPU scaling down to 600Mhz)
//#boot_delay=1 #helps to avoid sdcard corruption when force_turbo is enabled.
//#sdram_freq=500 #uncomment to test. Works only with some boards.


## Ajustes de memoria compartida
eg. Web server, wireless access point, firewall, weather station, etc
gpu_mem=16

or for GUI usage, eg. OpenELEC, Raspbmc, RetroPie, XFCE, etc.
gpu_mem=320


## Instalacion de GUI (Desde Debian Stretch Lite)
sudo apt-get update
sudo apt full-upgrade -y

### Instalando el GUI
sudo apt-get install -y raspberrypi-ui-mods rpi-chromium-mods
sudo reboot

sudo apt-get install lightdm
raspi-config > "Boot option"->"Desktop / CLI"->"Desktop autologin"

### Opcional
#### startx
sudo apt-get install --no-install-recommends xinit

#### chromium-mods
sudo apt-get install -y rpi-chromium-mods
sudo apt-get install -y python-sense-emu python3-sense-emu

#### Browser
sudo apt install midori

## Otros interesantes
https://www.makeuseof.com/tag/raspberry-pi-performance-tips/
https://www.makeuseof.com/tag/make-raspberry-pi-3-boot-usb/
https://github.com/Hexxeh/rpi-update

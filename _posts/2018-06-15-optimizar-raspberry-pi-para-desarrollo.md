---
published: true
id: 150618
title: 'Optimizar RPI para Desktop'
date: 2018-06-15T00:00:00+00:00
author: ovalenzuela
layout: post
guid: http://ovalenzuela.com/?p=090517
permalink: /2018/06/optimizar-raspberry-pi-para-desarrollo.html
categories:
  - General
tags:
  - linux
  - raspberry
---

This is the set of configurations I use more frequently when setting up a RaspberryPI as desktop enviroment. Probably there's better options and solutions, but I like to use this simple steps to improve the performance of my RaspberryPI setup for the kind of work I do.

## Increase SWAP memory

The RPI memory is very limited, anf for certain cases we would fall short. There's two main options I use to set specific memory limitations for RPI desktop setups.

''' Using dphys-swapfile'''
sudo dphys-swapfile setup
sudo /etc/init.d/dphys-swapfile stop
sudo /etc/init.d/dphys-swapfile start

## Aumentar la memoria SWAP

### Opcion 1:
sudo dphys-swapfile setup

### Opcion 2:
sudo /etc/init.d/dphys-swapfile stop
sudo /etc/init.d/dphys-swapfile start


## Modo Turbo
Cambiar en el archivo config.txt:

force_turbo=1 # Esta opcion fuerza el modo turbo. Activar este modo puede eliminar tu garantia.
boot_delay=1 # Es necesario activar cuando se activa el modo turbo, para evitar corrupcion de la tarjeta SDCARD.

Los parametros a continuacion son para Overcloclear una RPI3 a 1.35GHZ
arm_freq=1350
core_freq=500
over_voltage=4
disable_splash=1

## Ajustes de memoria compartida para cuando tu RPI corre en sin UI
gpu_mem=16

Para cuando corre en UI, es mejor optimizar la memoria de la siguiente forma
gpu_mem=320


## Instalacion de GUI (desde Debian Stretch Lite)
sudo apt-get update
sudo apt full-upgrade -y
sudo apt-get install -y raspberrypi-ui-mods rpi-chromium-mods
sudo reboot
sudo apt-get install lightdm
raspi-config > "Boot option"->"Desktop / CLI"->"Desktop autologin"

### Opcional
#### startx
sudo apt-get install --no-install-recommends xinit

#### Algunos cambios adicionales para mejorar el performance
Optimizar chromium
sudo apt-get install -y rpi-chromium-mods
sudo apt-get install -y python-sense-emu python3-sense-emu

Instalar Midori
sudo apt install midori

## Otros interesantes
https://www.makeuseof.com/tag/raspberry-pi-performance-tips/
https://www.makeuseof.com/tag/make-raspberry-pi-3-boot-usb/
https://github.com/Hexxeh/rpi-update

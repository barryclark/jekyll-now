---
published: true
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

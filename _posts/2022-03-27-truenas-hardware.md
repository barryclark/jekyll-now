---
layout: post
title: My first TrueNas Scale 🖥 build 🏗
---

For many years, I had a [QNAP TS-853 Pro](https://www.qnap.com/en/product/ts-853%20pro) with 4x 2TB WD Red disks and 4x 3TB WD Read disks.
The hardware was (is) very reliable and still running.
In fact, I use this NAS now as my backup of the current build.
However, the software (QTS) of QNAP is horrible for anything advanced.
The kernel is outdated, the security weak, and putting proper security in place really cumbersome.
For instance: only the `admin` user account could be used to `ssh` into the NAS.
At the same time, QNAP recommended disabling the `admin` account for security reasons.
Doing both at the same time wasn't possible.
For 5+ years???
🤦‍♂.

## Hardware
* Mainboard: [ASUS Z10PA-D8 Series](https://www.asus.com/de/Commercial-Servers-Workstations/Z10PAD8/)
* CPU: [8-core Intel(R) Xeon(R) CPU E5-2620 v4 @ 2.10GHz](https://ark.intel.com/content/www/de/de/ark/products/92986/intel-xeon-processor-e52620-v4-20m-cache-2-10-ghz.html)
* RAM: Kingston 32GB DDR4-ECC (4x 8GB), 1Rx4, 2400 MHz, PC4
* Storage:
  * Boot device: [128GB Transcend 430S M.2 2242 6Gb/s 3D NAND](https://transcend-info.com/Products/No-981)
  * SSD RaidZ0: 2x [1TB Crucial BX500 2.5" (6.4cm) SATA 3D-NAND QLC](https://www.crucial.de/ssd/bx500/ct1000bx500ssd1) ➡ 1TB usable storage
  * HDD RaidZ1: 4x [6TB WD Red WD60EFAX 256MB 3.5" (8.9cm) SATA 6Gb/](https://www.westerndigital.com/de-at/products/internal-drives/wd-red-sata-hdd#WD60EFAX) ➡ 15.72 TB usable storage

### Images
Motherboard:
![motherboard]({{ site.baseurl }}/images/2022-03-27/mainboard.jpg){:width="70%"}

Storage array:
![storage-array]({{ site.baseurl }}/images/2022-03-27/ssd-hdd.jpg){:width="70%"}

## Software
* OS: TrueNas Scale `TrueNAS-SCALE-22.02-RC.2`

## Periphery
* Bluewalker USV Powerwalker VI 650 SB LI ([link](https://bluewalker.de/?page=product&item=10121096&lang=de)) with a USB connector. See [this blog post]({% post_url 2022-01-18-truenas-ups %}) on how I set it up.

---
layout: post
title: CodeScape MIPS SDKをインストールしてみる
---

QEMUでx86上でMIPSバイナリを実行できるようになったので、クロスコンパイル環境を作っていきます。
今回利用したのは、CodeScape MIPS SDKです。

### Install CodeScape MIPS SDK

- refer [this site](http://wiki.prplfoundation.org/wiki/MIPS_QEMU_MIPS64R6)
- use [CodeScape MIPS SDK](https://community.imgtec.com/developers/mips/tools/codescape-mips-sdk/download-codescape-mips-sdk-essentials/)
- we use "SDK Installers v1.4 - Linux 64bit"
<!--break-->
```bash
$ wget http://codescape-mips-sdk.imgtec.com/installer/essentials/release/CodescapeMIPSSDK-1.4.1.07/CodescapeMIPSSDK-1.4.1.07-linux-x64-installer.run
$ chmod +x CodescapeMIPSSDK-1.4.1.07-linux-x64-installer.run
$ sudo ./CodescapeMIPSSDK-1.4.1.07-linux-x64-installer.run
...

[1] All Users: Global install for all users
[2] Just this user: Local install for just this user (root)
Please choose an option [1] : 1

----------------------------------------------------------------------------
Install Directories

Please specify the directories where you would like to install the program
files. Write access is required to the directory specified.

Program Files

Base Install Directory [/opt/imgtec]:

----------------------------------------------------------------------------
Development Type

What type of applications will you be developing using Codescape MIPS SDK Essentials?
This option configures which components will be installed.

[1] Both Linux and Bare Metal Applications: Provides both sets of tools.
[2] Bare Metal Applications: Bare metal (or 'embedded') applications and operating systems.
[3] GNU Linux Applications: Applications to run on Linux, also for Linux kernel and distribution development and debugging.
Please choose an option [1] : 1
...
MIPS Classic Legacy CPU IP Cores
(4k, M4k, M14k, 24k, 1004k, 34k, 1074k, 74k) [y/N]: y
MIPS Aptiv Family CPU IP Cores
(microAptiv, interAptiv, proAptiv) [y/N]: y
MIPS Warrior Series 5 CPU IP Cores
(M-Class: M5100 and M5150, P-Class: P5600) [y/N]: y
MIPS Warrior Series 6 CPU IP Cores
(M-Class: M6200, I-Class: I6400, P-Class: P6600) [y/N]: y
----------------------------------------------------------------------------
Setup is now ready to begin installing Codescape MIPS SDK Essentials on your
computer.

Do you want to continue? [Y/n]:
----------------------------------------------------------------------------
Please wait while installer downloads necessary files to your computer.

 Downloading required files
 0% ______________ 50% ______________ 100%
 ########

----------------------------------------------------------------------------
Please wait while Setup installs Codescape MIPS SDK Essentials on your computer.

 Installing
 0% ______________ 50% ______________ 100%
 ##
```

- あとはインストール完了まで待つと、下記のツールセットが入ってくれます。

```bash
$ ls /opt/imgtec/Toolchains/mips-mti-linux-gnu/2016.05-03/bin/mips-mti-linux-gnu-<補完>
mips-mti-linux-gnu-addr2line   mips-mti-linux-gnu-gdb
mips-mti-linux-gnu-ar          mips-mti-linux-gnu-gfortran
mips-mti-linux-gnu-as          mips-mti-linux-gnu-gprof
mips-mti-linux-gnu-c++         mips-mti-linux-gnu-ld
mips-mti-linux-gnu-c++filt     mips-mti-linux-gnu-ld.bfd
mips-mti-linux-gnu-cpp         mips-mti-linux-gnu-nm
mips-mti-linux-gnu-elfedit     mips-mti-linux-gnu-objcopy
mips-mti-linux-gnu-g++         mips-mti-linux-gnu-objdump
mips-mti-linux-gnu-gcc         mips-mti-linux-gnu-ranlib
mips-mti-linux-gnu-gcc-4.9.2   mips-mti-linux-gnu-readelf
mips-mti-linux-gnu-gcc-ar      mips-mti-linux-gnu-size
mips-mti-linux-gnu-gcc-nm      mips-mti-linux-gnu-strings
mips-mti-linux-gnu-gcc-ranlib  mips-mti-linux-gnu-strip
mips-mti-linux-gnu-gcov
```

- 最後に再起動

```bash
$ sudo reboot
```
 
特にはまるところはなさそうですね。



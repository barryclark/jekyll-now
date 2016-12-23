---
layout: post
title: MIPS用のLinuxカーネルをビルドする
---

### Kernelビルドの準備

- Install ncurses-devel
- required for menuconfig

```bash
$ sudo yum install ncurses-devel -y
```

### 何回か失敗したこともログで残します

#### (FAILED) build Kernel 4.1.32 for "MIPS64 Release 6"

- we use lecent kernel "4.1" for [This issue](https://www.linux-mips.org/archives/linux-mips/2015-07/msg00275.html)
- use [this](http://qiita.com/ymaru/items/87fbc4e68f5995d3964c) to decompress binary 

```bash
$ wget https://cdn.kernel.org/pub/linux/kernel/v4.x/linux-4.1.32.tar.xz
$ xz -dc linux-4.1.32.tar.xz | tar xfv -
$ cd linux-4.1.32/
$ make ARCH=mips malta_defconfig
$ make ARCH=mips menuconfig
```
<!--break-->
- set configuration parameter for 64bit MIPS
 - CPU Selection -> CPU Type ... MIPS64 Release 6(EXPERIMENTAL)
 - Kernel Type -> Kernel code model ... 64bit kernel
 - General setup -> Initial RAM filesystem and RAM disk ... Enable
 - Do you with to save ... YES


- build kernel
 - if we use kernel 3.2, 3.12, [this issue](https://www.linux-mips.org/archives/linux-mips/2015-07/msg00275.html) occur


```bash
$ make ARCH=mips CROSS_COMPILE=mips-img-linux-gnu-
...
$ ls vmlinux
vmlinux
$ file vmlinux
vmlinux: ELF 64-bit LSB executable, MIPS, version 1 (SYSV), statically linked, BuildID[sha1]=8a6d147d98c40f5efdb92107670eb45cd83e9054, with unknown capability 0x756e670000000f41 = 0x304000000070100, not stripped
```

- execute kernel on QEMU-MIPS

```bash
$ cp vmlinux ../aurel32/vmlinux-4.1.32-malta
$ qemu-system-mips64el -M malta -kernel vmlinux-4.1.32-malta -hda debian_squeeze_mipsel_standard.qcow2 -append "root=/dev/sda1 console=tty0" -display gtk
```

- No ERROR, but GUI is not initialized.
 - 一回目の失敗はここでした


#### (FAILED) build Kernel 4.1.32 for "MIPS64 Release 2"

menuconfigなどなどを切り替えていく。

```bash
$ make ARCH=mips malta_defconfig
$ make ARCH=mips menuconfig
$ make ARCH=mips CROSS_COMPILE=mips-img-linux-gnu-
$ file vmlinux
vmlinux: ELF 64-bit LSB executable, MIPS, MIPS64 rel2 version 1 (SYSV), statically linked, BuildID[sha1]=92aa3170ee44f672ef0930abd69c7b01ec98def1, with unknown capability 0x756e670000000f41 = 0x304000000070100, not stripped
```

- set configuration parameter for 64bit MIPS
 - CPU Selection -> CPU Type ... MIPS64 Release 2
 - Kernel Type -> Kernel code model ... 64bit kernel
 - General setup -> Initial RAM filesystem and RAM disk ... Disable
 - File System -> Ext2 Support ... Enable
 - File System -> Ext3 Support ... Enable
 - File System -> Ext4 Support ... Enable
 - Do you with to save ... YES

```bash
$ cp vmlinux ../aurel32/vmlinux-4.1.32-malta
$ qemu-system-mips64el -cpu MIPS64R2-generic -M malta -kernel vmlinux-4.1.32-malta -hda debian_squeeze_mipsel_standard.qcow2 -append "root=/dev/sda1 console=tty0" -display gtk
```

- Kernel実行してみる…
 - が/sbin/initを実行できずにPanic


#### (FAILED) build Kernel 4.1.32 for "MIPS64 Release 1"


```bash
$ make ARCH=mips malta_defconfig
$ make ARCH=mips menuconfig
$ make ARCH=mips CROSS_COMPILE=mips-img-linux-gnu-
$ file vmlinux
vmlinux: ELF 64-bit LSB executable, MIPS, MIPS64 version 1 (SYSV), statically linked, BuildID[sha1]=8b96201d58105ceab4748a824a0eb07e70017a00, with unknown capability 0x756e670000000f41 = 0x304000000070100, not stripped
```

- set configuration parameter for 64bit MIPS
 - CPU Selection -> CPU Type ... MIPS64 Release 1
 - Kernel Type -> Kernel code model ... 64bit kernel
 - General setup -> Initial RAM filesystem and RAM disk ... Enable
 - File System -> Ext2 Support ... Enable
 - File System -> Ext3 Support ... Enable
 - File System -> Ext4 Support ... Enable
 - Executable file formats -> Kernel support for o32 binaries
 - Executable file formats -> Kernel support for n32 binaries
 - Do you with to save ... YES

```bash
$ cp vmlinux ../aurel32/vmlinux-4.1.32-malta
$ qemu-system-mips64el -M malta -kernel vmlinux-4.1.32-malta -hda debian_squeeze_mipsel_standard.qcow2 -append "root=/dev/sda1 console=tty0" -display gtk
```

- execute Kernel
 - がまた同じ場所でPanic ( exec /sbin/init )"It's same point"

### 成功例

#### (SUCCESS) build Kernel 4.1.32 for "MIPS64 Release 1 wiz o32/n32 binaries"

で、いろいろ試した結果、以下の構成で成功しました。

- set configuration parameter for 64bit MIPS
 - Executable file formats -> Kernel support for o32 binaries
 - Executable file formats -> Kernel support for n32 binaries

```bash
$ make ARCH=mips menuconfig
$ make ARCH=mips CROSS_COMPILE=mips-img-linux-gnu-
$ file vmlinux
vmlinux: ELF 64-bit LSB executable, MIPS, MIPS64 version 1 (SYSV), statically linked, BuildID[sha1]=8b96201d58105ceab4748a824a0eb07e70017a00, with unknown capability 0x756e670000000f41 = 0x304000000070100, not stripped
$ cp vmlinux ../aurel32/vmlinux-4.1.32-malta
$ qemu-system-mips64el -M malta -kernel vmlinux-4.1.32-malta -hda debian_squeeze_mipsel_standard.qcow2 -append "root=/dev/sda1 console=tty0" -display gtk
```

#### (SUCCESS) build Kernel 4.7.3 for "MIPS64 Release 2 wiz o32/n32 binaries"

折角なので新しめのkernel "4.7.3" も立ち上げてみましょう。

```bash
$ wget https://cdn.kernel.org/pub/linux/kernel/v4.x/linux-4.7.3.tar.xz
$ xz -dc linux-4.7.3.tar.xz | tar xfv -
$ cd linux-4.7.3/
$ make ARCH=mips malta_defconfig
$ make ARCH=mips menuconfig
$ make ARCH=mips CROSS_COMPILE=mips-img-linux-gnu-
$ file vmlinux
vmlinux: ELF 64-bit LSB executable, MIPS, MIPS64 rel2 version 1 (SYSV), statically linked, BuildID[sha1]=b673fc1393b525e03c180afc6e2b113a7894ea32, with unknown capability 0x756e670000000f41 = 0x304000000070100, not stripped
```

- set configuration parameter for 64bit MIPS
 - CPU Selection -> CPU Type ... MIPS64 Release 2
 - Kernel Type -> Kernel code model ... 64bit kernel
 - General setup -> Initial RAM filesystem and RAM disk ... Enable
 - File System -> Ext2 Support ... Enable
 - File System -> Ext3 Support ... Enable
 - File System -> Ext4 Support ... Enable
 - Executable file formats -> Kernel support for o32 binaries
 - Executable file formats -> Kernel support for n32 binaries
 - Do you with to save ... YES

```bash
$ cp vmlinux ../aurel32/vmlinux-4.7.3-malta
$ qemu-system-mips64el -cpu MIPS64R2-generic -M malta -kernel vmlinux-4.7.3-malta -hda debian_squeeze_mipsel_standard.qcow2 -append "root=/dev/sda1 console=tty0" -display gtk
```

- execute Kernel
 - こちらも起動成功


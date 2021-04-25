---
layout: post
title: Собираем ядро на Debian Squeeze с BFS
---

Недавно тут захотелось свежих программ и было решено поставить Debian Squeeze вместо Lenny. Сказано — сделано. Только вот  ядро меня не устраивало — почему то ReiserFS не хотел монтироваться, скорость работы (мои сборки были с BFS и переход с него обратно очень ощутим). Обычно я пользуюсь вот [этим](http://my-debian.blogspot.com/2007/10/blog-post_29.html) и [этим](http://www.openkazan.info/Ubuntu-BFS) руководством, но по ним у меня ничего не получалось. Не создавался initrd, и ядрышко (linux-2.6.32.9) выдавало kernel panic not syncing vfs unable to mount root fs on unknown-block. По этому запросу выдавало много что, но я предположил что налажали в скриптах и оказался прав. Вот [бага](http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=532908).

Решение простое — берем пакет `initramfs-tools` из репазитраия Lenny, а заодно и `kernel-package`. И еще я поставил grub от lenny — мне просто не нравится новая версия, но стоит описать так как это может на что-нибудь повлиять. Правим конфиг `/etc/apt/preferences` что бы наши усилия не уничтожились первым обновлением

```text
Package: kernel-package
Pin: version 11.0*
Pin-Priority: 989

Package: grub-common
Pin: version 1.96*
Pin-Priority: 989

Package: grub
Pin: version 0.97-47*
Pin-Priority: 989

Package: initramfs-tools
Pin: version 0.92*
Pin-Priority: 989
```

Конечно это не true но пофиг. Искать баги в скриптах, или пытаться разобраться в коментах к багу мне не хотелось. Казалось вот оно счастье, но нет собранное ядро теперь нам будет говорить (а вот это не у всех и не всегда) *waint root file system*. И все дело в кривом конфиге идущим с текущим ядром. Не делайте `cp /boot/config-`uname -r` /usr/src/linux/.config` Посидите вечерком над make menuconfig или make gconfig (по вкусу) и составьте нормальный конфиг для себя, дальше его можно будет перетаскивать из ядра в ядро через oldconfig.

Описывать все по шагам не буду, все описано в статьях по 2 верхним ссылкам и нечего плодить сущности.
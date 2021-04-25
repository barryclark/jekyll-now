---
layout: post
title: Разлочка модемов
---

Вся суть разлочки модема, подцепить его через утилиту usb_modeswitch (искать по кодам из lsusb) подцепит его в режим девайсов и перевести его в [нужный режим](http://mykubik.blogspot.com/2014/06/huawei-e3531-kubuntu-1404.html) (модем + интерфейс)

Бывают еще залоченные на оператора модемы. Для них надо найти программу HUAWEI_Calculator.exe (через wine работает) на 4pda.ru и по IMEI разлочить.

## Залочен ли модем на оператора?

Надо послать на модем AT команду:

```text
AT^CARDLOCK?
```

В ответ модем выдаст:

```text
CARDLOCK: A,B,0
```

* A -> 2- означает, что симлока нет, 1-если модем залочен
* B -> количество оставшихся попыток разблокировки. У нового модема = 10

## Разлочка модема Huawei E3531(Мегафон М21-4)

### usb_modeswitch

Качаем максимально свежую утилиту. `sudo mcedit /etc/usb_modeswitch.d/12d1:15e7` (точно определи по lsusb и найди решение под его)

```text
# Huawei E3531
TargetVendor=0x12d1
TargetProduct=0x1506
MessageContent="55534243123456780000000000000011062000000101000100000000000000"
```

Затем `sudo mcedit /lib/udev/rules.d/40-usb_modeswitch.rules`

```text
#Huawei E3531
ATTR{idVendor}=="12d1", ATTR{idProduct}=="15e7", RUN+="usb_modeswitch '%b/%k'"
```

Перезапускаем правила udev и передергиваем модем: `sudo udevadm control --reload-rules`
Для верности вручную переводим модем: `sudo usb_modeswitch -v 12d1 -p 15e7 -c /etc/usb_modeswitch.d/12d1:15e7`

После этих манипуляций модем должен переключиться в режим модема и сменит свой VID и PID на: 12d1:1506. Но, этого он увидится как USB, но только у нас

```shell
$ ls /dev/ttyUSB*
/dev/ttyUSB0 /dev/ttyUSB1 /dev/ttyUSB2
```

### Закрепление результата

Цепляемся к модему и `sudo minicom -D /dev/ttyUSB1`

```text
#режим модем + интерфейс
AT^SETPORT="FF;1,2"
# только модем
at^setport="ff;10,12,16,a2"
```

## Разлочка модема Huawei E3533

```shell
sudo usb_modeswitch -W -I -v 12d1 -p 15e6 -M 55534243123456780000000000000011062000000101000100000
000000000
```

```text
#режим модем + интерфейс
AT^SETPORT="FF;1,2"
```

## Разлочка модема Huawei E1550

```text
AT^U2DIAG=0
```

У модема появляется 3 девайса. [Калькулятор](https://trustoff.ru/razblokirovka-huawei-e1750-e1550).

```text
AT^CARDUNLOCK="nck md5 hash"
```

Счетчик попыток ввода unlock кода сбросится на значение 10 (можно снова 10 раз ввести NCK). Теперь можно напрямую через терминал ввести сам код разблокировки модема

```text
AT^CARDLOCK="nck code"
```

Получить ключ можно используя услугу код разблокировки для модемов Huawei.
Проверить состояние блокировки и оставшихся попыток можно командой:

```text
AT^CARDLOCK?
```

## Модем возвращает mcс/mnc вместо оператора

Если на команду:

```text
AT+COPS?
```

Модем возвращает:

```text
+COPS: 0,2,"25001",2
```

То нужно сменить режим:

```text
AT+COPS=3,0
```

[Подробности](http://stackoverflow.com/questions/13640205/gsm-modem-at-command-to-know-my-operator)
---
layout: post
title: HOWTO ubuntu 14.04 установка mate 1.8
---

Решил я сделать старую добрую gnome2 убунту. Для этого нам потребуется: дистрибутив ubuntu-server 14.04 (под нашу архитектуру), прямые руки и немного терпения.

### Шаг 1

Ставим ubuntu server как нам хочется, останавливаться на этом не буду.

### Шаг 2

Добавляем репазитарий с Mate 1.8

```shell
sudo add-apt-repository "deb http://repo.mate-desktop.org/archive/1.8/ubuntu/ trusty main"
```

### Шаг 3

Обновляем список пакетов и ставим mate

```shell
sudo apt-get update
sudo apt-get install mate-desktop-environment-extra
```

Подтвердите, что хотите поставить пакеты из непроверенного источника и ждите пока завершится.

### Шаг 4

Ставим X.org и все его плюхи

```shell
sudo apt-get install xinit
```

### Шаг 5

Ставим GDM с минимумом зависимостей

```shell
sudo apt-get install --no-install-recommends gdm
```

### Шаг 6

Перезагрузитесь

```shell
sudo reboot
```

Выберите сессию mate, когда будете заходить под своим пользователем
![_config.yml]({{ site.baseurl }}/images/20140421/screenshot29.png)

ubuntu gdm mate

И собственно результат:
![_config.yml]({{ site.baseurl }}/images/20140421/screenshot30.png)
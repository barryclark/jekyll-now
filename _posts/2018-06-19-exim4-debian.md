---
layout: post
title: Конфигурирование Exim4 под Debian
---

Exim4 идёт по дефолту в **Debian**. Имется почта в Яндекс с сущетсвующим паролем-прилоежнии для него. 
Конфигурировать этот файл **/etc/exim4/update-exim4.conf.conf**:

{% highlight text %}
dc_eximconfig_configtype='smarthost'
dc_other_hostnames='server'
dc_local_interfaces='127.0.0.1 ; ::1'
dc_readhost=''
dc_relay_domains=''
dc_minimaldns='false'
dc_relay_nets=''
dc_smarthost='smtp.yandex.ru:465'
CFILEMODE='644'
dc_use_split_config='false'
dc_hide_mailname=''
dc_mailname_in_oh='true'
dc_localdelivery='mail_spool'
{% endhighlight %}

Строку в конце **/etc/exim4/passwd.client** указав почту и пароль-приложение к нему:

{% highlight text %}
smtp.yandex.ru:mail@yandex.ru:password
{% endhighlight %}

Перекофигурировать и перезагрузить службу Exim4:

{% highlight bash %}
sudo systemctl reload exim4
sudo systemctl restart exim4
{% endhighlight %}

Отправляем тестовое письмо:
{% highlight bash %}
echo 'Типа тело сообщения' | mail -s 'Это тема сообщения' mail@gmail.com
{% endhighlight %}


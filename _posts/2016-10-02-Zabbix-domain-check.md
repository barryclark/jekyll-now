---
layout: post
title: Следим за временем оплаты доменов с помощью zabbix
---

Очень часто любит народ забывать оплачивать домены. А когда у тебя на поддержке sms-шлюз и сервис мобильных платежей, то это плохо. Администратор не увидел письмо, владелец домена пропустил уведомление и т.д. Все критические параметры должны мониториться.

Я искал готовые решения, но они ужасны. Нашел на [perl](https://github.com/Lelik13a/Zabbix-Domain-Check) с зависимостями или сложное решение.  Доменов мало (всего 5). В итоге я решил написать своё компактное решение.

1. Нам нужен bash скрипт, который считает количество оставшихся дней до конца оплаты. Их есть у меня

```bash
#!/bin/bash
 
#day for domain paid
#create hardworm@gmail.com
 
DOMAIN="$1"
 
D1=$(whois $1 | grep -E 'paid|Expir' | grep -o -E '[0-9]{4}.[0-9]{2}.[0-9]{2}|[0-9]{2}/[0-9]{2}/[0-9]{4}' | tr . / )
SDIFF1=$((`date -d "$D1" '+%s'`))
SDIFF2=$((`date '+%s'`))
s=$(($SDIFF1 - $SDIFF2))
d=$(($s/86400))
echo $d
```

2. Подсовываем Zabbix Agent скрипт /etc/zabbix/scripts/domain.sh и даем ему нужные права
3. Настраиваем Zabbix Agent (/etc/zabbix/zabbix_agentd.conf), что бы он мог использовать наш скрипт (не забудьте перезапустить агент).

```bash
#domain
UserParameter=domain[*],/etc/zabbix/scripts/domain.sh $1

```

4. Создаем элемент данных в web Zabbix

![_config.yml]({{ site.baseurl }}/images/zabbix_element-300x295.png)

5. Создаем триггер в web Zabbix

![_config.yml]({{ site.baseurl }}/images/zabbix_trigger-300x161.png)